# Career Mantra AI - Quick Start Guide 🚀

## Prerequisites
- Node.js (v18 or higher)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Installation & Setup

### 1️⃣ Configure OpenAI API Key

Open `backend/.env` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
JWT_SECRET=career-mantra-ai-secret-key-2024-change-in-production
```

### 2️⃣ Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Career Mantra AI Backend running on http://localhost:3001
📝 Registered users: 0
```

### 3️⃣ Start the Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

The app will open at: **http://localhost:5173**

## 🎯 Using Career Mantra AI

### First Time Setup

1. **Register an Account**
   - Click "Sign Up" tab
   - Enter your name, email, and password
   - Click "Create Account"

2. **Explore the Dashboard**
   - After login, you'll see three AI tool cards
   - Click any card to access that tool

### Available Tools

#### 1. AI Career Q&A Chat 💬
- Click quick action cards or type your questions
- Get real-time AI responses
- Chat history is saved in sessions
- Create new chats anytime

#### 2. AI Resume Analyzer 📝
- Paste your resume text
- Click "Analyze Resume"
- Get instant score and feedback
- View improvement suggestions

#### 3. Career Roadmap Generator 🗺️
- Enter current and target roles
- Add your experience and skills
- Click "Generate Career Roadmap"
- Get step-by-step career plan

## 📱 Mobile Access

The app is fully responsive! Access it on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers

On mobile, use the hamburger menu (☰) to access the sidebar.

## 🔐 Login Credentials

Create your own account or use these test credentials:

**Test Account** (after first registration):
- Email: student@example.com
- Password: password123

## 🎨 Features Showcase

### Dark Gradient UI
- Beautiful purple-blue gradient backgrounds
- Glassmorphism effects (frosted glass)
- Smooth animations throughout

### Interactive Elements
- Hover effects on cards
- Animated backgrounds
- Smooth page transitions
- Loading states

### Responsive Design
- Adapts to any screen size
- Touch-friendly on mobile
- Collapsible sidebar
- Optimized layouts

## 🛠️ Troubleshooting

### "OpenAI API key not configured"
- Make sure you added your API key to `backend/.env`
- Restart the backend server

### "Failed to connect"
- Ensure backend is running on port 3001
- Check that both servers are running

### "Invalid email or password"
- Register a new account first
- Check your email/password spelling

### Backend won't start
- Make sure port 3001 is not in use
- Check that all dependencies are installed: `npm install`

### Frontend won't start
- Make sure port 5173 is not in use
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 💰 Cost Information

**OpenAI API Usage:**
- Model: GPT-4o-mini (very affordable)
- Cost: ~$0.001 per conversation
- You'll need to add payment info to OpenAI
- Monitor usage at: https://platform.openai.com/usage

## 🔒 Security Notes

- Passwords are hashed with bcrypt
- JWT tokens expire after 7 days
- Change JWT_SECRET in production
- Use HTTPS in production
- Never commit .env files

## 📚 Additional Resources

- **Full Documentation**: See `PROJECT_OVERVIEW.md`
- **Setup Details**: See `SETUP.md`
- **OpenAI Docs**: https://platform.openai.com/docs

## 🎉 You're All Set!

Enjoy using Career Mantra AI to accelerate your career journey!

### Quick Tips:
- ✅ Try all three AI tools
- ✅ Save important chat sessions
- ✅ Analyze multiple resume versions
- ✅ Generate roadmaps for different career paths
- ✅ Use quick action buttons for common queries

---

**Need Help?** Check the troubleshooting section above or review the full documentation.

**Happy Career Planning! 🚀**
