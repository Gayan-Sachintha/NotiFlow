import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './DonorNav.css';  

function DonorNav() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <div className="donorDrawer">
            <div className="donorTemplename">Gangaramaya Temple</div>
            <List>
                {[
                    { text: 'Add Your Reservation', link: '/donor/add-donor-reservation-date' },
                    { text: 'Ask Special Reservation', link: '/donor/ask-special-donor' },
                    { text: 'Group Chat', link: '/donor/group-donor-chat' },
                    { text: 'Chat with Monk', link: '/donor/single-donor-chat' },
                    { text: 'Reservation Calendar', link: '/donor/reservation-calendar' },
                ].map((item) => (
                    <ListItem button key={item.text} className="donor-list-item">
                        <Link to={item.link} className="donor-link-nav">
                            <ListItemText primary={item.text} />
                        </Link>
                    </ListItem>
                ))}
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
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawerContent}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </div>
    );
}

export default DonorNav;
