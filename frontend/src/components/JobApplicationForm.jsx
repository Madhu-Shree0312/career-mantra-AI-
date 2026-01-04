import { useState } from 'react';
import { 
  Upload, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  X,
  Check
} from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

function JobApplicationForm({ job, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    coverLetter: '',
    linkedinProfile: '',
    portfolioUrl: ''
  });
  
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.includes('document')) {
        if (file.size <= 5 * 1024 * 1024) { // 5MB limit
          setResume(file);
        } else {
          alert('File size must be less than 5MB');
        }
      } else {
        alert('Please upload a PDF or Word document');
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type.includes('document')) {
        if (file.size <= 5 * 1024 * 1024) {
          setResume(file);
        } else {
          alert('File size must be less than 5MB');
        }
      } else {
        alert('Please upload a PDF or Word document');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Add job information
      formDataToSend.append('jobId', job.id);
      formDataToSend.append('jobTitle', job.title);
      formDataToSend.append('company', job.company);
      
      // Add resume file
      if (resume) {
        formDataToSend.append('resume', resume);
      }

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/api/jobs/apply`,
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      alert('Application submitted successfully! 🎉');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert(error.response?.data?.error || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl border border-white/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-400" />
              Apply for Position
            </h3>
            <p className="text-blue-200 mt-1">{job.title} at {job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="City, State"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Professional Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">Years of Experience *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-white/90 text-sm font-medium mb-2">Portfolio/Website</label>
              <input
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Resume Upload *
            </h4>
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
                dragActive 
                  ? 'border-green-400 bg-green-400/10' 
                  : 'border-white/30 bg-white/5'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="text-center">
                {resume ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Check className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{resume.name}</p>
                      <p className="text-white/60 text-sm">{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
                    <p className="text-white mb-2">Drop your resume here or click to browse</p>
                    <p className="text-white/60 text-sm">PDF, DOC, or DOCX files up to 5MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Cover Letter *</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || !resume}
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobApplicationForm;