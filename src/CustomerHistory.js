import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';

export const CustomerHistory = () => {
  // State for rental history, search, loading, error
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve logged-in customer data from localStorage.
  const storedCustomer = JSON.parse(localStorage.getItem('customer'));
  const customerId = storedCustomer?.customer_id;

  useEffect(() => {
    const fetchReturnedRentals = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/rental/returned/${customerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch returned rentals');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setHistory(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReturnedRentals();
  }, [customerId]);

  // Filter history based on the search term
  const filteredHistory = history.filter((item) => {
    // Include game_name in the combined string so it can be searched as well
    const combined = `
      ${item.game_id}
      ${item.game_name}
      ${item.rent_date}
      ${item.due_date}
      ${item.rental_id}
      ${item.status}
    `.toLowerCase();
    return combined.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress sx={{ color: '#1dbf73' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px', color: '#f0f0f0' }}>
        <Typography variant="h6" sx={{ color: 'red' }}>
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', color: '#f0f0f0' }}>
      {/* Page Header */}
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#1dbf73', textAlign: 'center' }}>
        Rental History
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search Rentals"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            maxWidth: '600px',
            backgroundColor: '#2c2c2c',
            borderRadius: '8px',
            input: { color: '#f0f0f0' },
            label: { color: '#9e9e9e' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#1dbf73' },
              '&:hover fieldset': { borderColor: '#1dbf73' },
            },
          }}
        />
      </Box>

      {/* Rental History Table */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#2c2c2c',
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
          borderRadius: '10px',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#1dbf73', fontWeight: 'bold' }}>Game ID</TableCell>
              <TableCell sx={{ color: '#1dbf73', fontWeight: 'bold' }}>Game Name</TableCell>
              <TableCell sx={{ color: '#1dbf73', fontWeight: 'bold' }}>Rent Date</TableCell>
              <TableCell sx={{ color: '#1dbf73', fontWeight: 'bold' }}>Due Date</TableCell>
              <TableCell sx={{ color: '#1dbf73', fontWeight: 'bold' }}>Rental ID</TableCell>
              <TableCell sx={{ color: '#1dbf73', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHistory.map((item) => (
              <TableRow key={item.rental_id}>
                <TableCell sx={{ color: '#f0f0f0' }}>{item.game_id}</TableCell>
                <TableCell sx={{ color: '#f0f0f0' }}>{item.game_name}</TableCell>
                <TableCell sx={{ color: '#f0f0f0' }}>{item.rent_date}</TableCell>
                <TableCell sx={{ color: '#f0f0f0' }}>{item.due_date}</TableCell>
                <TableCell sx={{ color: '#f0f0f0' }}>{item.rental_id}</TableCell>
                <TableCell sx={{ color: '#f0f0f0' }}>{item.status}</TableCell>
              </TableRow>
            ))}

            {filteredHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', color: '#f0f0f0' }}>
                  No rentals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
