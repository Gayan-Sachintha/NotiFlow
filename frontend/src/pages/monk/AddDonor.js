import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function AddDonor() {

    const [mealTime, setMealTime] = useState('');

    const handleMealTimeChange = (event) => {
        setMealTime(event.target.value);
    };



    return (
        <Container maxWidth="sm" sx={{ mt: 4, p: 3, borderRadius: 2 }} className='bg-dark'>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
                Add Donor
            </Typography>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            variant="outlined"
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            variant="outlined"
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="mobileNumber"
                            name="mobileNumber"
                            label="Mobile Number"
                            fullWidth
                            variant="outlined"
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="nic"
                            name="nic"
                            label="National Identity Card Number"
                            fullWidth
                            variant="outlined"
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="phoneNumber"
                            name="number"
                            label="Phone Number"
                            fullWidth
                            variant="outlined"
                            autoComplete="tel"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Address"
                            fullWidth
                            variant="outlined"
                            autoComplete="tel"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="donationDate"
                            label="Donation Date"
                            type="date"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="meal-time-label">Meal Time</InputLabel>
                            <Select
                                labelId="meal-time-label"
                                id="mealTime"
                                value={mealTime}
                                label="Meal Time"
                                onChange={handleMealTimeChange}
                            >
                                <MenuItem value="morning">Morning Meal</MenuItem>
                                <MenuItem value="evening">Evening Meal</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
