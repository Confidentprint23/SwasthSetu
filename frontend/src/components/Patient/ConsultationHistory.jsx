import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';

const ConsultationHistory = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axiosInstance.get(`/consultations/user/${user.id}`);
        setConsultations(response.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
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

  if (loading) return <Typography>Loading consultation history...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Consultation History
      </Typography>

      {consultations.length === 0 ? (
        <Typography>No consultations yet.</Typography>
      ) : (
        consultations.map((consultation) => (
          <Card key={consultation._id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">{consultation.topic || 'General Consultation'}</Typography>
                  <Typography color="textSecondary">
                    {new Date(consultation.dateTime).toLocaleDateString()} {new Date(consultation.dateTime).toLocaleTimeString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Type: {consultation.consultationType}
                  </Typography>
                  {consultation.notes && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Notes: {consultation.notes}
                    </Typography>
                  )}
                </Box>
                <Chip
                  label={consultation.status}
                  color={
                    consultation.status === 'completed'
                      ? 'success'
                      : consultation.status === 'cancelled'
                      ? 'error'
                      : 'info'
                  }
                />
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default ConsultationHistory;