import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export const CustomerProfile = ({ profile, onSignOut }) => {
  // Use the provided profile prop or fall back to localStorage
  // Note: Make sure the key names match those returned by your backend.
  const effectiveProfile =
  JSON.parse(localStorage.getItem('customer'));

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
        <strong>Name:</strong> {effectiveProfile.customer_name || 'N/A'}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '10px' }}>
        <strong>Email:</strong> {effectiveProfile.email || 'customer@example.com'}
      </Typography>
      <Button
        variant="contained"
        onClick={onSignOut}
        sx={{
          background: 'linear-gradient(45deg, #d9534f, #c9302c)',
          color: '#fff',
          fontWeight: 'bold',
          padding: '12px',
          borderRadius: '8px',
          width: '100px',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
            background: 'linear-gradient(45deg, #c9302c, #d9534f)',
          },
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default CustomerProfile;
