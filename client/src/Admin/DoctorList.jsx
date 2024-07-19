import React, { useEffect, useState } from 'react';
import Layout from '../User/Layout.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alert';
import { Grid, Card, CardContent, Typography, Container, Button } from '@mui/material';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctors = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('http://localhost:8000/api/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log(response.data.doctors);
        setDoctors(response.data.doctors); // Assuming the API returns doctors in response.data.doctors
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const handleAction =async (doctorId,status,useId) => {
    // Perform action on user (e.g., delete user, promote user, etc.)
    console.log(doctorId,status,useId);
    try {
      dispatch(showLoading());
      const response = await axios.post('http://localhost:8000/api/admin/changeDoctorStatus', {
        doctorId: doctorId,
        status: status,
        useId: useId
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log(response.data.doctors);
         getDoctors(); // Assuming the API returns doctors in response.data.doctors
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
    
  };

  return (
    <Layout>
      <Container sx={{
        width: { xs: '100%', md: '70%' },
        ml: { xs: 0, md: 30 },
        typography: 'body1',
        p: 3,
      }}>
        <Typography variant="h4" align="center" gutterBottom>
          Doctor List
        </Typography>
        <Grid container spacing={3}>
          {doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor._id}>
              <Card sx={{ backgroundColor: '#1976d2', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6">Dr. {doctor.firstName}  {doctor.lastName}</Typography>
                  <Typography color="inherit">Email: {doctor.email}</Typography>
                  <Typography color="inherit">PhoneNumber: {doctor.phoneNumber}</Typography>
                  <Typography color="inherit">Address: {doctor.address}</Typography>
                  <Typography color="inherit">Specialization: {doctor.specialization}</Typography>
                  <Typography color="inherit">Experience: {doctor.experience}</Typography>
                  <Typography color="inherit">Fee: {doctor.fee}</Typography>
                  <Typography color="inherit">ScheduleFrom: {doctor.schedulefrom}</Typography>
                  <Typography color="inherit">ScheduleTo: {doctor.scheduleto}</Typography>
                  <Typography color="inherit">CreatedAt: {doctor.createdAt}</Typography>
                  {doctor.status!="Approved" &&<Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: 'white',
                      color: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#f1f1f1',
                      },
                      mr: 2
                    }}
                    onClick={() => handleAction(doctor._id, "Approved",doctor.userId)}
                  >
                    Approve
                  </Button>}
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: 'white',
                      color: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#f1f1f1',
                      },
                      mr:2
                    }}
                    onClick={() => handleAction(doctor._id, "Blocked",doctor.userId)}
                  >
                    Block
                  </Button>
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

export default DoctorList;
