import React, { useState, useEffect } from 'react';
import { Modal, ListGroup } from 'react-bootstrap';
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
import './ReservationCalender.css';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const modalVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};

const dayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, scale: 1.05 },
};

function DonorCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDonors, setSelectedDonors] = useState({ morning: [], evening: [] });
  const [mealsData, setMealsData] = useState({});
  const [selectedDayData, setSelectedDayData] = useState([]);
  const [templeId, setTempleId] = useState(null);
  const [templeNameForm, setTempleName] = useState(null);

  var monkEmail = localStorage.getItem('loginUsername')
  axios.get(`http://localhost:3002/temple/getMonkTemple/${monkEmail}/1`)
    .then(response => {
      setTempleId(response.data[0].TempleID);
      setTempleName(response.data[0].TempleName);
    })
    .catch(error => {
      console.error('Error fetching temple details:', error);
    });
    
  const getMonthDaysGrid = (month) => {
    const startDay = startOfWeek(startOfMonth(month));
    const endDay = endOfWeek(endOfMonth(month));
    return eachDayOfInterval({ start: startDay, end: endDay });
  };

  // Fetch meals from the backend
  useEffect(() => {
    const fetchMeals = async () => {
      const monthStr = format(currentMonth, 'yyyy-MM-01');
      try {
        const response = await axios.get(`http://localhost:3002/monk/getMealsForCalendar`, {
          params: { templeId, month: monthStr }
        });
        if (response.status === 200) {
          const meals = response.data.reduce((acc, meal) => {
            const dateKey = format(new Date(meal.mealDate), 'yyyy-MM-dd');
            acc[dateKey] = acc[dateKey] || { morning: [], evening: [] };
            acc[dateKey][meal.mealType.toLowerCase()].push(`${meal.FirstName} ${meal.LastName}`);
            return acc;
          }, {});
          setMealsData(meals);
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
}, [currentMonth]); 


  const handleDayClick = (date) => {
    const templeId = localStorage.getItem('templeid');
    console.log("date prints ",date, "temp" , templeId	);

    const fetchDonors = async (date, templeId) => {
      try {
        const response = await axios.get(`http://localhost:3002/monk/calenderdata`, {
          params: {
            date: format(date, 'yyyy-MM-dd'),
            templeId: templeId
          }
        });
        if (response.status === 200 || response.status === 201) {
          const donors = response.data;
          console.log(donors);
          setSelectedDayData(donors);
          // Do something with the donors data
        } else {
          console.error('Failed to fetch donors:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    fetchDonors(date, templeId);

    setSelectedDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const donors = mealsData[formattedDate] || { morning: [], evening: [] };
    setSelectedDonors(donors);
    setModalShow(true);
    console.log(donors)
  };

  const daysGrid = getMonthDaysGrid(currentMonth);

    const getMorningDonors = () => {
      const morningDonors = selectedDayData
      .filter((donor) => donor.mealType === 'morning')
      .map((donor) => `${donor.FirstName} ${donor.LastName}`);
      
      return morningDonors.length > 0 ? morningDonors : "not reserved";
    };
    const getEveningDonors = () => {
      const morningDonors = selectedDayData
      .filter((donor) => donor.mealType === 'evening')
      .map((donor) => `${donor.FirstName} ${donor.LastName}`);
      
      return morningDonors.length > 0 ? morningDonors : "not reserved";
    };

  return (
    <>
      <div className="container py-5 calform mt-5">
        <h1 className='donorcalTitle' style={{color: '#F9E0BB',textAlign: 'center'}}>Monks Calendar </h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            className='calprev'
            style={{
              backgroundColor: '#C38154',
              color: '#F9E0BB',
              '&:hover': {
                backgroundColor: '#F9E0BB',
                color: '#884A39',
              }
            }}>Last Month</Button>
          <h1 className='donorcalMonth'>{format(currentMonth, 'MMMM yyyy')}</h1>
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            style={{
              backgroundColor: '#C38154',
              color: '#F9E0BB',
              '&:hover': {
                backgroundColor: '#F9E0BB',
                color: '#884A39',
              }
            }}>Next Month</Button>
        </div>
        <div className="row border">
          {daysGrid.map((date, index) => (
            <motion.div
              key={index}
              className={`col-sm-3 col-md-2 text-center py-2 border ${isSameMonth(date, currentMonth) ? 'activedaydonor' : 'text-muted'}`}
              onClick={() => handleDayClick(date)}
              variants={dayVariants}
              whileHover="visible"
              initial="hidden"
              animate="visible"
            >
              <div>{format(date, 'E')}</div>
              <div>{format(date, 'd')}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
        >
          <Modal.Header closeButton style={{ backgroundColor: '#884A39', color: '#F9E0BB' }}>
            <Modal.Title>Donors for {selectedDate && format(selectedDate, 'PP')}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#F9E0BB' }}>
            <h5 style={{ color: '#884A39' }}>
                Morning Meal - {selectedDonors.morning.join(', ')}
            </h5>
            <h5 className="mt-3" style={{ color: '#884A39' }}>
                Evening Meal - {selectedDonors.evening.join(', ')}
            </h5>
          </Modal.Body>

          <Modal.Footer style={{ backgroundColor: '#884A39', color: '#F9E0BB' }}>
            <Button variant="secondary" onClick={() => setModalShow(false)}
              style={{
                backgroundColor: '#C38154',
                color: '#F9E0BB',
                '&:hover': {
                  backgroundColor: '#F9E0BB',
                  color: '#884A39',
                }
              }}>Close</Button>
          </Modal.Footer>
        </motion.div>
      </Modal>
    </>
  );
}

export default DonorCalendar;
