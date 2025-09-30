
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, clearAuth, getRole } from "@/utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();
  const role = getRole();

  function logout() {
    clearAuth();
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl text-blue-600 hover:text-blue-700 transition-colors">BlueCarbon MRV</Link>
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-sm font-medium px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Dashboard
              </Link>
              {role !== "admin" && (
                <Link 
                  to="/create-project" 
                  className="text-sm font-medium px-4 py-2 rounded-md bg-green-100 hover:bg-green-200 transition-colors text-green-700"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>New Project</span>
                  </div>
                </Link>
              )}
              {role === "admin" && (
                <Link 
                  to="/admin/dashboard" 
                  className="text-sm font-medium px-4 py-2 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors text-blue-700"
                >
                  Admin
                </Link>
              )}
              <button 
                onClick={logout} 
                className="text-sm font-medium px-4 py-2 rounded-md bg-red-50 hover:bg-red-100 transition-colors text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="text-sm font-medium px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
              <Link 
                to="/admin/login" 
                className="text-sm font-medium px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Admin
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
