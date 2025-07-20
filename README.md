# ResumeMate 🎯

**ResumeMate** is a free, AI-powered resume analyzer and job recommendation platform. Upload your resume, and get instant, intelligent feedback and job suggestions — powered by open-source models.

## 🚀 Features

- 📄 Upload resumes in PDF or DOCX format
- 🔍 Resume text extraction and parsing
- 🤖 AI-generated resume feedback (via Hugging Face/OpenRouter)
- 💼 Job recommendations based on your skills and experience
- 🔐 Secure: your data stays local, and `.env` keys are hidden

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js + Express
- **AI Integration:**  OpenRouter APIs
- **Deployment:** Render / Vercel (Frontend + Backend)
- **Version Control:** Git + GitHub

## 🧠 How It Works

1. Upload your resume (PDF/DOCX or paste Drive link)
2. The backend extracts text using `pdf-parse` or `mammoth.js`
3. The resume content is sent to an open-source LLM
4. The AI analyzes it and returns detailed feedback
5. Recommendations are displayed on the UI


