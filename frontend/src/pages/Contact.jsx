import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Grid, Card, CardContent, Alert } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSuccess(''), 5000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>
        Contact Us
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit}>
            {success && <Alert severity="success">{success}</Alert>}
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={5}
              required
            />
            <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
              Send Message
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone sx={{ mr: 2, color: '#1976d2' }} />
                <Box>
                  <Typography variant="subtitle2">Phone</Typography>
                  <Typography variant="body2">+91-1800-HEALTH</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 2, color: '#1976d2' }} />
                <Box>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography variant="body2">support@swasthsetu.com</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 2, color: '#1976d2' }} />
                <Box>
                  <Typography variant="subtitle2">Address</Typography>
                  <Typography variant="body2">Nabha, Punjab, India</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;