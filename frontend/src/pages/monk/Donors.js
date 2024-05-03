import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const initialEditFormState = {
  id: '',
  name: '',
  number: '',
  address: '',
  donationDate: '',
  donationTime: '',
  nic: '',
};

const donors = [
  { id: 1, name: 'John Doe', number: '1234567890', address: '123 Main St', donationDate: '2023-01-01', donationTime: 'Morning Meal', nic: 'ABC123456' },
  { id: 2, name: 'Jane Smith', number: '0987654321', address: '456 Elm St', donationDate: '2023-01-02', donationTime: 'Evening Meal', nic: 'XYZ987654' },
];

export default function Donors() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(initialEditFormState);

  const handleEdit = (id) => {
    const donorToEdit = donors.find((donor) => donor.id === id);
    if (donorToEdit) {
      setEditFormData({ ...donorToEdit });
      setEditFormOpen(true);
    }
  };

  const handleCloseEditForm = () => {
    setEditFormOpen(false);
    setEditFormData(initialEditFormState);
  };

  const handleSaveEditForm = () => {
     console.log('Edited donor data:', editFormData);
    handleCloseEditForm();
  };

  const handleDelete = (id) => {
     console.log(`Deleted donor with id: ${id}`);
  };
  return (
    <Container sx={{
      mt: 4,
      ml: isLargeScreen ? '' : 0,
      width: isLargeScreen ? `calc(100% - 260px)` : '100%',
    }}>
      <TableContainer component={Paper}>
        <Table aria-label="donors table">
          <TableHead>
            <TableRow>
              <TableCell>Donor Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Donation Date</TableCell>
              <TableCell>Donation Time</TableCell>
              <TableCell>NIC</TableCell>
              <TableCell>Actions</TableCell>  
            </TableRow>
          </TableHead>
          <TableBody>
            {donors.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell>{donor.name}</TableCell>
                <TableCell>{donor.number}</TableCell>
                <TableCell>{donor.address}</TableCell>
                <TableCell>{donor.donationDate}</TableCell>
                <TableCell>{donor.donationTime}</TableCell>
                <TableCell>{donor.nic}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(donor.id)} aria-label="edit">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(donor.id)} aria-label="delete">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editFormOpen} onClose={handleCloseEditForm}>
        <DialogTitle>Edit Donor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={editFormData.name}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            id="number"
            label="Number"
            fullWidth
            value={editFormData.number}
            onChange={(e) => setEditFormData({ ...editFormData, number: e.target.value })}
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            fullWidth
            value={editFormData.address}
            onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
          />
          <TextField
            margin="dense"
            id="donationDate"
            label="Donation Date"
            type="date"
            fullWidth
            value={editFormData.donationDate}
            onChange={(e) => setEditFormData({ ...editFormData, donationDate: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="donationTime"
            label="Donation Time"
            select
            fullWidth
            value={editFormData.donationTime}
            onChange={(e) => setEditFormData({ ...editFormData, donationTime: e.target.value })}
          >
            <MenuItem value="Morning Meal">Morning Meal</MenuItem>
            <MenuItem value="Evening Meal">Evening Meal</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="nic"
            label="NIC"
            fullWidth
            value={editFormData.nic}
            onChange={(e) => setEditFormData({ ...editFormData, nic: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditForm}>Cancel</Button>
          <Button onClick={handleSaveEditForm} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
