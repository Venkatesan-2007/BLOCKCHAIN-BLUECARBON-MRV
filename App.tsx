import React, { useState, createContext, useContext, useMemo, ReactNode } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import type { User, UserRole } from './types';
import { USERS } from './data/demo';

import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import MRVProofVerification from './pages/MRVProofVerification';
import CarbonCreditRegistry from './pages/CarbonCreditRegistry';
import Marketplace from './pages/Marketplace';
import Reports from './pages/Reports';
import Community from './pages/Community';
import AIAssistant from './pages/AIAssistant';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, role: UserRole) => {
    const foundUser = USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <LoginPage />;
  }
  
  const getPageTitle = (pathname: string): string => {
    switch (pathname) {
      case '/': return 'Dashboard';
      case '/verification': return 'MRV Proof Verification';
      case '/registry': return 'Carbon Credit Registry';
      case '/marketplace': return 'Marketplace';
      case '/reports': return 'Reports & Analytics';
      case '/community': return 'Community & Notifications';
      case '/assistant': return 'AI Assistant';
      case '/profile': return 'User Profile';
      case '/notifications': return 'Notifications';
      default: return 'Securix';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle(location.pathname)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-blue-50 to-white p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/verification" element={
              <ProtectedRoute roles={['Govt', 'Admin']}>
                <MRVProofVerification />
              </ProtectedRoute>
            } />
            <Route path="/registry" element={<CarbonCreditRegistry />} />
            <Route path="/marketplace" element={
               <ProtectedRoute roles={['Investor', 'Admin']}>
                <Marketplace />
               </ProtectedRoute>
            } />
            <Route path="/reports" element={<Reports />} />
            <Route path="/community" element={<Community />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/profile" element={
              <ProtectedRoute roles={['NGO', 'Govt', 'Investor', 'Admin']}>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute roles={['NGO', 'Govt', 'Investor', 'Admin']}>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
}