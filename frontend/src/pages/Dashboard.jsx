import { MessageSquare, FileText, Map, Zap, Shield, Briefcase } from 'lucide-react';

function Dashboard({ onNavigate, user }) {
  const tools = [
    {
      id: 'chat',
      title: 'AI Career Q&A Chat',
      description: 'Get instant answers to all your career questions from our AI mentor',
      icon: MessageSquare,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      features: ['Real-time responses', 'Career guidance', 'Interview prep']
    },
    {
      id: 'resume',
      title: 'AI Resume Analyzer',
      description: 'Upload your resume and get AI-powered feedback and improvement tips',
      icon: FileText,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      features: ['Instant analysis', 'ATS optimization', 'Score & feedback']
    },
    {
      id: 'roadmap',
      title: 'Career Roadmap Generator',
      description: 'Create a personalized career path based on your skills and goals',
      icon: Map,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      features: ['Step-by-step plan', 'Skill mapping', 'Timeline estimates']
    },
    {
      id: 'jobs',
      title: 'Job Search & Listings',
      description: 'Discover relevant job opportunities and get AI-powered application tips',
      icon: Briefcase,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      features: ['Job matching', 'Application tips', 'Salary insights']
    }
  ];

  // Add admin panel tool for admin users
  const adminTools = user?.role === 'admin' ? [
    {
      id: 'admin',
      title: 'Admin Panel',
      description: 'Manage users, view analytics, and control system settings',
      icon: Shield,
      gradient: 'from-purple-600 to-indigo-600',
      bgGradient: 'from-purple-600/20 to-indigo-600/20',
      features: ['User management', 'System analytics', 'Role controls'],
      isAdmin: true
    }
  ] : [];

  // Add recruiter dashboard for recruiters (demo - in production, you'd have a recruiter role)
  const recruiterTools = user?.email?.includes('recruiter') || user?.role === 'recruiter' ? [
    {
      id: 'recruiter',
      title: 'Recruiter Dashboard',
      description: 'Post jobs, manage applications, and review candidate profiles',
      icon: Briefcase,
      gradient: 'from-indigo-600 to-purple-600',
      bgGradient: 'from-indigo-600/20 to-purple-600/20',
      features: ['Post jobs', 'Review applications', 'Download resumes'],
      isRecruiter: true
    }
  ] : [];

  const allTools = [...tools, ...adminTools, ...recruiterTools];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#0a3a70_0%,_#081a30_50%,_#000000_100%)] text-white overflow-y-auto">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-6 lg:py-12">
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 border border-white/20">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-xs lg:text-sm">
                Welcome back, {user?.name || 'Student'}!
                {user?.role === 'admin' && (
                  <span className="ml-2 inline-flex items-center gap-1 bg-purple-500/30 px-2 py-0.5 rounded-full text-xs border border-purple-400/50">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Your AI Career Tools
            </h1>
            <p className="text-base lg:text-xl text-blue-200 max-w-2xl mx-auto px-4">
              Choose a tool below to start your career journey with AI-powered guidance
            </p>
          </div>

          {/* Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {allTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className={`group relative backdrop-blur-lg rounded-xl p-6 border transition-all duration-300 text-left overflow-hidden transform hover:-translate-y-1 hover:shadow-xl ${
                  tool.isAdmin 
                    ? 'bg-purple-500/10 border-purple-500/30 hover:border-purple-400/60' 
                    : tool.isRecruiter
                      ? 'bg-indigo-500/10 border-indigo-500/30 hover:border-indigo-400/60'
                      : 'bg-white/10 border-white/20 hover:border-white/40'
                }`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Icon with admin badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tool.gradient} transform group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    {(tool.isAdmin || tool.isRecruiter) && (
                      <div className={`rounded-full px-2 py-1 border ${
                        tool.isAdmin 
                          ? 'bg-purple-500/20 border-purple-400/50' 
                          : 'bg-indigo-500/20 border-indigo-400/50'
                      }`}>
                        <span className={`text-xs font-medium ${
                          tool.isAdmin ? 'text-purple-200' : 'text-indigo-200'
                        }`}>
                          {tool.isAdmin ? 'Admin Only' : 'Recruiter'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 group-hover:text-white/90 mb-4 text-sm transition-colors line-clamp-2">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-4">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/60 group-hover:text-white/80 text-xs transition-colors">
                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${tool.gradient}`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 text-white/50 group-hover:text-white group-hover:gap-3 transition-all">
                    <span className="text-xs font-medium">
                      {tool.isAdmin ? 'Access Panel' : tool.isRecruiter ? 'Access Dashboard' : 'Get Started'}
                    </span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
}

export default Dashboard;
