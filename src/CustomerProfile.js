import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export const CustomerProfile = ({ profile, onSignOut }) => {
    return (
        <Box
            sx={{
                padding: '20px',
                maxWidth: '500px',
                margin: '0 auto',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
                borderRadius: '12px',
                background: 'linear-gradient(145deg, #2b2b2b, #1e1e1e)',
                color: '#f0f0f0',
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" sx={{ color: '#1dbf73', marginBottom: '20px' }}>
                Customer Profile
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                <strong>Name:</strong> {profile.name || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                <strong>Email:</strong> {profile.email || 'customer@example.com'}
            </Typography>
            {/* <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                <strong>Role:</strong> {profile.role || 'Customer'}
            </Typography> */}

            <Button
                variant="contained"
                onClick={onSignOut}
                sx={{
                    background: 'linear-gradient(45deg, #d9534f, #c9302c)', // red gradient
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '12px',
                    borderRadius: '8px',
                    width: '100px',
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        background: 'linear-gradient(45deg, #c9302c, #d9534f)', // reversed gradient on hover
                    },
                }}
            >
                Sign Out
            </Button>
        </Box>
    );
};
