// ReportModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  Typography,
  Button
} from '@mui/material';

/**
 * Props:
 * - open (boolean): Whether the dialog is open
 * - onClose (function): Closes the modal
 * - selectedGame (object): The game or rental object (should have rental_id, etc.)
 * - problemType (string): Current selected problem type
 * - onProblemTypeChange (function): Called when problem type changes
 * - description (string): The detailed description
 * - onDescriptionChange (function): Called when description changes
 * - file (File or null): The currently selected file
 * - onFileChange (function): Called when a new file is selected
 * - onSubmit (function): Called when user clicks "Submit"
 */
const ReportModal = ({
  open,
  onClose,
  selectedGame,
  problemType,
  onProblemTypeChange,
  description,
  onDescriptionChange,
  file,
  onFileChange,
  onSubmit
}) => {

  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Report Your Problem</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          Game: {selectedGame?.game_name || selectedGame?.name || 'N/A'}
        </Typography>

        {/* Problem Type */}
        <TextField
          select
          label="Related Problem"
          fullWidth
          value={problemType}
          onChange={(e) => onProblemTypeChange(e.target.value)}
          sx={{ marginBottom: '15px' }}
        >
          <MenuItem value="Wrong Disc">Wrong Disc</MenuItem>
          <MenuItem value="Damaged Disc">Damaged Disc</MenuItem>
          <MenuItem value="Game Not Working">Game Not Working</MenuItem>
        </TextField>

        {/* Description */}
        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          sx={{ marginBottom: '15px' }}
        />

        {/* File Upload */}
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
            onChange={handleFileSelect}
          />
          <label htmlFor="upload-file" style={{ cursor: 'pointer', color: '#1dbf73' }}>
            Drag &amp; Drop or Browse
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
          onClick={onClose}
          sx={{
            color: '#fff',
            background: '#d9534f',
            '&:hover': { background: '#c9302c' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
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
  );
};

export default ReportModal;
