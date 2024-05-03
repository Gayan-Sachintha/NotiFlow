import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import './SendTextMessages.css';

export default function AddDonor() {
    const [checked, setChecked] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState({ name: '', phone: '' });
    const [message, setMessage] = useState('');
    const [templeIdForm, setTempleId] = useState(null);
    const [templeNameForm, setTempleName] = useState(null);
    const [donors, setDonors] = useState([]);

    const monkEmail = localStorage.getItem('loginUsername');

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

    useEffect(() => {
        axios.get(`http://localhost:3002/temple/getMonkTemple/${monkEmail}/1`)
            .then(response => {
                setTempleId(response.data[0].TempleID);
                setTempleName(response.data[0].TempleName);
            })
            .catch(error => {
                console.error('Error fetching temple details:', error);
            });
    }, [monkEmail]);

    useEffect(() => {
        if (templeIdForm) {
            axios.get(`http://localhost:3002/monk/getDonorsForTemple/${templeIdForm}`)
                .then(response => {
                    setDonors(response.data.map(donor => ({
                        ...donor,
                        fullName: `${donor.FirstName} ${donor.LastName}`
                    })));
                })
                .catch(error => {
                    console.error('Error fetching donors:', error);
                });
        }
    }, [templeIdForm]);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleNameChange = (event) => {
        const selected = donors.find(d => d.fullName === event.target.value);
        setSelectedDonor(selected ? { name: selected.fullName, phone: selected.PhoneNumber } : { name: '', phone: '' });
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendTextClick = () => {
        if (checked) {
            donors.forEach(donor => {
                console.log(`Sending message to ${donor.fullName} at ${donor.PhoneNumber}: ${message}`);
          
            });
        } else if (selectedDonor.phone) {
            sendSMS(selectedDonor.phone, message);
            console.log(`Sending message to ${selectedDonor.name} at ${selectedDonor.phone}: ${message}`);

        } else {
            alert('Please select a donor or check "Send to All".');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, p: 3, borderRadius: 2 }} className='sendtxtMsgForm'>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#F9E0BB', fontWeight: 'bold' }}>
                Send Text Messages
            </Typography>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Select
                            value={selectedDonor.name}
                            onChange={handleNameChange}
                            label="Recipient Name"
                            fullWidth
                            variant="filled"
                            autoComplete="given-name"
                            style={{ backgroundColor: '#F9E0BB' }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {donors.map(donor => (
                                <MenuItem key={donor.DonorID} value={donor.fullName}>
                                    {donor.fullName}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
                            label="Send to All"
                            sx={{ color: 'white' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="message"
                            name="message"
                            label="Message"
                            fullWidth
                            variant="filled"
                            value={message}
                            onChange={handleMessageChange}
                            style={{ backgroundColor: '#F9E0BB' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                onClick={handleSendTextClick}
                                variant="contained"
                                color="primary"
                                style={{
                                    backgroundColor: '#884A39',
                                    color: '#F9E0BB',
                                    '&:hover': {
                                        backgroundColor: '#F9E0BB',
                                        color: '#884A39',
                                    }
                                }}
                            >
                                Send Text
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
