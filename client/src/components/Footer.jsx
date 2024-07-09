// Footer.js
import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="inherit" underline="none">
              About Us
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              Careers
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Link href="#" color="inherit" underline="none">
              Blog
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              Documentation
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              FAQ
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Social
            </Typography>
            <Link href="#" color="inherit" underline="none">
              Facebook
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              Twitter
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              LinkedIn
            </Link>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

