import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardActions, Typography, Button, TextField, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async (spec = '') => {
    try {
      let url = '/doctors';
      if (spec) {
        url += `?specialization=${spec}`;
      }
      const response = await axiosInstance.get(url);
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearch = () => {
    fetchDoctors(specialization);
  };

  if (loading) return <Typography>Loading doctors...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Find a Doctor
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Filter by Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          placeholder="e.g., Cardiologist, Dermatologist"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {filteredDoctors.length === 0 ? (
        <Typography>No doctors found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{doctor.userId?.name || doctor.name}</Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {doctor.specialization}
                  </Typography>
                  <Typography variant="body2">
                    Experience: {doctor.experience} years
                  </Typography>
                  <Typography variant="body2">
                    Qualification: {doctor.qualification}
                  </Typography>
                  <Typography variant="body2">
                    Hospital: {doctor.hospital}
                  </Typography>
                  <Typography variant="body2">
                    Location: {doctor.location}
                  </Typography>
                  <Typography variant="body2">
                    Rating: ⭐ {doctor.rating || 'Not rated'}
                  </Typography>
                  <Typography variant="body2">
                    Fee: ₹{doctor.consultationFee}
                  </Typography>
                  <Typography variant="body2" color={doctor.isAvailable ? 'green' : 'error'}>
                    {doctor.isAvailable ? 'Available' : 'Unavailable'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={`/book-consultation/${doctor._id}`}
                    variant="contained"
                    disabled={!doctor.isAvailable}
                  >
                    Book
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DoctorList;