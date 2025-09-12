// frontend/src/pages/AddProjectPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProjectPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.token : null;

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const projectData = {
                title,
                description,
                imageUrl,
                technologies: technologies ? technologies.split(',').map(tech => tech.trim()).filter(tech => tech) : [],
            };

            await axios.post('/api/projects', projectData, config);
            navigate('/admin/dashboard'); // Redirect to dashboard after successful creation
        } catch (err) {
            setError('Failed to create project. Please check your inputs.');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <h2>Add New Project</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form id="contact-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea rows="6" placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                <input type="text" placeholder="Technologies (comma-separated, e.g., React, Node.js)" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
                <button type="submit" className="btn btn-primary">Add Project</button>
            </form>
        </div>
    );
};

export default AddProjectPage;