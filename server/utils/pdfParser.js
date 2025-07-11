const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = async function parsePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
};
