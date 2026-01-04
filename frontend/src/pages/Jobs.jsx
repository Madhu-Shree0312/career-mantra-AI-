import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Building, 
  ExternalLink,
  Filter,
  Star,
  BookmarkPlus,
  Bookmark
} from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import JobApplicationForm from '../components/JobApplicationForm';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Mock job data - in production, this would come from a job API
  const mockJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing features using React, TypeScript, and modern web technologies.',
      requirements: ['3+ years React experience', 'TypeScript proficiency', 'CSS/SCSS skills'],
      posted: '2 days ago',
      logo: '🏢',
      remote: false,
      featured: true,
      applyUrl: 'https://techcorp.com/careers/frontend-developer'
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'DataFlow Analytics',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $140,000',
      description: 'Join our data science team to build predictive models and extract insights from large datasets using Python, SQL, and machine learning frameworks.',
      requirements: ['Python/R expertise', 'Machine Learning', 'SQL proficiency'],
      posted: '1 day ago',
      logo: '📊',
      remote: true,
      featured: false,
      applyUrl: 'https://dataflow.com/jobs/data-scientist'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Design Studio Pro',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$60 - $80/hour',
      description: 'We need a creative UX Designer to help design intuitive user experiences for our mobile and web applications.',
      requirements: ['Figma/Sketch expertise', 'User research skills', 'Portfolio required'],
      posted: '3 days ago',
      logo: '🎨',
      remote: false,
      featured: false,
      applyUrl: 'https://designstudiopro.com/careers/ux-designer'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudTech Solutions',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$95,000 - $130,000',
      description: 'Looking for a DevOps Engineer to manage our cloud infrastructure, CI/CD pipelines, and ensure system reliability.',
      requirements: ['AWS/Azure experience', 'Docker/Kubernetes', 'CI/CD pipelines'],
      posted: '1 week ago',
      logo: '☁️',
      remote: true,
      featured: true,
      applyUrl: 'https://cloudtech.com/careers/devops-engineer'
    },
    {
      id: 5,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$110,000 - $150,000',
      description: 'Lead product strategy and development for our cutting-edge SaaS platform. Work with cross-functional teams to deliver exceptional user experiences.',
      requirements: ['5+ years PM experience', 'Agile methodology', 'Technical background'],
      posted: '4 days ago',
      logo: '🚀',
      remote: false,
      featured: false,
      applyUrl: 'https://innovationlabs.com/jobs/product-manager'
    },
    {
      id: 6,
      title: 'Backend Developer',
      company: 'ServerSide Systems',
      location: 'Remote',
      type: 'Part-time',
      salary: '$50,000 - $70,000',
      description: 'Build and maintain scalable backend services using Node.js, Python, and cloud technologies.',
      requirements: ['Node.js/Python', 'Database design', 'API development'],
      posted: '5 days ago',
      logo: '⚙️',
      remote: true,
      featured: false,
      applyUrl: 'https://serverside.com/careers/backend-developer'
    }
  ];

  useEffect(() => {
    // Fetch jobs from API
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jobs`);
        const apiJobs = response.data.jobs || [];
        
        // Combine API jobs with mock jobs for demo
        const allJobs = [...apiJobs, ...mockJobs];
        setJobs(allJobs);
        setFilteredJobs(allJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        // Fallback to mock data
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (jobTypeFilter) {
      filtered = filtered.filter(job => job.type === jobTypeFilter);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, locationFilter, jobTypeFilter, jobs]);

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const getApplicationTips = async (jobTitle) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        messages: [{
          role: 'user',
          content: `Give me 3 specific tips for applying to a ${jobTitle} position. Keep it concise and actionable.`
        }]
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert(`AI Tips for ${jobTitle}:\n\n${response.data.message}`);
    } catch (error) {
      console.error('Failed to get application tips:', error);
      alert('Failed to get AI tips. Please try again.');
    }
  };

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleApplyConfirm = (method) => {
    if (!selectedJob) return;

    setShowApplyModal(false);
    
    switch (method) {
      case 'form':
        setShowApplicationForm(true);
        break;
      case 'direct':
        if (selectedJob.applyUrl) {
          window.open(selectedJob.applyUrl, '_blank');
        } else {
          const searchQuery = encodeURIComponent(`${selectedJob.title} ${selectedJob.company}`);
          window.open(`https://www.google.com/search?q=${searchQuery}+careers`, '_blank');
        }
        break;
      case 'linkedin':
        const linkedinQuery = encodeURIComponent(`${selectedJob.title} ${selectedJob.company}`);
        window.open(`https://www.linkedin.com/jobs/search/?keywords=${linkedinQuery}`, '_blank');
        break;
      case 'indeed':
        const indeedQuery = encodeURIComponent(`${selectedJob.title} ${selectedJob.company}`);
        window.open(`https://www.indeed.com/jobs?q=${indeedQuery}`, '_blank');
        break;
      case 'save':
        toggleSaveJob(selectedJob.id);
        alert(`${selectedJob.title} has been saved to your bookmarks! 📌`);
        return;
    }
    
    if (method !== 'form') {
      // Track application
      console.log(`User applied for: ${selectedJob.title} at ${selectedJob.company} via ${method}`);
      
      // Show success message
      setTimeout(() => {
        alert(`Application initiated for ${selectedJob.title}!\n\nGood luck with your application! 🍀`);
      }, 500);
    }
  };

  const handleApplicationSuccess = () => {
    // Refresh jobs or update application count
    console.log('Application submitted successfully');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-white text-xl">Loading job opportunities...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-green-400" />
            Job Search & Listings
          </h1>
          <p className="text-blue-200">Discover your next career opportunity with AI-powered insights</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Job Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-green-500/20 border border-green-500/50 rounded-lg px-4 py-2.5">
              <span className="text-green-200 text-sm font-medium">
                {filteredJobs.length} jobs found
              </span>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden hover:border-white/40 transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-2xl">
                      {job.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{job.title}</h3>
                        {job.featured && (
                          <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded-full text-xs border border-yellow-500/50">
                            <Star className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-blue-200 text-sm">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {savedJobs.has(job.id) ? (
                      <Bookmark className="w-5 h-5 text-yellow-400 fill-current" />
                    ) : (
                      <BookmarkPlus className="w-5 h-5 text-white/70" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <p className="text-white/80 mb-4 leading-relaxed">{job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2 text-white/70 text-sm">
                            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-white font-medium text-sm">Salary</span>
                      </div>
                      <p className="text-green-200 font-semibold">{job.salary}</p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-medium text-sm">Type</span>
                      </div>
                      <p className="text-blue-200">{job.type}</p>
                      {job.remote && (
                        <span className="inline-block mt-1 bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full text-xs border border-blue-500/50">
                          Remote OK
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => getApplicationTips(job.title)}
                        className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium text-sm hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                      >
                        Get AI Tips
                      </button>
                      <button
                        onClick={() => handleApplyNow(job)}
                        className="w-full py-2 px-4 bg-white/10 border border-white/20 text-white rounded-lg font-medium text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
            <p className="text-white/60">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl border border-white/20 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-400" />
              Apply for Position
            </h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white">{selectedJob.title}</h4>
              <p className="text-blue-200">{selectedJob.company}</p>
              <div className="flex items-center gap-4 text-white/70 text-sm mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedJob.location}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {selectedJob.salary}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-white/80 text-sm">Choose how you'd like to apply:</p>
              
              <button
                onClick={() => handleApplyConfirm('form')}
                className="w-full p-3 bg-green-600/20 border border-green-500/50 rounded-lg text-green-200 hover:bg-green-600/30 transition-all flex items-center gap-3"
              >
                <Briefcase className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium">Apply with Form</div>
                  <div className="text-xs text-green-300/80">Fill out application form with resume upload</div>
                </div>
              </button>

              <button
                onClick={() => handleApplyConfirm('direct')}
                className="w-full p-3 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-200 hover:bg-blue-600/30 transition-all flex items-center gap-3"
              >
                <ExternalLink className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium">Apply Directly</div>
                  <div className="text-xs text-blue-300/80">Visit company website</div>
                </div>
              </button>

              <button
                onClick={() => handleApplyConfirm('linkedin')}
                className="w-full p-3 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-200 hover:bg-blue-600/30 transition-all flex items-center gap-3"
              >
                <ExternalLink className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium">Apply via LinkedIn</div>
                  <div className="text-xs text-blue-300/80">Search on LinkedIn Jobs</div>
                </div>
              </button>

              <button
                onClick={() => handleApplyConfirm('indeed')}
                className="w-full p-3 bg-purple-600/20 border border-purple-500/50 rounded-lg text-purple-200 hover:bg-purple-600/30 transition-all flex items-center gap-3"
              >
                <ExternalLink className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium">Apply via Indeed</div>
                  <div className="text-xs text-purple-300/80">Search on Indeed</div>
                </div>
              </button>

              <button
                onClick={() => handleApplyConfirm('save')}
                className="w-full p-3 bg-yellow-600/20 border border-yellow-500/50 rounded-lg text-yellow-200 hover:bg-yellow-600/30 transition-all flex items-center gap-3"
              >
                <Bookmark className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium">Save for Later</div>
                  <div className="text-xs text-yellow-300/80">Add to bookmarks</div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowApplyModal(false)}
              className="w-full py-2 px-4 bg-white/10 border border-white/20 text-white rounded-lg font-medium text-sm hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Job Application Form */}
      {showApplicationForm && selectedJob && (
        <JobApplicationForm
          job={selectedJob}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedJob(null);
          }}
          onSuccess={handleApplicationSuccess}
        />
      )}
    </div>
  );
}

export default Jobs;