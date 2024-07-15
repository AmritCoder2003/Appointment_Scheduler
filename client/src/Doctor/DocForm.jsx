import React from 'react';
import { Box, TextField, Button, Typography, Grid, Paper, Divider } from '@mui/material';
import Layout from '../User/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alert';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string().required('Phone Number is required').min(10, 'Phone Number must be 10 digits'),
  address: Yup.string().required('Address is required'),
  specialization: Yup.string().required('Specialization is required'),
  experience: Yup.string().required('Experience is required'),
  fee: Yup.number().required('Consultation Fee is required'),
  schedulefrom: Yup.string().required('Schedule From is required'),
  scheduleto: Yup.string().required('Schedule To is required'),
});

const DocForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  console.log(user);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      specialization: '',
      experience: '',
      fee: '',
      schedulefrom: '',
      scheduleto: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      
      try {
        dispatch(showLoading());
        const response = await axios.post("http://localhost:8000/api/doctor/register", {
          ...values,
          userId: user?.userId,
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(hideLoading());
        if (response.status === 201) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate('/home2');
          },2000)
          
        } else {
          toast.error(response.data.message);
          navigate('/docForm');
        }
      } catch (err) {
        dispatch(hideLoading());
        console.log(err);
      }
    },
  });

  return (
    <Layout>
      <Paper elevation={4} sx={{ p: 4, maxWidth: 800, margin: 'auto', mt: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Doctor Application Form
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                required
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                required
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="specialization"
                label="Specialization"
                variant="outlined"
                fullWidth
                required
                value={formik.values.specialization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                helperText={formik.touched.specialization && formik.errors.specialization}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="experience"
                label="Experience"
                variant="outlined"
                fullWidth
                required
                value={formik.values.experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.experience && Boolean(formik.errors.experience)}
                helperText={formik.touched.experience && formik.errors.experience}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="fee"
                label="Consultation Fee"
                variant="outlined"
                fullWidth
                required
                value={formik.values.fee}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fee && Boolean(formik.errors.fee)}
                helperText={formik.touched.fee && formik.errors.fee}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="schedulefrom"
                label="Schedule From"
                variant="outlined"
                fullWidth
                required
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formik.values.schedulefrom}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.schedulefrom && Boolean(formik.errors.schedulefrom)}
                helperText={formik.touched.schedulefrom && formik.errors.schedulefrom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="scheduleto"
                label="Schedule To"
                variant="outlined"
                fullWidth
                required
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formik.values.scheduleto}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.scheduleto && Boolean(formik.errors.scheduleto)}
                helperText={formik.touched.scheduleto && formik.errors.scheduleto}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="success" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <ToastContainer />
    </Layout>
  );
};

export default DocForm;
