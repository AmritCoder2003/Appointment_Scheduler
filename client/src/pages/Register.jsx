import React,{ useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, styled } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Styled components
const RegisterWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(4),
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

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name,setName]=useState('');
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(email, password, confirmPassword, name);
    if(!email || !password || !confirmPassword || !name){
      toast.error('Please fill in all fields');
      return;
    }
    if(password.length < 6){
      toast.error('Password must be at least 6 characters');
      return;
    }
    if(password !== confirmPassword){
      toast.error('Passwords do not match');
      return;
    }
    try{
      const response = await axios.post('http://localhost:8000/api/user/register', {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      })
      if(response.status === 201){
        toast.success(response.data.message);
      }
      toast.success("Go to login page");
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  };

  return (
    <RegisterWrapper  >
      <Container align="center" >
        <FormWrapper>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </Grid>
            </Grid>
            <SubmitButton
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              Register
            </SubmitButton>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account? <a href="/login">Login</a>
            </Typography>
          </form>
        </FormWrapper>
      </Container>
      <ToastContainer />
    </RegisterWrapper>
  );
};

export default RegisterPage;
