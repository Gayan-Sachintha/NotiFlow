import React, { useState } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  isSameMonth,
} from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';

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

function DonorCalendar() {
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
    <>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>Prev</Button>
          <h3>{format(currentMonth, 'MMMM yyyy')}</h3>
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>Next</Button>
        </div>
        <div className="row border">
          {daysGrid.map((date, index) => (
            <div
              key={index}
              className={`col-sm-3 col-md-2 text-center py-2 border ${!isSameMonth(date, currentMonth) ? 'text-muted' : ''}`}
              onClick={() => handleDayClick(date)}
            >
              <div>{format(date, 'd')}</div>
              <div>{format(date, 'E')}</div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Donors for {selectedDate && format(selectedDate, 'PP')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Morning Meal Donors</h5>
          <ListGroup>
            {selectedDonors.morning.map((name, index) => (
              <ListGroup.Item key={`morning-${index}`}>{name}</ListGroup.Item>
            ))}
          </ListGroup>
          <h5 className="mt-3">Evening Meal Donors</h5>
          <ListGroup>
            {selectedDonors.evening.map((name, index) => (
              <ListGroup.Item key={`evening-${index}`}>{name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DonorCalendar;
