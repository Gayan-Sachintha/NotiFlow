import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const RoundButton = ({ text, onClick }) => {
    return <button className="round-button" onClick={onClick}>{text}</button>;
};

const CommonNav = () => {

  const logintype = localStorage.getItem('loginType');



  let navigate = useNavigate();
  const [isDonorApproved, setIsDonorApproved] = useState(false);
  const [isMonkApproved, setMonkApproved] = useState(false);

  useEffect(() => {
    const loginType = localStorage.getItem('loginType');
    const loginUsername = localStorage.getItem('loginUsername');

    console.log(loginType, loginUsername);
    
    if (loginType === "donor" && loginUsername) {
      checkDonorApproval(loginUsername).then(isApproved => {
        setIsDonorApproved(isApproved);
		console.log(isApproved)
      });
    }else if(loginType === "monk" && loginUsername){
            setMonkApproved(true);
    }
  }, []);

  const checkDonorApproval = async (email) => {
    const response = await fetch(`http://localhost:3002/user/donor/approval?email=${email}`);
    const data = await response.json();
    return data.isApproved;
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">About</Link></li>
		{logintype === "donor" && (
			<RoundButton text="Donor Dashboard" onClick={() => navigate('/donor')} />
		)}
		{logintype === "monk" && (
			<RoundButton text="Monk Dashboard" onClick={() => navigate('/monk')} />
		)}
        <li className="right">
          <div className='btns'>
           {logintype == null && (<div> <RoundButton text="Login" onClick={() => navigate('/login')} />
            </div>)}
            
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default CommonNav;
