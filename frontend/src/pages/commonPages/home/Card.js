 
import React from 'react';
import './Card.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

const Card = ({ imageSrc, description }) => {
  return (
    <div className="component">
      <img src={imageSrc} alt="image" className="image" />
      <div className="description" style={{ opacity: 1, fontSize: 25 }}>
        {description}
      </div>
    </div>
  );
}

export default Card;
