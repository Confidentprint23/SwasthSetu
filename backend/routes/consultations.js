const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const auth = require('../middleware/auth');

router.post('/book', auth, consultationController.bookConsultation);
router.get('/:id', consultationController.getConsultationById);
router.get('/user/:userId', consultationController.getUserConsultations);
router.get('/pending/:doctorId', consultationController.getPendingConsultations);
router.put('/:id', consultationController.updateConsultationStatus);
router.delete('/:id', consultationController.cancelConsultation);

module.exports = router;