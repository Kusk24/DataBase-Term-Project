import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, List, ListItem, AppBar, Toolbar } from '@mui/material';

// Mock Data for Users and Games
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
];

const mockGames = [
    { id: 1, title: 'Cyberpunk 2077', stock: 5, price: 14.99, status: 'Available' },
    { id: 2, title: 'Elden Ring', stock: 3, price: 15.99, status: 'Available' },
];

const AdminDashboard = () => {
    const [currentSection, setCurrentSection] = useState('dashboard');
    const navigate = useNavigate(); // For navigation

    const renderAdminSection = () => {
        switch (currentSection) {
            case 'dashboard':
                return (
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{ color: '#1dbf73' }}>
                            Admin Dashboard
                        </Typography>
                        <Typography>
                            Welcome to the admin panel. Use the navigation to manage users, games, and more.
                        </Typography>
                    </Box>
                );
            case 'users':
                return (
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{ color: '#1dbf73' }}>
                            Users Management
                        </Typography>
                        <List sx={{ color: '#f0f0f0' }}>
                            {mockUsers.map((user) => (
                                <ListItem key={user.id}>
                                    {user.name} - {user.email} ({user.status})
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                );
            case 'games':
                return (
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{ color: '#1dbf73' }}>
                            Games Management
                        </Typography>
                        <List sx={{ color: '#f0f0f0' }}>
                            {mockGames.map((game) => (
                                <ListItem key={game.id}>
                                    {game.title} - ${game.price} ({game.stock} in stock)
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #1f1f1f, #121212)', color: '#f0f0f0' }}>
            <AppBar position="static" sx={{ backgroundColor: '#232323', marginBottom: '20px' }}>
                <Toolbar>
                    <Button
                        color="inherit"
                        onClick={() => setCurrentSection('dashboard')}
                        sx={{
                            fontWeight: 'bold',
                            '&:hover': { color: '#1dbf73' },
                        }}
                    >
                        Dashboard
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => setCurrentSection('users')}
                        sx={{
                            fontWeight: 'bold',
                            '&:hover': { color: '#1dbf73' },
                        }}
                    >
                        Users
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => setCurrentSection('games')}
                        sx={{
                            fontWeight: 'bold',
                            '&:hover': { color: '#1dbf73' },
                        }}
                    >
                        Games
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/')}
                        sx={{
                            fontWeight: 'bold',
                            '&:hover': { color: '#1dbf73' },
                        }}
                    >
                        Main Menu
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    padding: '30px',
                    background: 'rgba(30, 30, 30, 0.85)',
                    borderRadius: '15px',
                    margin: '20px',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
                }}
            >
                {renderAdminSection()}
            </Box>
        </Box>
    );
};

// Default export
export default AdminDashboard;
