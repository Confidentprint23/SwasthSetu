import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';

const HealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get(`/health-records/${user.id}`);
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRecords();
    }
  }, [user]);

  if (loading) return <Typography>Loading health records...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Health Records
      </Typography>

      {records.length === 0 ? (
        <Typography>No health records found.</Typography>
      ) : (
        records.map((record) => (
          <Card key={record._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {record.diagnosis || 'No Diagnosis'}
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                Date: {new Date(record.createdAt).toLocaleDateString()}
              </Typography>

              {record.symptoms && record.symptoms.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Symptoms:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {record.symptoms.map((symptom, idx) => (
                      <Chip key={idx} label={symptom} size="small" />
                    ))}
                  </Box>
                </Box>
              )}

              {record.medications && record.medications.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Medications:</Typography>
                  {record.medications.map((med, idx) => (
                    <Typography key={idx} variant="body2">
                      • {med}
                    </Typography>
                  ))}
                </Box>
              )}

              {record.notes && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Notes:</strong> {record.notes}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default HealthRecords;