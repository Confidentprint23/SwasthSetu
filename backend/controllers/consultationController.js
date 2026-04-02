const Consultation = require('../models/Consultation');
const Doctor = require('../models/Doctor');

const bookConsultation = async (req, res) => {
  try {
    const { doctorId, dateTime, consultationType, topic } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const consultation = new Consultation({
      patientId: req.user.id,
      doctorId,
      dateTime,
      consultationType: consultationType || 'video',
      topic,
    });

    await consultation.save();

    doctor.totalConsultations += 1;
    await doctor.save();

    res.status(201).json({
      message: 'Consultation booked successfully',
      consultation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getConsultationById = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate('patientId', 'name email phone')
      .populate('doctorId', 'specialization');
    
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }
    res.json(consultation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ patientId: req.params.userId })
      .populate('doctorId', 'specialization');
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPendingConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ 
      doctorId: req.params.doctorId,
      status: 'pending' 
    }).populate('patientId', 'name email phone');
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateConsultationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    res.json(consultation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    res.json({ message: 'Consultation cancelled', consultation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  bookConsultation,
  getConsultationById,
  getUserConsultations,
  getPendingConsultations,
  updateConsultationStatus,
  cancelConsultation,
};