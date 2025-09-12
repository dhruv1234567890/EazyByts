// frontend/src/pages/LoginPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <-- Import axios
import { useNavigate } from 'react-router-dom'; // <-- Import for navigation

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // <-- State to hold error messages
    const navigate = useNavigate(); // <-- Hook to programmatically navigate

    // Check if user is already logged in, if so, redirect
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/admin/dashboard'); // Redirect to dashboard if already logged in
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            // Configuration for the API request
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // Make the POST request to the login endpoint
            const { data } = await axios.post(
                '/api/users/login', // The URL to our backend login route
                { email, password }, // The data we're sending
                config
            );

            // If the request is successful, 'data' will contain the user object and token
            console.log('Login successful:', data);

            // 1. Save the user info (including the token) to localStorage
            localStorage.setItem('userInfo', JSON.stringify(data));

            // 2. Redirect the user to the admin dashboard
            navigate('/admin/dashboard');

        } catch (err) {
            // If the API returns an error (e.g., 401 Unauthorized)
            setError(err.response && err.response.data.message ? err.response.data.message : 'An unexpected error occurred.');
            console.error('Login error:', err);
        }
    };

    return (
        <section style={{ padding: '100px 0', textAlign: 'center' }}>
            <div className="container">
                <h2>Admin Login</h2>

                {/* Display error message if it exists */}
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