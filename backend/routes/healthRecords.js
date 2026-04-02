const express = require('express');
const router = express.Router();
const healthRecordsController = require('../controllers/healthRecordsController');
const auth = require('../middleware/auth');

router.get('/:patientId', healthRecordsController.getPatientHealthRecords);
router.post('/', auth, healthRecordsController.createHealthRecord);
router.get('/record/:id', healthRecordsController.getHealthRecordById);
router.put('/:id', auth, healthRecordsController.updateHealthRecord);
router.get('/:patientId/history', healthRecordsController.getConsultationHistory);

module.exports = router;