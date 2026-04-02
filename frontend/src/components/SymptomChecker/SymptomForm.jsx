import React, { useState } from 'react';
import { Container, Box, FormGroup, FormControlLabel, Checkbox, TextField, Button, Card, CardContent, Typography, Alert, LinearProgress } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState(5);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const commonSymptoms = ['fever', 'cough', 'headache', 'bodyache', 'fatigue', 'sore throat', 'difficulty breathing'];

  const handleSymptomChange = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/symptom-checker/analyze', {
        symptoms,
        duration,
        severity: parseInt(severity),
      });

      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze symptoms');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Symptom Checker
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {!results ? (
        <Box component="form" onSubmit={handleSubmit}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Your Symptoms
              </Typography>
              <FormGroup>
                {commonSymptoms.map((symptom) => (
                  <FormControlLabel
                    key={symptom}
                    control={
                      <Checkbox
                        checked={symptoms.includes(symptom)}
                        onChange={() => handleSymptomChange(symptom)}
                      />
                    }
                    label={symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                  />
                ))}
              </FormGroup>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <TextField
                fullWidth
                label="How long have you had these symptoms?"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                margin="normal"
                placeholder="e.g., 2 days, 1 week"
              />

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Severity (1-10): {severity}
              </Typography>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                style={{ width: '100%' }}
              />
            </CardContent>
          </Card>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={symptoms.length === 0 || loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Symptoms'}
          </Button>
        </Box>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Assessment Results
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Risk Level</Typography>
              <LinearProgress
                variant="determinate"
                value={results.riskScore}
                sx={{
                  height: 10,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor:
                      results.riskScore < 30
                        ? 'green'
                        : results.riskScore < 60
                        ? 'orange'
                        : results.riskScore < 85
                        ? 'orangered'
                        : 'red',
                  },
                }}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Risk Score: {results.riskScore}/100
              </Typography>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Recommendation
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {results.recommendation}
            </Typography>

            {results.possibleConditions && results.possibleConditions.length > 0 && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  Possible Conditions
                </Typography>
                {results.possibleConditions.map((condition, idx) => (
                  <Typography key={idx} variant="body2">
                    • {condition}
                  </Typography>
                ))}
              </>
            )}

            <Alert severity="warning" sx={{ mt: 3 }}>
              {results.disclaimer}
            </Alert>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setResults(null)}
            >
              Check Again
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default SymptomChecker;