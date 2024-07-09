import React from 'react';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isSelected = (path) => {
    return location.pathname === path;
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#3f51b5',
          color: '#fff',
        },
      }}
    >
      <Toolbar />
      <Divider variant="middle" sx={{ borderColor: "white" }} />
      <List>
        <ListItem button onClick={() => handleNavigation('/home2')} selected={isSelected('/')}>
          <ListItemIcon sx={{ color: '#fff' }}><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/appointments')} selected={isSelected('/appointments')}>
          <ListItemIcon sx={{ color: '#fff' }}><CalendarTodayIcon /></ListItemIcon>
          <ListItemText primary="Appointments" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/applydoctor')} selected={isSelected('/apply-doctor')}>
          <ListItemIcon sx={{ color: '#fff' }}><PersonAddIcon /></ListItemIcon>
          <ListItemText primary="Apply Doctor" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/logout')} selected={isSelected('/logout')}>
          <ListItemIcon sx={{ color: '#fff' }}><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
