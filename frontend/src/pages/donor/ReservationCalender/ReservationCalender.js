import React, { useState } from 'react';
import { Modal, Button, ListGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isSameMonth } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../ReservationCalender/ReservationCalender.css';
import backgroundVideo from './videos/reservationDonorCalender.mp4';

const donorsData = {
  '2024-03-10': {
    morning: ['John Doe', 'Jane Smith'],
    evening: ['Alice Johnson', 'Bob Brown'],
  },
};

const getMonthDaysGrid = (month) => {
  const startDay = startOfWeek(startOfMonth(month));
  const endDay = endOfWeek(endOfMonth(month));
  return eachDayOfInterval({ start: startDay, end: endDay });
};

function ReservationCalender() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDonors, setSelectedDonors] = useState({ morning: [], evening: [] });

  const handleDayClick = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const donors = donorsData[formattedDate] || { morning: [], evening: [] };
    setSelectedDonors(donors);
    setModalShow(true);
  };

  const daysGrid = getMonthDaysGrid(currentMonth);

  return (
    <div className="video-content-container">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className='calenderform mt-3 reservefade'>
        <div className="content-overlay">
          <div className="container py-5">
          <h2 className='txtDateYear-reserve ' style={{textAlign: 'center'}}>Reservation Calender</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} className='btn-warning'>Prev</Button>
              <h2 className='txtDateYear-reserve'>{format(currentMonth, 'MMMM yyyy')}</h2>
              <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className='btn-warning'>Next</Button>
            </div>
            <div className="row border" style={{ backgroundColor: '#FBFADA' }}>
              {daysGrid.map((date, index) => {
                const formattedDate = format(date, 'yyyy-MM-dd');
                const donorInfo = donorsData[formattedDate] || { morning: [], evening: [] };
                return (
                  <OverlayTrigger
                    key={index}
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${index}`}>
                        Morning Meal: {donorInfo.morning.join(', ') || 'Mr Pashan'}<br />
                        Evening Meal: {donorInfo.evening.join(', ') || 'Miss Nadeeka'}
                      </Tooltip>
                    }
                  >
                    <div
                      className={`col-sm-3 col-md-2 text-center py-2 border calformdonor ${!isSameMonth(date, currentMonth) ? 'calformdonor' : ''}`}
                      onClick={() => handleDayClick(date)}
                      style={{ position: 'relative' }}
                    >
                      <div>{format(date, 'E')}</div>
                      <div>{format(date, 'd')}</div>
                    </div>
                  </OverlayTrigger>
                );
              })}

            </div>


          </div>

          <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
            <Modal.Header closeButton style={{ backgroundColor: '#12372A', color: '#FBFADA' }}>
              <Modal.Title>Donors for {selectedDate && format(selectedDate, 'PP')}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#FBFADA', color: '#12372A' }}>
              <h5>Morning Meal  -  Mr Nimal </h5>
              <ListGroup>
                {selectedDonors.morning.map((name, index) => (
                  <ListGroup.Item key={`morning-${index}`}>{name}</ListGroup.Item>
                ))}
              </ListGroup>
              <h5 className="mt-3">Evening Meal -  Mr Samantha</h5>
              <ListGroup>
                {selectedDonors.evening.map((name, index) => (
                  <ListGroup.Item key={`evening-${index}`}>{name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#12372A', color: '#FBFADA' }}>
              <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>

  );
}

export default ReservationCalender;
