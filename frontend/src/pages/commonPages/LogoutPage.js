import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loginType');
        localStorage.removeItem('loginUsername');

        navigate('/login');
    };

    return (
        <div>
            <h2>Logout</h2>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LogoutPage;
