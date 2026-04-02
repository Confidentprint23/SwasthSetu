const Doctor = require('../models/Doctor');
const User = require('../models/User');

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email phone');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email phone address');
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAvailableDoctors = async (req, res) => {
  try {
    const { specialization, date } = req.query;
    let query = Doctor.find();

    if (specialization) {
      query = query.where('specialization').equals(specialization);
    }

    const doctors = await query.populate('userId', 'name email phone');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAvailability = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json({ availability: doctor.availability });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const { date, slots } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { [`availability.${date}`]: slots },
      { new: true }
    );
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  getAvailableDoctors,
  getAvailability,
  updateAvailability,
};