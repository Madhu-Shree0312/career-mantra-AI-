import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Loader2, X, Edit3, Eye, Download } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('analyze'); // 'analyze' or 'builder'
  const fileInputRef = useRef(null);

  // Resume builder state
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [
      {
        id: 1,
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }
    ],
    skills: [],
    projects: [
      {
        id: 1,
        name: '',
        description: '',
        technologies: '',
        link: ''
      }
    ]
  });

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, {
        id: Date.now(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    });
  };

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const updateExperience = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, {
        id: Date.now(),
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }]
    });
  };

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const updateEducation = (id, field, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, {
        id: Date.now(),
        name: '',
        description: '',
        technologies: '',
        link: ''
      }]
    });
  };

  const removeProject = (id) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(proj => proj.id !== id)
    });
  };

  const updateProject = (id, field, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  const addSkill = (skill) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, skill.trim()]
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const generateResumeText = () => {
    const { personalInfo, summary, experience, education, skills, projects } = resumeData;
    
    let resumeText = '';
    
    // Personal Info
    if (personalInfo.fullName) {
      resumeText += `${personalInfo.fullName}\n`;
      if (personalInfo.email) resumeText += `Email: ${personalInfo.email}\n`;
      if (personalInfo.phone) resumeText += `Phone: ${personalInfo.phone}\n`;
      if (personalInfo.location) resumeText += `Location: ${personalInfo.location}\n`;
      if (personalInfo.linkedin) resumeText += `LinkedIn: ${personalInfo.linkedin}\n`;
      if (personalInfo.website) resumeText += `Website: ${personalInfo.website}\n`;
      resumeText += '\n';
    }
    
    // Summary
    if (summary) {
      resumeText += `PROFESSIONAL SUMMARY\n${summary}\n\n`;
    }
    
    // Experience
    if (experience.some(exp => exp.jobTitle || exp.company)) {
      resumeText += 'WORK EXPERIENCE\n';
      experience.forEach(exp => {
        if (exp.jobTitle || exp.company) {
          resumeText += `${exp.jobTitle} - ${exp.company}\n`;
          if (exp.location) resumeText += `${exp.location}\n`;
          if (exp.startDate || exp.endDate) {
            resumeText += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
          }
          if (exp.description) resumeText += `${exp.description}\n`;
          resumeText += '\n';
        }
      });
    }
    
    // Education
    if (education.some(edu => edu.degree || edu.school)) {
      resumeText += 'EDUCATION\n';
      education.forEach(edu => {
        if (edu.degree || edu.school) {
          resumeText += `${edu.degree} - ${edu.school}\n`;
          if (edu.location) resumeText += `${edu.location}\n`;
          if (edu.graduationDate) resumeText += `Graduated: ${edu.graduationDate}\n`;
          if (edu.gpa) resumeText += `GPA: ${edu.gpa}\n`;
          resumeText += '\n';
        }
      });
    }
    
    // Skills
    if (skills.length > 0) {
      resumeText += `SKILLS\n${skills.join(', ')}\n\n`;
    }
    
    // Projects
    if (projects.some(proj => proj.name)) {
      resumeText += 'PROJECTS\n';
      projects.forEach(proj => {
        if (proj.name) {
          resumeText += `${proj.name}\n`;
          if (proj.description) resumeText += `${proj.description}\n`;
          if (proj.technologies) resumeText += `Technologies: ${proj.technologies}\n`;
          if (proj.link) resumeText += `Link: ${proj.link}\n`;
          resumeText += '\n';
        }
      });
    }
    
    return resumeText;
  };

  const analyzeBuiltResume = () => {
    const generatedText = generateResumeText();
    setResumeText(generatedText);
    setActiveTab('analyze');
    // Auto-analyze after a short delay
    setTimeout(() => {
      if (generatedText.trim()) {
        analyzeResume(generatedText);
      }
    }, 500);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploadedFile(file);

    // For text files, read directly and analyze
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setResumeText(text);
        // Auto-analyze the uploaded text file
        analyzeResume(text);
      };
      reader.readAsText(file);
    } else {
      // For PDF/DOC files, analyze based on filename and show message
      const text = `File uploaded: ${file.name}\n\nNote: PDF and DOC file content extraction is limited. For best results, please use the Resume Builder tab to create your resume, or upload a TXT file with your resume content.`;
      setResumeText(text);
      // Auto-analyze the uploaded file
      analyzeResume(text);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setResumeText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeResume = async (textToAnalyze = null) => {
    const text = textToAnalyze || resumeText;
    if (!text.trim()) return;

    setIsAnalyzing(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/analyze-resume`, {
        resumeText: text
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error('Resume analysis error:', error);
      setAnalysis({
        error: 'Failed to analyze resume. Please make sure the backend is running.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-4 lg:p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">AI Resume Tools</h2>
              <p className="text-white/80">
                Build your resume with live preview or analyze existing resume text
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                activeTab === 'builder'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              Resume Builder
            </button>
            <button
              onClick={() => setActiveTab('analyze')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                activeTab === 'analyze'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Analyze Resume
            </button>
          </div>
        </div>

        {activeTab === 'builder' ? (
          /* Resume Builder */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 overflow-hidden">
            {/* Builder Form */}
            <div className="space-y-6 overflow-y-auto max-h-screen pb-20">
              {/* Personal Information */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, fullName: e.target.value }
                    })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                    })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                    })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, location: e.target.value }
                    })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value }
                    })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="url"
                    placeholder="Website/Portfolio"
                    value={resumeData.personalInfo.website}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, website: e.target.value }
                    })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Professional Summary */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Professional Summary</h3>
                <textarea
                  placeholder="Write a brief professional summary..."
                  value={resumeData.summary}
                  onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                  className="w-full h-24 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Work Experience */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Work Experience</h3>
                  <button
                    onClick={addExperience}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-all"
                  >
                    Add Experience
                  </button>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="border border-white/20 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-white/80 text-sm">Experience {index + 1}</span>
                        {resumeData.experience.length > 1 && (
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-400 hover:text-red-300 text-sm flex-shrink-0"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Job Title"
                            value={exp.jobTitle}
                            onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm w-full"
                          />
                          <input
                            type="text"
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm w-full"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Location"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm w-full"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="month"
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm w-full"
                          />
                          <input
                            type="month"
                            placeholder="End Date"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.current}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm disabled:opacity-50 w-full"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="flex items-center gap-2 text-white/80 text-sm mb-2">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              className="rounded"
                            />
                            Currently working here
                          </label>
                          <textarea
                            placeholder="Job description and achievements..."
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            className="w-full h-20 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Education</h3>
                  <button
                    onClick={addEducation}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-all"
                  >
                    Add Education
                  </button>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="border border-white/20 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-white/80 text-sm">Education {index + 1}</span>
                        {resumeData.education.length > 1 && (
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="School/University"
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                        />
                        <input
                          type="month"
                          placeholder="Graduation Date"
                          value={edu.graduationDate}
                          onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="GPA (optional)"
                          value={edu.gpa}
                          onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600/50 text-white rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-white/70 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a skill and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkill(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Projects */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Projects</h3>
                  <button
                    onClick={addProject}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-all"
                  >
                    Add Project
                  </button>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {resumeData.projects.map((proj, index) => (
                    <div key={proj.id} className="border border-white/20 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-white/80 text-sm">Project {index + 1}</span>
                        {resumeData.projects.length > 1 && (
                          <button
                            onClick={() => removeProject(proj.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Project Name"
                          value={proj.name}
                          onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                        />
                        <textarea
                          placeholder="Project description..."
                          value={proj.description}
                          onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                          className="w-full h-16 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm resize-none"
                        />
                        <input
                          type="text"
                          placeholder="Technologies used"
                          value={proj.technologies}
                          onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                        />
                        <input
                          type="url"
                          placeholder="Project link (optional)"
                          value={proj.link}
                          onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={analyzeBuiltResume}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
              >
                <TrendingUp className="w-5 h-5" />
                Analyze My Resume
              </button>
            </div>

            {/* Live Preview */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-fit sticky top-6 max-h-screen overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const resumeText = generateResumeText();
                      navigator.clipboard.writeText(resumeText);
                      alert('Resume text copied to clipboard!');
                    }}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-all"
                  >
                    Copy Text
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm transition-all flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Print
                  </button>
                </div>
              </div>
              
              {/* Resume Template */}
              <div className="bg-white border border-gray-300 rounded-lg p-8 max-h-[calc(100vh-200px)] overflow-y-auto shadow-inner" style={{ fontFamily: 'Georgia, serif' }}>
                {resumeData.personalInfo.fullName ? (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center border-b-2 border-gray-800 pb-4">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {resumeData.personalInfo.fullName}
                      </h1>
                      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                        {resumeData.personalInfo.email && (
                          <span>{resumeData.personalInfo.email}</span>
                        )}
                        {resumeData.personalInfo.phone && (
                          <span>{resumeData.personalInfo.phone}</span>
                        )}
                        {resumeData.personalInfo.location && (
                          <span>{resumeData.personalInfo.location}</span>
                        )}
                      </div>
                      {(resumeData.personalInfo.linkedin || resumeData.personalInfo.website) && (
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600 mt-2">
                          {resumeData.personalInfo.linkedin && (
                            <span className="break-all">{resumeData.personalInfo.linkedin}</span>
                          )}
                          {resumeData.personalInfo.website && (
                            <span className="break-all">{resumeData.personalInfo.website}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Professional Summary */}
                    {resumeData.summary && (
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">
                          PROFESSIONAL SUMMARY
                        </h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {resumeData.summary}
                        </p>
                      </div>
                    )}

                    {/* Work Experience */}
                    {resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-400">
                          WORK EXPERIENCE
                        </h2>
                        <div className="space-y-4">
                          {resumeData.experience.map((exp, index) => (
                            (exp.jobTitle || exp.company) && (
                              <div key={index} className="border-l-2 border-gray-300 pl-4">
                                <div className="flex justify-between items-start mb-1">
                                  <div>
                                    <h3 className="font-semibold text-gray-900">
                                      {exp.jobTitle}
                                    </h3>
                                    <p className="text-sm font-medium text-gray-700">
                                      {exp.company}
                                    </p>
                                  </div>
                                  <div className="text-right text-sm text-gray-600">
                                    {exp.location && <p>{exp.location}</p>}
                                    {(exp.startDate || exp.endDate) && (
                                      <p className="font-medium">
                                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        {exp.startDate && (exp.endDate || exp.current) && ' - '}
                                        {exp.current ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {exp.description && (
                                  <div className="text-sm text-gray-700 mt-2">
                                    {exp.description.split('\n').map((line, i) => (
                                      <p key={i} className="mb-1">• {line}</p>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {resumeData.education.some(edu => edu.degree || edu.school) && (
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-400">
                          EDUCATION
                        </h2>
                        <div className="space-y-3">
                          {resumeData.education.map((edu, index) => (
                            (edu.degree || edu.school) && (
                              <div key={index} className="border-l-2 border-gray-300 pl-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-gray-900">
                                      {edu.degree}
                                    </h3>
                                    <p className="text-sm text-gray-700">
                                      {edu.school}
                                    </p>
                                  </div>
                                  <div className="text-right text-sm text-gray-600">
                                    {edu.location && <p>{edu.location}</p>}
                                    {edu.graduationDate && (
                                      <p className="font-medium">
                                        {new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                      </p>
                                    )}
                                    {edu.gpa && (
                                      <p>GPA: {edu.gpa}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills.length > 0 && (
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">
                          SKILLS
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm border"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {resumeData.projects.some(proj => proj.name) && (
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-400">
                          PROJECTS
                        </h2>
                        <div className="space-y-4">
                          {resumeData.projects.map((proj, index) => (
                            proj.name && (
                              <div key={index} className="border-l-2 border-gray-300 pl-4">
                                <div className="flex justify-between items-start mb-1">
                                  <h3 className="font-semibold text-gray-900">
                                    {proj.name}
                                  </h3>
                                  {proj.link && (
                                    <a
                                      href={proj.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 text-sm hover:underline"
                                    >
                                      View Project
                                    </a>
                                  )}
                                </div>
                                {proj.description && (
                                  <p className="text-sm text-gray-700 mb-2">
                                    {proj.description}
                                  </p>
                                )}
                                {proj.technologies && (
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Technologies:</span> {proj.technologies}
                                  </p>
                                )}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Resume Preview</p>
                    <p className="text-sm">Start filling out the form to see your professional resume template</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Resume Analyzer */

          <div className="max-w-6xl mx-auto">
            <div className="space-y-4">
              {/* File Upload Section */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Upload Resume File
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 border-2 border-dashed border-white/30 rounded-lg hover:border-purple-400 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-white" />
                    <span className="text-white text-sm">
                      {uploadedFile ? uploadedFile.name : 'Choose file (PDF, DOC, DOCX, TXT)'}
                    </span>
                  </label>
                  {uploadedFile && (
                    <button
                      onClick={removeFile}
                      className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-all flex items-center gap-2 text-red-200"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-sm">Remove</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-white/50 mt-2">
                  Supported formats: PDF, DOC, DOCX, TXT (Max 5MB) - Analysis starts automatically after upload
                </p>
              </div>

              {isAnalyzing && (
                <div className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="text-white">Analyzing your resume...</span>
                </div>
              )}

              {uploadedFile && !isAnalyzing && (
                <div className="text-center text-sm text-white/70 bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                  ✅ <span className="font-medium text-white">{uploadedFile.name}</span> analyzed successfully
                </div>
              )}
            </div>
          </div>
        )}

        {analysis && !analysis.error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Career Mantra AI Analysis</h3>
                <div className="prose prose-sm max-w-none">
                  <div 
                    className="text-gray-700 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: analysis.analysis
                        .replace(/### (.*)/g, '<h3 class="text-lg font-bold text-gray-900 mt-6 mb-3 flex items-center gap-2">$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                        .replace(/- (.*)/g, '<li class="ml-4 mb-2">$1</li>')
                        .replace(/(\d+)\/100/g, '<span class="font-bold text-blue-600">$1/100</span>')
                        .replace(/Overall Score.*?(\d+)/i, '<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4"><span class="text-lg font-bold text-blue-900">Overall Score: $1/100</span></div>')
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {analysis.score && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Score</h3>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${analysis.score * 3.51} 351`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">{analysis.score}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    {analysis.score >= 80 ? 'Excellent Resume!' : 
                     analysis.score >= 70 ? 'Good Resume' : 
                     analysis.score >= 60 ? 'Needs Some Work' : 'Significant Improvements Needed'}
                  </p>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Action Items</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Review the improvement suggestions above
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Implement ATS optimization tips
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Quantify your achievements with numbers
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Tailor resume for each job application
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-sm border border-green-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Pro Tip</h3>
                <p className="text-sm text-gray-700">
                  Use the <strong>Resume Builder</strong> tab to create a professional resume template, 
                  then come back here to analyze and optimize it further!
                </p>
              </div>
            </div>
          </div>
        )}

        {analysis?.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Analysis Failed</h3>
                <p className="text-red-700">{analysis.error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;
