import React, { useState } from 'react';
import { Box, Avatar, Drawer, AppBar, Toolbar, Typography, CssBaseline, Badge, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';

const drawerWidth = 240;
const userMenu = [
    { title: 'Home', path: '/home2', icon: <HomeIcon /> },
    { title: 'Appointments', path: '/appointments', icon: <ScheduleIcon /> },
    { title: 'Apply Doctor', path: '/applydoctor', icon: <LocalHospitalIcon /> },
    { title: 'Profile', path: '/profile', icon: <AccountCircleIcon /> },
    
];
const adminMenu = [
  { title: 'Home', path: '/home2', icon: <HomeIcon /> },
  {title:'Users',path:'/users',icon:<AccountCircleIcon/>},
  {title:'Doctors',path:'/doctors',icon:<GroupIcon/>},
  { title: 'Profile', path: '/profile', icon: <LocalHospitalIcon /> },
  
];

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((state) => state.user?.user);
  // console.log(user);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const renderMenu=user?.isAdmin?adminMenu:userMenu;
  // console.log(user);
  const drawer = (
    <Box sx={{ overflow: 'auto', backgroundColor: '#3f51b5', color: 'white', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ ml: 2 }} noWrap component="div">
          Scheduler
        </Typography>
      </Toolbar>
      <List>
        {renderMenu.map((item, index) => (
          <ListItem button key={index} onClick={() => navigate(item.path)}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <ListItem button  onClick={() =>{
        localStorage.removeItem('token');
        navigate('/login');
      }}>
        <ListItemIcon sx={{ color: 'white' }}><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Box>
  );

 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            Header
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {user?.name || 'Guest'}
            </Typography>
            <Avatar sx={{ ml: 2 }}>{user?.name?.charAt(0) || 'G'}</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Main Content
        </Typography>
        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
