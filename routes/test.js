const express = require('express');
const router = express.Router();
const { testSection1, testSection2, testSection3, testSection4, testSection5, testSection6 } = require('../controllers/test');

router.post('/directivo/seccion1', testSection1);
router.post('/directivo/seccion2', testSection2);
router.post('/directivo/seccion3', testSection3);
router.post('/directivo/seccion4', testSection4);
router.post('/directivo/seccion5', testSection5);
router.post('/directivo/seccion6', testSection6);

module.exports = router;