const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getAllDoctors);
router.get('/available', doctorController.getAvailableDoctors);
router.get('/:id', doctorController.getDoctorById);
router.get('/:id/availability', doctorController.getAvailability);
router.put('/:id/availability', doctorController.updateAvailability);

module.exports = router;