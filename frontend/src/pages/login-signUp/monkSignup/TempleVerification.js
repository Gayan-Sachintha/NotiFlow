import React, { useState, useRef } from 'react';
import { Upload, Button, message, Progress, Form, Card, Col, Row, Input, Steps } from 'antd';
import { InboxOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';
import { Link } from "react-router-dom";
import axios from "axios";


const { Dragger } = Upload;
const { Step } = Steps;

const TempleVerification = () => {
  const [fileList, setFileList] = useState([]);
  const [progressStatus, setProgressStatus] = useState('exception');  
  const [currentStep, setCurrentStep] = useState(0);
  const [geoLocation, setGeoLocation] = useState(null);

  const animationProps = useSpring({
    to: { opacity: 1, transform: 'scale(1)' },
    from: { opacity: 0, transform: 'scale(0.9)' },
    reset: true,
  });

  const onFileChange = info => {
    const { status } = info.file;

    if (info.fileList.length > 3) {
      message.error(`Maximum file upload limit reached !`);
      return
    }

    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList(info.fileList);

    if (info.fileList.length === 0) {
      setProgressStatus('exception');
    } else if (info.fileList.length === 1 || info.fileList.length === 2) {
      setProgressStatus('normal');
    } else {
      setProgressStatus('success');
    }
  };

  const handleFetchGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoLocation(position.coords);
        message.success(`Location fetched: Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
      }, () => {
        message.error("Failed to fetch location");
        setGeoLocation({ latitude: 0, longitude: 0 });
      });
    } else {
      message.error("Geolocation is not supported by this browser.");
    }
  };

  const fileToBase64 = async file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const fileProps = {
    name: 'file',
    multiple: true,
    accept: '.png,.jpg,.jpeg',
    beforeUpload: () => false,
    onChange: onFileChange,
  };

  const onFinish = async (values) => {
    // const base64Images = await Promise.all(
    //   fileList.map(async file => await fileToBase64(file.originFileObj))
    // );

    const base64Images = "test"

    const { latitude, longitude } = geoLocation;
    const coordinates = `${latitude},${longitude}`;
    const monkEmail = localStorage.getItem('loginUsername')
    const formData = {
      ...values,
      coordinates,
      images: base64Images,
      monkEmail,
    };


    try {
      const response = await axios.post('http://localhost:3002/temple/createTemple', {
        formData
      }, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      
      message.success(response.data.message);
      // console.error(response.data.message);

      // alert(error.response.data.message);
      // navigate('/monk');
    } catch (error) {
        message.error(error.response.data.message);
        console.error('Login error:', error);
    }
  };

  const steps = [
    {
      title: "Temple Details",
      content: (
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="templeName"
            rules={[
              { required: true, message: "Please input temple name!" },
              { whitespace: true, message: "Temple name cannot be empty!" },
            ]}
          >
            <Input placeholder="Temple Name" />
          </Form.Item>
          <Form.Item
            name="templeAddress"
            rules={[
              { required: true, message: "Please input temple address!" },
              { whitespace: true, message: "Temple address cannot be empty!" },
            ]}
          >
            <Input placeholder="Temple Address" />
          </Form.Item>
          <Form.Item
            name="postalCode"
            rules={[
              { required: true, message: "Please input postal code!" },
              { whitespace: true, message: "Postal code cannot be empty!" },
            ]}
          >
            <Input placeholder="Postal Code" />
          </Form.Item>
          <Form.Item
            name="registrationNo"
            rules={[
              { required: true, message: "Please input registration number!" },
              { whitespace: true, message: "Registration number cannot be empty!" },
            ]}
          >
            <Input placeholder="Temple Registration No" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<EnvironmentOutlined />} onClick={handleFetchGeoLocation}>
              Fetch Geo-location
            </Button>
          </Form.Item>

          
          <Form.Item label="Upload Verification Documents" extra="Upload the past 3 electrical or water bills for verification.">
            <Dragger {...fileProps} fileList={fileList}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag files to this area to upload</p>
              <p className="ant-upload-hint">
                You have uploaded {fileList.length} file(s).
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item>
            <Progress percent={(fileList.length / 3) * 100} strokeColor={{
              '0%': '#ff4d4f',
              '50%': '#ffc53d',
              '100%': '#52c41a',
            }} status={progressStatus} showInfo={progressStatus === 'success'} />
          </Form.Item>

          <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Submit Verification
                </Button>
            </Form.Item>
        </Form>
      ),
    }
  ];

  const next = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const prev = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
  };

  return (
    <animated.div style={animationProps}>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={24} md={18} lg={12} xl={10}>
          <Card>
            <Steps current={currentStep}>
              {steps.map((step, index) => (
                <Step key={index} title={step.title} />
              ))}
            </Steps>
            <div>{steps[currentStep].content}</div>
            <div className="steps-action">
              {currentStep > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </animated.div>
  );
};

export default TempleVerification;
