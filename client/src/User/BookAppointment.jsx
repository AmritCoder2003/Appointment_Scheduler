import React, { useEffect, useState } from 'react';
import Layout from '../User/Layout';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alert';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Grid, Paper, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
  date: Yup.string().required('Appointment date is required'),
  time: Yup.string().required('Appointment time is required'),
});

const BookAppointment = () => {
  const [doctor, setDoctor] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const user = useSelector((state) => state.user?.user);
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    const getData = async () => {
      dispatch(showLoading());
      try {
        const response = await axios.get(
          `http://localhost:8000/api/doctor/profile/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.status === 200) {
          setDoctor(response.data.data);
        } else {
          setDoctor(null);
          console.error('API response is not an array:', response.data);
        }
        dispatch(hideLoading());
      } catch (error) {
        console.log(error);
        dispatch(hideLoading());
      }
    };
    getData();
  }, [dispatch, params.id]);

  const formik = useFormik({
    initialValues: {
      date: '',
      time: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      console.log(doctor);
      console.log(user);
      console.log(params.id);
      console.log(user.userId);
      dispatch(showLoading());
      try {
        const response = await axios.post(
          `http://localhost:8000/api/user/appointment-booking`,
          {
            ...values,
            doctorId: params.id,
            userId: user.userId,
            doctorInfo:doctor,
            userInfo:user
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.status === 200) {
          toast.success('Appointment booked successfully');
          setTimeout(() => {
           formik.resetForm();
          }, 2000);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Error booking appointment');
        dispatch(hideLoading());
      }
    },
  });

  const handleAvailability = async () => {
    dispatch(showLoading());
    try {
        const response = await axios.post(
            `http://localhost:8000/api/user/check-availability`,
            {
                doctorId: params.id,
                date: formik.values.date,
                time: formik.values.time
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        console.log(response);
        if (response.data.success === true) {
            setIsAvailable(true);
            toast.success('Selected Slot is Available!');

        } else {
            setIsAvailable(false);
            toast.error('Selected Slot is Not Available!');
        }
    } catch (error) {
        setIsAvailable(false);
        toast.error('Error checking availability.');
        console.error(error);
    } finally {
        dispatch(hideLoading());
    }
};

 
  return (
    <Layout>
      <Container sx={{ width: { xs: '100%', md: '70%' }, ml: { xs: 0, md: 30 }, p: 3 }}>
        <Box my={1}>
          <Typography variant="h4" gutterBottom>
            Book an Appointment
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {doctor ? (
            <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </Typography>
                  <Typography variant="body1">Email: {doctor.email}</Typography>
                  <Typography variant="body1">Phone No: {doctor.phoneNumber}</Typography>
                  <Typography variant="body1">Address: {doctor.address}</Typography>
                  <Typography variant="body1">Specialization: {doctor.specialization}</Typography>
                  <Typography variant="body1">Experience: {doctor.experience} years</Typography>
                  <Typography variant="body1">Fee: ₹{doctor.fee}</Typography>
                  <Typography color={'red'} variant="h6">Timings: {doctor.schedulefrom} to {doctor.scheduleto}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color={'black'} variant="h7">Select your slot :-</Typography>
                  <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="date"
                          label="Appointment Date"
                          variant="outlined"
                          fullWidth
                          required
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.date}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.date && Boolean(formik.errors.date)}
                          helperText={formik.touched.date && formik.errors.date}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="time"
                          label="Appointment Time"
                          variant="outlined"
                          fullWidth
                          required
                          type="time"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.time}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.time && Boolean(formik.errors.time)}
                          helperText={formik.touched.time && formik.errors.time}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {!isAvailable ?<Button onClick={() => handleAvailability(true)}  sx={{ mt: 2 }} variant="contained" color="primary" fullWidth>
                          Check Availability
                        </Button>
                        :
                        <Button type="submit" sx={{ mt: 2 }} variant="contained" color="success" fullWidth>
                          Book Appointment
                        </Button>}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Typography variant="body1">Loading doctor details...</Typography>
          )}
        </Box>
      </Container>
      <ToastContainer />
    </Layout>
  );
};

export default BookAppointment;
