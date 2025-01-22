import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = ({ profile, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For navigation

    const handleLogin = () => {
        // Mock login logic
        if (username === 'admin' && password === 'password' && profile.name === 'Admin') {
            onLoginSuccess();
            navigate('/admin/dashboard'); // Redirect to admin dashboard
        } else if (username === 'staff' && password === 'password' && profile.name === 'Staff') {
            onLoginSuccess();
            navigate('/staff/dashboard'); // Replace with the actual staff dashboard route
        } else if (username === 'customer' && password === 'password' && profile.name === 'Customer') {
            onLoginSuccess();
            navigate('/customer/dashboard'); // Replace with the actual customer dashboard route
        } else {
            setError('Invalid credentials or role mismatch');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Login as {profile.name}</h1>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleLogin}>Login</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
        </div>
    );
};
