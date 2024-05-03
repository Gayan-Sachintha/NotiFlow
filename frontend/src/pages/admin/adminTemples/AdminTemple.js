import React, { useState, useEffect } from 'react';
import { Container, Table, DialogActions, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, TextField, Link, Box, InputAdornment, Button, DialogContent, Tooltip } from '@mui/material';
import { Search as SearchIcon, LocationOn as LocationOnIcon, Photo as PhotoIcon, Edit as EditIcon, RemoveCircleOutline as RemoveCircleOutlineIcon } from '@mui/icons-material';
import axios from 'axios';
import { message } from 'antd';

function AdminTemple() {
  const [temples, setTemples] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openImage, setOpenImage] = useState('');
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    monk: '',
    registrationNo: '',
    location: '',
    geoLocation: '',
    postalCode: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3002/temple/getAllTemplesApproved')
      .then(response => {
        console.log('Fetched Temples:', response.data); 
        setTemples(response.data.map(item => ({
          ...item,
          images: item.images ? item.images.split(',') : []  
        })));
      })
      .catch(error => {
        console.error('Error loading temples:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRemoveTemple = (templeId) => {
    axios.post(`http://localhost:3002/temple/removeTemple/${templeId}`)
      .then(response => {
        message.success("Temple Removed!");
        setTemples(prevTemples => prevTemples.filter(temple => temple.id !== templeId));
      })
      .catch(error => {
        message.error("Temple Removing Failed!");
        console.error('Error removing temple:', error);
      });
  };

  const handleOpenEditDialog = (temple) => {
    setSelectedTemple(temple);
    setEditFormData({
      name: temple.TempleName,
      monk: temple.templeMonk,
      registrationNo: temple.RegistrationNo,
      location: temple.TempleAddress,
      geoLocation: temple.coordinates,
      postalCode: temple.PostalCode
    });
  };

  const handleEditFormFieldChange = (field, value) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateTemple = () => {
    axios.post(`http://localhost:3002/temple/updateTemple/${selectedTemple.TempleID}`, editFormData)
      .then(response => {
        message.success('Temple updated successfully');
        setTemples(prev => prev.map(t => t.id === selectedTemple.id ? { ...t, ...editFormData } : t));
        setSelectedTemple(null);
      })
      .catch(error => {
        message.error('Failed to update temple');
        console.error('Error updating temple:', error);
      });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Search for temples..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
          fullWidth
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Monk</TableCell>
              <TableCell>Registration No</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Geo Location</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>ZipCode</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {temples.map((temple, index) => (
              <TableRow key={index}>
                <TableCell>{temple.TempleName}</TableCell>
                <TableCell>{temple.templeMonk}</TableCell>
                <TableCell>{temple.TempleID}</TableCell>
                <TableCell>{temple.TempleAddress}</TableCell>
                <TableCell>
                  <Link href={temple.coordinates} target="_blank"><LocationOnIcon color="primary" /></Link>
                </TableCell>
                <TableCell>
                  {temple.images.map((image, idx) => (
                    <IconButton key={idx} onClick={() => setOpenImage(image)}><PhotoIcon color="primary" /></IconButton>
                  ))}
                </TableCell>
                <TableCell>{temple.PostalCode}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenEditDialog(temple)}><EditIcon color="action" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Remove">
                    <IconButton onClick={() => handleRemoveTemple(temple.id)}><RemoveCircleOutlineIcon color="error" /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!selectedTemple} onClose={() => setSelectedTemple(null)} maxWidth="md" fullWidth>
        <DialogContent>
          <TextField fullWidth label="Name" value={editFormData.name} onChange={(e) => handleEditFormFieldChange('name', e.target.value)} margin="dense" />
          <TextField fullWidth label="Monk" value={editFormData.monk} onChange={(e) => handleEditFormFieldChange('monk', e.target.value)} margin="dense" />
          <TextField fullWidth label="Registration No" value={editFormData.registrationNo} onChange={(e) => handleEditFormFieldChange('registrationNo', e.target.value)} margin="dense" />
          <TextField fullWidth label="Location" value={editFormData.location} onChange={(e) => handleEditFormFieldChange('location', e.target.value)} margin="dense" />
          <TextField fullWidth label="Geo Location" value={editFormData.geoLocation} onChange={(e) => handleEditFormFieldChange('geoLocation', e.target.value)} margin="dense" />
          <TextField fullWidth label="Postal Code" value={editFormData.postalCode} onChange={(e) => handleEditFormFieldChange('postalCode', e.target.value)} margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTemple(null)}>Cancel</Button>
          <Button onClick={handleUpdateTemple} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!openImage} onClose={() => setOpenImage('')}>
        <DialogContent>
          <img src={openImage} alt="Temple" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default AdminTemple;
