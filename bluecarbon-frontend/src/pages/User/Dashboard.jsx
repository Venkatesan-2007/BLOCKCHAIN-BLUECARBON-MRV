import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getToken } from "@/utils/auth";
import { getProfile, getProjects, api } from "@/api";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Add debug panel visibility state
  const [showDebug, setShowDebug] = useState(false);
  
  // Add debug state
  const [debugInfo, setDebugInfo] = useState({
    token: null,
    apiUrl: null,
    lastApiCall: null,
    lastError: null
  });

  useEffect(() => {
    const token = getToken();
    const initApi = async () => {
      try {
        const client = await api.getInstance();
        setDebugInfo(prev => ({ ...prev, token, apiUrl: client?.defaults?.baseURL }));
        console.log('Current token:', token);
        console.log('API URL:', client?.defaults?.baseURL);
      } catch (error) {
        console.error('API initialization error:', error);
        setDebugInfo(prev => ({ ...prev, lastError: 'API initialization failed' }));
      }
    };
    initApi();
    if (!token) {
      console.log('No token found, redirecting to login');
      setDebugInfo(prev => ({ ...prev, lastError: 'No token found' }));
      navigate("/login");
      return;
    }
    // Validate token format
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.error('Invalid token format');
        setDebugInfo(prev => ({ ...prev, lastError: 'Invalid token format' }));
        localStorage.clear();
        navigate("/login");
        return;
      }
    } catch (e) {
      console.error('Token validation error:', e);
      setDebugInfo(prev => ({ ...prev, lastError: 'Token validation error' }));
      localStorage.clear();
      navigate("/login");
      return;
    }
    // Fetch profile and projects
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profileData, projectsData] = await Promise.all([
          getProfile(),
          getProjects()
        ]);
        setProfile(profileData);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
      } catch (error) {
        console.error('Dashboard error:', error);
        setError(error.message);
        setDebugInfo(prev => ({
          ...prev,
          lastApiCall: new Date().toISOString(),
          lastError: error.message
        }));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-900 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-200/70">Loading your projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-900 items-center justify-center p-4">
        <div className="bg-red-500/10 text-red-200 p-4 rounded-lg max-w-md text-center">
          <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-lg font-semibold mb-2">Error Loading Dashboard</p>
          <p className="text-red-200/70">{error}</p>
          
          {/* Debug Information */}
          <div className="mt-4 text-left text-sm opacity-75 border-t border-red-500/20 pt-4">
            <p><strong>Debug Info:</strong></p>
            <p>Token exists: {debugInfo.token ? 'Yes' : 'No'}</p>
            <p>API URL: {debugInfo.apiUrl || 'Not set'}</p>
            <p>Last API call: {debugInfo.lastApiCall || 'None'}</p>
            <p>Last error: {debugInfo.lastError || 'None'}</p>
          </div>
          
          <button 
            onClick={() => { localStorage.clear(); navigate("/login"); }} 
            className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Only show profile error if we're not loading and have no profile
  if (!loading && !profile) {
    return (
      <div className="flex min-h-screen bg-gray-900 items-center justify-center p-4">
        <div className="bg-yellow-500/10 text-yellow-200 p-4 rounded-lg max-w-md text-center">
          <svg className="w-12 h-12 mx-auto text-yellow-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-semibold mb-2">No Profile Data</p>
          <p className="text-yellow-200/70">Unable to load profile information. Please try logging in again.</p>
          
          {/* Debug Information */}
          <div className="mt-4 text-left text-sm opacity-75 border-t border-yellow-500/20 pt-4">
            <p><strong>Debug Info:</strong></p>
            <p>Token exists: {debugInfo.token ? 'Yes' : 'No'}</p>
            <p>API URL: {debugInfo.apiUrl || 'Not set'}</p>
            <p>Last API call: {debugInfo.lastApiCall || 'None'}</p>
            <p>Last error: {debugInfo.lastError || 'None'}</p>
          </div>
          
          <button 
            onClick={() => { localStorage.clear(); navigate("/login"); }} 
            className="mt-4 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-200 rounded-lg transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  const statusColors = {
    Draft: "bg-yellow-600/30 text-yellow-200 border border-yellow-500/30",
    Submitted: "bg-blue-600/30 text-blue-200 border border-blue-500/30",
    Verified: "bg-green-600/30 text-green-200 border border-green-500/30",
    Approved: "bg-teal-600/30 text-teal-200 border border-teal-500/30",
  };

  const navItems = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: "Projects", 
      path: "/create-project", // Changed to create-project path
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      onClick: () => navigate('/create-project') // Added onClick handler
    },
    { 
      name: "Settings", 
      path: "/settings", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Mobile App Header */}
      <div className="px-4 py-5 border-b border-gray-700/50 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="w-full">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-blue-400 font-medium">Welcome back</span>
                <h1 className="text-xl font-bold text-white">
                  {profile.username || profile.email.split('@')[0]}
                </h1>
              </div>
              <button 
                onClick={() => navigate('/create-project')}
                className="bg-blue-600 active:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20"
                aria-label="New Project"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/10 rounded-lg p-3">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-blue-200 text-sm">Track your environmental impact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 sm:px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-lg font-medium text-blue-100 mb-4">Your Projects</h2>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20">
          {projects.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="rounded-full bg-blue-500/10 p-4 mb-4">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-50">Start Your First Project</h3>
              <p className="text-blue-200/70 mb-6 max-w-sm">Create a new project to begin tracking your carbon credits and environmental impact</p>
              <button 
                onClick={() => navigate('/create-project')}
                className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Create Project
              </button>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-xl shadow-lg flex flex-col justify-between p-4 sm:p-5 hover:scale-102 hover:shadow-2xl transition-all cursor-pointer border border-transparent hover:border-blue-500 active:scale-98"
                onClick={() => navigate(`/projects/${project.id}/status`)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 7l3 14h12l3-14M3 7l3-4h12l3 4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-lg truncate">{project.name}</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${statusColors[project.status] || "bg-gray-500 text-white"}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <button
                    onClick={e => {e.stopPropagation(); navigate(`/projects/${project.id}/status`);}}
                    className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Status</span>
                  </button>
                  <button
                    onClick={e => {e.stopPropagation(); navigate(`/projects/${project.id}/upload`);}}
                    className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Upload</span>
                  </button>
                  <button
                    onClick={e => {e.stopPropagation(); navigate(`/projects/${project.id}/report`);}}
                    className="flex items-center justify-center gap-1 bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Report</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Action Button - Hidden on larger screens */}
      <button
        onClick={() => navigate("/create-project")}
        className="fixed bottom-20 right-4 z-20 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all sm:hidden"
        title="Create New Project"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Bottom Navigation - Hidden on larger screens */}
      <div className="flex justify-around items-center border-t border-gray-700 bg-gray-800/95 backdrop-blur-sm p-3 fixed bottom-0 w-full z-10 sm:hidden">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => item.onClick ? item.onClick() : navigate(item.path)}
            className={`flex flex-col items-center p-1 rounded-lg transition-colors cursor-pointer ${
              window.location.pathname === item.path 
                ? "text-blue-400 bg-gray-700/50" 
                : "text-gray-400 hover:text-white hover:bg-gray-700/30"
            }`}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );}