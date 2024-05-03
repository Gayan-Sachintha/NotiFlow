import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUtensils, faCalendarAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Layout, Row, Col, Space } from 'antd'; 
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined
} from '@ant-design/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import Card from './Card';
import CommonNav from '../../../components/commonNavbar/CommonNav';
import carouselImage1 from './images/home1.jpg';
import carouselImage2 from './images/home2.jpg';
import carouselImage3 from './images/home3.jpg';
import sms from './images/textmessages.jpg';
import cal from './images/calscheduling.jpg';
import chat from './images/Chat.jpg';

const { Footer } = Layout;  

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <div>
      <CommonNav />
      <div className="home-page">
        <Slider {...settings}>
          <div>
            <img src={carouselImage1} alt="Carousel Image 1" style={{ maxHeight: '500px', width: '100%' }} />
          </div>
          <div>
            <img src={carouselImage2} alt="Carousel Image 2" style={{ maxHeight: '500px', width: '100%' }} />
          </div>
          <div>
            <img src={carouselImage3} alt="Carousel Image 3" style={{ maxHeight: '500px', width: '100%' }} />
          </div>
        </Slider>

        <div className="content">
          <h1>Welcome to Notiflow</h1>
          <p style={{ opacity: 1, fontSize: 20 }}>Every Offering Counts Every donation, no matter the amount, contributes to the sustenance of our temples and the preservation of Buddhist teachings.</p>

          <h1 style={{ opacity: 1, fontWeight: 500 }}>What We Offer</h1>
          <ul className='boxess'>
            <li>
              <div className='box1'>
                <FontAwesomeIcon icon={faCommentDots} size="3x" />
                <p>Text Message Updates</p>
                <p>Stay informed with important temple announcements and event reminders sent directly to your phone.</p>
              </div>
            </li>
            <li>
              <div className='box1'>
                <FontAwesomeIcon icon={faUtensils} size="3x" />
                <p>Meal Reservations</p>
                <p>Plan ahead by reserving meals for special occasions or gatherings at the temple.</p>
              </div>
            </li>
            <li>
              <div className='box1'>
                <FontAwesomeIcon icon={faCalendarAlt} size="3x" />
                <p>Calendar Scheduling</p>
                <p>Manage your temple visits, ceremonies, and events with our intuitive calendar scheduling feature.</p>
              </div>
            </li>
            <li>
              <div className='box1'>
                <FontAwesomeIcon icon={faUserFriends} size="3x" />
                <p>Chat and Connect with People</p>
                <p>Engage in meaningful conversations, share ideas, and connect with fellow members of the temple community through our chat platform.</p>
              </div>
            </li>
          </ul>
        </div>

        <Card imageSrc={sms} description="Text Reminders" />
        <Card imageSrc={cal} description="Chat with Monk and Temple Community" />
        <Card imageSrc={chat} description="See your calendar and ask for special meal reservations from your temple" />

        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>
          <Row justify="center">
            <Col span={24}>
              <Space>
                <a href="https://example.com/facebook" target="_blank" rel="noopener noreferrer">
                  <FacebookOutlined style={{ fontSize: '24px' }} />
                </a>
                <a href="https://example.com/twitter" target="_blank" rel="noopener noreferrer">
                  <TwitterOutlined style={{ fontSize: '24px' }} />
                </a>
                <a href="https://example.com/instagram" target="_blank" rel="noopener noreferrer">
                  <InstagramOutlined style={{ fontSize: '24px' }} />
                </a>
              </Space>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={24}>
              <p>Notiflow © 2024</p>
              <p style={{ opacity: 0.6 }}>+94 70 111 2222</p>
            </Col>
          </Row>
        </Footer>
      </div>
    </div>
  );
}

export default HomePage;
