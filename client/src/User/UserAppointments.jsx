import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alert';
import Layout from '../User/Layout';
const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getUsersAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('http://localhost:8000/api/user/getAppointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log(response.data.data);
        setAppointments(response.data.data); 
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getUsersAppointments();
  }, []);

  

  return (
    <Layout>
    <Container sx={{
        width: { xs: '100%', md: '70%' },
        ml: { xs: 0, md: 30 },
        typography: 'body1',
        p: 3,
      }}>
      <Typography variant="h4" sx={{ marginBottom: '30px' }}>
        Your Appointments
      </Typography>
      <Grid container spacing={3}>
        {appointments.map(appointment => (
          <Grid item xs={12} sm={6} md={4} key={appointment._id}>
            <Card sx={{ minWidth: 275, marginBottom: '20px' }}>
              <CardContent>
                <Typography color="primary" variant="h5" component="div">
                  Dr. {appointment.doctorInfo.firstName} {appointment.doctorInfo.lastName}
                </Typography>
                <Typography color="textSecondary">
                 Email: {appointment.doctorInfo.email}

                </Typography>
                <Typography variant="body2" component="p">
                 PhoneNumber: {appointment.doctorInfo.phoneNumber}
                </Typography>
                <Typography variant="body2" component="p">
                 Address: {appointment.doctorInfo.address}
                </Typography>
                <Typography variant="body2" component="p">
                 Specialization:  {appointment.doctorInfo.specialization}
                </Typography>
                <Typography variant="body2" component="p">
                 Fee: Rs. {appointment.doctorInfo.fee}
                </Typography>
                <Typography color="red" variant="body2" component="p">
                 Appointment Date: {appointment.date.split('T')[0]}
                </Typography>
                <Typography color="red"   variant="body2" component="p">
                 Appointment Time: {appointment.time.split('T')[1]}
                </Typography>
                <Typography color="red" variant="body2" component="p">
                 Status: {appointment.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastContainer />
    </Container>
    </Layout>
  );
};

export default UserAppointments;
