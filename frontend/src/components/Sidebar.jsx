import { Plus, MessageSquare, Clock, Sparkles, Home, User, LogOut, Shield, Briefcase } from 'lucide-react';

function Sidebar({ sessions, activeSession, onSelectSession, onNewSession, activeTab, user, onNavigate, onLogout }) {
  return (
    <div className="w-64 h-full bg-[radial-gradient(circle_at_center,_#0a3a70_0%,_#081a30_50%,_#000000_100%)] backdrop-blur-lg border-r border-white/20 text-white flex flex-col shadow-2xl">
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src="/logo.svg" 
            alt="Career Mantra AI" 
            className="w-12 h-12 rounded-xl shadow-lg"
          />
          <div>
            <h2 className="font-bold text-base">Career Mantra AI</h2>
            <p className="text-xs text-white/70">Your AI Guide</p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white/10 rounded-lg p-3 mb-4 border border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'Student'}</p>
              <p className="text-xs text-white/60 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all mb-2"
        >
          <Home className="w-4 h-4" />
          <span className="font-medium text-sm">Dashboard</span>
        </button>

        {/* Admin Panel - Only show for admin users */}
        {user?.role === 'admin' && (
          <button
            onClick={() => onNavigate('admin')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all mb-2 ${
              activeTab === 'admin' 
                ? 'bg-purple-600/30 border border-purple-500/50 text-purple-200' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="font-medium text-sm">Admin Panel</span>
          </button>
        )}

        {activeTab === 'chat' && (
          <button
            onClick={onNewSession}
            className="w-full flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
        )}
      </div>

      {activeTab === 'chat' && (
        <div className="flex-1 overflow-y-auto px-2 py-4">
          <div className="text-xs font-semibold text-white/60 px-3 py-2 uppercase tracking-wider">
            Recent Chats
          </div>
          {sessions.length === 0 ? (
            <div className="px-3 py-8 text-center text-white/50 text-sm">
              No conversations yet
            </div>
          ) : (
            sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`w-full text-left px-3 py-3 rounded-lg mb-1 transition-all ${
                  activeSession === session.id
                    ? 'bg-white/20 border border-white/30 text-white shadow-md'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{session.title}</div>
                    <div className="flex items-center gap-1 text-xs text-white/50 mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(session.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      <div className="p-4 border-t border-white/20 bg-white/5">
        <div className="text-xs text-white/60 mb-4">
          <p className="mb-3 font-semibold text-white/80">AI Features:</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span>Career Q&A Chat</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span>Resume Analysis</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
              <span>Career Roadmaps</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span>Job Search</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all text-red-200 hover:text-red-100 border border-red-500/30"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
