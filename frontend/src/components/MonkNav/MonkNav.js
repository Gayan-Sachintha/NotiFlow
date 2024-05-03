import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MonkNav.css';
import { useNavigate } from "react-router-dom";

function MonkNav() {
    const monkname = localStorage.getItem('MonkName');

    const navigate = useNavigate(); 

    const [mobileOpen, setMobileOpen] = useState(false);
    const [templeStatus, setTempleStatus] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchTempleStatus = async () => {
            try {
                var monkEmail = localStorage.getItem('loginUsername')
                const response = await axios.get(`http://localhost:3002/temple/getMonkTemple/${monkEmail}/0`);
                if (response.data.error) {
                    setTempleStatus(response.data.error);
                }
            } catch (error) {
                console.error('Failed to fetch temple status:', error);
            }
        };
        
        fetchTempleStatus();
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // const handleLogout = () => {
    //     alert('Logout', 'Are you sure you want to logout?', [
    //         { text: 'Yes', onPress: () => {
    //         localStorage.clear();
    //         window.location.href = '/login';
    //         }, style: 'default' },
    //         { text: 'Cancel', style: 'cancel' },
    //     ]);
    // }
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
    
        if (confirmLogout) {
            navigate('/logout');
        }
      };

    const filteredItems = [
        { text: 'Monk Features', link: '/monk/monk-features', icon: 'bi bi-bullseye' },
        { text: 'Special Requests', link: '/monk/special-requests', icon: 'bi bi-building' },
        { text: 'Add Donor', link: '/monk/add-donor', icon: 'bi bi-person-plus' },
        { text: 'Donors', link: '/monk/donors', icon: 'bi bi-people' },
        { text: 'Blocked Donors', link: '/monk/blocked-donors', icon: 'bi bi-people' },
        { text: 'Donor Requests', link: '/monk/donor-request', icon: 'bi bi-check' },
        { text: 'Reservation Calendar', link: '/monk/reservation-calendar', icon: 'bi bi-calendar' },
        { text: 'Change Reservation Date', link: '/monk/change-donation', icon: 'bi bi-calendar' },
        { text: 'Single Donor Chat', link: '/monk/single-donor-chat', icon: 'bi bi-chat-right-dots' },
        { text: 'Group Donor Chat', link: '/monk/group-donor-chat', icon: 'bi bi-chat-dots' },
        { text: 'Send Text Messages', link: '/monk/send-text-messages', icon: 'bi bi-envelope' },
        { text: 'Change Profile Details', link: '/monk/change-profile-details', icon: 'bi bi-gear' },
        { text: 'Temple Verification', link: '/monk/temple-verification', icon: 'bi bi-building' },
        { text: 'Check Temple Verification', link: '/monk/temple-status', icon: 'bi bi-building' } 
    ].filter(item => {
        if (templeStatus === 'notapproved') {
            return item.link === '/monk/temple-status';
        } else if (templeStatus === 'notfound') {
            return item.link === '/monk/temple-verification';
        }
        return item.link !== '/monk/temple-verification';
    });

    const drawerContent = (
        <div className="monk-nav-container">
            <Box className="monk-name-section">
                {monkname}
            </Box>
            <List className='navlistMonk'>
                {filteredItems.map((item, index) => (
                    <ListItem button key={index} component={Link} to={item.link} className="monk-nav-item">
                        <i className={item.icon}></i>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                <ListItem button  className="monk-nav-item" onClick={() => {handleLogout()}}>
                    
                        <ListItemText primary="logout" />
                    </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'block' } }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawerContent}
            </Drawer>
        </div>
    );
}

export default MonkNav;
