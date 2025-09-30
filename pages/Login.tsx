
import React, { useState } from 'react';
import type { UserRole } from '../types';
import { useAuth } from '../App';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>('NGO');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email) {
            setError('Please enter an email.');
            return;
        }
        const success = login(email, role);
        if (!success) {
            setError('Invalid credentials for the selected role. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex font-display">
            {/* Left side with background image */}
            <div className="w-1/2 min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('https://picsum.photos/seed/mangroves/1200/1200')" }}>
                <div className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center text-white p-12 text-center">
                    <h1 className="text-6xl font-extrabold mb-4">Securix</h1>
                    <p className="text-2xl font-light">Verifying Nature's Climate Solution.</p>
                    <p className="mt-8 text-lg opacity-80">The future of transparent, verifiable, and tradable blue carbon credits begins here.</p>
                </div>
            </div>

            {/* Right side with login form */}
            <div className="w-1/2 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
                <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-2xl">
                    <h2 className="text-4xl font-bold text-primary-dark mb-2">Welcome Back</h2>
                    <p className="text-gray-500 mb-8">Sign in to continue to your dashboard.</p>
                    
                    <form onSubmit={handleLogin}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g., user@example.com"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Select Your Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value as UserRole)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none"
                            >
                                <option>NGO</option>
                                <option>Govt</option>
                                <option>Investor</option>
                                <option>Admin</option>
                            </select>
                        </div>
                         <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                        
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-8">
                        Don't have an account? <a href="#" className="text-primary hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
