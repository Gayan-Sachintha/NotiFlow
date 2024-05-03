import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, TextField, Link, Button, DialogContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialDonors = [
  {
    id: 'D1',
    name: 'John Doe',
    number: '123456789',
    templeName: 'Golden Temple',
    nicNo: '123-4567-890',
  },
 ];

function AdminDonors() {
  const [donors, setDonors] = useState(initialDonors);
  const [searchQuery, setSearchQuery] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const filteredDonors = useMemo(() => donors.filter(donor => donor.name.toLowerCase().includes(searchQuery.toLowerCase())), [donors, searchQuery]);

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedDonor(null);
  };

  const handleEditDonor = (donor) => {
    setSelectedDonor(donor);
    setOpenEditDialog(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Search for donors..."
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <SearchIcon />
          ),
        }}
        sx={{ maxWidth: '500px', margin: '20px auto' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Donor Name</TableCell>
              <TableCell>Donor Number</TableCell>
              <TableCell>Temple Name</TableCell>
              <TableCell>NIC No</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDonors.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell>{donor.name}</TableCell>
                <TableCell>{donor.number}</TableCell>
                <TableCell>{donor.templeName}</TableCell>
                <TableCell>{donor.nicNo}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditDonor(donor)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => console.log('Deleting', donor.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Donor Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogContent>
          {/* Form to edit donor details */}
          <TextField
            label="Donor Name"
            defaultValue={selectedDonor ? selectedDonor.name : ''}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Donor Number"
            defaultValue={selectedDonor ? selectedDonor.number : ''}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Temple Name"
            defaultValue={selectedDonor ? selectedDonor.templeName : ''}
            fullWidth
            margin="normal"
          />
          <TextField
            label="NIC No"
            defaultValue={selectedDonor ? selectedDonor.nicNo : ''}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleCloseEditDialog}>Save Changes</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminDonors;
