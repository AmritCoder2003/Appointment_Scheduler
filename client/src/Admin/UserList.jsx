import React, { useEffect, useState } from 'react';
import Layout from '../User/Layout.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alert';
import { Grid, Card, CardContent, Typography, Container, Button } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('http://localhost:8000/api/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log(response.data.users);
        setUsers(response.data.users); // Assuming the API returns users in response.data.users
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleAction = (userId) => {
    // Perform action on user (e.g., delete user, promote user, etc.)
    console.log(`Action taken on user with ID: ${userId}`);
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
          User List
        </Typography>
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card sx={{ backgroundColor: '#1976d2', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6">Name: {user.name}</Typography>
                  <Typography color="inherit">Email: {user.email}</Typography>
                  <Typography color="inherit">CreatedAt: {user.createdAt}</Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: 'white',
                      color: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#f1f1f1',
                      },
                    }}
                    onClick={() => handleAction(user.id)}
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

export default UserList;
