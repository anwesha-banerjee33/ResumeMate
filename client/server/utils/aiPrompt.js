const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.analyzeWithAI = async (resumeText) => {
  const prompt = `
Analyze the following resume:

${resumeText}

1. Suggest suitable job roles.
2. Recommend 3 upskilling suggestions.
3. Predict 5 most relevent interview questions based on the resume and target job role.

Respond in a clear and formatted manner.
`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return response.data.choices[0].message.content;
};
