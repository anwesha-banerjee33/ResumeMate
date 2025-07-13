require('dotenv').config();
const axios = require('axios');

const HF_API_URL = 'https://api-inference.huggingface.co/models/bigscience/bloomz-560m';
const HF_API_KEY = process.env.HF_API_KEY;
console.log("Hugging Key Loaded:", HF_API_KEY);  

exports.getAIFeedback = async (resumeText) => {
  const prompt = `You are a career coach. Analyze the following resume and suggest:
1. Strengths and Weaknesses.
2. Relevant Job Recommendations.
3. Sample Interview Questions.

Resume:
${resumeText}`;

  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (Array.isArray(response.data) && response.data[0]?.generated_text) {
      return response.data[0].generated_text;
    } else {
      console.log("Unexpected response format:", response.data);
      return "AI couldn't generate a response.";
    }

  } catch (err) {
    console.error("Error using Hugging Face API:", err.response?.data || err.message);
    return "There was an error processing your resume with AI.";
  }
};
