import { useState } from 'react';
import { Map, Target, Loader2, CheckCircle2, Circle } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

function RoadmapGenerator() {
  const [formData, setFormData] = useState({
    currentRole: '',
    targetRole: '',
    experience: '',
    skills: ''
  });
  const [roadmap, setRoadmap] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRoadmap = async () => {
    if (!formData.currentRole || !formData.targetRole) return;

    setIsGenerating(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/generate-roadmap`, formData);
      setRoadmap(response.data);
    } catch (error) {
      console.error('Roadmap generation error:', error);
      setRoadmap({
        error: 'Failed to generate roadmap. Please make sure the backend is running.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-4 lg:p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
              <Map className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">Career Roadmap Generator</h2>
              <p className="text-white/80">
                Get a personalized step-by-step career roadmap from your current position to your dream role.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Current Role *
              </label>
              <input
                type="text"
                value={formData.currentRole}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                placeholder="e.g., Junior Developer"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Target Role *
              </label>
              <input
                type="text"
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                placeholder="e.g., Senior Software Engineer"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Years of Experience
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g., 2 years"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Current Skills
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="e.g., JavaScript, React, Node.js"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={generateRoadmap}
            disabled={isGenerating || !formData.currentRole || !formData.targetRole}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Your Roadmap...
              </>
            ) : (
              <>
                <Target className="w-5 h-5" />
                Generate Career Roadmap
              </>
            )}
          </button>
        </div>

        {roadmap && !roadmap.error && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm border border-purple-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Your Career Journey</h3>
              <p className="text-gray-700">
                From <span className="font-semibold text-purple-600">{formData.currentRole}</span> to{' '}
                <span className="font-semibold text-purple-600">{formData.targetRole}</span>
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Roadmap Steps</h3>
              <div className="space-y-6">
                {roadmap.steps?.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-bold">{index + 1}</span>
                      </div>
                      {index < roadmap.steps.length - 1 && (
                        <div className="w-0.5 h-full bg-purple-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-700 mb-3">{step.description}</p>
                      {step.actions && (
                        <ul className="space-y-2">
                          {step.actions.map((action, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {roadmap.timeline && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Estimated Timeline</h3>
                <p className="text-gray-700">{roadmap.timeline}</p>
              </div>
            )}

            {roadmap.resources && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Resources</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{roadmap.resources}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {roadmap?.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Circle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Generation Failed</h3>
                <p className="text-red-700">{roadmap.error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapGenerator;
