import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Alert, Card, CardContent } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';
import Grid from '@mui/material/Grid';

const BookConsultation = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const [topic, setTopic] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axiosInstance.get(`/doctors/${doctorId}`);
        setDoctor(response.data);
      } catch (error) {
        setError('Failed to load doctor details');
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/consultations/book', {
        doctorId,
        dateTime,
        topic,
      });

      setSuccess('Consultation booked successfully!');
      setTimeout(() => navigate('/consultations'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to book consultation');
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) return <Typography>Loading doctor details...</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Book Consultation
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{doctor.userId?.name}</Typography>
              <Typography color="textSecondary">{doctor.specialization}</Typography>
              <Typography variant="body2">Experience: {doctor.experience} years</Typography>
              <Typography variant="body2">Fee: ₹{doctor.consultationFee}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Select Date and Time"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              label="Consultation Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              margin="normal"
              placeholder="e.g., General checkup, Follow-up"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookConsultation;