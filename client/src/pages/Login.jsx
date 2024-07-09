import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, styled } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alert';

// Styled components
const LoginWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(4),
  color: theme.palette.text.primary,
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      dispatch(showLoading());
      const response = await axios.post('http://localhost:8000/api/user/login', {
        email,
        password
      });

      dispatch(hideLoading());
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log(response.data.token);
        localStorage.setItem('token', response.data.data);
        toast.info('Redirecting to dashboard...');
        setTimeout(() => {
          window.location.href = '/home2';
        }, 2000);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <LoginWrapper>
      <Container align="center">
        <FormWrapper>
          
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
            </Grid>
            <SubmitButton
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              Login
            </SubmitButton>
            <Typography variant="body2" align="center" gutterBottom>
              Don't have an account? <a href="/register">Register</a>
            </Typography>
          </form>
        </FormWrapper>
      </Container>
      <ToastContainer />
    </LoginWrapper>
  );
};

export default LoginPage;
