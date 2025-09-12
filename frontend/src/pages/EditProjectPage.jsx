// frontend/src/pages/EditProjectPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProjectPage = () => {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data } = await axios.get(`/api/projects/${id}`);
                setTitle(data.title);
                setDescription(data.description);
                setImageUrl(data.imageUrl);
                setTechnologies(data.technologies.join(', ')); // Join array into a string for the input
            } catch (err) {
                setError('Failed to fetch project data.');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

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
                technologies: technologies.split(',').map(tech => tech.trim()),
            };
            await axios.put(`/api/projects/${id}`, projectData, config);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Failed to update project.');
        }
    };

    if (loading) return <p>Loading project...</p>;

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <h2>Edit Project</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form id="contact-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea rows="6" placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                <input type="text" placeholder="Technologies (comma-separated)" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
                <button type="submit" className="btn btn-primary">Update Project</button>
            </form>
        </div>
    );
};

export default EditProjectPage;