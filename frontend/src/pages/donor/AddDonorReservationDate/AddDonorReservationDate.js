import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isSameMonth } from 'date-fns';
import './AddDonorReservationDate.css';
import axios from 'axios';

export default function AddDonorReservationDate() {
  const [mealTime, setMealTime] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [mealOptions, setMealOptions] = useState([
    { value: 'morning', label: 'Morning Meal' },
    { value: 'evening', label: 'Evening Meal' },
   ]);
  const [donorId, setDonorId] = useState(null);

  var userMail = localStorage.getItem('loginUsername')
  axios.get(`http://localhost:3002/user/getUser/${userMail}`)
    .then(response => {
      setDonorId(response.data[0].DonorID);
    })
    .catch(error => {
      console.error('Error fetching temple details:', error);
    });

  useEffect(() => {
    document.body.classList.add('bodyWithBackground');
    return () => {
      document.body.classList.remove('bodyWithBackground');
    };
  }, []);

  const handleMealTimeChange = (event) => {
    setMealTime(event.target.value);
  };

  const handleDateChange = (event) => {
    setReservationDate(event.target.value);
  };

  const submitData = async () => {
    const formData = {
      reservationDate,
      mealTime
    };
    try {
      await axios.post(`http://localhost:3002/monk/updateMealDonor`, {
        date: format(reservationDate, 'yyyy-MM-dd'),
        mealType: mealTime,
        donorId: donorId
      });
      alert('Donor updated successfully');
    } catch (error) {
      console.error('Error updating meal donor:', error);
      alert('No meal found to update');
    }
    console.log(formData);
  }

  return (
    <Container maxWidth="sm" sx={{
      mt: 15,
      p: 6,
      borderRadius: 2,
      boxShadow: 3,
      backgroundColor: '#12372A',
      opacity: '90%',
      backdropFilter: 'blur(15px)',
      animation: 'fadeIn 0.5s ease-in-out',
    }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#FBFADA', mb: 2, textAlign: 'center' }}>
        Enter Your Reservation Date
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="customDonationDate"
              type="date"
              fullWidth
              variant="outlined"
              value={reservationDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: {
                  backgroundColor: '#FBFADA',
                },
              }}
              className="customAddReserveDate"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="customMealTimeClass">
              <InputLabel id="custom-meal-time-label" style={{ backgroundColor: '#FBFADA' }}>Meal Time</InputLabel>
              <Select
                labelId="custom-meal-time-label"
                id="customMealTime"
                value={mealTime}
                onChange={handleMealTimeChange}
                sx={{
                  backgroundColor: '#FBFADA',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FBFADA' }
                }}
              >
                {mealOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button
              variant="contained"
              onClick={submitData}
              sx={{
                backgroundColor: '#88967A',
                color: '#FBFADA',
                '&:hover': {
                  backgroundColor: '#436850',
                  color: '#FBFADA',
                },
                mt: 2,
                py: 1.5
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
