
import React from 'react';
import { Project, ProjectStatus, Page } from '../types';
import BottomNavBar from './BottomNavBar';

interface DashboardScreenProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onCreateNew: () => void;
  navigate: (page: Page) => void;
  activePage: Page;
}

const statusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.Draft]: 'bg-status-draft/20 text-status-draft',
  [ProjectStatus.Submitted]: 'bg-status-submitted/20 text-status-submitted',
  [ProjectStatus.Verified]: 'bg-status-verified/20 text-status-verified',
  [ProjectStatus.Approved]: 'bg-status-approved/20 text-status-approved',
};

const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);


const DashboardScreen: React.FC<DashboardScreenProps> = ({ projects, onSelectProject, onCreateNew, navigate, activePage }) => {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button onClick={onCreateNew} className="text-3xl font-light">+</button>
      </header>
      
      <main className="flex-grow px-6 pb-24">
        <h2 className="text-3xl font-bold mb-8">Welcome back, Alex</h2>
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} onClick={() => onSelectProject(project)} className="bg-brand-card p-4 rounded-lg flex items-center justify-between cursor-pointer transition-transform transform hover:scale-105">
              <div className="flex items-center space-x-4">
                <FolderIcon />
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <ChevronRightIcon />
            </div>
          ))}
        </div>
      </main>
      
      <BottomNavBar activePage={activePage} navigate={navigate} />
    </div>
  );
};

export default DashboardScreen;
