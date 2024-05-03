import React from 'react';
import { Form, Input, Button, Card, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const navigate = useNavigate(); 
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const username = values.username;
    const password = values.password;
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('loginType', 'admin');
      localStorage.setItem('loginUsername', username);
      message.success(`Welcome Admin.`);
      navigate('/admin/dashboard');
    }
  };

  const backgroundStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #1890ff, #003a8c)',   
     display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardTitleStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
  };

  return (
    <div style={backgroundStyle}>
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col span={8}>
          <Card title={<div style={cardTitleStyle}>Admin Login</div>} bordered={false}>
            <Form
              name="admin_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminLogin;
