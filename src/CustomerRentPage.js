import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const CustomerRentPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rentStep, setRentStep] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [games, setGames] = useState([
    {
        id: 1,
        name: 'God of War',
        age: '18+',
        genre: 'Adventure',
        platform: 'PS5/Xbox',
        price: '35',
        image: 'https://example.com/god-of-war.jpg',
    },
    {
        id: 2,
        name: 'Spider-Man',
        age: '13+',
        genre: 'Adventure',
        platform: 'PS5/Xbox',
        price: '20',
        image: 'https://example.com/spider-man.jpg',
    },
    {
        id: 3,
        name: 'FIFA 23',
        age: 'All Ages',
        genre: 'Sports',
        platform: 'PS5/Xbox',
        price: '25',
        image: 'https://example.com/fifa-23.jpg',
    },
    {
        id: 4,
        name: 'The Last of Us Part II',
        age: '18+',
        genre: 'Action',
        platform: 'PS4/PS5',
        price: '30',
        image: 'https://example.com/last-of-us-2.jpg',
    },
    {
        id: 5,
        name: 'Red Dead Redemption 2',
        age: '18+',
        genre: 'Adventure',
        platform: 'PS4/Xbox/PC',
        price: '40',
        image: 'https://example.com/red-dead-redemption-2.jpg',
    },
    {
        id: 6,
        name: 'Minecraft',
        age: 'All Ages',
        genre: 'Sandbox',
        platform: 'All Platforms',
        price: '15',
        image: 'https://example.com/minecraft.jpg',
    },
    {
        id: 7,
        name: 'Call of Duty: Modern Warfare',
        age: '18+',
        genre: 'Shooter',
        platform: 'PS5/Xbox/PC',
        price: '35',
        image: 'https://example.com/cod-modern-warfare.jpg',
    },
    {
        id: 8,
        name: 'Horizon Forbidden West',
        age: '16+',
        genre: 'RPG',
        platform: 'PS4/PS5',
        price: '50',
        image: 'https://example.com/horizon-forbidden-west.jpg',
    },
    {
        id: 9,
        name: 'Mario Kart 8 Deluxe',
        age: 'All Ages',
        genre: 'Racing',
        platform: 'Nintendo Switch',
        price: '20',
        image: 'https://example.com/mario-kart-8.jpg',
    },
    {
        id: 10,
        name: 'Assassin’s Creed Valhalla',
        age: '17+',
        genre: 'Action RPG',
        platform: 'PS5/Xbox/PC',
        price: '45',
        image: 'https://example.com/assassins-creed-valhalla.jpg',
    },
    {
        id: 11,
        name: 'Fortnite',
        age: '12+',
        genre: 'Battle Royale',
        platform: 'All Platforms',
        price: '20',
        image: 'https://example.com/fortnite.jpg',
    },
    {
        id: 12,
        name: 'Cyberpunk 2077',
        age: '18+',
        genre: 'RPG',
        platform: 'PS5/Xbox/PC',
        price: '50',
        image: 'https://example.com/cyberpunk-2077.jpg',
    },
    {
        id: 13,
        name: 'Animal Crossing: New Horizons',
        age: 'All Ages',
        genre: 'Simulation',
        platform: 'Nintendo Switch',
        price: '25',
        image: 'https://example.com/animal-crossing.jpg',
    },
]);


const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRentClick = (game) => {
    setSelectedGame(game);
    setRentStep(1);
  };

  const handleNextStep = () => {
    if (rentStep === 1 && !returnDate) {
      alert("Please select a return date before proceeding.");
      return;
    }
    if (rentStep === 1) {
      const days = dayjs(returnDate).diff(dayjs(), "day");
      setTotalCost(selectedGame.price * days);
    }
    setRentStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setRentStep((prev) => prev - 1);
  };

  const handleCancel = () => {
    setRentStep(null);
    setSelectedGame(null);
    setReturnDate(null);
    setPaymentMethod("");
    setTotalCost(0);
    setUploadedFile(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file.name);
  };

  return (
    <Box sx={{ padding: "20px", color: "#f0f0f0", height: "100vh", overflowY: "auto" }}>
      {/* Page Header */}
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#1dbf73", textAlign: "center" }}>
        Rent Games
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
            key={game.id}
            sx={{ background: "#2c2c2c", boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.5)", borderRadius: "15px" }}
          >
            <CardMedia component="img" height="180" image={game.image} alt={game.name} />
            <CardContent>
              <Typography variant="h6" sx={{ color: "#ffffff", marginBottom: "10px" }}>
                {game.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "5px" }}>
                <strong>Release Date:</strong> {game.releaseDate}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "5px" }}>
                <strong>Minimum Age:</strong> {game.age}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "5px" }}>
                <strong>Genre:</strong> {game.genre}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "5px" }}>
                <strong>Platform:</strong> {game.platform}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "10px" }}>
                <strong>Price:</strong> {game.price} BHD / day
              </Typography>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                      background: 'linear-gradient(45deg, #1dbf73, #17a2b8)',
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '12px',
                      borderRadius: '8px',
                      width: '100px', // Apply width here
                      transition: 'transform 0.2s',
                      '&:hover': {
                          transform: 'scale(1.05)',
                          background: 'linear-gradient(45deg, #17a2b8, #1dbf73)',
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
      <Modal open={rentStep !== null} onClose={handleCancel}>
        <Box
          sx={{
            width: "400px",
            margin: "100px auto",
            backgroundColor: "#2c2c2c",
            color: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {/* Step 1: Confirm Rental Details */}
          {rentStep === 1 && selectedGame && (
            <>
              <Typography variant="h6">Confirm Rental Details</Typography>
              <Typography>Name: {selectedGame.name}</Typography>
              <Typography>Release Date: {selectedGame.releaseDate}</Typography>
              <Typography>Minimum Age: {selectedGame.age}</Typography>
              <Typography>Genre: {selectedGame.genre}</Typography>
              <Typography>Platform: {selectedGame.platform}</Typography>
              <Typography>Price: {selectedGame.price} BHD / day</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Enter Return Date"
                  value={returnDate}
                  onChange={(newDate) => setReturnDate(newDate)}
                  minDate={dayjs()} // Prevent selecting past dates
                  sx={{
                    marginTop: "15px",
                    input: { color: "#ffffff" },
                    label: { color: "#9e9e9e" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#1dbf73" },
                      "&:hover fieldset": { borderColor: "#1dbf73" },
                    },
                  }}
                />
              </LocalizationProvider>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button variant="contained" onClick={handleCancel} color="error">
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleNextStep} color="success">
                  Next
                </Button>
              </Box>
            </>
          )}

          {/* Step 2: Select Payment Method */}
          {rentStep === 2 && (
            <>
              <Typography variant="h6">Select Payment Method</Typography>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "#9e9e9e" }}>Payment Method</InputLabel>
                <Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { color: "#ffffff" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#1dbf73" },
                      "&:hover fieldset": { borderColor: "#1dbf73" },
                    },
                  }}
                >
                  <MenuItem value="PromptPay">PromptPay</MenuItem>
                  <MenuItem value="PayPal">PayPal</MenuItem>
                  <MenuItem value="Bank Transfer">Direct Bank Transfer</MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ marginTop: "20px" }}>Total Cost: {totalCost} BHD</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button variant="contained" onClick={handleBackStep} color="info">
                  Back
                </Button>
                <Button variant="contained" onClick={handleNextStep} color="success">
                  Next
                </Button>
              </Box>
            </>
          )}

          {/* Step 3: Payment Information Confirmation */}
          {rentStep === 3 && paymentMethod === "PromptPay" && (
            <>
              <Typography variant="h6">QR Code for PromptPay</Typography>
              <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <img src="https://example.com/qr-code-promptpay.jpg" alt="PromptPay QR Code" width="200" />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button variant="contained" onClick={handleBackStep} color="info">
                  Back
                </Button>
                <Button variant="contained" onClick={handleNextStep} color="success">
                  Next
                </Button>
              </Box>
            </>
          )}

          {rentStep === 3 && paymentMethod === "PayPal" && (
            <>
              <Typography variant="h6">PayPal Account Details</Typography>
              <Typography>Email: paypal@example.com</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button variant="contained" onClick={handleBackStep} color="info">
                  Back
                </Button>
                <Button variant="contained" onClick={handleNextStep} color="success">
                  Next
                </Button>
              </Box>
            </>
          )}

          {rentStep === 3 && paymentMethod === "Bank Transfer" && (
            <>
              <Typography variant="h6">Bank Transfer Details</Typography>
              <Typography>Account Name: ABC Bank</Typography>
              <Typography>Account Number: 123456789</Typography>
              <Typography>Branch: City Center</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button variant="contained" onClick={handleBackStep} color="info">
                  Back
                </Button>
                <Button variant="contained" onClick={handleNextStep} color="success">
                  Next
                </Button>
              </Box>
            </>
          )}

          {/* Step 4: Upload Proof of Payment */}
          {rentStep === 4 && (
            <>
              <Typography variant="h6">Upload Proof of Payment</Typography>
              <Box
                sx={{
                  marginTop: "20px",
                  padding: "20px",
                  border: "2px dashed #1dbf73",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="upload-file" />
                <label htmlFor="upload-file" style={{ cursor: "pointer", color: "#1dbf73" }}>
                  Drag & Drop or Browse
                </label>
                {uploadedFile && <Typography sx={{ marginTop: "10px" }}>{uploadedFile}</Typography>}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button variant="contained" onClick={handleBackStep} color="info">
                  Back
                </Button>
                <Button variant="contained" onClick={handleCancel} color="success">
                  Submit
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};