import React, { useState } from 'react';
import { Box, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export const CustomerHistory = () => {
    // Sample rental history data
    const [history, setHistory] = useState([
        {
            id: '33212',
            name: 'Wolong: Fallen Dynasty',
            rentDate: '2024-11-11',
            returnDate: '2024-11-14',
        },
        {
            id: '23244',
            name: 'Far Cry 6',
            rentDate: '2024-06-11',
            returnDate: '2024-06-09',
        },
        {
            id: '19888',
            name: 'WuKong: Black Myth',
            rentDate: '2024-09-07',
            returnDate: '2024-10-08',
        },
        {
            id: '14444',
            name: 'Elden Ring',
            rentDate: '2023-06-08',
            returnDate: '2024-07-08',
        },
        {
            id: '12345',
            name: 'Cyberpunk 2077',
            rentDate: '2023-05-15',
            returnDate: '2023-06-01',
        },
        {
            id: '67890',
            name: 'Assassin’s Creed Valhalla',
            rentDate: '2023-04-20',
            returnDate: '2023-05-05',
        },
        {
            id: '54321',
            name: 'The Last of Us Part II',
            rentDate: '2023-03-30',
            returnDate: '2023-04-15',
        },
        {
            id: '98765',
            name: 'Red Dead Redemption 2',
            rentDate: '2023-03-01',
            returnDate: '2023-03-20',
        },
        {
            id: '11223',
            name: 'Horizon Forbidden West',
            rentDate: '2023-02-15',
            returnDate: '2023-03-05',
        },
        {
            id: '44556',
            name: 'Call of Duty: Modern Warfare',
            rentDate: '2023-01-25',
            returnDate: '2023-02-10',
        },
        {
            id: '78901',
            name: 'Minecraft',
            rentDate: '2023-01-10',
            returnDate: '2023-01-20',
        },
        {
            id: '22334',
            name: 'Mario Kart 8 Deluxe',
            rentDate: '2022-12-25',
            returnDate: '2023-01-10',
        },
        {
            id: '33445',
            name: 'FIFA 23',
            rentDate: '2022-12-01',
            returnDate: '2022-12-15',
        },
        {
            id: '55667',
            name: 'Animal Crossing: New Horizons',
            rentDate: '2022-11-15',
            returnDate: '2022-12-01',
        },
        {
            id: '66778',
            name: 'Spider-Man',
            rentDate: '2022-10-01',
            returnDate: '2022-10-20',
        },
        {
            id: '77889',
            name: 'God of War',
            rentDate: '2022-09-10',
            returnDate: '2022-09-25',
        },
        {
            id: '88990',
            name: 'Fortnite',
            rentDate: '2022-08-01',
            returnDate: '2022-08-10',
        },
        {
            id: '99001',
            name: 'Far Cry 5',
            rentDate: '2022-07-15',
            returnDate: '2022-07-30',
        },
    ]);
    

    const [searchTerm, setSearchTerm] = useState('');

    // Filtered data based on search
    const filteredHistory = history.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.rentDate.includes(searchTerm) ||
            item.returnDate.includes(searchTerm) ||
            item.id.includes(searchTerm)
    );

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
                            '& fieldset': {
                                borderColor: '#1dbf73',
                            },
                            '&:hover fieldset': {
                                borderColor: '#1dbf73',
                            },
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
                            <TableCell sx={{ color: '#1dbf73', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: '#1dbf73', fontWeight: 'bold' }}>Rent Date</TableCell>
                            <TableCell sx={{ color: '#1dbf73', fontWeight: 'bold' }}>Return Date</TableCell>
                            <TableCell sx={{ color: '#1dbf73', fontWeight: 'bold' }}>Rental ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredHistory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell sx={{ color: '#f0f0f0' }}>{item.name}</TableCell>
                                <TableCell sx={{ color: '#f0f0f0' }}>{item.rentDate}</TableCell>
                                <TableCell sx={{ color: '#f0f0f0' }}>{item.returnDate}</TableCell>
                                <TableCell sx={{ color: '#f0f0f0' }}>{item.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
