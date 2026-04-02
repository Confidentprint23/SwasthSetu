import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';

const PharmacyLocator = () => {
  const [medicineName, setMedicineName] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const response = await axiosInstance.post('/pharmacies/check-availability', {
        medicineName,
      });
      setPharmacies(response.data);
    } catch (error) {
      console.error('Error searching pharmacies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Find Pharmacies & Medicines
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box component="form" onSubmit={handleSearch}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={10}>
                <TextField
                  fullWidth
                  label="Search Medicine"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="e.g., Aspirin, Amoxicillin"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!medicineName || loading}
                  sx={{ height: '100%' }}
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {searched && (
        <>
          {pharmacies.length === 0 ? (
            <Typography>No pharmacies found with this medicine.</Typography>
          ) : (
            <Grid container spacing={3}>
              {pharmacies.map((pharmacy) => (
                <Grid item xs={12} md={6} key={pharmacy.pharmacyId}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{pharmacy.pharmacyName}</Typography>
                      <Typography color="textSecondary">{pharmacy.address}</Typography>

                      {pharmacy.medicines && pharmacy.medicines.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Available Medicines
                          </Typography>
                          {pharmacy.medicines.map((medicine, idx) => (
                            <Card key={idx} sx={{ mb: 1, backgroundColor: '#f5f5f5' }}>
                              <CardContent sx={{ py: 1 }}>
                                <Typography variant="body2">
                                  <strong>{medicine.medicineId?.name}</strong>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  Quantity: {medicine.quantity} | Price: ₹{medicine.price}
                                </Typography>
                              </CardContent>
                            </Card>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default PharmacyLocator;