import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { ICONS } from '../constants';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const { user } = useAuth();

    return (
        <header className="h-16 sm:h-20 bg-white shadow-md flex items-center justify-between px-3 sm:px-6 z-10">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-dark font-display truncate pr-2">{title}</h1>
            <div className="flex items-center space-x-1 sm:space-x-3">
                <div className="relative hidden sm:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 w-32 md:w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        {ICONS.search}
                    </div>
                </div>
                <Link to="/notifications" className="relative p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100 transition-colors flex-shrink-0">
                    {React.cloneElement(ICONS.bell, { className: "h-5 w-5 sm:h-6 sm:w-6" })}
                    <span className="absolute top-1 right-1 h-4 w-4 bg-accent-red text-white text-xs rounded-full flex items-center justify-center">3</span>
                </Link>
                {user && (
                    <Link to="/profile" className="flex items-center space-x-2 sm:space-x-3 rounded-full p-1 transition-colors hover:bg-gray-100">
                        <img src={user.avatar} alt={user.name} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border-2 border-primary flex-shrink-0" />
                        <div className="hidden md:block">
                            <div className="font-semibold text-gray-800 truncate">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.role}</div>
                        </div>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;