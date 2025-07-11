require('dotenv').config();
console.log(" .env file loaded. API KEY:", process.env.OPENAI_API_KEY);
const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');


const app = express();
const PORT = process.env.PORT || 5000 ;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/api', resumeRoutes);
app.get('/', (req, res) => {
  res.send('ResumeMate Server is Running!');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
