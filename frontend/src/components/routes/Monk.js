import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MonkNav from '../MonkNav/MonkNav';
import MonkFeatures from '../../pages/monk/MonkFeactures/MonkFeactures';
import AddDonor from '../../pages/monk/AddDonor/AddDonor';
import Donors from '../../pages/monk/Donors/MDonors';
import GroupDonorChat from '../../pages/monk/GroupMonkChat/GroupMonkChat';
import ReservationCalendar from '../../pages/monk/ReservationCalender/ReservationCalender';
import SendTextMessages from '../../pages/monk/SendTextMessages/SendTextMessages';
import SingleDonorChat from '../../pages/monk/SingleMonkChat/SingleMonkChat';
import ChangeProfileDetails from '../../pages/monk/ChangeProfileDetails/ChangeProfileDetails';
import ChangeDonation from '../../pages/monk/ChangeDonation/ChangeDonation';
import DonorRequest from '../../pages/monk/DonorRequest/DonorRequest';
import BlockedDonors from '../../pages/monk/BlockedDonors/BlockedDonors';
import TempleVerification from '../../pages/login-signUp/monkSignup/TempleVerification';
import CheckTempleStatus from '../../pages/monk/CheckTempleStatus';
import SpecialReservation from '../../pages/monk/SpecialReservation';

function Monk() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 ">
                    <MonkNav />
                </div>
                <div className="col-sm-10 ">
                    <Routes>
                    <Route path="/" element={<MonkFeatures />} />
                        <Route path="/monk-features" element={<MonkFeatures />} />
                        <Route path="/add-donor" element={<AddDonor />} />
                        <Route path="/donors" element={<Donors />} />
                        <Route path="/special-requests" element={<SpecialReservation />} />
                        <Route path="/group-donor-chat" element={<GroupDonorChat />} />
                        <Route path="/reservation-calendar" element={<ReservationCalendar />} />
                        <Route path="/send-text-messages" element={<SendTextMessages />} />
                        <Route path="/single-donor-chat" element={<SingleDonorChat />} />
                        <Route path="/change-profile-details" element={<ChangeProfileDetails />} />
                        <Route path="/change-donation" element={<ChangeDonation />} />
                        <Route path="/donor-request" element={<DonorRequest />} />
                        <Route path="/blocked-donors" element={<BlockedDonors />} />
                        <Route path="/temple-verification" element={<TempleVerification />} />
                        <Route path="/temple-status" element={<CheckTempleStatus />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Monk;
