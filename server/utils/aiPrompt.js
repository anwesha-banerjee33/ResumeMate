require('dotenv').config();
const axios = require('axios');

exports.getAIFeedback = async (resumeText) => {
  const prompt = `You are a career coach. Analyze this resume and provide:
- Strengths
- Weaknesses
- Job Recommendations
- Sample Interview Questions

Resume:
${resumeText}`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',


      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'ResumeMate AI',
          'Content-Type': 'application/json',
        },
      }
    );

    const choices = response.data?.choices;
    if (!choices || !choices[0]?.message?.content) {
      throw new Error("No valid AI response received.");
    }

    return choices[0].message.content;

  } catch (err) {
    console.error("OpenRouter full error:", {
      message: err.message,
      responseData: err.response?.data,
      status: err.response?.status,
      headers: err.response?.headers,
    });
    return "Error getting feedback from OpenRouter.";
  }
};
