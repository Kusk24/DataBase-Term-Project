import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Box, Button } from '@mui/material';

export const CustomerDashboard = ({ onSignOut, profile }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('rentPage');

    const handleNavigation = (tabName) => {
        setActiveTab(tabName);
        navigate(`/customer/${tabName}`);
    };

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#1e1e1e', color: '#f0f0f0' }}>
            {/* Header with Navigation Buttons */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '20px',
                    backgroundColor: '#2c2c2c',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                    margin: '20px auto',
                    maxWidth: '800px',
                }}
            >
                <Button
                    onClick={() => handleNavigation('rentPage')}
                    sx={{
                        backgroundColor: activeTab === 'rentPage' ? '#1dbf73' : '#343a40',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#1dbf73',
                        },
                    }}
                >
                    Rent Page
                </Button>
                <Button
                    onClick={() => handleNavigation('currentlyRent')}
                    sx={{
                        backgroundColor: activeTab === 'currentlyRent' ? '#1dbf73' : '#343a40',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#1dbf73',
                        },
                    }}
                >
                    Currently Rented
                </Button>
                <Button
                    onClick={() => handleNavigation('history')}
                    sx={{
                        backgroundColor: activeTab === 'history' ? '#1dbf73' : '#343a40',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#1dbf73',
                        },
                    }}
                >
                    History
                </Button>
                <Button
                    onClick={() => handleNavigation('profile')}
                    sx={{
                        backgroundColor: activeTab === 'profile' ? '#1dbf73' : '#343a40',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#1dbf73',
                        },
                    }}
                >
                    Profile
                </Button>
            </Box>

            {/* Render the active page */}
            <Box
                sx={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    padding: '20px',
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
                    borderRadius: '12px',
                    background: 'linear-gradient(145deg, #2b2b2b, #1e1e1e)',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};
