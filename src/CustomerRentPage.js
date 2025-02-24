import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import RentModal from "./RentModal";

export const CustomerRentPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rentStep, setRentStep] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/game");
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json();
        setGames(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.game_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Called when user clicks "Rent" on a game card
  const handleRentClick = (game) => {
    setSelectedGame(game);
    setRentStep(1); // start at step 1 in the modal
  };

  // Move forward in the steps
  const handleNextStep = () => {
    if (rentStep === 1 && !returnDate) {
      alert("Please select a return date before proceeding.");
      return;
    }
    // If we just finished step 1, calculate cost
    if (rentStep === 1) {
      const days = dayjs(returnDate).diff(dayjs(), "day");
      setTotalCost(selectedGame.price * days);
    }
    setRentStep((prev) => prev + 1);
  };

  // Move backward in the steps
  const handleBackStep = () => {
    setRentStep((prev) => prev - 1);
  };

  // Cancel/close the modal
  const handleCancel = () => {
    setRentStep(null);
    setSelectedGame(null);
    setReturnDate(null);
    setPaymentMethod("");
    setTotalCost(0);
    setUploadedFile(null);
  };

  // Helper to convert rating code to display text
  const getRatingDisplay = (rating) => {
    switch (rating) {
      case "E":
        return "All Ages";
      case "T":
        return "13+";
      case "M":
        return "18+";
      default:
        return rating;
    }
  };

  // ---- LOADING STATE ----
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#1a1a1a",
        }}
      >
        <CircularProgress sx={{ color: "#1dbf73" }} />
      </Box>
    );
  }

  // ---- ERROR STATE ----
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
        }}
      >
        <Typography variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  // ---- MAIN RENDER ----
  return (
    <Box sx={{ padding: "20px", color: "#f0f0f0", height: "100vh", overflowY: "auto" }}>
      {/* Page Header */}
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#1dbf73", textAlign: "center" }}>
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <TextField
          label="Search Games"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: "600px",
            backgroundColor: "#2c2c2c",
            borderRadius: "8px",
            input: { color: "#f0f0f0" },
            label: { color: "#9e9e9e" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1dbf73" },
              "&:hover fieldset": { borderColor: "#1dbf73" },
            },
          }}
        />
      </Box>

      {/* Games List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {filteredGames.map((game) => (
          <Card
            key={game.game_id}
            sx={{
              background: "#2c2c2c",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.5)",
              borderRadius: "15px",
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={game.image_link}
              alt={game.game_name}
            />
            <CardContent>
              <Typography variant="h6" sx={{ color: "#ffffff", marginBottom: "10px" }}>
                {game.game_name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "5px" }}>
                <strong>Release Date:</strong> {new Date(game.release_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "5px" }}>
                <strong>Minimum Age:</strong> {getRatingDisplay(game.rating)}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "5px" }}>
                <strong>Genre:</strong> {game.genre}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "5px" }}>
                <strong>Platform:</strong> {game.platform}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "10px" }}>
                <strong>Price:</strong> {game.price} Baht / day
              </Typography>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(45deg, #1dbf73, #17a2b8)",
                    color: "white",
                    fontWeight: "bold",
                    padding: "12px",
                    borderRadius: "8px",
                    width: "100px",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      background: "linear-gradient(45deg, #17a2b8, #1dbf73)",
                    },
                  }}
                  onClick={() => handleRentClick(game)}
                >
                  Rent
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Rent Modal */}
      <RentModal
        rentStep={rentStep}
        selectedGame={selectedGame}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        totalCost={totalCost}
        setTotalCost={setTotalCost}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        handleCancel={handleCancel}
        handleNextStep={handleNextStep}
        handleBackStep={handleBackStep}
      />
    </Box>
  );
};
