import React from 'react';
import { Container, Typography, Button, Box, Grid, Card} from '@mui/material';
import { Link } from 'react-router-dom';
import { LocalHospital, Assignment, LocalPharmacy, HealthAndSafety } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LocalHospital sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Book Consultations',
      description: 'Connect with qualified doctors for instant consultations',
      route: '/doctors',
    },
    {
      icon: <Assignment sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Health Records',
      description: 'Access your complete medical history and reports',
      route: '/health-records',
    },
    {
      icon: <LocalPharmacy sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Find Medicines',
      description: 'Locate nearby pharmacies and check medicine availability',
      route: '/pharmacies',
    },
    {
      icon: <HealthAndSafety sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Symptom Checker',
      description: 'Get preliminary health assessment from AI',
      route: '/symptom-checker',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to SwasthSetu
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Bridging Healthcare for Rural Communities
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Access quality healthcare from the comfort of your home. Connect with experienced doctors,
          manage your health records, and find medicines all in one platform.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 6 }}>
          <Button variant="contained" color="primary" size="large" component={Link} to="/doctors">
            Find Doctor
          </Button>
          <Button variant="outlined" color="primary" size="large" component={Link} to="/register">
            Sign Up
          </Button>
        </Box>
      </Box>

      <Box sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Our Services
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                onClick={() => navigate(feature.route)}
                sx={{ textAlign: 'center', p: 2, height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
              >
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ py: 8, backgroundColor: '#f5f5f5', borderRadius: 2, p: 4, textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Why Choose SwasthSetu?
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2">✓ 24/7 Availability</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2">✓ Affordable Consultation</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2">✓ Secure Health Records</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2">✓ Easy Medicine Access</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;