import React from 'react';
import { Card } from 'antd';
import './AdminBoxItemProfile2.css';  
import imageSrc from './images/monkbox1.jpeg';  

const { Meta } = Card;

function AdminBoxItemProfile2({ title, description, onClick }) {
  return (
    
    <Card
      hoverable
      className="adminfeatures2-card"  
      onClick={onClick}
      cover={<img alt="example" src={imageSrc} />}
      style={{
        maxWidth: 285,
        boxShadow: '0px 8px 35px rgba(0, 0, 0, 0.2)',
        borderRadius: '16px',
        marginBottom: '10%',
      }}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}

export default AdminBoxItemProfile2;
