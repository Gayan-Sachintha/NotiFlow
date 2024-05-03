import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './MonkBoxItemProfile.css';
import imageSrc from './images/adminprofile1.jpg';

function MonkBoxItemProfile({ title, description, onClick }) {
  return (
    <Card
      className="adminprofile-card"
      onClick={onClick}
      sx={{
        maxWidth: 285,
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.4)',
        '&:hover': {
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.6)',
        },
        borderRadius: '16px',
      }}
      style={{backgroundColor: '#C38154'}}

    >
      {imageSrc && (
        <CardMedia
          component="img"
          height="140"
          image={imageSrc}
          alt="Card image cap"
        />
      )}
      <CardContent className="adminprofile-card-content">
        <Typography gutterBottom variant="h5" component="div" className="adminprofile-card-title" style={{color: '#F9E0BB'}}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MonkBoxItemProfile;
