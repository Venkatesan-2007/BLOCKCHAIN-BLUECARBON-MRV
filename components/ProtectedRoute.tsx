
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../App';
import type { UserRole } from '../types';

interface ProtectedRouteProps {
  children: ReactNode;
  roles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    // This case should ideally not be hit if the overall app structure is correct
    // but serves as a fallback.
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    // User is logged in but doesn't have the required role, redirect to dashboard.
    return (
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p className="mt-2 text-gray-600">You do not have the necessary permissions to view this page.</p>
            <p className="mt-1 text-sm text-gray-500">Your role: {user.role}. Required roles: {roles.join(', ')}</p>
        </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
