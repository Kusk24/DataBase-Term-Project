import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const RentModal = ({
  rentStep,
  selectedGame,
  returnDate,
  setReturnDate,
  paymentMethod,
  setPaymentMethod,
  totalCost,
  setTotalCost,
  uploadedFile,
  setUploadedFile,
  handleCancel,
  handleNextStep,
  handleBackStep,
  customerId, // Remove default value here
}) => {
  // If customerId isn't passed in, try reading from localStorage
  const storedCustomer = JSON.parse(localStorage.getItem('customer'));
  const effectiveCustomerId = storedCustomer?.customer_id;
  // Local state to store the new rental ID from the backend
  const [rentalId, setRentalId] = useState(null);

  // Helper to display rating codes
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

  // Called when user selects a file for proof
  const handleFileUpload = (e) => {
    if (e.target.files[0]) {
      // Just store the filename in state
      setUploadedFile(e.target.files[0].name);
    }
  };

  // STEP 1: Create the rental in DB
  const handleCreateRental = async () => {
    if (!returnDate) {
      alert("Please select a return date before proceeding.");
      return;
    }

    try {
      // Format the dates as DD-MM-YYYY
      const rentDate = dayjs().format("DD-MM-YYYY");
      const dueDate = dayjs(returnDate).format("DD-MM-YYYY");
      const days = dayjs(returnDate).diff(dayjs(), "day");
      const cost = selectedGame.price * days;

      // POST to /rental with "Pending"
      const response = await fetch("http://127.0.0.1:5000/rental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game_id: selectedGame.game_id,
          customer_id: effectiveCustomerId,
          status: "Pending", // Must match your DB enum
          rent_date: rentDate,
          due_date: dueDate,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create rental");
      }

      // If backend returns rental_id, store it
      if (data.rental_id) {
        setRentalId(data.rental_id);
      }

      // Update total cost
      setTotalCost(cost);

      // Go to step 2
      handleNextStep();
    } catch (error) {
      alert(error.message);
    }
  };

  // STEP 4: Submit payment proof => create Payment
  const handleSubmitPayment = async () => {
    if (!rentalId) {
      alert("No rentalId found. Did you create the rental first?");
      return;
    }

    try {
      // For now, just send the filename as "proof"
      const response = await fetch("http://127.0.0.1:5000/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rental_id: rentalId,
          proof: uploadedFile || "",
          method: paymentMethod,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment");
      }

      alert("Payment added successfully!");
      // Close modal and reset states
      handleCancel();
    } catch (error) {
      alert(error.message);
    }
  };

  if (rentStep === null) return null;

  return (
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
        {/* STEP 1: Confirm Rental Details */}
        {rentStep === 1 && selectedGame && (
          <>
            <Typography variant="h6">Confirm Rental Details</Typography>
            <Typography>Name: {selectedGame.game_name}</Typography>
            <Typography>
              Release Date: {new Date(selectedGame.release_date).toLocaleDateString()}
            </Typography>
            <Typography>Minimum Age: {getRatingDisplay(selectedGame.rating)}</Typography>
            <Typography>Genre: {selectedGame.genre}</Typography>
            <Typography>Platform: {selectedGame.platform}</Typography>
            <Typography>Price: {selectedGame.price} Baht / day</Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Enter Return Date"
                value={returnDate}
                onChange={(newDate) => setReturnDate(newDate)}
                minDate={dayjs()}
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
              <Button variant="contained" onClick={handleCreateRental} color="success">
                Next
              </Button>
            </Box>
          </>
        )}

        {/* STEP 2: Select Payment Method */}
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

        {/* STEP 3: Payment Information Confirmation */}
        {rentStep === 3 && paymentMethod === "PromptPay" && (
          <>
            <Typography variant="h6">QR Code for PromptPay</Typography>
            <Box sx={{ textAlign: "center", marginTop: "20px" }}>
              <img
                src="https://uc33b31240fb71a3886cc38dd53a.dl.dropboxusercontent.com/cd/0/inline/CksVIJ03n6eX15mg7lapKVXtWzz_JXvjTKxKiNAdFZutLM33EofsJa1egcGL82JMfhbzDP_qhwAkhJu0C-E2wa5nnfhBq6cqBQhZoNgZlZnM1WkifJbSADp5HbkZ5pSaCEg6pY4SjQtCLSp7N8_xreOF/file#"
                alt="PromptPay QR Code"
                width="200"
              />
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

        {/* STEP 4: Upload Proof of Payment */}
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
              <input
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="upload-file"
              />
              <label htmlFor="upload-file" style={{ cursor: "pointer", color: "#1dbf73" }}>
                Drag &amp; Drop or Browse
              </label>
              {uploadedFile && (
                <Typography sx={{ marginTop: "10px" }}>{uploadedFile}</Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button variant="contained" onClick={handleBackStep} color="info">
                Back
              </Button>
              <Button variant="contained" onClick={handleSubmitPayment} color="success">
                Submit
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default RentModal;
