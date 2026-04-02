const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genericName: String,
  strength: String,
  form: {
    type: String,
    enum: ['tablet', 'liquid', 'injection', 'capsule'],
  },
  manufacturer: String,
  price: Number,
  sideEffects: [String],
  contraindications: [String],
  dosageInfo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Medicine', medicineSchema);