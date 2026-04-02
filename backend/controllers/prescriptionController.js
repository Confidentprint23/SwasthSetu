const Prescription = require('../models/Prescription');

const issuePrescription = async (req, res) => {
  try {
    const { consultationId, patientId, medicines, duration, instructions } = req.body;

    const prescription = new Prescription({
      consultationId,
      patientId,
      doctorId: req.user.id,
      medicines,
      duration,
      instructions,
    });

    await prescription.save();

    res.status(201).json({
      message: 'Prescription issued',
      prescription,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patientId', 'name email phone')
      .populate('doctorId', 'specialization');
    
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.params.patientId })
      .populate('doctorId', 'specialization');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  issuePrescription,
  getPrescriptionById,
  getPatientPrescriptions,
};