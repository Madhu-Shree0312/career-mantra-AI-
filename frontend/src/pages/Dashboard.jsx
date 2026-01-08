import { MessageSquare, FileText, Map, Zap, Shield, Briefcase } from "lucide-react";
import bgVideo from "../assets/bg2.mp4";

function Dashboard({ onNavigate, user }) {
  const tools = [
    {
      id: "chat",
      title: "AI Career Q&A Chat",
      description: "Get instant answers to all your career questions from our AI mentor",
      icon: MessageSquare,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      features: ["Real-time responses", "Career guidance", "Interview prep"],
    },
    {
      id: "resume",
      title: "AI Resume Analyzer",
      description: "Upload your resume and get AI-powered feedback and improvement tips",
      icon: FileText,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      features: ["Instant analysis", "ATS optimization", "Score & feedback"],
    },
    {
      id: "jobs",
      title: "Job Search & Listings",
      description: "Discover relevant job opportunities and get AI-powered application tips",
      icon: Briefcase,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      features: ["Job matching", "Application tips", "Salary insights"],
      center: true, // 👈 CENTER CARD
    },
    {
      id: "roadmap",
      title: "Career Roadmap Generator",
      description: "Create a personalized career path based on your skills and goals",
      icon: Map,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
      features: ["Step-by-step plan", "Skill mapping", "Timeline estimates"],
    },
  ];

  const adminTools =
    user?.role === "admin"
      ? [
          {
            id: "admin",
            title: "Admin Panel",
            description: "Manage users, view analytics, and control system settings",
            icon: Shield,
            gradient: "from-purple-600 to-indigo-600",
            bgGradient: "from-purple-600/20 to-indigo-600/20",
            features: ["User management", "System analytics", "Role controls"],
            isAdmin: true,
          },
        ]
      : [];

  const recruiterTools =
    user?.email?.includes("recruiter") || user?.role === "recruiter"
      ? [
          {
            id: "recruiter",
            title: "Recruiter Dashboard",
            description: "Post jobs, manage applications, and review candidate profiles",
            icon: Briefcase,
            gradient: "from-indigo-600 to-purple-600",
            bgGradient: "from-indigo-600/20 to-purple-600/20",
            features: ["Post jobs", "Review applications", "Download resumes"],
            isRecruiter: true,
          },
        ]
      : [];

  const allTools = [...tools, ...adminTools, ...recruiterTools];

  return (
    <div className="relative min-h-screen overflow-y-auto text-white">
      {/* ================= BACKGROUND VIDEO ================= */}
      <video
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/70 z-10"></div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 lg:py-14">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20 mb-5">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-xs lg:text-sm">
                Welcome back, {user?.name || "Student"}
                {user?.role === "admin" && (
                  <span className="ml-2 inline-flex items-center gap-1 bg-purple-500/30 px-2 py-0.5 rounded-full border border-purple-400/50">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Your AI Career Tools
            </h1>

            <p className="text-blue-200 max-w-2xl mx-auto">
              Choose a tool below to start your career journey with AI-powered guidance
            </p>
          </div>

          {/* ================= TOOL CARDS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {allTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className={`group relative backdrop-blur-xl rounded-xl p-6 border transition-all duration-300 text-left overflow-hidden hover:-translate-y-1 hover:shadow-2xl
                  ${
                    tool.center ? "lg:col-start-2" : ""
                  }
                  ${
                    tool.isAdmin
                      ? "bg-purple-500/10 border-purple-500/30"
                      : tool.isRecruiter
                      ? "bg-indigo-500/10 border-indigo-500/30"
                      : "bg-white/10 border-white/20"
                  }`}
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.bgGradient} opacity-0 group-hover:opacity-100 transition`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.gradient} shadow-lg`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>

                    {(tool.isAdmin || tool.isRecruiter) && (
                      <span className="text-xs px-2 py-1 rounded-full border border-white/30 bg-white/10">
                        {tool.isAdmin ? "Admin" : "Recruiter"}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold mb-2">{tool.title}</h3>

                  <p className="text-white/70 mb-4 text-sm line-clamp-2">
                    {tool.description}
                  </p>

                  <ul className="space-y-1 mb-4">
                    {tool.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-xs text-white/60 flex items-center gap-2"
                      >
                        <span
                          className={`w-1 h-1 rounded-full bg-gradient-to-r ${tool.gradient}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="text-xs text-white/60 group-hover:text-white transition">
                    Get Started →
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
