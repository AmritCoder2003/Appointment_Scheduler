import React, { useEffect } from 'react';
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

const UpdateDoctor = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);



  const getUser = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.post("http://localhost:8000/api/doctor/doctorinfo", {

      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      console.log(response.data);
      if (response.status === 200) {
        formik.setFieldValue("firstName", response.data.data.firstName);
        formik.setFieldValue("lastName", response.data.data.lastName);
        formik.setFieldValue("email", response.data.data.email);
        formik.setFieldValue("phoneNumber", response.data.data.phoneNumber);
        formik.setFieldValue("address", response.data.data.address);
        formik.setFieldValue("specialization", response.data.data.specialization);
        formik.setFieldValue("experience", response.data.data.experience);
        formik.setFieldValue("fee", response.data.data.fee);
        formik.setFieldValue("schedulefrom", response.data.data.schedulefrom);
        formik.setFieldValue("scheduleto", response.data.data.scheduleto);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
        const response = await axios.patch("http://localhost:8000/api/doctor/update", {
             address: values.address,
             experience: values.experience,
             fee:values.fee,
             schedulefrom:values.schedulefrom,
             scheduleto:values.scheduleto,
          
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(hideLoading());
        if (response.status === 200) {

          formik.setFieldValue("firstName", response.data.data.firstName);
          formik.setFieldValue("lastName", response.data.data.lastName);
          formik.setFieldValue("email", response.data.data.email);
          formik.setFieldValue("phoneNumber", response.data.data.phoneNumber);
          formik.setFieldValue("address", response.data.data.address);
          formik.setFieldValue("specialization", response.data.data.specialization);
          formik.setFieldValue("experience", response.data.data.experience);
          formik.setFieldValue("fee", response.data.data.fee);
          formik.setFieldValue("schedulefrom", response.data.data.schedulefrom);
          formik.setFieldValue("scheduleto", response.data.data.scheduleto);
          toast.success("Profile Updated successfully");

          
        } else {
          toast.error(response.data.message);
          
        }
      } catch (err) {
        dispatch(hideLoading());
        console.log(err);
      }
    },
  });

  return (
    <Layout>
      <Paper elevation={4} sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Doctor Profile
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
                disabled
                
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <ToastContainer />
    </Layout>
  );
};

export default UpdateDoctor;
