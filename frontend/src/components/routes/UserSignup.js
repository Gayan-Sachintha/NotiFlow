// UserSignup.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MonkSignup from '../../pages/login-signUp/monkSignup/MonkSignup';
import DonorSignup from '../../pages/login-signUp/donorSignup/DonorSignup';

function UserSignup() {
  return (
    <Routes>
      <Route path="/monk" element={<MonkSignup />} />
      <Route path="/donor" element={<DonorSignup />} />
    </Routes>
  );
}

export default UserSignup;
