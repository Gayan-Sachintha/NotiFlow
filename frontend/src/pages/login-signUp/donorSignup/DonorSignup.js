import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Card, Steps, Select, Row, Col } from "antd";
import { useSpring, animated } from "react-spring";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import UserService from "./../../../services/UserService";
import TempleService from "../../../services/TempleService";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;
const { Option } = Select;

const DonorSignup = () => {

  const navigate = useNavigate(); 

  const [current, setCurrent] = useState(0);
  const [temples, setTemples] = useState([]);
  const [formData, setFormData] = useState({});
  const formRefs = useRef([]);
  const animationProps = useSpring({
    to: { opacity: 1, transform: "scale(1)" },
    from: { opacity: 0, transform: "scale(0.95)" },
    reset: true,
  });

  useEffect(() => {
    getAllTemples();
  }, [])

  const getAllTemples = () => {
    TempleService.getAll().then((res) => {
      setTemples(res.data);
    }).catch((err) => {
      console.error(err);
    })
  } 

  const onFinish = (values) => {
    console.log("Received values of form:", values);

    // const templeId = temples.find(
    //   (temple) => temple.TempleName === values.temple
    // )?.id;

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      donorAddress: formData.donorAddress,
      nationalIdentityNumber: formData.nationalIdentityNumber,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      TempleID: values.temple,
    };

    console.log(data);

    UserService.register(data, "donor")
      .then((res) => {
        if (data.message) {
          alert("Registered !")
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      navigate("/login");
  };

  const next = () => {
    setCurrent(current + 1);
    const form = formRefs.current[0];
    form
      .validateFields()
      .then((values) => {
        setFormData({ ...formData, ...values });
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  }
  const prev = () => setCurrent(current - 1);

  // const onFinish = (values) => {
  //   console.log('Received values of form:', values);
  // };

  return (
    <animated.div style={animationProps}>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={22} sm={20} md={16} lg={12} xl={10}>
          <Card>
            <h1>Welcome to Notiflow</h1>
            <Steps current={current}>
              <Step title="Donor Details" />
              <Step title="Select Temple" />
            </Steps>
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ remember: true }}
              className="mt-3"
              ref={(form) => (formRefs.current[0] = form)}
            >
              {current === 0 && (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your first name!",
                          },
                        ]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your last name!",
                          },
                        ]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="donorAddress"
                    rules={[
                      { required: true, message: "Please input your address!" },
                    ]}
                  >
                    <Input placeholder="Donor Address" />
                  </Form.Item>
                  <Form.Item
                    name="nationalIdentityNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your National Identity Number!",
                      },
                    ]}
                  >
                    <Input placeholder="National Identity Number" />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
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
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your Password!",
                      },
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
                  <Button type="primary" onClick={next}>
                    Next
                  </Button>
                </>
              )}
              {current === 1 && (
                <>
                  <Form.Item
                    name="temple"
                    rules={[
                      { required: true, message: "Please select a temple!" },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a temple"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {temples.map((temple) => (
                        <Option key={temple.TempleID} value={temple.TempleID}>
                          {temple.TempleName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Button onClick={prev} style={{ marginRight: 8 }}>
                    Previous
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </>
              )}
            </Form>
            <p className="mt-2">
              Already a member? <Link to="/login">Login</Link>
            </p>
          </Card>
        </Col>
      </Row>
    </animated.div>
  );
};

export default DonorSignup;
