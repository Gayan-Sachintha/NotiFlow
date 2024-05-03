import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import './MDonors.css';
import axios from 'axios';
import { message } from 'antd';

export default function Donors() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    number: '',
    address: '',
    donationDate: '',
    donationTime: '',
    nic: '',
  });

  useEffect(() => {
    const monkEmail = localStorage.getItem('loginUsername');
    if (monkEmail) {
      axios.get(`http://localhost:3002/temple/getMonkTemple/${monkEmail}/1`)
        .then(response => {
          const templeID = response.data[0].TempleID;
          fetchDonors(templeID);
        })
        .catch(error => {
          console.error('Error fetching temple details:', error);
          setLoading(false);
        });
    }
  }, []);

  const fetchDonors = (templeID) => {
    axios.get(`http://localhost:3002/monk/getDonorsByTemple/${templeID}`)
      .then(response => {
        setDonors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching donors:', error);
        setLoading(false);
      });
  };

  const handleEdit = (id) => {
    const donorToEdit = donors.find((donor) => donor.id === id);
    if (donorToEdit) {
      setEditFormData({ ...donorToEdit });
      setEditFormOpen(true);
    }
  };

  const handleDelete = (id) => {
    axios.post('http://localhost:3002/monk/changeDonorStatus', {
      donorID: id,
      isApproved: 2
    })
    .then(response => {
      console.log(response.data.message);
      message.success("Donor Deleted !")
      setDonors(currentDonors => currentDonors.filter(donor => donor.DonorID !== id));
    })
    .catch(error => {
      message.success("Donor Deleting Failed !")
      console.error('Error updating donor status:', error);
      alert('Failed to update donor status.');
    });
  };

  return (
    <Container sx={{
      mt: 4,
      ml: isLargeScreen ? '' : 0,
      width: isLargeScreen ? `calc(100% - 260px)` : '100%',
    }}>
      <TableContainer component={Paper}>
        <Table aria-label="donors table">
          <TableHead className='donorstablehead'>
            <TableRow>
              <TableCell sx={{ color: '#F9E0BB' }}>Donor Name</TableCell>
              <TableCell sx={{ color: '#F9E0BB' }}>Number</TableCell>
              <TableCell sx={{ color: '#F9E0BB' }}>Address</TableCell>
              <TableCell sx={{ color: '#F9E0BB' }}>NIC</TableCell>
              <TableCell sx={{ color: '#F9E0BB' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donors.map((donor) => (
              <TableRow key={donor.id} className='donorDatarow'>
                <TableCell sx={{ color: '#884A39' }}>{donor.FirstName} {donor.LastName}</TableCell>
                <TableCell sx={{ color: '#884A39' }}>{donor.PhoneNumber}</TableCell>
                <TableCell sx={{ color: '#884A39' }}>{donor.DonorAddress}</TableCell>
                <TableCell sx={{ color: '#884A39' }}>{donor.NationalIdentityNumber}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(donor.id)} aria-label="edit">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(donor.DonorID)} aria-label="delete">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
