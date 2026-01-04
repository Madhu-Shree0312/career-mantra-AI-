import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
const users = [];
const jobs = [];
const applications = [];

// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || file.mimetype.includes('document');
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'));
    }
  }
});

// Create default admin user for testing
const createDefaultAdmin = async () => {
  const adminExists = users.find(u => u.email === 'admin@careermentra.com');
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    users.push({
      id: 1,
      email: 'admin@careermentra.com',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'admin',
      createdAt: new Date()
    });
    console.log('🔐 Default admin user created: admin@careermentra.com / admin123');
  }
  
  // Create default recruiter for testing
  const recruiterExists = users.find(u => u.email === 'recruiter@company.com');
  if (!recruiterExists) {
    const hashedPassword = await bcrypt.hash('recruiter123', 10);
    users.push({
      id: 2,
      email: 'recruiter@company.com',
      password: hashedPassword,
      name: 'HR Manager',
      role: 'recruiter',
      company: 'Tech Solutions Inc.',
      createdAt: new Date()
    });
    console.log('🏢 Default recruiter user created: recruiter@company.com / recruiter123');
  }
};

// Initialize default users
createDefaultAdmin();

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

// ✅ Admin middleware
const authenticateAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
  }
  next();
};

// ✅ Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role, company } = req.body;
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
      role: email === 'admin@careermentra.com' ? 'admin' : (role || 'user'),
      company: role === 'recruiter' ? company : undefined,
      createdAt: new Date()
    };

    users.push(user);

    // Don't auto-login on registration, just return success message
    res.status(201).json({
      message: 'User registered successfully. Please login with your credentials.',
      user: { id: user.id, email: user.email, name: user.name, role: user.role, company: user.company }
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

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role, company: user.company }
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

    // ✅ Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_VALID_GEMINI_API_KEY_HERE') {
      return res.status(500).json({ 
        error: "Gemini API key not configured. Please add a valid GEMINI_API_KEY to your .env file." 
      });
    }

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
    
    if (error.message.includes('API key not valid')) {
      res.status(500).json({ 
        error: "Invalid Gemini API key. Please check your GEMINI_API_KEY in the .env file." 
      });
    } else {
      res.status(500).json({ error: "Gemini API request failed: " + error.message });
    }
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

// ✅ Admin endpoints
app.get('/api/admin/users', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const userList = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }));
    
    res.json({
      users: userList,
      totalUsers: userList.length,
      adminUsers: userList.filter(u => u.role === 'admin').length,
      regularUsers: userList.filter(u => u.role === 'user').length
    });
  } catch (error) {
    console.error('Admin users fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

app.delete('/api/admin/users/:id', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found.' });
    }
    
    // Prevent admin from deleting themselves
    if (users[userIndex].id === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account.' });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json({ 
      message: 'User deleted successfully.',
      deletedUser: { id: deletedUser.id, name: deletedUser.name, email: deletedUser.email }
    });
  } catch (error) {
    console.error('Admin user delete error:', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

app.put('/api/admin/users/:id/role', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { role } = req.body;
    
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be "admin" or "user".' });
    }
    
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    
    user.role = role;
    res.json({ 
      message: 'User role updated successfully.',
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Admin role update error:', error);
    res.status(500).json({ error: 'Failed to update user role.' });
  }
});

// ✅ Job Application endpoints
app.post('/api/jobs/apply', authenticateToken, upload.single('resume'), async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      experience,
      coverLetter,
      linkedinProfile,
      portfolioUrl,
      jobId,
      jobTitle,
      company
    } = req.body;

    const application = {
      id: applications.length + 1,
      userId: req.user.id,
      jobId: parseInt(jobId),
      jobTitle,
      company,
      fullName,
      email,
      phone,
      location,
      experience,
      coverLetter,
      linkedinProfile,
      portfolioUrl,
      resumeFileName: req.file ? req.file.originalname : null,
      resumeFilePath: req.file ? req.file.path : null,
      appliedAt: new Date(),
      status: 'pending'
    };

    applications.push(application);

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: application.id
    });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

// ✅ Recruiter endpoints
app.post('/api/recruiter/jobs', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      contactEmail,
      applicationDeadline
    } = req.body;

    const job = {
      id: jobs.length + 1,
      recruiterId: req.user.id,
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      contactEmail,
      applicationDeadline,
      status: 'active',
      createdAt: new Date(),
      applicationCount: 0
    };

    jobs.push(job);

    res.status(201).json({
      message: 'Job posted successfully',
      job: job
    });
  } catch (error) {
    console.error('Job posting error:', error);
    res.status(500).json({ error: 'Failed to post job.' });
  }
});

app.get('/api/recruiter/jobs', authenticateToken, (req, res) => {
  try {
    const recruiterJobs = jobs.filter(job => job.recruiterId === req.user.id);
    
    // Add application count to each job
    const jobsWithCounts = recruiterJobs.map(job => ({
      ...job,
      applicationCount: applications.filter(app => app.jobId === job.id).length
    }));

    res.json({ jobs: jobsWithCounts });
  } catch (error) {
    console.error('Fetch jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs.' });
  }
});

app.put('/api/recruiter/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const jobIndex = jobs.findIndex(job => job.id === jobId && job.recruiterId === req.user.id);
    
    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found or unauthorized.' });
    }

    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      contactEmail,
      applicationDeadline
    } = req.body;

    jobs[jobIndex] = {
      ...jobs[jobIndex],
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      contactEmail,
      applicationDeadline,
      updatedAt: new Date()
    };

    res.json({
      message: 'Job updated successfully',
      job: jobs[jobIndex]
    });
  } catch (error) {
    console.error('Job update error:', error);
    res.status(500).json({ error: 'Failed to update job.' });
  }
});

app.delete('/api/recruiter/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const jobIndex = jobs.findIndex(job => job.id === jobId && job.recruiterId === req.user.id);
    
    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found or unauthorized.' });
    }

    jobs.splice(jobIndex, 1);

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Job deletion error:', error);
    res.status(500).json({ error: 'Failed to delete job.' });
  }
});

app.get('/api/recruiter/applications', authenticateToken, (req, res) => {
  try {
    // Get all jobs posted by this recruiter
    const recruiterJobs = jobs.filter(job => job.recruiterId === req.user.id);
    const recruiterJobIds = recruiterJobs.map(job => job.id);
    
    // Get applications for recruiter's jobs
    const recruiterApplications = applications.filter(app => 
      recruiterJobIds.includes(app.jobId)
    );

    res.json({ applications: recruiterApplications });
  } catch (error) {
    console.error('Fetch applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications.' });
  }
});

app.get('/api/recruiter/applications/:id/resume', authenticateToken, (req, res) => {
  try {
    const applicationId = parseInt(req.params.id);
    const application = applications.find(app => app.id === applicationId);
    
    if (!application || !application.resumeFilePath) {
      return res.status(404).json({ error: 'Resume not found.' });
    }

    // Check if recruiter owns the job this application is for
    const job = jobs.find(job => job.id === application.jobId && job.recruiterId === req.user.id);
    if (!job) {
      return res.status(403).json({ error: 'Unauthorized access.' });
    }

    res.download(application.resumeFilePath, application.resumeFileName);
  } catch (error) {
    console.error('Resume download error:', error);
    res.status(500).json({ error: 'Failed to download resume.' });
  }
});

// ✅ Public job listings endpoint
app.get('/api/jobs', (req, res) => {
  try {
    const activeJobs = jobs.filter(job => job.status === 'active');
    res.json({ jobs: activeJobs });
  } catch (error) {
    console.error('Fetch public jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs.' });
  }
});

// ✅ Health Check & Profile
app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'Career Mantra AI', users: users.length });
});

app.get('/api/user/profile', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json({ id: user.id, email: user.email, name: user.name, role: user.role, company: user.company });
});

// ✅ Recruiter middleware
const authenticateRecruiter = (req, res, next) => {
  if (req.user.role !== 'recruiter' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Recruiter privileges required.' });
  }
  next();
};

// ✅ Job Management Endpoints

// Get all jobs (public)
app.get('/api/jobs', (req, res) => {
  try {
    const jobList = jobs.map(job => ({
      ...job,
      recruiter: users.find(u => u.id === job.recruiterId)?.name || 'Unknown',
      company: users.find(u => u.id === job.recruiterId)?.company || 'Unknown Company',
      applicationsCount: applications.filter(app => app.jobId === job.id).length
    }));
    
    res.json({ jobs: jobList });
  } catch (error) {
    console.error('Jobs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs.' });
  }
});

// Get jobs posted by current recruiter
app.get('/api/recruiter/jobs', authenticateToken, authenticateRecruiter, (req, res) => {
  try {
    const recruiterJobs = jobs.filter(job => job.recruiterId === req.user.id);
    const jobsWithApplications = recruiterJobs.map(job => ({
      ...job,
      applicationsCount: applications.filter(app => app.jobId === job.id).length,
      applications: applications.filter(app => app.jobId === job.id).map(app => ({
        ...app,
        applicant: users.find(u => u.id === app.applicantId)
      }))
    }));
    
    res.json({ jobs: jobsWithApplications });
  } catch (error) {
    console.error('Recruiter jobs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch recruiter jobs.' });
  }
});

// Create new job (recruiter only)
app.post('/api/jobs', authenticateToken, authenticateRecruiter, (req, res) => {
  try {
    const { title, description, requirements, location, salary, jobType, experience } = req.body;
    
    const job = {
      id: jobs.length + 1,
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      experience,
      recruiterId: req.user.id,
      status: 'active',
      createdAt: new Date()
    };
    
    jobs.push(job);
    
    res.status(201).json({
      message: 'Job posted successfully',
      job: {
        ...job,
        recruiter: req.user.name,
        company: users.find(u => u.id === req.user.id)?.company
      }
    });
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ error: 'Failed to create job.' });
  }
});

// Update job (recruiter only)
app.put('/api/jobs/:id', authenticateToken, authenticateRecruiter, (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const jobIndex = jobs.findIndex(job => job.id === jobId && job.recruiterId === req.user.id);
    
    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found or access denied.' });
    }
    
    const { title, description, requirements, location, salary, jobType, experience, status } = req.body;
    
    jobs[jobIndex] = {
      ...jobs[jobIndex],
      title: title || jobs[jobIndex].title,
      description: description || jobs[jobIndex].description,
      requirements: requirements || jobs[jobIndex].requirements,
      location: location || jobs[jobIndex].location,
      salary: salary || jobs[jobIndex].salary,
      jobType: jobType || jobs[jobIndex].jobType,
      experience: experience || jobs[jobIndex].experience,
      status: status || jobs[jobIndex].status,
      updatedAt: new Date()
    };
    
    res.json({
      message: 'Job updated successfully',
      job: jobs[jobIndex]
    });
  } catch (error) {
    console.error('Job update error:', error);
    res.status(500).json({ error: 'Failed to update job.' });
  }
});

// Delete job (recruiter only)
app.delete('/api/jobs/:id', authenticateToken, authenticateRecruiter, (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const jobIndex = jobs.findIndex(job => job.id === jobId && job.recruiterId === req.user.id);
    
    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found or access denied.' });
    }
    
    const deletedJob = jobs.splice(jobIndex, 1)[0];
    
    // Also remove related applications
    const removedApplications = applications.filter(app => app.jobId === jobId);
    applications.splice(0, applications.length, ...applications.filter(app => app.jobId !== jobId));
    
    res.json({
      message: 'Job deleted successfully',
      deletedJob,
      removedApplications: removedApplications.length
    });
  } catch (error) {
    console.error('Job deletion error:', error);
    res.status(500).json({ error: 'Failed to delete job.' });
  }
});

// ✅ Application Management Endpoints

// Apply for a job (user only)
app.post('/api/jobs/:id/apply', authenticateToken, (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ error: 'Only users can apply for jobs.' });
    }
    
    const jobId = parseInt(req.params.id);
    const job = jobs.find(j => j.id === jobId);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found.' });
    }
    
    // Check if already applied
    const existingApplication = applications.find(app => 
      app.jobId === jobId && app.applicantId === req.user.id
    );
    
    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this job.' });
    }
    
    const { coverLetter, resume } = req.body;
    
    const application = {
      id: applications.length + 1,
      jobId,
      applicantId: req.user.id,
      coverLetter,
      resume,
      status: 'pending',
      appliedAt: new Date()
    };
    
    applications.push(application);
    
    res.status(201).json({
      message: 'Application submitted successfully',
      application: {
        ...application,
        job: job.title,
        company: users.find(u => u.id === job.recruiterId)?.company
      }
    });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

// Get user's applications
app.get('/api/user/applications', authenticateToken, (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ error: 'Access denied.' });
    }
    
    const userApplications = applications.filter(app => app.applicantId === req.user.id);
    const applicationsWithDetails = userApplications.map(app => ({
      ...app,
      job: jobs.find(j => j.id === app.jobId),
      company: users.find(u => u.id === jobs.find(j => j.id === app.jobId)?.recruiterId)?.company
    }));
    
    res.json({ applications: applicationsWithDetails });
  } catch (error) {
    console.error('User applications fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch applications.' });
  }
});

// Update application status (recruiter only)
app.put('/api/applications/:id/status', authenticateToken, authenticateRecruiter, (req, res) => {
  try {
    const applicationId = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }
    
    const application = applications.find(app => app.id === applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found.' });
    }
    
    // Check if recruiter owns the job
    const job = jobs.find(j => j.id === application.jobId);
    if (!job || job.recruiterId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied.' });
    }
    
    application.status = status;
    application.updatedAt = new Date();
    
    res.json({
      message: 'Application status updated successfully',
      application: {
        ...application,
        applicant: users.find(u => u.id === application.applicantId)
      }
    });
  } catch (error) {
    console.error('Application status update error:', error);
    res.status(500).json({ error: 'Failed to update application status.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Career Mantra AI Backend running on http://localhost:${PORT}`);
  console.log(`📝 Registered users: ${users.length}`);
  console.log(`🤖 AI: Google Gemini 2.5 Flash`);
});