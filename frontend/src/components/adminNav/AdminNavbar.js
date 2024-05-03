import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Typography, Divider } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  AppstoreOutlined,
  LogoutOutlined  
} from '@ant-design/icons';
// import 'antd/dist/antd.css';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

const AdminNavbar = () => {
  return (
    <Sider collapsible style={{ height: '100vh' }}>
      <div className="logo" />
      
      {/* Hello Admin */}
      <div style={{ padding: '16px 24px', textAlign: 'center' }}>
        <Text strong style={{ color: 'white' }}>Hello Admin</Text>
        <Divider style={{ margin: '8px 0' }} />
      </div>

      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
        
        {/* SubMenu for Temple */}
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Temple">
          <Menu.Item key="2">
            <Link to="/admin/temple">Manage Temples</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/admin/temple-requests">Temple Requests</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/admin/temple-block">Blocked Temples</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<UserOutlined />} title="Donors">
          <Menu.Item key="5">
            <Link to="/admin/donors">Manage Donors</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/admin/donor-block">Blocked Donors</Link>
          </Menu.Item>
        </SubMenu>

      </Menu>
      
      {/* Logout Button */}
      <div style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)' }}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['logout']} style={{ border: 'none' }}>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default AdminNavbar;
