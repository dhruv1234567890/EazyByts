import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const DashboardPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects');
                setProjects(response.data);
            } catch (err) {
                setError('Failed to fetch projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [navigate, token]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.delete(`/api/projects/${id}`, config);
                setProjects(projects.filter((p) => p.id !== id));
            } catch (err) {
                setError('Failed to delete project.');
            }
        }
    };

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Admin Dashboard</h1>
                <div>
                    <Link to="/admin/add-project" className="btn btn-primary" style={{ marginRight: '10px' }}>Add Project</Link>
                    <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                </div>
            </div>

            {loading && <p>Loading projects...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #ccc' }}>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Title</th>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>{project.title}</td>
                            <td style={{ padding: '10px' }}>
                                <Link to={`/admin/edit-project/${project.id}`} className="btn btn-secondary" style={{ marginRight: '10px' }}> Edit </Link>
                                <button onClick={() => handleDelete(project.id)} className="btn btn-outline" style={{ borderColor: 'red', color: 'red' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardPage;