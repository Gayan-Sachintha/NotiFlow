import React, { useState, useRef } from "react";
import { Steps, Form, Input, Button, Card, Row, Col, message } from "antd";
import { useSpring, animated } from "react-spring";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const { Step } = Steps;

const MonkSignupForm = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const formRefs = useRef([]);

  const animationProps = useSpring({
    to: { opacity: 1, transform: "scale(1)" },
    from: { opacity: 0, transform: "scale(0.9)" },
    reset: true,
  });


  const onFinish = (values) => {
    console.log(values);

    axios.post("http://localhost:3002/user/register/monk", {
      values
    })
    .then((response) => {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
            alert("Registration successful!"); 
            navigate("/login");
        } else {
            alert("Registration failed. Please try again."); 
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
  };

  const steps = [
    {
      title: "Monk Details",
      content: (
        <Form name={`monk_register`} onFinish={onFinish}>
          <Form.Item
            name="monkName"
            rules={[
              { required: true, message: "Please input monk name!" },
              { whitespace: true, message: "Monk name cannot be empty!" },
            ]}
          >
            <Input placeholder="Monk Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number!" },
              { whitespace: true, message: "Phone number cannot be empty!" },
            ]}
          >
            <PhoneInput
              country={"us"}
              enableSearch={true}
              inputStyle={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
              { whitespace: true, message: "Password cannot contain spaces!" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
                Register
            </Button>
          </Form.Item>
        </Form>
      ),
    }
  ];

  return (
    <animated.div style={animationProps}>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={24} sm={24} md={18} lg={12} xl={10}>
          <Card>
            <h1>Welcome to Notiflow</h1>
            <Steps current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            {steps[current].content}
            {/* <div className="steps-action">
              <Button type="primary" onClick={onFinish}>
                Submit
              </Button>
            </div> */}
            <p className="mt-2">
              Already a member? <Link to="/login">Login</Link>
            </p>
          </Card>
        </Col>
      </Row>
    </animated.div>
  );
};

export default MonkSignupForm;
