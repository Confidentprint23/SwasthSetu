const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const auth = require('../middleware/auth');

router.post('/', auth, prescriptionController.issuePrescription);
router.get('/:id', prescriptionController.getPrescriptionById);
router.get('/patient/:patientId', prescriptionController.getPatientPrescriptions);

module.exports = router;