import React from 'react';
import './Card.css'; 

const Card = () => {
  return (
    <div className="component">
      <img src="path/to/image.jpg" alt="Description" className="image" />
      <div className="description" style={{ opacity: 1, fontSize:25}}>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget purus id nisi vestibulum luctus. 
      </div>
    </div>
  );
}

export default Card;
