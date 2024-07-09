import React from 'react';
import { Container, Typography, Button, Grid, Box, styled, useTheme } from '@mui/material';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import ChatIcon from '@mui/icons-material/Chat';
// Styled components
const HeroSectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(8, 0),
  textAlign: 'center',
}));

const HeroText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 'bold',
}));

const HeroButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.2rem',
}));

const HeroImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
}));

const FeatureText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const HomePage = () => {
  const theme = useTheme();

  return (
    <>
      {/* Hero Section */}
      <HeroSectionWrapper theme={theme}>
        <Container>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <HeroText variant="h4"  theme={theme}>
                Schedule Your Appointment Easily
              </HeroText>
              <HeroText variant="h5" theme={theme}>
                Our hospital appointment scheduler helps you book appointments with ease and convenience.
              </HeroText>
              <HeroButton variant="contained" color="success" theme={theme}>
                Book Now
              </HeroButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <HeroImage
                src="https://plus.unsplash.com/premium_photo-1706544427087-9f8747c5c675?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2NoZWR1bGVyfGVufDB8fDB8fHww"
                alt="Hospital Appointment Scheduler"
                theme={theme}
              />
            </Grid>
          </Grid>
        </Container>
      </HeroSectionWrapper>

      {/* Features Section */}
      <SectionWrapper theme={theme}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
          <FeaturedPlayListIcon fontSize='medium' sx={{ color: theme.palette.primary.main }} />
          &nbsp;
          Features 
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="primary">Easy Booking</Typography>
              <FeatureText theme={theme}>
                Quickly book appointments with our user-friendly interface.
              </FeatureText>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="primary">Reminders</Typography>
              <FeatureText theme={theme}>
                Get timely reminders for your appointments.
              </FeatureText>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="primary">24/7 Support</Typography>
              <FeatureText theme={theme}>
                Our support team is available 24/7 to assist you.
              </FeatureText>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper theme={theme}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
          <ChatIcon fontSize='medium' sx={{ color: theme.palette.primary.main }} />
          &nbsp;
           
            Testimonials
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="primary">John Doe</Typography>
              <FeatureText theme={theme}>
                "The appointment scheduler made it so easy to book my appointments!"
              </FeatureText>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="primary">Jane Smith</Typography>
              <FeatureText theme={theme}>
                "I love the reminders feature. I never miss an appointment now."
              </FeatureText>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="primary">Michael Johnson</Typography>
              <FeatureText theme={theme}>
                "Great support team. They helped me with all my queries."
              </FeatureText>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default HomePage;
