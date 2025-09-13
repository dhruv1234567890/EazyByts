// frontend/src/pages/AddProjectPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProjectPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');     // For the text input URL
    const [imageFile, setImageFile] = useState(null); // For the file upload
    const [technologies, setTechnologies] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // A user must provide either a file OR a URL, but not both.
        if (imageFile && imageUrl) {
            setError('Please provide either an image file or a URL, not both.');
            return;
        }
        if (!imageFile && !imageUrl) {
            setError('You must provide either an image file or a URL.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('technologies', technologies);
        
        // --- NEW LOGIC: Conditionally append image data ---
        if (imageFile) {
            formData.append('image', imageFile); // 'image' for the file upload
        } else {
            formData.append('imageUrl', imageUrl); // 'imageUrl' for the text URL
        }

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.token : null;
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post('/api/projects', formData, config);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create project. Please check your inputs.');
            console.error(err);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <h2>Add New Project</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form id="contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea rows="6" placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                
                {/* Keep BOTH input options */}
                <input type="text" placeholder="Image URL (e.g., https://...)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                
                <div style={{ margin: '15px 0', textAlign: 'center', fontWeight: 'bold' }}>OR</div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="imageUpload" style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>Upload Image File:</label>
                    <input id="imageUpload" type="file" onChange={handleFileChange} />
                </div>

                <input type="text" placeholder="Technologies (comma-separated)" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
                <button type="submit" className="btn btn-primary">Add Project</button>
            </form>
        </div>
    );
};

export default AddProjectPage;