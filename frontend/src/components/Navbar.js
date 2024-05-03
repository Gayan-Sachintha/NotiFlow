 
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  

const RoundButton = ({ text, onClick }) => {
    return (
      <button className="round-button" onClick={onClick}>
        {text}
      </button>
    );
  };

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li className="right">
        <div className='btns'>
      <RoundButton text="Login" onClick={() => console.log("Login clicked")} /> 
      <RoundButton text="Sign Up" onClick={() => console.log("Sign Up clicked")} />
    </div>
        </li>
       
      </ul>
    </nav>
  );
}

export default Navbar;
