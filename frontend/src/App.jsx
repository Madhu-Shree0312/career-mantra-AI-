import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ChatInterface from './components/ChatInterface';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import RoadmapGenerator from './components/RoadmapGenerator';
import Sidebar from './components/Sidebar';
import { MessageSquare, FileText, Map, Menu, X } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeSession, setActiveSession] = useState('new');
  const [sessions, setSessions] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    setUser(null);
    setCurrentPage('dashboard');
  };

  const createNewSession = () => {
    const newSession = {
      id: Date.now().toString(),
      title: 'New Conversation',
      timestamp: new Date(),
      messages: []
    };
    setSessions([newSession, ...sessions]);
    setActiveSession(newSession.id);
  };

  const updateSessionTitle = (sessionId, firstMessage) => {
    setSessions(
      sessions.map((s) => (s.id === sessionId ? { ...s, title: firstMessage.slice(0, 50) } : s))
    );
  };

  const navigateToTool = (toolId) => {
    setCurrentPage(toolId);
    setIsSidebarOpen(false);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[radial-gradient(circle_at_center,_#0a3a70_0%,_#081a30_50%,_#000000_100%)] overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-40 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar
          sessions={sessions}
          activeSession={activeSession}
          onSelectSession={setActiveSession}
          onNewSession={createNewSession}
          activeTab={currentPage}
          user={user}
          onNavigate={navigateToTool}
          onLogout={handleLogout}
        />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentPage !== 'dashboard' && (
          <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 px-4 lg:px-6 py-4 shadow-lg">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.svg" 
                alt="Career Mantra AI" 
                className="w-10 h-10 rounded-lg cursor-pointer"
                onClick={() => setCurrentPage('dashboard')}
              />
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-white">Career Mantra AI</h1>
                <p className="text-xs lg:text-sm text-blue-200">Your intelligent career companion</p>
              </div>
            </div>
          </header>
        )}

        {currentPage === 'dashboard' && <Dashboard onNavigate={navigateToTool} user={user} />}
        {currentPage === 'chat' && (
          <ChatInterface sessionId={activeSession} onFirstMessage={updateSessionTitle} />
        )}
        {currentPage === 'resume' && <ResumeAnalyzer />}
        {currentPage === 'roadmap' && <RoadmapGenerator />}
      </div>
    </div>
  );
}

export default App;
