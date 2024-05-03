import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Monk from './components/routes/Monk';
import Donor from './components/routes/Donor';
import Admin from './components/routes/Admin';
import CommonNav from './components/commonNavbar/CommonNav';
import AdminLogin from './pages/admin/login-signup/AdminLogin';
import Login from './pages/login-signUp/Login';
import UserSignup from './components/routes/UserSignup';
import Home from './pages/commonPages/home/Home';
import LogoutPage from './pages/commonPages/LogoutPage';

import Dashboard from './pages/admin/dashboard/Dashboard';
import AdminTemple from './pages/admin/adminTemples/AdminTemple';
import AdminDonors from './pages/admin/adminDonors/AdminDonors';
import AdminTempleRequest from './pages/admin/AdminTempleRequest/AdminTempleRequest';
import BlockedTemples from './pages/admin/blockedTemples/BlockedTemples'

import AdminBlockedDonors from './pages/admin/adminBlockedDonors/AdminBlockedDonors';  

import DonorSingleChat from './pages/donor/SingleDonorChat/SingleDonorChat';  
import MonkSingleChat from './pages/monk/SingleMonkChat/SingleMonkChat';  
import MonkGroupChat from './pages/monk/GroupMonkChat/GroupMonkChat';  

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
    const [loginType, setLoginType] = useState(localStorage.getItem('loginType'));
    const [loginUsername, setLoginUsername] = useState(localStorage.getItem('loginUsername'));

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('loggedIn') === 'true');
        setLoginType(localStorage.getItem('loginType'));
        setLoginUsername(localStorage.getItem('loginUsername'));
    }, []);

    // DEBUGGING AREA
    // const [isLoggedIn, setIsLoggedIn] = useState(true); 
    // const [loginType, setLoginType] = useState('monk');
    // const [loginUsername, setLoginUsername] = useState('user123');

    // useEffect(() => {
    //     setIsLoggedIn(true); 
    //     setLoginType('monk');
    //     setLoginUsername('user123');
    // }, []);

    const RouteGuard = ({ children }) => {
        let location = useLocation();
        if (!isLoggedIn && location.pathname !== '/login') {
            return <Navigate to="/login" replace />;
        } else {
            if (isLoggedIn) {
                if (loginType === 'monk' && location.pathname.startsWith('/monk')) {
                    return <Monk />;
                } else if (loginType === 'donor' && location.pathname.startsWith('/donor')) {
                    return <Donor />;
                } else {
                    return children;
                }
            } else {
                return children;
            }
        }
    };

    return (
        <Router>
            {/* {isLoggedIn && <CommonNav />} */}
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<Admin />} >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="temple" element={<AdminTemple />} />
                    <Route path="donors" element={<AdminDonors />} />
                    <Route path="temple-requests" element={<AdminTempleRequest />} />
                    <Route path="temple-block" element={<BlockedTemples />} />
                    <Route path="donor-block" element={<AdminBlockedDonors />} />
                </Route>
                <Route path="/donor/*" element={<RouteGuard><Donor /></RouteGuard>} />
                <Route path="/monk/*" element={<RouteGuard><Monk /></RouteGuard>} />
                <Route path="/user-signup/*" element={<UserSignup />} />
                <Route path="/logout" element={<LogoutPage />} />

                <Route path="/DonorSingleChat" element={<DonorSingleChat />} />
                <Route path="/monk/MonkSingleChat" element={<MonkSingleChat />} />
                <Route path="/monk/MonkGroupChat" element={<MonkGroupChat />} />
                
            </Routes>
        </Router>
    );
}

export default App;