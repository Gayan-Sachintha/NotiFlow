import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './AddDonor.css';

export default function AddDonor() {
    const [templeIdForm, setTempleId] = useState(null);
    const [templeNameForm, setTempleName] = useState(null);

    var monkEmail = localStorage.getItem('loginUsername')
    axios.get(`http://localhost:3002/temple/getMonkTemple/${monkEmail}/1`)
      .then(response => {
        setTempleId(response.data[0].TempleID);
        setTempleName(response.data[0].TempleName);
      })
      .catch(error => {
        console.error('Error fetching temple details:', error);
      });

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        NationalIdentityNumber: '',
        PhoneNumber: '',
        DonorAddress: '',
        templeId: '',
        mealDate: '',
        mealType: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    console.log('formData:', formData);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/temple/assign/donor', {

                FirstName: formData.FirstName,
                LastName: formData.LastName,
                Email: formData.Email,
                NationalIdentityNumber: formData.NationalIdentityNumber,
                PhoneNumber: formData.PhoneNumber,
                DonorAddress: formData.DonorAddress,
                Password: "$2b$08$EhlSKS8TxlYcx22LzhFz2uU.yUko/Ub3MGgaMp6.SlaWCqP4OOSoa",

                templeId: templeIdForm,
                mealDate: formData.mealDate,
                mealType: formData.mealType

            });

            console.log('Response:', response.data);
            if (response.data.status === 'success') {

                if(response.data.message === 'Donor already exists') {
                    alert('Donor already exists');
                    return;
                }

                sendSMS(formData.PhoneNumber, "You have been alcocated for "+templeNameForm+" temple");
                alert('Donor added successfully');
                setFormData({
                    FirstName: '',
                    LastName: '',
                    Email: '',
                    NationalIdentityNumber: '',
                    PhoneNumber: '',
                    DonorAddress: '',
                    templeId: '',
                    mealDate: '',
                    mealType: ''
                });
            } else {
                alert('Failed to add donor');
            }
        } catch (error) {
            console.error('Error adding donor:', error);
            alert('Failed to add donor');
        }
    };

    return (
        <div className="addDonorBackground">
            <Container maxWidth="sm" sx={{ p: 3, borderRadius: 2 }} className='addDonorbg'>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#F9E0BB', textAlign: 'center' }}>
                    Add Donor
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="FirstName"
                                name="FirstName"
                                label="First Name"
                                fullWidth
                                variant="filled"
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={handleChange}
                                style={{ backgroundColor: '#F9E0BB' }}
                                className='addDonortxtarea'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="LastName"
                                name="LastName"
                                label="Last Name"
                                fullWidth
                                variant="filled"
                                autoComplete="given-name"
                                value={formData.lastName}
                                onChange={handleChange}
                                style={{ backgroundColor: '#F9E0BB' }}
                                className='addDonortxtarea'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="PhoneNumber"
                                name="PhoneNumber"
                                label="Mobile Number"
                                fullWidth
                                variant="filled"
                                autoComplete="given-name"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                style={{ backgroundColor: '#F9E0BB' }}
                                className='addDonortxtarea'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="NationalIdentityNumber"
                                name="NationalIdentityNumber"
                                label="National Identity Card Number"
                                fullWidth
                                variant="filled"
                                autoComplete="given-name"
                                value={formData.nic}
                                onChange={handleChange}
                                style={{ backgroundColor: '#F9E0BB' }}
                                className='addDonortxtarea'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="Email"
                                name="Email"
                                label="Email"
                                fullWidth
                                variant="filled"
                                autoComplete="given-name"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                style={{ backgroundColor: '#F9E0BB' }}
                                className='addDonortxtarea'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="DonorAddress"
                                name="DonorAddress"
                                label="Address"
                                fullWidth
                                variant="filled"
                                autoComplete="given-name"
                                value={formData.address}
                                onChange={handleChange}
                                style={{ backgroundColor: '#F9E0BB' }}
                                className='addDonortxtarea'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="mealDate"
                                name="mealDate"
                                label="Donation Date"
                                type="date"
                                fullWidth
                                variant="filled"
                                InputLabelProps={{ shrink: true }}
                                value={formData.donationDate}
                                onChange={handleChange}
                                className='addDonortxtarea'
                                style={{ backgroundColor: '#F9E0BB' }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth style={{ backgroundColor: '#F9E0BB' }} variant="filled" required>
                                <InputLabel id="meal-time-label">Meal Time</InputLabel>
                                <Select
                                    labelId="meal-time-label"
                                    id="mealType"
                                    name="mealType"
                                    value={formData.mealTime}
                                    onChange={handleChange}
                                    label="Meal Time"
                                >
                                    <MenuItem value="morning">Morning Meal</MenuItem>
                                    <MenuItem value="evening">Evening Meal</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ textAlign: 'center' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className='addDonorbtn'
                                    style={{
                                        backgroundColor: '#884A39',
                                        color: '#F9E0BB',
                                        '&:hover': {
                                            backgroundColor: '#F9E0BB',
                                            color: '#884A39',
                                        }
                                    }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}
