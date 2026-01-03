# Career Mantra AI - System Architecture

## 🏗️ Architecture Overview

Career Mantra AI follows a modern client-server architecture with AI integration.

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                    (React 19 + Tailwind CSS)                    │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API SERVER                         │
│                    (Node.js + Express.js)                       │
└─────────────────────────────────────────────────────────────────┘
                              ↕ API Calls
┌─────────────────────────────────────────────────────────────────┐
│                      OPENAI API SERVICE                         │
│                      (GPT-4o-mini Model)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 System Components

### 1. Frontend Layer (React Application)

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx           # Authentication page
│   │   └── Dashboard.jsx       # Main dashboard with tool cards
│   │
│   ├── components/
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── ChatInterface.jsx   # AI Q&A chat component
│   │   ├── ResumeAnalyzer.jsx  # Resume analysis tool
│   │   └── RoadmapGenerator.jsx # Career roadmap tool
│   │
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
│
├── public/
│   └── logo.svg                # Career Mantra logo
│
└── package.json                # Dependencies
```

**Key Technologies:**
- React 19 (UI framework)
- Vite (Build tool)
- Tailwind CSS (Styling)
- Axios (HTTP client)
- Lucide React (Icons)

---

### 2. Backend Layer (Node.js Server)

```
backend/
├── server.js                   # Main server file
├── package.json                # Dependencies
├── .env                        # Environment variables
└── .env.example                # Example env file
```

**Key Technologies:**
- Node.js (Runtime)
- Express.js (Web framework)
- OpenAI SDK (AI integration)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT authentication)
- CORS (Cross-origin support)

---

## 🔄 Data Flow Diagrams

### User Authentication Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │ 1. Enter credentials
     ↓
┌────────────────┐
│  Login Page    │
└────┬───────────┘
     │ 2. POST /api/auth/login
     ↓
┌────────────────┐
│  Backend API   │
│  - Validate    │
│  - Hash check  │
│  - Generate JWT│
└────┬───────────┘
     │ 3. Return token + user data
     ↓
┌────────────────┐
│  Frontend      │
│  - Store token │
│  - Store user  │
│  - Redirect    │
└────┬───────────┘
     │ 4. Show Dashboard
     ↓
┌────────────────┐
│  Dashboard     │
└────────────────┘
```

---

### AI Chat Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │ 1. Type question
     ↓
┌────────────────┐
│ Chat Interface │
└────┬───────────┘
     │ 2. POST /api/chat
     │    {messages, systemPrompt}
     ↓
┌────────────────┐
│  Backend API   │
│  - Validate    │
│  - Add context │
└────┬───────────┘
     │ 3. Call OpenAI API
     ↓
┌────────────────┐
│  OpenAI API    │
│  GPT-4o-mini   │
└────┬───────────┘
     │ 4. AI Response
     ↓
┌────────────────┐
│  Backend API   │
│  - Format      │
└────┬───────────┘
     │ 5. Return response
     ↓
┌────────────────┐
│ Chat Interface │
│  - Display     │
│  - Save history│
└────────────────┘
```

---

### Resume Analysis Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │ 1. Upload file OR paste text
     ↓
┌────────────────┐
│Resume Analyzer │
│  - Read file   │
│  - Extract text│
└────┬───────────┘
     │ 2. POST /api/analyze-resume
     │    {resumeText}
     ↓
┌────────────────┐
│  Backend API   │
│  - Validate    │
│  - Add prompt  │
└────┬───────────┘
     │ 3. Call OpenAI API
     ↓
┌────────────────┐
│  OpenAI API    │
│  - Analyze     │
│  - Score       │
│  - Suggest     │
└────┬───────────┘
     │ 4. JSON Response
     │    {score, analysis, suggestions}
     ↓
┌────────────────┐
│Resume Analyzer │
│  - Show score  │
│  - Display     │
│    feedback    │
└────────────────┘
```

---

### Career Roadmap Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │ 1. Fill form
     │    - Current role
     │    - Target role
     │    - Experience
     │    - Skills
     ↓
┌────────────────┐
│Roadmap Generator│
└────┬───────────┘
     │ 2. POST /api/generate-roadmap
     │    {currentRole, targetRole, ...}
     ↓
┌────────────────┐
│  Backend API   │
│  - Validate    │
│  - Create prompt│
└────┬───────────┘
     │ 3. Call OpenAI API
     ↓
┌────────────────┐
│  OpenAI API    │
│  - Generate    │
│    roadmap     │
└────┬───────────┘
     │ 4. JSON Response
     │    {steps[], timeline, resources}
     ↓
┌────────────────┐
│Roadmap Generator│
│  - Display     │
│    steps       │
│  - Show        │
│    timeline    │
└────────────────┘
```

---

## 🔐 Security Architecture

### Authentication & Authorization

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Password Hashing (bcrypt)                              │
│     - Salt rounds: 10                                       │
│     - One-way encryption                                    │
│                                                             │
│  2. JWT Token Authentication                               │
│     - Token expiration: 7 days                             │
│     - Stored in localStorage                               │
│     - Sent in Authorization header                         │
│                                                             │
│  3. Protected Routes                                        │
│     - Middleware validation                                │
│     - Token verification                                    │
│     - User session check                                    │
│                                                             │
│  4. CORS Configuration                                      │
│     - Allowed origins                                       │
│     - Credentials support                                   │
│                                                             │
│  5. Environment Variables                                   │
│     - API keys hidden                                       │
│     - Secrets not committed                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Data Storage

### Current Implementation (In-Memory)

```
Backend Server Memory
├── users[]                     # Array of user objects
│   ├── id
│   ├── email
│   ├── name
│   ├── password (hashed)
│   └── createdAt
│
└── sessions                    # JWT tokens (client-side)
```

### Future Implementation (Database)

```
MongoDB/PostgreSQL
├── users                       # User collection/table
│   ├── _id/id
│   ├── email (unique)
│   ├── name
│   ├── password_hash
│   ├── created_at
│   └── updated_at
│
├── chat_sessions              # Chat history
│   ├── _id/id
│   ├── user_id (foreign key)
│   ├── title
│   ├── messages[]
│   └── created_at
│
├── resume_analyses            # Resume analysis history
│   ├── _id/id
│   ├── user_id (foreign key)
│   ├── resume_text
│   ├── analysis_result
│   └── created_at
│
└── career_roadmaps            # Generated roadmaps
    ├── _id/id
    ├── user_id (foreign key)
    ├── current_role
    ├── target_role
    ├── roadmap_data
    └── created_at
```

---

## 🌐 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create new user account | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/user/profile` | Get user profile | Yes |

### AI Feature Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/chat` | Career Q&A chat | No* |
| POST | `/api/analyze-resume` | Resume analysis | No* |
| POST | `/api/generate-roadmap` | Career roadmap | No* |

*Currently no auth required, but recommended for production

### Utility Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | No |

---

## 📦 Request/Response Formats

### POST /api/auth/register

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1234567890",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

---

### POST /api/chat

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What skills should I learn for data science?"
    }
  ],
  "systemPrompt": "You are Career Mantra AI, an expert career coach..."
}
```

**Response:**
```json
{
  "message": "For a career in data science, I recommend focusing on..."
}
```

---

### POST /api/analyze-resume

**Request:**
```json
{
  "resumeText": "John Doe\nSoftware Developer\n\nEXPERIENCE\n..."
}
```

**Response:**
```json
{
  "score": 85,
  "analysis": "Your resume demonstrates strong technical skills...",
  "suggestions": "Consider adding quantifiable achievements..."
}
```

---

### POST /api/generate-roadmap

**Request:**
```json
{
  "currentRole": "Junior Developer",
  "targetRole": "Senior Software Engineer",
  "experience": "2 years",
  "skills": "JavaScript, React, Node.js"
}
```

**Response:**
```json
{
  "steps": [
    {
      "title": "Master Advanced JavaScript",
      "description": "Deep dive into ES6+, async patterns...",
      "actions": [
        "Complete advanced JS course",
        "Build 3 complex projects"
      ]
    }
  ],
  "timeline": "18-24 months",
  "resources": "Recommended courses and books..."
}
```

---

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
OPENAI_API_KEY=sk-your-openai-api-key
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
```

**Frontend (vite.config.js):**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

---

## 🚀 Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    CDN (CloudFlare)                         │
│                  - Static assets                            │
│                  - SSL/TLS                                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              Frontend (Vercel/Netlify)                      │
│              - React app                                    │
│              - Automatic deployments                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓ API Calls
┌─────────────────────────────────────────────────────────────┐
│              Backend (Railway/Render)                       │
│              - Node.js server                               │
│              - Environment variables                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   OpenAI API                                │
│                   - GPT-4o-mini                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Performance Metrics

### Target Performance

| Metric | Target | Current |
|--------|--------|---------|
| Initial Load Time | < 2s | ~1.5s |
| API Response Time | < 3s | 1-3s |
| Chat Response | < 5s | 2-4s |
| Resume Analysis | < 10s | 5-8s |
| Roadmap Generation | < 10s | 5-8s |

### Optimization Strategies

1. **Frontend:**
   - Code splitting
   - Lazy loading
   - Image optimization
   - CSS minification
   - Gzip compression

2. **Backend:**
   - Response caching
   - Database indexing
   - Connection pooling
   - Rate limiting
   - Load balancing

3. **AI Integration:**
   - Prompt optimization
   - Token limit management
   - Response streaming
   - Caching common queries

---

## 🔄 State Management

### Frontend State Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      App.jsx (Root)                         │
│                                                             │
│  State:                                                     │
│  - user                    # Current user object           │
│  - currentPage             # Active page/tool              │
│  - activeSession           # Current chat session          │
│  - sessions[]              # Chat history                  │
│  - isSidebarOpen           # Mobile sidebar state          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                         │
                         ↓ Props
┌─────────────────────────────────────────────────────────────┐
│                    Child Components                         │
│                                                             │
│  - Dashboard           # Tool selection                    │
│  - ChatInterface       # AI chat                           │
│  - ResumeAnalyzer      # Resume tool                       │
│  - RoadmapGenerator    # Roadmap tool                      │
│  - Sidebar             # Navigation                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 UI Component Hierarchy

```
App
├── Login (if not authenticated)
│   ├── Logo
│   ├── Login/Signup Form
│   └── Submit Button
│
└── Main App (if authenticated)
    ├── Sidebar
    │   ├── Logo & Branding
    │   ├── User Profile
    │   ├── Dashboard Button
    │   ├── New Chat Button
    │   ├── Chat History
    │   ├── Features List
    │   └── Logout Button
    │
    ├── Header (when not on dashboard)
    │   ├── Logo (clickable)
    │   └── Title
    │
    └── Main Content
        ├── Dashboard
        │   ├── Welcome Message
        │   ├── Tool Cards (3)
        │   │   ├── AI Career Q&A Chat
        │   │   ├── Resume Analyzer
        │   │   └── Career Roadmap
        │   └── (removed CTA section)
        │
        ├── ChatInterface
        │   ├── Welcome Screen (empty state)
        │   ├── Messages List
        │   └── Input Box
        │
        ├── ResumeAnalyzer
        │   ├── File Upload
        │   ├── Text Input
        │   ├── Analyze Button
        │   └── Results Display
        │
        └── RoadmapGenerator
            ├── Form Inputs
            ├── Generate Button
            └── Roadmap Display
```

---

## 🔍 Error Handling

### Error Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Error Occurs                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   Try-Catch Block                           │
│                   - Catch error                             │
│                   - Log to console                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                 Error Classification                        │
│                                                             │
│  - Network Error      → "Connection failed"                │
│  - API Error          → "Service unavailable"              │
│  - Validation Error   → "Invalid input"                    │
│  - Auth Error         → "Please login again"               │
│                                                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                  Display to User                            │
│                  - Error message                            │
│                  - Retry option                             │
│                  - Help text                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📈 Scalability Considerations

### Horizontal Scaling

```
                    Load Balancer
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ↓                ↓                ↓
   Backend 1        Backend 2        Backend 3
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ↓
                    Database
                  (with replicas)
```

### Caching Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                      Cache Layers                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Browser Cache                                          │
│     - Static assets (logo, CSS, JS)                        │
│     - User data (localStorage)                             │
│                                                             │
│  2. CDN Cache                                              │
│     - Frontend build files                                 │
│     - Images and fonts                                     │
│                                                             │
│  3. Server Cache (Redis)                                   │
│     - Session data                                         │
│     - Common AI responses                                  │
│     - User profiles                                        │
│                                                             │
│  4. Database Cache                                         │
│     - Query results                                        │
│     - Frequently accessed data                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Future Enhancements

### Planned Architecture Changes

1. **Database Integration**
   - MongoDB for document storage
   - PostgreSQL for relational data
   - Redis for caching

2. **Microservices**
   - Auth service
   - Chat service
   - Resume service
   - Roadmap service

3. **Real-time Features**
   - WebSocket for live chat
   - Server-sent events for notifications
   - Real-time collaboration

4. **Advanced AI**
   - Fine-tuned models
   - Context-aware responses
   - Multi-modal support (voice, video)

---

## 📝 Summary

Career Mantra AI uses a modern, scalable architecture with:
- ✅ Clean separation of concerns
- ✅ RESTful API design
- ✅ Secure authentication
- ✅ AI integration
- ✅ Responsive frontend
- ✅ Modular components
- ✅ Easy to maintain and extend

This architecture supports current features and is designed to scale for future enhancements.
