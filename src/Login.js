import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Container, Link } from '@mui/material';

export const Login = ({ profile, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin' && password === 'password' && profile.name === 'Admin') {
            onLoginSuccess();
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials or role mismatch');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    textAlign: 'center',
                    marginTop: '50px',
                    padding: '40px',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
                    borderRadius: '15px',
                    background: 'linear-gradient(145deg, #2b2b2b, #1e1e1e)',
                    color: '#f0f0f0',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#1dbf73' }}>
                    Login as {profile.name}
                </Typography>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        marginTop: '20px',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            style: {
                                backgroundColor: '#f0f0f0',
                                borderRadius: '5px',
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            style: {
                                backgroundColor: '#f0f0f0',
                                borderRadius: '5px',
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(45deg, #1dbf73, #17a2b8)',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '12px',
                            borderRadius: '8px',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                background: 'linear-gradient(45deg, #17a2b8, #1dbf73)',
                            },
                        }}
                        fullWidth
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Link
                        href="/forgot-password"
                        variant="body2"
                        sx={{
                            color: '#1dbf73',
                            textDecoration: 'none',
                            marginTop: '10px',
                            '&:hover': {
                                textDecoration: 'underline',
                                color: '#17a2b8',
                            },
                        }}
                    >
                        Forgot Password?
                    </Link>
                </Box>
                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            marginTop: '20px',
                            backgroundColor: 'rgba(255, 0, 0, 0.1)',
                            color: '#ff4c4c',
                            transition: 'opacity 0.3s',
                        }}
                    >
                        {error}
                    </Alert>
                )}
            </Box>
        </Container>
    );
};
