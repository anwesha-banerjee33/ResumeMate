require('dotenv').config();
const { OpenAI } = require('openai');  
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getAIFeedback = async (resumeText) => {
  const prompt = `
You are a career coach. Review this resume and suggest:
1. Strengths & Weaknesses.
2. Job Recommendations.
3. Sample Interview Questions.

Resume:
${resumeText}
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
  });

  return completion.choices[0].message.content;
};
