import { MessageSquare, FileText, Map, Zap } from 'lucide-react';

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
    }
  ];

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
              <span className="text-white/90 text-xs lg:text-sm">Welcome back, {user?.name || 'Student'}!</span>
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
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 text-left overflow-hidden transform hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tool.gradient} mb-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <tool.icon className="w-6 h-6 text-white" />
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
                    <span className="text-xs font-medium">Get Started</span>
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
