# Career Mantra AI 🚀

<div align="center">

![Career Mantra AI](https://img.shields.io/badge/Career%20Mantra%20AI-v1.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Your Intelligent Career Companion**

*AI-powered career coaching platform designed specifically for students*

[Quick Start](#-quick-start) • [Features](#-features) • [Demo](#-demo-guide) • [Deployment](#-deployment)

</div>

---

## 📖 Overview

**Career Mantra AI** is a comprehensive career coaching platform that combines beautiful design with powerful AI capabilities. Built with modern technologies and designed for students, professionals, and recruiters, it provides personalized career guidance, resume analysis, job management, and career roadmap generation.

### ✨ What Makes It Special

- 🎨 **Beautiful Dark Gradient UI** - Modern glassmorphism design
- 🤖 **AI-Powered** - Uses Google Gemini 2.5 Flash for intelligent responses
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Fast & Smooth** - Optimized performance with smooth animations
- 🔐 **Secure** - JWT authentication with role-based access control
- 👥 **Multi-Role System** - Students, Admins, and Recruiters
- 💼 **Complete Job Platform** - Job posting, applications, and resume management
- 🎯 **Student-Focused** - Designed specifically for career-seeking students

## ✨ Features

### 🔐 Multi-Role Authentication System
- **Three-Tab Login Interface**: User, Admin, and Recruiter login
- **Role-Based Access Control**: Different features for different user types
- **Secure Authentication**: JWT tokens with bcrypt password hashing
- **Default Accounts**: Pre-configured admin and recruiter accounts
- **Session Management**: Remember me functionality

### 📊 Role-Based Dashboards
- **Student Dashboard**: AI tools for career guidance
- **Admin Panel**: Complete user management system
- **Recruiter Dashboard**: Job posting and application management
- **Dynamic Navigation**: Role-specific sidebar and features

### 💬 AI Career Q&A Chat
- Real-time chat interface with AI mentor
- **6 Quick Action Cards** for common queries:
  - Resume Review, Interview Prep, Career Transition
  - Skill Development, Job Search Strategy, Career Goals
- Chat history with session management
- Beautiful message bubbles with avatars
- Smooth scrolling and animations

### 📝 AI Resume Analyzer
- Paste resume text for instant analysis
- **AI-powered feedback** including:
  - Overall score (0-100) with visual progress circle
  - Detailed analysis of strengths/weaknesses
  - Specific improvement suggestions
  - ATS optimization tips
- Professional layout with sidebar tips
- Responsive design for all devices

### 🗺️ Career Roadmap Generator
- Input current and target roles
- Add experience level and current skills
- Get **personalized step-by-step roadmap** with:
  - Progression steps with actionable items
  - Estimated timeline
  - Recommended resources
- Visual timeline with numbered steps
- Clean, organized presentation

### 💼 Complete Job Management System
- **Job Listings**: Search, filter, and browse opportunities
- **Job Application Form**: Professional application with resume upload
- **Recruiter Dashboard**: Post jobs, manage applications
- **Resume Upload**: Drag & drop file upload with validation
- **Application Tracking**: Status management and communication

### 👨‍💼 Admin Panel
- **User Management**: View, edit, and delete users
- **Role Control**: Promote users to admin or recruiter
- **System Analytics**: User statistics and metrics
- **Access Control**: Admin-only features and endpoints

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Google Gemini AI** - Gemini 2.5 Flash for AI responses
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Design Features
- 🎨 Dark gradient theme (purple-blue)
- ✨ Glassmorphism effects
- 🎭 Smooth animations (blobs, float, hover)
- 📱 Responsive design (mobile, tablet, desktop)
- 🎯 Interactive cards with hover effects

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/career-mantra-ai.git
cd career-mantra-ai
```

**2. Configure Google Gemini API Key**

Open `backend/.env` and add your API key:
```env
GEMINI_API_KEY=your-actual-gemini-api-key-here
PORT=3001
JWT_SECRET=career-mantra-ai-secret-key-2024
```

**3. Start the Backend**
```bash
cd backend
npm install
npm run dev
```
✅ Backend running on http://localhost:3001

**4. Start the Frontend** (New Terminal)
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running on http://localhost:5173

**5. Open Your Browser**

Navigate to http://localhost:5173 and start using Career Mantra AI! 🎉

### First Time Setup
1. Click "Sign Up" to create an account
2. Enter your name, email, and password
3. Login with your credentials (signup redirects to login)
4. Explore the dashboard and try all AI tools!

### Demo Accounts
- **Admin**: `admin@careermentra.com` / `admin123`
- **Recruiter**: `recruiter@company.com` / `recruiter123`
- **Regular User**: Create your own account

## 📸 Screenshots

### Login Page
Beautiful dark gradient design with glassmorphism effects and smooth animations.

### Dashboard
Interactive tool cards with hover effects and statistics display.

### AI Career Q&A Chat
Real-time chat interface with quick action cards and message history.

### AI Resume Analyzer
Instant analysis with score, detailed feedback, and improvement suggestions.

### Career Roadmap Generator
Personalized step-by-step career progression plans with timelines.

### Mobile View
Fully responsive design that works perfectly on all devices.

---

## 🎯 Usage Guide

### Getting Started
1. **Register/Login** - Create your account or sign in
2. **Explore Dashboard** - View the three AI tool cards
3. **Select a Tool** - Click on any card to access that feature
4. **Interact with AI** - Get personalized career guidance

### AI Career Q&A Chat
- Click quick action cards for common queries
- Or type your own career questions
- Get real-time AI responses
- View chat history in sidebar

### AI Resume Analyzer
- Paste your resume text
- Click "Analyze Resume"
- Get instant score and feedback
- Review improvement suggestions

### Career Roadmap Generator
- Enter current and target roles
- Add your experience and skills
- Click "Generate Career Roadmap"
- Get step-by-step career plan

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Multi-role user login

### AI Features
- `POST /api/chat` - Career Q&A chat with AI
- `POST /api/analyze-resume` - Resume analysis
- `POST /api/generate-roadmap` - Career roadmap generation

### Admin Panel
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `PUT /api/admin/users/:id/role` - Change user role (admin only)

### Job System
- `GET /api/jobs` - Get public job listings
- `POST /api/jobs/apply` - Submit job application with resume
- `POST /api/recruiter/jobs` - Create job posting (recruiter only)
- `GET /api/recruiter/jobs` - Get recruiter's jobs
- `GET /api/recruiter/applications` - Get job applications
- `GET /api/recruiter/applications/:id/resume` - Download resume

### Utility
- `GET /health` - Health check
- `GET /api/user/profile` - Get user profile (protected)

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
```

**Variables:**
- `GEMINI_API_KEY` - Your Google Gemini API key (required)
- `PORT` - Backend server port (default: 3001)
- `JWT_SECRET` - Secret key for JWT tokens (change in production)

## 📱 Responsive Design

Career Mantra AI works perfectly on all devices:

| Device  | Screen Size | Layout      | Features                    |
|---------|-------------|-------------|-----------------------------|
| 📱 Mobile | < 768px    | 1 column    | Hamburger menu, stacked cards |
| 📱 Tablet | 768-1024px | 2 columns   | Visible sidebar, adaptive grid |
| 💻 Desktop | > 1024px   | 3 columns   | Full sidebar, multi-column layout |

## 🎨 Design Highlights

- **Dark Gradient Theme**: Consistent purple-blue gradient backgrounds
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Blob animations, floating logo, card hover effects
- **Interactive Cards**: Scale, translate, and gradient overlay on hover
- **Professional Branding**: Career Mantra AI identity throughout

## 💰 Cost Information

### Google Gemini API Usage
- **Model**: Gemini 2.5 Flash (fast and affordable)
- **Cost**: ~$0.001 per conversation
- **Monitoring**: Track usage at https://makersuite.google.com/app/apikey

### Hosting (Optional)
- **Frontend**: Free (Vercel, Netlify)
- **Backend**: $5-10/month (Railway, Render)
- **Total**: ~$10-15/month for small scale

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token authentication (24-hour expiration)
- ✅ Role-based access control (admin/user/recruiter)
- ✅ Protected API routes with middleware
- ✅ Input validation and sanitization
- ✅ File upload security (type and size validation)
- ✅ CORS configuration
- ✅ Environment variable management
- ✅ Secure password visibility toggle

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Fast 3-step setup guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Complete system architecture
- **[FEATURES.md](FEATURES.md)** - Detailed feature documentation
- **[USER_GUIDE.md](USER_GUIDE.md)** - Complete user manual
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[ROADMAP.md](ROADMAP.md)** - Future development plans
- **[ADMIN_SETUP.md](ADMIN_SETUP.md)** - Admin panel configuration
- **[RECRUITER_SYSTEM.md](RECRUITER_SYSTEM.md)** - Job system documentation
- **[API_SETUP.md](API_SETUP.md)** - API configuration guide

## 🐛 Troubleshooting

### Common Issues

**"Google Gemini API key not configured"**
- Add your API key to `backend/.env`
- Restart the backend server

**"Invalid Gemini API key"**
- Check your API key at https://makersuite.google.com/app/apikey
- Ensure the key has proper permissions

**"Failed to connect"**
- Ensure backend is running on port 3001
- Check that both servers are running

**"Invalid email or password"**
- Register a new account first
- Check email/password spelling

**Port already in use**
- Change PORT in `backend/.env`
- Or kill the process using that port

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google AI** for providing the Gemini 2.5 Flash API
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Vite** for the fast build tool

## 📞 Support

Need help? Check out:
- 📖 [Documentation](PROJECT_OVERVIEW.md)
- 🚀 [Quick Start Guide](QUICK_START.md)
- 🎬 [Demo Guide](DEMO_GUIDE.md)
- 🐛 [Troubleshooting](#-troubleshooting)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">

**Built with ❤️ for students seeking career guidance**

[Report Bug](https://github.com/yourusername/career-mantra-ai/issues) • [Request Feature](https://github.com/yourusername/career-mantra-ai/issues)

</div>
#   c a r e e r - m a n t r a - A I - 
 
 