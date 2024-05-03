import { message } from 'antd';

const React = require('react');
const { useState, useEffect, useMemo } = require('react');
const { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, TextField, Link, Box, InputAdornment, Button, DialogContent } = require('@mui/material');
const SearchIcon = require('@mui/icons-material/Search').default;
const LocationOnIcon = require('@mui/icons-material/LocationOn').default;
const PhotoIcon = require('@mui/icons-material/Photo').default;
const CheckCircleIcon = require('@mui/icons-material/CheckCircle').default;
const RemoveCircleOutlineIcon = require('@mui/icons-material/RemoveCircleOutline').default;

function AdminTempleRequest() {
  const [temples, setTemples] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openImage, setOpenImage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3002/temple/getAllTemplesRequests')
      .then(response => response.json())
      .then(data => {
        const formattedTemples = data.map(item => ({
          id: item.TempleID,
          name: item.TempleName,
          monk: item.templeMonk,
          registrationNo: item.RegistrationNo,
          location: item.TempleAddress,
          geoLocation: `https://maps.google.com/?q=${item.coordinates}`,
          postalCode: item.PostalCode,
          images: item.images.split(','),
          isApproved: item.isApproved,
        }));
        setTemples(formattedTemples);
      });
  }, []);

  const filteredTemples = useMemo(() => temples.filter(temple => temple.name.toLowerCase().includes(searchQuery.toLowerCase())), [temples, searchQuery]);

  const handleCloseImageDialog = () => setOpenImage('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleApproveTemple = (templeId) => {
    fetch(`http://localhost:3002/temple/approveTemple/${templeId}`, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      message.success("Temple Approved !")
      setTemples(prevTemples => prevTemples.filter(temple => temple.id !== templeId));
    })
    .catch(error => {
      message.error("Temple Approve Error !")
      console.error('Error approving temple:', error);
    });
  };

  const handleRemoveTemple = (templeId) => {
    fetch(`http://localhost:3002/temple/removeTemple/${templeId}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      message.success("Temple Removed !")

      setTemples(prevTemples => prevTemples.filter(temple => temple.id !== templeId));
    })
    .catch(error => {
      message.success("Temple Removing Failed !")
      console.error('Error removing temple:', error);
    });
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search for temples..."
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: '500px' }}
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTemples.map((temple) => (
              <TableRow key={temple.id}>
                <TableCell>{temple.name}</TableCell>
                <TableCell>{temple.monk}</TableCell>
                <TableCell>{temple.registrationNo}</TableCell>
                <TableCell>{temple.location}</TableCell>
                <TableCell>
                  <Link href={temple.geoLocation} target="_blank">
                    <LocationOnIcon color="primary" />
                  </Link>
                </TableCell>
                <TableCell>
                  {temple.images.map((image, index) => (
                    <IconButton key={index} onClick={() => setOpenImage(image)}>
                      <PhotoIcon color="primary" />
                    </IconButton>
                  ))}
                </TableCell>
                <TableCell>
                  <Button startIcon={<CheckCircleIcon />} onClick={() => handleApproveTemple(temple.id)} color="success">
                    Approve
                  </Button>
                  <Button startIcon={<RemoveCircleOutlineIcon />} onClick={() => handleRemoveTemple(temple.id)} color="error">
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Image Dialog */}
      <Dialog open={!!openImage} onClose={handleCloseImageDialog}>
        <DialogContent>
          <img src={openImage} alt="Temple" style={{ maxWidth: '100%', height: 'auto' }} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminTempleRequest;
