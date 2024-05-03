import React, { useState, useEffect } from 'react';
import { Modal, ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isSameMonth } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChangeDonation.css';
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

function UpdateMealDonor() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDonors, setSelectedDonors] = useState({ morning: [], evening: [] });
  const [mealsData, setMealsData] = useState({});
  const [donors, setDonors] = useState([]);
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


  useEffect(() => {
    axios.get(`http://localhost:3002/monk/getDonorsForTemple/${templeId}`)
      .then(response => setDonors(response.data))
      .catch(error => console.error('Error fetching donors:', error));
  }, [templeId]);

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
  }, [currentMonth, templeId]);

  const handleDayClick = (date) => {

    
    setSelectedDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedDonors(mealsData[formattedDate] || { morning: [], evening: [] });
    setModalShow(true);
  };

  const daysGrid = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth))
  });

  const updateMealDonor = async (date, mealType, donorId) => {
    try {
      await axios.post(`http://localhost:3002/monk/updateMealDonor`, {
        date: format(date, 'yyyy-MM-dd'),
        mealType,
        donorId,
        templeId: templeId,
      });
      alert('Donor updated successfully');
    } catch (error) {
      console.error('Error updating meal donor:', error);
      alert('No meal found to update');
    }
  };

  const removeMealDonor = async (date, mealType) => {
    try {
      await axios.post(`http://localhost:3002/monk/removeMealDonor`, {
        date: format(date, 'yyyy-MM-dd'),
        mealType,
      });
      alert('Donor updated successfully');
    } catch (error) {
      console.error('Error updating meal donor:', error);
      alert('No meal found to update');
    }
  };

  return (
    <>
      <div className="container py-5 calform mt-5">
        <h1 className='donorcalTitle' style={{ color: '#F9E0BB', textAlign: 'center' }}>Monks Calendar</h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} className='calprev' style={{
            backgroundColor: '#C38154', color: '#F9E0BB', '&:hover': { backgroundColor: '#F9E0BB', color: '#884A39' }
          }}>Last Month</Button>
          <h1 className='donorcalMonth'>{format(currentMonth, 'MMMM yyyy')}</h1>
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} style={{
            backgroundColor: '#C38154', color: '#F9E0BB', '&:hover': { backgroundColor: '#F9E0BB', color: '#884A39' }
          }}>Next Month</Button>
        </div>
        <div className="row border">
          {daysGrid.map((date, index) => (
            <motion.div key={index} className={`col-sm-3 col-md-2 text-center py-2 border ${isSameMonth(date, currentMonth) ? 'activedaydonor' : 'text-muted'}`} onClick={() => handleDayClick(date)} variants={dayVariants} whileHover="visible" initial="hidden" animate="visible">
              <div>{format(date, 'E')}</div>
              <div>{format(date, 'd')}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#884A39', color: '#F9E0BB' }}>
          <Modal.Title>Donors for {selectedDate && !isNaN(new Date(selectedDate).valueOf()) ? format(new Date(selectedDate), 'PP') : 'Invalid Date'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#884A39', color: '#F9E0BB' }}>
          <br></br> Evening Meal - {selectedDonors.morning.join(', ')} 
          <hr></hr>
          <DropdownButton id="dropdown-basic-button" title="Morning Meal Donor" variant="secondary">
            {donors.map((donor) => (
              <Dropdown.Item key={donor.DonorID} onClick={() => updateMealDonor(selectedDate, 'morning', donor.DonorID)}>
                {donor.FirstName} {donor.LastName}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <Button className='btn btn-primary mt-2' variant="primary" onClick={() => removeMealDonor(selectedDate, 'morning')}>Remove Donor From Morning Reservation</Button>
          <hr></hr><br></br> Morning Meal - {selectedDonors.evening.join(', ')}
          <hr></hr>
          <DropdownButton id="dropdown-basic-button" title="Evening Meal Donor" variant="secondary" className="mt-2">
            {donors.map((donor) => (
              <Dropdown.Item key={donor.DonorID} onClick={() => updateMealDonor(selectedDate, 'evening', donor.DonorID)}>
                {donor.FirstName} {donor.LastName} 
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <Button className='btn btn-primary mt-2' variant="primary" onClick={() => removeMealDonor(selectedDate, 'evening')}>Remove Donor From Evening Reservation</Button>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#884A39', color: '#F9E0BB' }}>
          <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateMealDonor;
