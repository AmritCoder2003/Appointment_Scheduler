import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alert';
import Layout from '../User/Layout';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getDoctorAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('http://localhost:8000/api/doctor/getAppointments', {
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

  const handleApprove = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`http://localhost:8000/api/doctor/approveAppointment/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        toast.success(response.data.message);
        getDoctorAppointments();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(`http://localhost:8000/api/doctor/deleteAppointment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        toast.success(response.data.message);
        getDoctorAppointments();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getDoctorAppointments();
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
                  <Typography variant="h5" component="div">
                   Patient:  {appointment.userInfo.name} 
                  </Typography>
                  <Typography color="textSecondary">
                   Email: {appointment.userInfo.email}
                  </Typography>
                  <Typography variant="body2" component="p">
                   Appointment Date: {appointment.date.split('T')[0]}
                  </Typography>
                  <Typography variant="body2" component="p">
                   Appointment Time: {appointment.time.split('T')[1]}
                  </Typography>
                  <Typography color="red" variant="body2" component="p">
                   Status: {appointment.status}
                  </Typography>
                  <div>
                   {appointment.status === 'pending' && <IconButton
                      color="primary"
                      onClick={() => handleApprove(appointment._id)}
                    >
                      <CheckCircleIcon />
                    </IconButton>}
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(appointment._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
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

export default DoctorAppointments;
