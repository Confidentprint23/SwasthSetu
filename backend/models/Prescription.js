const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  consultationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultation',
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  medicines: [{
    name: String,
    dosage: String,
    frequency: String,
    quantity: Number,
  }],
  duration: String,
  instructions: String,
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: Date,
  status: {
    type: String,
    enum: ['active', 'expired', 'completed'],
    default: 'active',
  },
});

module.exports = mongoose.model('Prescription', prescriptionSchema);