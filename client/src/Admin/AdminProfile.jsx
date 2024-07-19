import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../User/Layout';
import { useSelector } from 'react-redux';
// Create styled components for the profile card
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: 'auto',
  marginTop: theme.spacing(5),
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  margin: 'auto',
}));

const StyledName = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontWeight: 'bold',
}));

const StyledEmail = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const AdminProfile = () => {
    const {user}=useSelector((state)=>state.user);
  return (
    <Layout>
    <StyledCard>
      <CardContent>
        <StyledAvatar alt="Leo Messi" src="/path/to/messi.jpg" />
        <StyledName variant="h5">
         {user.name}
        </StyledName>
        <StyledEmail variant="body1">
          {user.email}
        </StyledEmail>
       
      </CardContent>
    </StyledCard>
    </Layout>
  );
};

export default AdminProfile;
