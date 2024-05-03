import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Dashboard from '../../pages/admin/dashboard/Dashboard';
import AdminTemple from '../../pages/admin/adminTemples/AdminTemple';
import AdminDonors from '../../pages/admin/adminDonors/AdminDonors';
import AdminTempleRequest from '../../pages/admin/AdminTempleRequest/AdminTempleRequest';
import BlockedTemples from '../../pages/admin/blockedTemples/BlockedTemples'
import AdminNavbar from '../adminNav/AdminNavbar';
import AdminBlockedDonors from '../../pages/admin/adminBlockedDonors/AdminBlockedDonors';  

const { Content } = Layout;

const Admin = () => {
  return (
    <Layout>
      <AdminNavbar /> {/* Assuming AdminNavbar includes the Sider */}
      <Layout>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', }}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/temple" element={<AdminTemple />} />
              <Route path="/donors" element={<AdminDonors />} />
              <Route path="/temple-requests" element={<AdminTempleRequest />} />
              <Route path="/temple-block" element={<BlockedTemples />} />
              <Route path="/donor-block" element={<AdminBlockedDonors />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
