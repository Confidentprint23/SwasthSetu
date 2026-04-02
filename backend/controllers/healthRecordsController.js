const HealthRecord = require('../models/HealthRecord');
const Consultation = require('../models/Consultation');

const getPatientHealthRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find({ patientId: req.params.patientId })
      .populate('doctorId', 'specialization')
      .populate('consultationId', 'dateTime');
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHealthRecord = async (req, res) => {
  try {
    const { patientId, consultationId, diagnosis, symptoms, medications, vitalSigns } = req.body;

    const record = new HealthRecord({
      patientId,
      doctorId: req.user.id,
      consultationId,
      diagnosis,
      symptoms,
      medications,
      vitalSigns,
    });

    await record.save();

    res.status(201).json({
      message: 'Health record created',
      record,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHealthRecordById = async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id)
      .populate('doctorId', 'specialization')
      .populate('consultationId');
    
    if (!record) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHealthRecord = async (req, res) => {
  try {
    const { diagnosis, symptoms, medications, vitalSigns, notes } = req.body;
    const record = await HealthRecord.findByIdAndUpdate(
      req.params.id,
      {
        diagnosis,
        symptoms,
        medications,
        vitalSigns,
        notes,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getConsultationHistory = async (req, res) => {
  try {
    const history = await Consultation.find({ patientId: req.params.patientId })
      .populate('doctorId', 'specialization')
      .sort({ dateTime: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPatientHealthRecords,
  createHealthRecord,
  getHealthRecordById,
  updateHealthRecord,
  getConsultationHistory,
};