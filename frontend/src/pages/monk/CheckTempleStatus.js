import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Descriptions, Spin, Image, Tag, Space } from 'antd';

function CheckTempleStatus() {
  const [templeData, setTempleData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    var monkEmail = localStorage.getItem('loginUsername')
    axios.get(`http://localhost:3002/temple/getMonkTemple/${monkEmail}/1`)
      .then(response => {
        setTempleData(response.data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching temple details:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: 50 }} />;
  }

  if (!templeData) {
    return <p style={{ textAlign: 'center' }}>No temple data found</p>;
  }

  return (
    <Card title={templeData.TempleName} bordered={false} style={{ margin: '20px' }}>
      <Descriptions bordered column={1}>
        {/* <Descriptions.Item label="Monk">{templeData.templeMonk}</Descriptions.Item> */}
        <Descriptions.Item label="Address">{templeData.TempleAddress}</Descriptions.Item>
        <Descriptions.Item label="Postal Code">{templeData.PostalCode}</Descriptions.Item>
        <Descriptions.Item label="Registration Number">{templeData.RegistrationNo}</Descriptions.Item>
        <Descriptions.Item label="Coordinates">{templeData.coordinates}</Descriptions.Item>
      </Descriptions>
      <Space direction="vertical" size="middle" style={{ marginTop: 20, textAlign: 'center' }}>
        <Tag color={templeData.isApproved ? 'green' : 'red'}>
          {templeData.isApproved ? 'Approved' : 'Not Approved'}
        </Tag>
      </Space>
    </Card>
  );
}

export default CheckTempleStatus;
