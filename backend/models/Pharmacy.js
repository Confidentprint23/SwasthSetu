const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  phone: String,
  email: String,
  latitude: Number,
  longitude: Number,
  operatingHours: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  medicines: [{
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
    },
    quantity: Number,
    price: Number,
  }],
  isRegistered: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);