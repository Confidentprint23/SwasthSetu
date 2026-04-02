import React, { useEffect } from 'react';
import { Alert, Box } from '@mui/material';

const NotificationAlert = ({ message, type = 'info', onClose, autoClose = true, duration = 5000 }) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, duration]);

  if (!message) return null;

  return (
    <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, maxWidth: 400 }}>
      <Alert
        severity={type}
        onClose={onClose}
        sx={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: 2,
        }}
      >
        {message}
      </Alert>
    </Box>
  );
};

export default NotificationAlert;