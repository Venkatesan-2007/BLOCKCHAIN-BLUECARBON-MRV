// src/utils/auth.js

/**
 * Authentication and Authorization utilities
 */

// Token management
export const setToken = (token) => {
  if (!token) return;
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

// Role management
export const setRole = (role) => {
  if (!role) return;
  localStorage.setItem("role", role);
};

export const getRole = () => {
  return localStorage.getItem("role") || "user";
};

// Clear authentication
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};
