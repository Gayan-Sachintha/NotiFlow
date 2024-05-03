import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import { message } from 'antd';

export default function SpecialReservation() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [templeId, setTempleId] = useState(null);

  useEffect(() => {
    const monkEmail = localStorage.getItem('loginUsername');
    axios.get(`http://localhost:3002/temple/getMonkTemple/${monkEmail}/1`)
      .then(response => {
        const templeID = response.data[0].TempleID;
        setTempleId(templeID);
        fetchDonors(templeID);
      })
      .catch(error => {
        console.error('Error fetching temple details:', error);
      });
  }, []);

  const fetchDonors = (templeID) => {
    setLoading(true);
    axios.get(`http://localhost:3002/monk/getSpecialRes/${templeID}`)
      .then(response => {
        setDonors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching donors:', error);
        setLoading(false);
      });
  };

  const sendSMS = async (phoneNumber, message) => {
    const apiUrl = 'https://app.notify.lk/api/v1/send';
    const apiKey = 'rUGNbLQfBn3JzbkNvuzX';
    const senderId = 'NotifyDEMO';

    try {
        const response = await axios.post(apiUrl, {
            user_id: '27043', 
            api_key: apiKey,
            sender_id: senderId,
            to: phoneNumber,
            message: message
        });

        console.log(response)

        if (response.data.status === 'success') {
            console.log('SMS sent successfully!');
        } else {
            console.log('Failed to send SMS:', response.data.message);
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
}

  const handleApprove = (donorID, mealType, mealDate, donorNumber) => {
    axios.post('http://localhost:3002/monk/approveSpecialRes', {
      donorID,
      mealType,
      mealDate,
      donorNumber,
    })
    .then(response => {
      message.success("Special Meal Approved !");
      sendSMS(donorNumber, "Thank you for registering with TEMPLE NAME. You will receive an approval message via text. Please wait until your monk approves your registration.\nPowered by Notiflow.")

      setDonors(prevDonors => prevDonors.filter(donor => donor.DonorID !== donorID));
    })
    .catch(error => {
      message.error("Failed to approve donor!");
      console.error('Error updating donor status:', error);
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
              <TableRow key={donor.DonorID}>
                <TableCell sx={{ color: '#884A39' }}>{donor.FirstName} {donor.LastName}</TableCell>
                <TableCell sx={{ color: '#884A39' }}>{donor.PhoneNumber}</TableCell>
                <TableCell sx={{ color: '#884A39' }}>{donor.DonorAddress}</TableCell>
                <TableCell sx={{ color: '#884A39' }}>{donor.NationalIdentityNumber}</TableCell>
                <TableCell>
                    <IconButton onClick={() => handleApprove(donor.DonorID, donor.mealType, donor.date, donor.PhoneNumber)} aria-label="approve">
                        <CheckCircle />
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
