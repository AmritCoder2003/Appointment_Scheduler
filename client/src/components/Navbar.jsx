import { AppBar, Toolbar, Typography, Button, IconButton, Stack } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <AppBar position='static' color='primary'>
            <Toolbar>
                <IconButton size='large' edge="start" color="inherit" aria-label="logo">
                    <HealthAndSafetyIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Hospital Appointment Scheduler
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button
                        component={Link}
                        to="/login"
                        variant='contained'
                        color="success"
                    >
                        Login
                    </Button>
                    <Button
                        component={Link}
                        to="/register"
                        variant='contained'
                        color="success"
                    >
                        Register
                    </Button>
                </Stack>
                
            </Toolbar>
        </AppBar>
    );
};
