// API Configuration
const API_BASE_URL = "http://localhost:3001";

export default API_BASE_URL;

// Helper function for API calls
export const apiCall = {
  get: (endpoint) => `${API_BASE_URL}${endpoint}`,
  post: (endpoint) => `${API_BASE_URL}${endpoint}`,
  put: (endpoint) => `${API_BASE_URL}${endpoint}`,
  delete: (endpoint) => `${API_BASE_URL}${endpoint}`
};