const mongoose = require('mongoose');

const symptomAssessmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  symptoms: [String],
  duration: String,
  severity: Number,
  riskScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  recommendation: String,
  possibleConditions: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SymptomAssessment', symptomAssessmentSchema);