// frontend/src/pages/EditProjectPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [technologies, setTechnologies] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data } = await axios.get(`/api/projects/${id}`);
                setTitle(data.title);
                setDescription(data.description);
                setImageUrl(data.imageUrl); // This will now be the full URL
                setTechnologies(data.technologies.join(', '));
            } catch (err) {
                setError('Failed to fetch project data.');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('technologies', technologies);

        // Logic to handle which image source to update
        if (imageFile) {
            formData.append('image', imageFile);
        } else {
            formData.append('imageUrl', imageUrl);
        }

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.token : null;
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.put(`/api/projects/${id}`, formData, config);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Failed to update project.');
        }
    };

    if (loading) return <p style={{textAlign: 'center', paddingTop: '100px'}}>Loading project...</p>;

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <h2>Edit Project</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form id="contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea rows="6" placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                
                <p style={{textAlign: 'left', marginTop: '10px'}}>Current Image:</p>
                <img src={imageUrl} alt="Current project" style={{width: '200px', marginBottom: '15px'}} />
                
                <input type="text" placeholder="New Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <div style={{ margin: '15px 0', textAlign: 'center', fontWeight: 'bold' }}>OR</div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="imageUpload" style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>Upload New Image File (optional):</label>
                    <input id="imageUpload" type="file" onChange={handleFileChange} />
                </div>

                <input type="text" placeholder="Technologies (comma-separated)" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
                <button type="submit" className="btn btn-primary">Update Project</button>
            </form>
        </div>
    );
};

export default EditProjectPage;