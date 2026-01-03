import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory user storage (replace with database in production)
const users = [];

// ✅ Initialize Google Gemini AI with working model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ✅ Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};

// ✅ Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      createdAt: new Date()
    };

    users.push(user);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// ✅ Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed.' });
  }
});

// ✅ Career Q&A Chat endpoint (Gemini)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    // ✅ Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid request: missing messages" });
    }

    // ✅ Build prompt from conversation history
    const userMessage = messages[messages.length - 1].content;
    const context = messages
      .slice(0, -1)
      .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
      .join("\n");

    const prompt = `You are Career Mantra AI, an expert career coach and mentor. You provide personalized career guidance, resume feedback, interview preparation, career transition advice, and skill development recommendations. Be supportive, professional, insightful, and actionable in your responses. Use a warm, encouraging tone.

${context ? context + "\n" : ""}User: ${userMessage}
AI:`;

    console.log("📨 Sending to Gemini:", prompt);

    const result = await model.generateContent(prompt);
    const reply = result.response.text() || "Sorry, I couldn't generate a response.";
    
    console.log("✅ Gemini replied:", reply);

    res.json({ message: reply });
  } catch (error) {
    console.error("❌ Error in /api/chat:", error.message);
    res.status(500).json({ error: "Gemini API request failed: " + error.message });
  }
});

// ✅ Resume Analyzer endpoint
app.post('/api/analyze-resume', async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key not configured.' });
    }

    const prompt = `You are an expert resume reviewer. Analyze this resume and return JSON:
{
  "score": <0-100>,
  "analysis": "<strengths and weaknesses>",
  "suggestions": "<specific improvements>"
}

Resume content:
${resumeText}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        res.json(JSON.parse(jsonMatch[0]));
      } else {
        res.json({
          score: 75,
          analysis: text,
          suggestions: 'Please review the analysis above for improvement suggestions.'
        });
      }
    } catch {
      res.json({
        score: 75,
        analysis: text,
        suggestions: 'Please review the analysis above for improvement suggestions.'
      });
    }
  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ error: 'Resume analysis failed.' });
  }
});

// ✅ Career Roadmap Generator endpoint
app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { currentRole, targetRole, experience, skills } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key not configured.' });
    }

    const prompt = `Create a career roadmap from ${currentRole} to ${targetRole}. Experience: ${experience}. Skills: ${skills}. Return JSON:
{
  "steps": [{"title": "", "description": "", "actions": []}],
  "timeline": "",
  "resources": ""
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        res.json(JSON.parse(jsonMatch[0]));
      } else {
        res.json({
          steps: [{ title: 'Career Roadmap', description: text, actions: [] }],
          timeline: 'See details above',
          resources: 'Customized based on your goals'
        });
      }
    } catch {
      res.json({
        steps: [{ title: 'Career Roadmap', description: text, actions: [] }],
        timeline: 'See details above',
        resources: 'Customized based on your goals'
      });
    }
  } catch (error) {
    console.error('Roadmap error:', error);
    res.status(500).json({ error: 'Career roadmap generation failed.' });
  }
});

// ✅ Health Check & Profile
app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'Career Mantra AI', users: users.length });
});

app.get('/api/user/profile', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json({ id: user.id, email: user.email, name: user.name });
});

app.listen(PORT, () => {
  console.log(`🚀 Career Mantra AI Backend running on http://localhost:${PORT}`);
  console.log(`📝 Registered users: ${users.length}`);
  console.log(`🤖 AI: Google Gemini 2.5 Flash`);
});