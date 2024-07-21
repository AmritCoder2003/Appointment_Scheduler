import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBackHome = () => {
    navigate('/');
  };

  return (
    <Container sx={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h1" sx={{ fontSize: '3rem', marginBottom: '20px' }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '30px' }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px' }}
        onClick={handleGoBackHome}
      >
        Go Back Home
      </Button>
    </Container>
  );
};

export default PageNotFound;
