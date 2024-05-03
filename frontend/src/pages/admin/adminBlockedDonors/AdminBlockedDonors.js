import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, TextField, Button, DialogContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const initialBlockedDonors = [
  {
    id: 'D1',
    name: 'Jane Doe',
    number: '987654321',
    templeName: 'Silver Temple',
    nicNo: '987-6543-210',
  },
 ];

function AdminBlockedDonors() {
  const [blockedDonors, setBlockedDonors] = useState(initialBlockedDonors);
  const [searchQuery, setSearchQuery] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const filteredBlockedDonors = useMemo(() => blockedDonors.filter(donor => donor.name.toLowerCase().includes(searchQuery.toLowerCase())), [blockedDonors, searchQuery]);

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

  const handleApproveDonor = (donorId) => {
     console.log('Approving', donorId);
  };

  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Search for blocked donors..."
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
            {filteredBlockedDonors.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell>{donor.name}</TableCell>
                <TableCell>{donor.number}</TableCell>
                <TableCell>{donor.templeName}</TableCell>
                <TableCell>{donor.nicNo}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditDonor(donor)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleApproveDonor(donor.id)}>
                    <CheckIcon color="success" />
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

export default AdminBlockedDonors;
