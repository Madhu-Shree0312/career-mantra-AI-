# Career Mantra AI - Quick Setup Guide

## 🚀 Getting Started

### Step 1: Configure OpenAI API Key

1. Get your OpenAI API key from https://platform.openai.com/api-keys
2. Open `backend/.env` file
3. Replace `your_openai_api_key_here` with your actual API key:

```env
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3001
```

### Step 2: Start the Backend

Open a terminal and run:

```bash
cd backend
npm run dev
```

You should see: `🚀 Career Mantra AI Backend running on http://localhost:3001`

### Step 3: Start the Frontend

Open a NEW terminal and run:

```bash
cd frontend
npm run dev
```

The app will open at http://localhost:5173

### Step 4: Start Using Career Mantra AI!

You now have access to three powerful features:

1. **Career Q&A Chat** - Ask any career-related questions
2. **AI Resume Analyzer** - Get instant feedback on your resume
3. **Career Roadmap Generator** - Create personalized career paths

## 🎯 Features Overview

### Career Q&A Chat
- Click quick action buttons or type your questions
- Get personalized career advice
- Interview preparation
- Skill development guidance
- Job search strategies

### AI Resume Analyzer
- Paste your resume text
- Get an overall score (0-100)
- Receive detailed analysis
- Get specific improvement suggestions
- Learn ATS optimization tips

### Career Roadmap Generator
- Enter your current and target roles
- Add your experience and skills
- Get a step-by-step career progression plan
- See estimated timelines
- Receive recommended resources

## 💡 Tips

- The backend must be running for all features to work
- Your OpenAI API key needs to have credits
- Conversations are stored in browser memory (not persisted)
- You can create multiple chat sessions

## 🔧 Troubleshooting

**"OpenAI API key not configured"**
- Make sure you've added your API key to `backend/.env`
- Restart the backend server after adding the key

**"Failed to connect"**
- Ensure the backend is running on port 3001
- Check that both servers are running

**"401 Incorrect API key"**
- Your API key is invalid or expired
- Get a new key from OpenAI platform

## 📝 Cost Information

Using OpenAI's GPT-4o-mini model:
- Very affordable (~$0.001 per conversation)
- You'll need to add payment info to OpenAI
- Monitor usage at https://platform.openai.com/usage

Enjoy Career Mantra AI! 🎉
