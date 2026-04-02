const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');

router.get('/', pharmacyController.getAllPharmacies);
router.get('/:id', pharmacyController.getPharmacyById);
router.post('/check-availability', pharmacyController.checkMedicineAvailability);
router.get('/medicines/list', pharmacyController.getMedicines);

module.exports = router;