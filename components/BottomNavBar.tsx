
import React from 'react';
import { Page } from '../types';

interface BottomNavBarProps {
  activePage: Page;
  navigate: (page: Page) => void;
}

const DashboardIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-brand-accent' : 'text-brand-light'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ProjectsIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-brand-accent' : 'text-brand-light'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const SettingsIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-brand-accent' : 'text-brand-light'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);


const BottomNavBar: React.FC<BottomNavBarProps> = ({ activePage, navigate }) => {
  const navItems = [
    { page: Page.Dashboard, label: 'Dashboard', icon: DashboardIcon },
    { page: Page.Projects, label: 'Projects', icon: ProjectsIcon },
    { page: Page.Settings, label: 'Settings', icon: SettingsIcon },
  ];

  const handleNavigation = (page: Page) => {
    navigate(page);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-brand-card/80 backdrop-blur-sm border-t border-brand-secondary">
      <div className="flex justify-around items-center h-full">
        {navItems.map(item => {
          const isActive = activePage === item.page;
          const Icon = item.icon;
          return (
            <button key={item.label} onClick={() => handleNavigation(item.page)} className="flex flex-col items-center justify-center w-1/3">
              <Icon active={isActive} />
              <span className={`text-xs mt-1 ${isActive ? 'text-brand-accent' : 'text-brand-light'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
