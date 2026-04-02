const SymptomAssessment = require('../models/SymptomAssessment');

const symptomDatabase = {
  'fever': ['malaria', 'flu', 'covid', 'typhoid'],
  'cough': ['flu', 'asthma', 'covid', 'bronchitis'],
  'headache': ['migraine', 'flu', 'stress', 'tension'],
  'bodyache': ['flu', 'covid', 'muscle strain'],
  'fatigue': ['anemia', 'depression', 'thyroid', 'covid'],
};

const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms, duration, severity } = req.body;

    let riskScore = 0;
    let possibleConditions = [];

    symptoms.forEach(symptom => {
      if (symptomDatabase[symptom.toLowerCase()]) {
        possibleConditions = [...new Set([...possibleConditions, ...symptomDatabase[symptom.toLowerCase()]])];
        riskScore += 15;
      }
    });

    if (severity >= 7) riskScore += 20;
    if (duration === 'more than 1 week') riskScore += 10;

    riskScore = Math.min(riskScore, 100);

    let recommendation = '';
    if (riskScore < 30) {
      recommendation = 'Self-care: Rest, hydration, and monitor symptoms';
    } else if (riskScore < 60) {
      recommendation = 'Consult a doctor within 1 week';
    } else if (riskScore < 85) {
      recommendation = 'Consult a doctor within 24 hours';
    } else {
      recommendation = 'Seek immediate medical attention';
    }

    res.json({
      riskScore,
      recommendation,
      possibleConditions,
      disclaimer: 'This is not a medical diagnosis. Please consult a qualified healthcare provider.',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const storeAssessment = async (req, res) => {
  try {
    const { symptoms, duration, severity, riskScore, recommendation, possibleConditions } = req.body;

    const assessment = new SymptomAssessment({
      patientId: req.user.id,
      symptoms,
      duration,
      severity,
      riskScore,
      recommendation,
      possibleConditions,
    });

    await assessment.save();

    res.status(201).json({
      message: 'Assessment stored successfully',
      assessment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssessmentResults = async (req, res) => {
  try {
    const assessment = await SymptomAssessment.findById(req.params.assessmentId);
    
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  analyzeSymptoms,
  storeAssessment,
  getAssessmentResults,
};