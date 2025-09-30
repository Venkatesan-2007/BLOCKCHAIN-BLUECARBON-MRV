
import React from 'react';
import { Page } from '../types';
import BottomNavBar from './BottomNavBar';

interface SettingsScreenProps {
  navigate: (page: Page) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Settings</h1>
      </header>
      
      <main className="flex-grow px-6 pb-24 flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-brand-text">Under Construction</h2>
          <p className="mt-2 text-sm text-brand-light">The settings page is coming soon!</p>
        </div>
      </main>
      
      <BottomNavBar activePage={Page.Settings} navigate={navigate} />
    </div>
  );
};

export default SettingsScreen;
