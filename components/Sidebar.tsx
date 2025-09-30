
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../App';
import type { UserRole } from '../types';
import { ICONS } from '../constants';

interface NavItem {
  path: string;
  name: string;
  icon: JSX.Element;
  allowedRoles?: UserRole[];
}

const navItems: NavItem[] = [
  { path: '/', name: 'Dashboard', icon: ICONS.dashboard },
  { path: '/verification', name: 'Verification', icon: ICONS.verification, allowedRoles: ['Admin', 'Govt'] },
  { path: '/registry', name: 'Registry', icon: ICONS.registry },
  { path: '/marketplace', name: 'Marketplace', icon: ICONS.marketplace, allowedRoles: ['Admin', 'Investor'] },
  { path: '/reports', name: 'Reports', icon: ICONS.reports },
  { path: '/community', name: 'Community', icon: ICONS.community },
  { path: '/assistant', name: 'AI Assistant', icon: ICONS.assistant },
];

const SidebarLink: React.FC<{ item: NavItem }> = ({ item }) => (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-primary-dark text-white shadow-lg'
            : 'text-white hover:bg-primary-dark/50'
        }`
      }
    >
      <span className="mr-4">{item.icon}</span>
      {item.name}
    </NavLink>
);

const Sidebar = () => {
    const { logout, user } = useAuth();

    return (
        <div className="w-64 bg-primary text-white flex flex-col font-display shadow-2xl">
            <div className="flex items-center justify-center h-20 border-b border-primary-dark/50">
                <h1 className="text-3xl font-bold">Securix</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => 
                    !item.allowedRoles || (user && item.allowedRoles.includes(user.role))
                    ? <SidebarLink key={item.path} item={item} />
                    : null
                )}
            </nav>
            <div className="px-4 py-4 border-t border-primary-dark/50">
                <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-3 text-lg font-medium text-white rounded-lg hover:bg-primary-dark/50 transition-colors duration-200"
                >
                    <span className="mr-4">{ICONS.logout}</span>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;