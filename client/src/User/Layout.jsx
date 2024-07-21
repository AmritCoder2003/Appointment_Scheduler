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
    { title: 'Appointments', path: '/user/appointments', icon: <ScheduleIcon /> },
    { title: 'Apply Doctor', path: '/docForm', icon: <LocalHospitalIcon /> },
    { title: 'Profile', path: '/profile', icon: <AccountCircleIcon /> },
    
];
const adminMenu = [
    { title: 'Home', path: '/home2', icon: <HomeIcon /> },
    { title: 'Users', path: '/users', icon: <AccountCircleIcon /> },
    { title: 'Doctors', path: '/doctors', icon: <GroupIcon /> },
    { title: 'Profile', path: '/admin/profile', icon: <LocalHospitalIcon /> },
];

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = useSelector((state) => state.user?.user);
    const [selectedItem, setSelectedItem] = useState("/home2");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuItemClick = (path) => {
        setSelectedItem(path);
        navigate(path);
    };

    const doctorMenu =  [
        { title: 'Home', path: '/home2', icon: <HomeIcon /> },
        { title: 'Appointments', path: '/doctor/appointments', icon: <ScheduleIcon /> },
        { title: 'Profile', path: `/doctor/profile/${user?.userId}`, icon: <AccountCircleIcon /> },
    ] ;

    const renderMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    

    const drawer = (
        <Box sx={{ overflow: 'auto', backgroundColor: '#3f51b5', color: 'white', height: '100%' }}>
            <Toolbar sx={{size: 'large'}} >
                {user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User"}
            </Toolbar>
            <List>
                {renderMenu.map((item, index) => (
                    <ListItem 
                        button 
                        key={index} 
                        onClick={() => handleMenuItemClick(item.path)}
                        sx={{ 
                            backgroundColor: selectedItem === item.path ? '#303f9f' : 'inherit',
                            '&:hover': {
                                backgroundColor: '#303f9f',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
            <ListItem button onClick={() => {
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
            <AppBar position="fixed" sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` } }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {isMobile && (
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap component="div">
                        Appointment Scheduler
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => navigate('/notifications')} color="inherit">
                            <Badge  badgeContent={user?.noti?.length || 0} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {user ? (
                            <>
                                <Typography variant="body1" sx={{ ml: 2 }}>
                                    {user.isAdmin ? 'admin' : user.name || 'Guest'}
                                </Typography>
                                <Avatar sx={{ ml: 2, bgcolor: 'success.main' }}>{user.isAdmin ? 'Ad' : user.name?.charAt(0) || 'G'}</Avatar>
                            </>
                        ) : (
                            <Typography variant="body1" sx={{ ml: 2 }}>
                                Guest
                            </Typography>
                        )}
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
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <Box>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
