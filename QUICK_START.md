# Career Mantra AI - Quick Start Guide 🚀

## Prerequisites
- Node.js (v18 or higher)
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## Installation & Setup

### 1️⃣ Configure Google Gemini API Key

Open `backend/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your-actual-gemini-api-key-here
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
🤖 AI: Google Gemini 2.5 Flash
🔐 Default admin user created: admin@careermentra.com / admin123
🏢 Default recruiter user created: recruiter@company.com / recruiter123
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

#### 4. Job Search & Listings 💼
- Browse and search job opportunities
- Apply with professional application form
- Upload resume and cover letter
- Get AI-powered application tips

#### 5. Admin Panel 👨‍💼 (Admin Only)
- Manage all user accounts
- Change user roles
- View system statistics
- Delete users if needed

#### 6. Recruiter Dashboard 🏢 (Recruiter Only)
- Post and manage job listings
- Review job applications
- Download candidate resumes
- Track application metrics

## 📱 Mobile Access

The app is fully responsive! Access it on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers

On mobile, use the hamburger menu (☰) to access the sidebar.

## 🔐 Login Credentials

### Demo Accounts (Pre-created):

**Admin Account**:
- Email: admin@careermentra.com
- Password: admin123
- Access: Admin Panel + All Features

**Recruiter Account**:
- Email: recruiter@company.com
- Password: recruiter123
- Access: Recruiter Dashboard + Job Management

**Regular User**:
- Create your own account with any email
- Access: All AI tools + Job search

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

### "Google Gemini API key not configured"
- Make sure you added your API key to `backend/.env`
- Restart the backend server

### "Invalid Gemini API key"
- Check your API key at https://makersuite.google.com/app/apikey
- Ensure the key has proper permissions

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

**Google Gemini API Usage:**
- Model: Gemini 2.5 Flash (fast and affordable)
- Cost: ~$0.001 per conversation
- You'll need to add payment info to Google AI Studio
- Monitor usage at: https://makersuite.google.com/app/apikey

## 🔒 Security Notes

- Passwords are hashed with bcrypt
- JWT tokens expire after 7 days
- Change JWT_SECRET in production
- Use HTTPS in production
- Never commit .env files

## 📚 Additional Resources

- **Full Documentation**: See `ARCHITECTURE.md`
- **Feature Details**: See `FEATURES.md`
- **Google AI Docs**: https://ai.google.dev/docs

## 🎉 You're All Set!

Enjoy using Career Mantra AI to accelerate your career journey!

### Quick Tips:
- ✅ Try all AI tools (Chat, Resume, Roadmap, Jobs)
- ✅ Test admin features with admin@careermentra.com
- ✅ Try recruiter dashboard with recruiter@company.com
- ✅ Apply for jobs using the application form
- ✅ Upload resumes and test file handling
- ✅ Save important chat sessions
- ✅ Generate roadmaps for different career paths
- ✅ Use quick action buttons for common queries

---

**Need Help?** Check the troubleshooting section above or review the full documentation.

**Happy Career Planning! 🚀**
