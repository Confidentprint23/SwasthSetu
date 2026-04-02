const express = require('express');
const router = express.Router();
const symptomCheckerController = require('../controllers/symptomCheckerController');
const auth = require('../middleware/auth');

router.post('/analyze', symptomCheckerController.analyzeSymptoms);
router.post('/store', auth, symptomCheckerController.storeAssessment);
router.get('/:assessmentId', symptomCheckerController.getAssessmentResults);

module.exports = router;