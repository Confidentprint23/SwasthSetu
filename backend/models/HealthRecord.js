const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  consultationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultation',
  },
  diagnosis: String,
  symptoms: [String],
  medications: [String],
  labResults: String,
  vitalSigns: {
    bloodPressure: String,
    temperature: Number,
    heartRate: Number,
  },
  notes: String,
  attachedDocuments: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);