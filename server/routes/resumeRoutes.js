const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/resumeController');

const upload = multer({ dest: 'uploads/' });  
const router = express.Router();

router.get('/', (req, res) => {
  res.send('ResumeMate API is working');
});


router.post('/upload', upload.single('resume'), analyzeResume);

module.exports = router;
