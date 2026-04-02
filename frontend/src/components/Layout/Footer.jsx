import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        py: 3,
        mt: 5,
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="body2">
          © 2025 SwasthSetu - Telemedicine Platform. All rights reserved.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;