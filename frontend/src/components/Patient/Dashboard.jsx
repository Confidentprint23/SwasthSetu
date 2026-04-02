import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';

const PatientDashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axiosInstance.get(`/consultations/user/${user.id}`);
        setConsultations(response.data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchConsultations();
    }
  }, [user]);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}!
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Upcoming Consultations
              </Typography>
              <Typography variant="h5">
                {consultations.filter(c => c.status === 'pending' || c.status === 'confirmed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Consultations
              </Typography>
              <Typography variant="h5">
                {consultations.filter(c => c.status === 'completed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Quick Actions
              </Typography>
              <Button component={Link} to="/doctors" variant="contained" fullWidth sx={{ mt: 1 }}>
                Book Doctor
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Health
              </Typography>
              <Button component={Link} to="/health-records" variant="contained" fullWidth sx={{ mt: 1 }}>
                My Records
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Consultations
        </Typography>
        {consultations.slice(0, 5).map((consultation) => (
          <Card key={consultation._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{consultation.topic || 'General Consultation'}</Typography>
              <Typography color="textSecondary">
                Date: {new Date(consultation.dateTime).toLocaleDateString()}
              </Typography>
              <Typography color="textSecondary">
                Status: <strong>{consultation.status}</strong>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default PatientDashboard;