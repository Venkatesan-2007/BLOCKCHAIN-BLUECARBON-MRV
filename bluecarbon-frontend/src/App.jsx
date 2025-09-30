import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/User/Dashboard";
import CreateProject from "./pages/User/CreateProject";
import UploadData from "./pages/User/UploadData";
import CarbonReport from "./pages/User/CarbonReport";
import ProjectStatus from "./pages/User/ProjectStatus";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProjectDetail from "./pages/Admin/ProjectDetail";
import Verification from "./pages/Admin/Verification";
import Registry from "./pages/Admin/Registry";
import ProtectedRoute from "./components/ProtectedRoute";
import { getToken, getRole } from "./utils/auth";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuth = !!getToken();
  const userRole = getRole();

  useEffect(() => {
    // Simulate checking auth state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  console.log('App component rendering...', { isAuth, userRole });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <div className="text-center text-2xl font-bold text-blue-600 mb-4">
        BlueCarbon MRV System
      </div>
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={
            isAuth ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} /> : <Login />
          } />
          <Route path="/signup" element={
            isAuth ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} /> : <Signup />
          } />

          {/* Root redirect */}
          <Route path="/" element={
            isAuth ? 
              <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} /> : 
              <Navigate to="/login" />
          } />

          {/* User Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} allowedRoles={["NGO", "Community", "Panchayat"]} />}
          />
          <Route
            path="/create-project"
            element={<ProtectedRoute element={<CreateProject />} allowedRoles={["NGO", "Community", "Panchayat"]} />}
          />
          <Route
            path="/projects/:id/upload"
            element={<ProtectedRoute element={<UploadData />} allowedRoles={["NGO", "Community", "Panchayat"]} />}
          />
          <Route
            path="/projects/:id/report"
            element={<ProtectedRoute element={<CarbonReport />} allowedRoles={["NGO", "Community", "Panchayat"]} />}
          />
          <Route
            path="/projects/:id/status"
            element={<ProtectedRoute element={<ProjectStatus />} allowedRoles={["NGO", "Community", "Panchayat"]} />}
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />}
          />
          <Route
            path="/admin/project/:id"
            element={<ProtectedRoute element={<ProjectDetail />} allowedRoles={["admin"]} />}
          />
          <Route
            path="/admin/verify/:id"
            element={<ProtectedRoute element={<Verification />} allowedRoles={["admin"]} />}
          />
          <Route
            path="/admin/registry"
            element={<ProtectedRoute element={<Registry />} allowedRoles={["admin"]} />}
          />

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
