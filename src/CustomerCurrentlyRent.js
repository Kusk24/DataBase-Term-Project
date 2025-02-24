import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import ReportModal from './ReportModal';

export const CustomerCurrentlyRent = () => {
  // State for currently renting games (fetched from API)
  const [rentedGames, setRentedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve the logged-in customer data from localStorage
  const storedCustomer = JSON.parse(localStorage.getItem('customer'));
  const customerId = storedCustomer?.customer_id;

  // States for the ReportModal dialog
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [problemType, setProblemType] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  // Fetch currently renting games from the API endpoint
  useEffect(() => {
    const fetchRentedGames = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/rental/renting/${customerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch currently renting games');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setRentedGames(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRentedGames();
  }, [customerId]);

  // Open the "Report Problem" dialog
  const handleReportProblem = (game) => {
    setSelectedGame(game);
    setOpen(true);
  };

  // Close the dialog and reset its state
  const handleClose = () => {
    setOpen(false);
    setProblemType('');
    setDescription('');
    setFile(null);
  };

  // Handle submission of the report problem dialog
  const handleSubmit = () => {
    alert(
      `Problem reported for ${selectedGame?.name || selectedGame?.game_name}. Problem Type: ${problemType}. Description: ${description}`
    );
    handleClose();
  };

  // Dummy function for due date alert
  const handleDueDate = (gameName) => {
    alert(`The due date for ${gameName} is 15 days from the rent date.`);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px', color: '#f0f0f0' }}>
        <Typography variant="h6">Loading...</Typography>
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
    <Box sx={{ padding: '20px', color: '#f0f0f0', minHeight: '100vh', overflowY: 'auto' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#1dbf73', textAlign: 'center' }}>
        Currently Rented Games
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {rentedGames.length > 0 ? (
          rentedGames.map((game) => (
            <Card
              key={game.rental_id}
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
                image={game.image_link || 'https://via.placeholder.com/140'}
                alt={game.game_name || game.name}
                sx={{ objectFit: 'cover' }}
              />
              {/* Game Details */}
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffffff', marginBottom: '10px' }}>
                  {game.game_name || game.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', marginBottom: '5px' }}>
                  <strong>Rent Date:</strong> {new Date(game.rent_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', marginBottom: '5px' }}>
                  <strong>Due Date:</strong> {new Date(game.due_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', marginBottom: '10px' }}>
                  <strong>Rental ID:</strong> {game.rental_id}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', marginBottom: '10px' }}>
                  <strong>Status:</strong> {game.status}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
                  <Button
                    variant="contained"
                    onClick={() => handleDueDate(game.game_name || game.name)}
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
                    Due Date
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleReportProblem(game)}
                    sx={{
                      background: 'linear-gradient(45deg, #f0ad4e, #ec971f)',
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '12px',
                      borderRadius: '8px',
                      width: '180px',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        background: 'linear-gradient(45deg, #ec971f, #f0ad4e)',
                      },
                    }}
                  >
                    Report Problem
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            No currently rented games found.
          </Typography>
        )}
      </Box>

      {/* Report Modal */}
      <ReportModal
        open={open}
        selectedGame={selectedGame}
        problemType={problemType}
        description={description}
        file={file}
        onProblemTypeChange={setProblemType}
        onDescriptionChange={setDescription}
        onFileChange={setFile}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default CustomerCurrentlyRent;
