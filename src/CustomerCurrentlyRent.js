import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
} from '@mui/material';

export const CustomerCurrentlyRent = () => {
    const [rentedGames, setRentedGames] = useState([
        {
            id: 1,
            name: 'God of War',
            age: '18+',
            genre: 'Adventure',
            releaseDate: '2022-11-09',
            platform: 'PS5/Xbox',
            price: '35 BHD',
            image: 'https://example.com/god-of-war.jpg',
        },
        {
            id: 2,
            name: 'Spider-Man',
            age: '13+',
            genre: 'Adventure',
            releaseDate: '2023-10-20',
            platform: 'PS5/Xbox',
            price: '20 BHD',
            image: 'https://example.com/spider-man.jpg',
        },
    ]);

    const [open, setOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [problemType, setProblemType] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    // Handles "Report Problem" button click
    const handleReportProblem = (game) => {
        setSelectedGame(game);
        setOpen(true);
    };

    // Closes the dialog and resets fields
    const handleClose = () => {
        setOpen(false);
        setProblemType('');
        setDescription('');
        setFile(null);
    };

    // Submits the problem
    const handleSubmit = () => {
        alert(
            `Problem reported for ${selectedGame.name}. Problem Type: ${problemType}. Description: ${description}`
        );
        handleClose();
    };

    // Displays the due date
    const handleDueDate = (gameName) => {
        alert(`The due date for ${gameName} is 15 days from the rent date.`);
    };

    return (
        <Box
            sx={{
                padding: '20px',
                color: '#f0f0f0',
                height: '100vh',
                overflowY: 'auto',
            }}
        >
            {/* Page Header */}
            <Typography
                variant="h4"
                sx={{
                    marginBottom: '20px',
                    color: '#1dbf73',
                    textAlign: 'center',
                }}
            >
                Currently Rented Games
            </Typography>

            {/* List of Rented Games */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                {rentedGames.map((game) => (
                    <Card
                        key={game.id}
                        sx={{
                            background: '#2c2c2c',
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
                            borderRadius: '15px',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Game Image */}
                        <CardMedia
                            component="img"
                            height="140"
                            image={game.image}
                            alt={game.name}
                            sx={{ objectFit: 'cover' }}
                        />

                        {/* Game Details */}
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#ffffff',
                                    marginBottom: '10px',
                                }}
                            >
                                {game.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#ffffff',
                                    marginBottom: '5px',
                                }}
                            >
                                <strong>Minimum Age:</strong> {game.age}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#ffffff',
                                    marginBottom: '5px',
                                }}
                            >
                                <strong>Genre:</strong> {game.genre}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#ffffff',
                                    marginBottom: '5px',
                                }}
                            >
                                <strong>Release Date:</strong> {game.releaseDate}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#ffffff',
                                    marginBottom: '10px',
                                }}
                            >
                                <strong>Platform:</strong> {game.platform}
                            </Typography>

                            {/* Buttons */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '15px',
                                    marginTop: '10px',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => handleDueDate(game.name)}
                                    sx={{
                                        background: '#d9534f',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: '#c9302c',
                                        },
                                    }}
                                >
                                    Due Date
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleReportProblem(game)}
                                    sx={{
                                        background: '#f0ad4e',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: '#ec971f',
                                        },
                                    }}
                                >
                                    Report Problem
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Dialog for Reporting Problem */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Report Your Problem</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                        Game: {selectedGame?.name}
                    </Typography>
                    <TextField
                        select
                        label="Related Problem"
                        fullWidth
                        value={problemType}
                        onChange={(e) => setProblemType(e.target.value)}
                        sx={{ marginBottom: '15px' }}
                    >
                        <MenuItem value="Wrong Disc">Wrong Disc</MenuItem>
                        <MenuItem value="Damaged Disc">Damaged Disc</MenuItem>
                        <MenuItem value="Game Not Working">Game Not Working</MenuItem>
                    </TextField>
                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ marginBottom: '15px' }}
                    />
                    <Box
                        sx={{
                            marginTop: '20px',
                            padding: '20px',
                            border: '2px dashed #1dbf73',
                            borderRadius: '10px',
                            textAlign: 'center',
                        }}
                    >
                        <input
                            type="file"
                            hidden
                            id="upload-file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="upload-file" style={{ cursor: 'pointer', color: '#1dbf73' }}>
                            Drag & Drop or Browse
                        </label>
                        {file && (
                            <Typography variant="body2" sx={{ color: '#1dbf73', marginTop: '10px' }}>
                                File: {file.name}
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: '#fff',
                            background: '#d9534f',
                            '&:hover': { background: '#c9302c' },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        sx={{
                            color: '#fff',
                            background: '#1dbf73',
                            '&:hover': { background: '#17a2b8' },
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
