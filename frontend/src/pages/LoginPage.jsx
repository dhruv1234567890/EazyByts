import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    // Check if user is already logged in, if so, redirect
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                '/api/users/login', 
                { email, password },
                config
            );

            console.log('Login successful:', data);

            localStorage.setItem('userInfo', JSON.stringify(data));

            navigate('/admin/dashboard');

        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : 'An unexpected error occurred.');
            console.error('Login error:', err);
        }
    };

    return (
        <section style={{ padding: '100px 0', textAlign: 'center' }}>
            <div className="container">
                <h2>Admin Login</h2>

                {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

                <form id="contact-form" onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;