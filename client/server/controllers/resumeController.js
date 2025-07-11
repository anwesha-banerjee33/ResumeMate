const fs = require('fs');
const pdfParser = require('../utils/pdfParser');
const docxParser = require('../utils/docxParser');
const { analyzeWithAI } = require('../utils/aiPrompt');

exports.analyzeResume = async (req, res) => {
  try {
    let extractedText = '';

    const file = req.file;
    const driveLink = req.body.driveLink;

    if (file) {
      if (file.mimetype === 'application/pdf') {
        extractedText = await pdfParser(file.path);
      } else if (
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        extractedText = await docxParser(file.path);
      }
      fs.unlinkSync(file.path); 
    } else if (driveLink) {
      extractedText = `User submitted this Google Drive resume link:\n${driveLink}\n\n(Note: ResumeMate currently does not extract text from Google Drive. Please ensure it's a readable public doc.)`;
    } else {
      return res.status(400).json({ error: 'No resume provided.' });
    }

    const feedback = await analyzeWithAI(extractedText);
    res.json({ feedback });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
