import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

export default function ProtectedRoute({ element, allowedRoles = [] }) {
  const token = getToken();
  const userRole = getRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return element;
}
