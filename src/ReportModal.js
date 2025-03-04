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
  Button,
} from '@mui/material';

const ReportModal = ({
  open,
  selectedGame,
  problemType,
  description,
  file,
  onProblemTypeChange,
  onDescriptionChange,
  onFileChange,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Report Your Problem</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          Game: {selectedGame?.name || selectedGame?.game_name || 'N/A'}
        </Typography>
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
        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
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
            onChange={(e) => onFileChange(e.target.files[0])}
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
