import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';

export default function AddDonor() {
    const [checked, setChecked] = useState(false);
    const [selectedName, setSelectedName] = useState('');

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    };

    const handleSendTextClick = () => {
     };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, p: 3, borderRadius: 2 }} className='bg-dark'>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
                Send Text Messages
            </Typography>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Select
                            value={selectedName}
                            onChange={handleNameChange}
                            label="Recipient Name"
                            fullWidth
                            variant="outlined"
                            autoComplete="given-name"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="John">John</MenuItem>
                            <MenuItem value="Jane">Jane</MenuItem>
                            <MenuItem value="Doe">Doe</MenuItem>
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
                            variant="outlined"
                            autoComplete="tel"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={handleSendTextClick}
                            variant="contained"
                            color="primary"
                        >
                            Send Text
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
