import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, Box, Grid, TextField, Alert } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';

const DoctorDashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prescriptionData, setPrescriptionData] = useState({
    consultationId: '',
    patientId: '',
    medicines: '',
    duration: '',
  });
  const [success, setSuccess] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axiosInstance.get(`/consultations/pending/${user.id}`);
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

  const handleIssuePrescription = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/prescriptions', {
        ...prescriptionData,
        medicines: prescriptionData.medicines.split(',').map((m) => ({ name: m.trim() })),
      });
      setSuccess('Prescription issued successfully');
      setPrescriptionData({ consultationId: '', patientId: '', medicines: '', duration: '' });
    } catch (error) {
      console.error('Error issuing prescription:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Pending Consultations
          </Typography>
          {consultations.length === 0 ? (
            <Typography>No pending consultations.</Typography>
          ) : (
            consultations.map((consultation) => (
              <Card key={consultation._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2">
                    {consultation.patientId?.name}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {new Date(consultation.dateTime).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Topic: {consultation.topic || 'General'}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Issue Prescription
          </Typography>
          {success && <Alert severity="success">{success}</Alert>}
          <Card>
            <CardContent>
              <Box component="form" onSubmit={handleIssuePrescription}>
                <TextField
                  fullWidth
                  label="Consultation ID"
                  value={prescriptionData.consultationId}
                  onChange={(e) =>
                    setPrescriptionData({ ...prescriptionData, consultationId: e.target.value })
                  }
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Patient ID"
                  value={prescriptionData.patientId}
                  onChange={(e) =>
                    setPrescriptionData({ ...prescriptionData, patientId: e.target.value })
                  }
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Medicines (comma separated)"
                  value={prescriptionData.medicines}
                  onChange={(e) =>
                    setPrescriptionData({ ...prescriptionData, medicines: e.target.value })
                  }
                  margin="normal"
                  placeholder="e.g., Aspirin, Paracetamol"
                  required
                />

                <TextField
                  fullWidth
                  label="Duration"
                  value={prescriptionData.duration}
                  onChange={(e) =>
                    setPrescriptionData({ ...prescriptionData, duration: e.target.value })
                  }
                  margin="normal"
                  placeholder="e.g., 10 days"
                  required
                />

                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                  Issue Prescription
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DoctorDashboard;