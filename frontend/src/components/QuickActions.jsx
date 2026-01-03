import { MessageSquare, FileText, Map } from 'lucide-react';

function QuickActions({ onSelect }) {
  const actions = [
    {
      icon: MessageSquare,
      title: 'Career Q&A Chat',
      description: 'Get instant answers to your career questions',
      prompt: 'I would like to discuss my career path and get guidance on my next steps.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: 'Resume Analyzer',
      description: 'Get AI-powered feedback on your resume',
      prompt: 'I would like help reviewing and improving my resume. Can you guide me through what information you need?',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Map,
      title: 'Career Roadmap',
      description: 'Create a personalized career path',
      prompt: 'I want to create a career roadmap. Can you help me plan my career progression?',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onSelect(action.prompt)}
          className="group relative bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-xl p-6 hover:border-white/40 transition-all transform hover:-translate-y-1 hover:shadow-xl text-left overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
          
          <div className="relative z-10">
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.gradient} mb-4 shadow-lg`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">{action.title}</h3>
            <p className="text-sm text-white/70">{action.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default QuickActions;
