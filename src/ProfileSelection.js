import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export const ProfileSelection = ({ onProfileSelect }) => {
    const profiles = [
        { name: 'Customer', description: 'This is customer role' },
        { name: 'Staff', description: 'This is staff role' },
        { name: 'Admin', description: 'This is admin role' },
    ];

    return (
        <Box
            sx={{
                textAlign: 'center',
                marginTop: '50px',
                padding: '40px',
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
                borderRadius: '15px',
                background: 'linear-gradient(145deg, #2b2b2b, #1e1e1e)', // Same gradient as login
                color: '#f0f0f0',
                maxWidth: '800px',
                margin: 'auto',
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ color: '#1dbf73' }}>
                Select a Role
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                {profiles.map((profile) => (
                    <Box
                        key={profile.name}
                        sx={{
                            width: '200px',
                            padding: '20px',
                            borderRadius: '10px',
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.1)', // Slight transparency for card background
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <Typography variant="h6" sx={{ color: '#1dbf73', fontWeight: 'bold' }}>
                            {profile.name}
                        </Typography>
                        <Typography variant="body2" sx={{ margin: '10px 0', color: '#f0f0f0' }}>
                            {profile.description}
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(45deg, #1dbf73, #17a2b8)', // Same gradient as login button
                                color: 'white',
                                fontWeight: 'bold',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    background: 'linear-gradient(45deg, #17a2b8, #1dbf73)',
                                },
                            }}
                            onClick={() => onProfileSelect(profile)}
                        >
                            Choose
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
