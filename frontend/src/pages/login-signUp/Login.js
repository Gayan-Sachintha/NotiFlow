import React, { useEffect } from 'react';
import { Form, Button, message, Card, Tabs, Input } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';
import './styles/Login.css';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { TabPane } = Tabs;

let loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const LoginForm = ({ role }) => {

    const isLoggedin = localStorage.getItem('loggedIn') === 'true';

    const navigate = useNavigate();
    const roleType = role.toLowerCase();

    useEffect(() => {
        if (isLoggedin) {
            if (localStorage.getItem('loginType') === 'monk') {
                navigate('/monk');
            } else {
                navigate('/');
            }
        }
    }, []);

    const onFinish = async (values) => {
        const url = 'http://localhost:3002/user/login/' + roleType;
        var email = values.email;
        var password = values.password;
        console.log(roleType);
        try {
            const response = await axios.post(url, {
                'email': email,
                'password': password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('loginType', roleType);
            localStorage.setItem('loginUsername', response.data.Email);
            localStorage.setItem('templeid', response.data.TempleID);
            localStorage.setItem('MonkName', response.data.MonkName);

            message.success(`Logged In !.`);
            // alert(error.response.data.message);
            if (roleType == "donor") {
                navigate('/');
            } else {
                navigate('/monk');
            }

            // console.log(response.data)
        } catch (error) {
            message.error(error.response.data.message);
            console.error('Login error:', error);
        }
    };


    return (
        <Form name={`${role.toLowerCase()}_login`} onFinish={onFinish} className="login-form">
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please input your Email!' },
                    { type: 'email', message: 'Please enter a valid Email!' }
                ]}
            >
                <Input
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password
                    placeholder="Password"
                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Log in as {role}
                </Button>
            </Form.Item>
            <div className="register-link">
                Don't have an account? <a href={`/user-signup/${role.toLowerCase()}`}>Register here</a>
            </div>
        </Form>
    );
};

const LoginTabs = () => {
    const animationProps = useSpring({
        to: { transform: 'scale(1)', opacity: 1 },
        from: { transform: 'scale(0.9)', opacity: 0 },
        reset: true,
    });

    return (
        <animated.div style={animationProps}>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Monk" key="1">
                    <LoginForm role="Monk" />
                </TabPane>
                <TabPane tab="Donor" key="2">
                    <LoginForm role="Donor" />
                </TabPane>
            </Tabs>
        </animated.div>
    );
};

const App = () => (
    <div className="login-container">
        <Card title="Login" bordered={false} className="login-card">
            <LoginTabs />
        </Card>
    </div>
);

export default App;
