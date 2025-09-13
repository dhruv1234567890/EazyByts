// server.js

// 1. DEPENDENCIES
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// 2. INITIALIZATION
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // Replaces bodyParser

// 3. DATABASE CONNECTION
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3307
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err);
        return;
    }
    console.log('✅ MySQL Connected...');
});

// 4. HELPER FUNCTION & MIDDLEWARE

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Protect Middleware (Gatekeeper)
const protect = (req, res, next) => {
    console.log('--- PROTECT MIDDLEWARE ACTIVATED ---'); // 1. Check if it runs
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('Token found:', token); // 2. Check if token is extracted

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token decoded:', decoded); // 3. Check the decoded payload

            db.query('SELECT id, name, email FROM users WHERE id = ?', [decoded.id], (err, result) => {
                if (err) {
                    console.error('Database query error in protect:', err); // 4a. Check for DB errors
                    return res.status(500).json({ message: 'Server error during auth' });
                }
                if (result.length === 0) {
                    console.log('User not found for ID:', decoded.id); // 4b. Check if user is found
                    return res.status(401).json({ message: 'Not authorized, user not found' });
                }
                
                console.log('User found:', result[0]); // 5. Confirm user was found
                req.user = result[0];
                next();
            });
        } catch (error) {
            console.error('Token verification failed:', error.message); // 6. Check for JWT errors
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        console.log('No token found in headers.'); // 7. Check if no token was provided at all
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // The folder where files will be stored
    },
    filename: function (req, file, cb) {
        // Create a unique filename: fieldname-timestamp.extension
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. API ROUTES

// --- User Routes ---

// Register User (SECURE)
app.post('/api/users/register', async (req, res) => {
    const { name, email, password } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (result.length > 0) return res.status(400).json({ message: 'User already exists' });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users SET ?', { name, email, password: hashedPassword }, (err, result) => {
            if (err) return res.status(500).json({ message: 'Server error on insert' });
            res.status(201).json({ id: result.insertId, name, email, token: generateToken(result.insertId) });
        });
    });
});

// Login User (SECURE)
app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err || result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.json({ id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});


// --- Project Routes ---

// Get All Projects
app.get('/api/projects', (req, res) => {
    const sql = `
        SELECT p.*, GROUP_CONCAT(pt.technologyName) AS technologies
        FROM projects p
        LEFT JOIN project_technologies pt ON p.id = pt.projectId
        GROUP BY p.id
        ORDER BY p.createdAt DESC;
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        // Convert the comma-separated string of technologies back into an array
        const projects = result.map(p => ({
            ...p,
            technologies: p.technologies ? p.technologies.split(',') : []
        }));
        res.json(projects);
    });
});

app.get('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const sql = `
        SELECT p.*, GROUP_CONCAT(pt.technologyName) AS technologies
        FROM projects p
        LEFT JOIN project_technologies pt ON p.id = pt.projectId
        WHERE p.id = ?
        GROUP BY p.id;
    `;

    db.query(sql, [projectId], (err, result) => {
        if (err) {
            console.error("Error fetching single project:", err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const project = {
            ...result[0],
            technologies: result[0].technologies ? result[0].technologies.split(',') : []
        };
        res.json(project);
    });
});

app.post('/api/projects', protect, upload.single('image'), (req, res) => {
    // Text fields are in req.body
    const { title, description, technologies, imageUrl: imageUrlFromText } = req.body;
    
    let finalImageUrl;

    // --- NEW LOGIC: Decide which image URL to use ---
    if (req.file) {
        // Case 1: A file was uploaded. Use its path.
        const backendUrl = `${req.protocol}://${req.get('host')}`;
        finalImageUrl = `${backendUrl}/uploads/${req.file.filename}`;
    } else if (imageUrlFromText) {
        // Case 2: No file was uploaded, but a URL was provided in the text input.
        finalImageUrl = imageUrlFromText;
    } else {
        // Case 3: Neither a file nor a URL was provided. This is an error.
        return res.status(400).json({ message: 'Please provide an image by uploading a file or entering a URL.' });
    }

    const projectData = { title, description, imageUrl: finalImageUrl };

    db.query('INSERT INTO projects SET ?', projectData, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error creating project' });
        }
        const projectId = result.insertId;

        // Handle technologies (this logic remains the same)
        const techArray = technologies ? technologies.split(',').map(tech => tech.trim()).filter(tech => tech) : [];
        if (techArray.length > 0) {
            const techValues = techArray.map(tech => [projectId, tech]);
            db.query('INSERT INTO project_technologies (projectId, technologyName) VALUES ?', [techValues], (err, result) => {
                if (err) return res.status(500).json({ message: 'Server error adding technologies' });
            });
        }
        res.status(201).json({ id: projectId, ...projectData, technologies: techArray });
    });
});

// Delete a Project (PROTECTED)
app.delete('/api/projects/:id', protect, (req, res) => {
    const projectId = req.params.id;
    // The database is set to ON DELETE CASCADE, so we only need to delete from the projects table.
    // The related technologies will be deleted automatically.
    db.query('DELETE FROM projects WHERE id = ?', [projectId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project removed' });
    });
});

app.put('/api/projects/:id', protect, upload.single('image'), (req, res) => {
    const { title, description, technologies, imageUrl: imageUrlFromText } = req.body;
    
    db.query('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error finding project' });
        if (result.length === 0) return res.status(404).json({ message: 'Project not found' });

        let finalImageUrl = result[0].imageUrl; // Start with the existing image URL

        if (req.file) {
            // If a new file is uploaded, update the URL
            const backendUrl = `${req.protocol}://${req.get('host')}`;
            finalImageUrl = `${backendUrl}/uploads/${req.file.filename}`;
            // TODO: Optionally delete the old image file from the server
        } else if (imageUrlFromText) {
            // If a new URL is provided, update it
            finalImageUrl = imageUrlFromText;
        }

        const updatedProjectData = {
            title: title || result[0].title,
            description: description || result[0].description,
            imageUrl: finalImageUrl,
        };

        db.query('UPDATE projects SET ? WHERE id = ?', [updatedProjectData, req.params.id], (err, updateResult) => {
            if (err) return res.status(500).json({ message: 'Server error updating project' });

            // Handle technologies update (delete old ones, insert new ones)
            const techArray = technologies ? technologies.split(',').map(tech => tech.trim()).filter(tech => tech) : [];
            db.query('DELETE FROM project_technologies WHERE projectId = ?', [req.params.id], (err, deleteResult) => {
                if (err) return res.status(500).json({ message: 'Server error updating technologies' });
                if (techArray.length > 0) {
                    const techValues = techArray.map(tech => [req.params.id, tech]);
                    db.query('INSERT INTO project_technologies (projectId, technologyName) VALUES ?', [techValues], (err, insertResult) => {
                        if (err) return res.status(500).json({ message: 'Server error inserting technologies' });
                    });
                }
            });
            res.json({ id: req.params.id, ...updatedProjectData, technologies: techArray });
        });
    });
});

// 6. START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});