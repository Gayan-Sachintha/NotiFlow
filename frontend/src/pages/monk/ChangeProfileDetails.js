import React, { useState } from 'react';
import { Container, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, useTheme, useMediaQuery } from '@mui/material';
import AdminBoxItemProfile from '../../components/AdminBoxItemProfile/MonkBoxItemProfile';
import 'bootstrap/dist/css/bootstrap.min.css';


function ChangeProfileDetails() {
    const [openDialog, setOpenDialog] = useState('');
    const theme = useTheme();
     const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    const handleOpenDialog = (dialogName) => {
        setOpenDialog(dialogName);
    };

    const handleCloseDialog = () => {
        setOpenDialog('');
    };

    const DialogForm = ({ dialogName, children }) => (
        <Dialog open={openDialog === dialogName} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <DialogTitle>{dialogName}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleCloseDialog}>Save</Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <Container sx={{
            mt: 4,
            boxSizing: 'border-box',
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        }} >
            <div className='container-fluid text-center '>
                <div className='row'>
                    <div className='col-12 mt-4'>
                        <div className='row'>
                            <div className='col-12 col-md-4'>
                                <AdminBoxItemProfile title="Temple Name" onClick={() => handleOpenDialog('Temple Name')} />
                            </div>
                            <div className='col-12 col-md-4'>
                                <AdminBoxItemProfile title="Temple Address" onClick={() => handleOpenDialog('Temple Address')} />

                            </div>
                            <div className='col-12 col-md-4'>
                                <AdminBoxItemProfile title="Change Password" onClick={() => handleOpenDialog('Change Password')} />

                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row mt-4'>
                            <div className='col-12 col-md-4'>
                                <AdminBoxItemProfile title="Monk Name" onClick={() => handleOpenDialog('Monk Name')} />
                            </div>
                            <div className='col-12 col-md-4'>
                                <AdminBoxItemProfile title="Monk Phone Number" onClick={() => handleOpenDialog('Monk Phone Number')} />
                            </div>
                            <div className='col-12 col-md-4'>
                                <AdminBoxItemProfile title="Comming Soon" />
                            </div>
                        </div>
                    </div>
                </div>



            </div>

            <DialogForm dialogName="Temple Name">
                <TextField label="Temple Name" fullWidth variant="outlined" margin="dense" />
            </DialogForm>

            <DialogForm dialogName="Temple Address">
                <TextField label="Temple Address" fullWidth variant="outlined" margin="dense" multiline rows={4} />
            </DialogForm>

            <DialogForm dialogName="Change Password">
                <TextField label="Current Password" type="password" fullWidth variant="outlined" margin="dense" />
                <TextField label="New Password" type="password" fullWidth variant="outlined" margin="dense" />
                <TextField label="Re-enter New Password" type="password" fullWidth variant="outlined" margin="dense" />
            </DialogForm>

            <DialogForm dialogName="Monk Name">
                <TextField label="First Name" fullWidth variant="outlined" margin="dense" />
                <TextField label="Last Name" fullWidth variant="outlined" margin="dense" />
            </DialogForm>

            <DialogForm dialogName="Monk Phone Number">
                <TextField label="Enter Mobile Number" fullWidth variant="outlined" margin="dense" />
                <TextField label="Enter OTP" fullWidth variant="outlined" margin="dense" />
            </DialogForm>
        </Container>
    );
}

export default ChangeProfileDetails;
