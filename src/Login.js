import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Container } from '@mui/material';

export const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
  
    const url = `http://127.0.0.1:5000/customer/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("Login Response Data:", data); // Debugging output
      
      if (response.ok) {
        if (data.customer_id) {
          // Save customer data to localStorage
          localStorage.setItem('customer', JSON.stringify(data));

          const storedCustomer = JSON.parse(localStorage.getItem('customer'));
            console.log("Stored customer ID:", storedCustomer?.customer_id);

  
          if (onLoginSuccess) {
            onLoginSuccess(data);
          }
          navigate('/customer/rentPage');
        } else {
          setError(data.error || 'Login failed. Invalid response from server.');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
          Login as Customer
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
          onSubmit={handleLogin}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            fullWidth
            type="submit"
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
          >
            Login
          </Button>
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

export default Login;
