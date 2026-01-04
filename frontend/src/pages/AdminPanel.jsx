import { useState, useEffect } from 'react';
import { Users, Shield, Trash2, UserCheck, UserX, Calendar, Mail, User } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, adminUsers: 0, regularUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUsers(response.data.users);
      setStats({
        totalUsers: response.data.totalUsers,
        adminUsers: response.data.adminUsers,
        regularUsers: response.data.regularUsers
      });
      setError('');
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError(error.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId, userName) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchUsers(); // Refresh the list
      alert('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert(error.response?.data?.error || 'Failed to delete user');
    }
  };

  const toggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    if (!confirm(`Are you sure you want to change this user's role to "${newRole}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/admin/users/${userId}/role`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      fetchUsers(); // Refresh the list
      alert(`User role updated to ${newRole} successfully`);
    } catch (error) {
      console.error('Failed to update user role:', error);
      alert(error.response?.data?.error || 'Failed to update user role');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-white text-xl">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-400" />
            Admin Panel
          </h1>
          <p className="text-blue-200">Manage users and system settings</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <Users className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Admin Users</p>
                <p className="text-3xl font-bold text-white">{stats.adminUsers}</p>
              </div>
              <Shield className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Regular Users</p>
                <p className="text-3xl font-bold text-white">{stats.regularUsers}</p>
              </div>
              <User className="w-12 h-12 text-green-400" />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/20">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-sm text-blue-200">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-white">
                        <Mail className="w-4 h-4 mr-2 text-blue-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-purple-500/20 text-purple-200 border border-purple-500/50' 
                          : 'bg-green-500/20 text-green-200 border border-green-500/50'
                      }`}>
                        {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleUserRole(user.id, user.role)}
                          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                            user.role === 'admin'
                              ? 'bg-green-500/20 text-green-200 hover:bg-green-500/30 border border-green-500/50'
                              : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-500/50'
                          }`}
                        >
                          {user.role === 'admin' ? (
                            <>
                              <UserX className="w-3 h-3 mr-1" />
                              Make User
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3 h-3 mr-1" />
                              Make Admin
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => deleteUser(user.id, user.name)}
                          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-500/20 text-red-200 hover:bg-red-500/30 border border-red-500/50 transition-colors"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <p className="text-blue-200">No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;