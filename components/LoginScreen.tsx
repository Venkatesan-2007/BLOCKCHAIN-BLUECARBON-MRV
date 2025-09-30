
import React from 'react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: () => void;
}

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.184-1.268-.5-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.184-1.268.5-1.857m0 0a5.002 5.002 0 019 0m-4.5 4.5a5.002 5.002 0 00-9 0" />
    </svg>
);


const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-brand-dark">
        <div className="w-full max-w-sm text-center">
            <h1 className="text-4xl font-bold text-brand-text mb-2">Welcome Back</h1>
            <p className="text-brand-light mb-10">Login to monitor your blue carbon projects.</p>
            
            <form className="space-y-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                       <MailIcon />
                    </span>
                    <input type="email" placeholder="Email or Phone" className="w-full bg-brand-card border border-brand-secondary text-brand-text rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                </div>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockIcon />
                    </span>
                    <input type="password" placeholder="Password" className="w-full bg-brand-card border border-brand-secondary text-brand-text rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                </div>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <UsersIcon />
                    </span>
                    <select className="w-full bg-brand-card border border-brand-secondary text-brand-text rounded-lg py-3 pl-10 pr-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-accent">
                        <option>Select Role</option>
                        {Object.values(UserRole).map(role => <option key={role}>{role}</option>)}
                    </select>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                </div>
                
                <button type="button" onClick={onLogin} className="w-full bg-brand-accent text-white font-semibold rounded-lg py-3 transition-transform transform hover:scale-105">Login</button>
                <button type="button" className="w-full bg-brand-secondary text-brand-text font-semibold rounded-lg py-3 transition-transform transform hover:scale-105">Sign Up</button>
            </form>
        </div>
        <div className="absolute bottom-6 text-center text-xs text-brand-light px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
    </div>
  );
};

export default LoginScreen;
