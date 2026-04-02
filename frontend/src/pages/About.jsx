import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { Info, Info as Target, Handshake } from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          About SwasthSetu
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Bridging Healthcare for Rural Communities
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Info sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2">
                SwasthSetu is a comprehensive telemedicine platform designed to bring quality healthcare to rural communities by connecting patients with qualified healthcare professionals.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Target sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body2">
                To provide accessible, affordable, and quality healthcare services to rural populations through innovative telemedicine solutions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Handshake sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body2">
                To bridge the healthcare gap between urban and rural areas by leveraging technology and making expert medical advice accessible to all.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ backgroundColor: '#f5f5f5', p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Key Features
        </Typography>
        <ul>
          <li>Real-time video consultations with certified doctors</li>
          <li>Digital health records management</li>
          <li>AI-powered symptom checker</li>
          <li>Prescription management and pharmacy integration</li>
          <li>Secure and encrypted communication</li>
          <li>24/7 healthcare availability</li>
          <li>Affordable consultation fees</li>
        </ul>
      </Box>
    </Container>
  );
};

export default About;