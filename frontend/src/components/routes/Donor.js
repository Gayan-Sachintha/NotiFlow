import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DonorNav from '../donorNav/DonorNav';
import AddDonorReservationDate from '../../pages/donor/AddDonorReservationDate/AddDonorReservationDate';
import AskSpecialDonor from '../../pages/donor/AskSpecialDonor/AskSpecialDonor';
import GroupDonorChat from '../../pages/donor/GroupDonorChat/GroupDonorChat';
import SingleDonorChat from '../../pages/donor/SingleDonorChat/SingleDonorChat';
import ReservationCalender from '../../pages/donor/ReservationCalender/ReservationCalender'

function Donor() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2">
                    <DonorNav />
                </div>
                <div className="col-sm-10">
                    <Routes>
                        <Route path="/add-donor-reservation-date" element={<AddDonorReservationDate />} />
                        <Route path="/ask-special-donor" element={<AskSpecialDonor />} />
                        <Route path="/group-donor-chat" element={<GroupDonorChat />} />
                        <Route path="/reservation-calendar" element={<ReservationCalender />} />
                        <Route path="/single-donor-chat" element={<SingleDonorChat />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Donor;
