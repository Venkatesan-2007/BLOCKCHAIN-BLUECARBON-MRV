
import React, { useState } from 'react';
import { Page, Project, ProjectStatus } from '../types';
import BottomNavBar from './BottomNavBar';

interface NewProjectScreenProps {
  onBack: () => void;
  onSave: (project: Project) => void;
  onNext: () => void;
  navigate: (page: Page) => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);
const GpsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);


const NewProjectScreen: React.FC<NewProjectScreenProps> = ({ onBack, onSave, onNext, navigate }) => {
    const [projectName, setProjectName] = useState('');
    const [hectares, setHectares] = useState('');
    const [species, setSpecies] = useState('');

    const handleSaveDraft = () => {
        const newProject: Project = {
            id: `PRJ-${Date.now()}`,
            name: projectName || "Unnamed Project",
            status: ProjectStatus.Draft,
            type: 'Mangrove Restoration',
            location: 'San Francisco Bay Area',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
            hectares: parseFloat(hectares) || 0,
            species: species.split(',').map(s => s.trim()),
        };
        onSave(newProject);
    };


  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <header className="p-6 flex items-center">
        <button onClick={onBack} className="mr-4"><BackArrowIcon /></button>
        <h1 className="text-xl font-semibold">New Project</h1>
      </header>

      <main className="flex-grow px-6 pb-24 space-y-6 overflow-y-auto">
        <div>
          <label className="text-sm font-medium text-brand-light mb-1 block">Project Name</label>
          <input type="text" placeholder="Enter project name" value={projectName} onChange={e => setProjectName(e.target.value)} className="w-full bg-brand-card border border-brand-secondary text-brand-text rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
        </div>
        
        <div className="h-48 bg-gray-500 rounded-lg relative overflow-hidden">
          <img src="https://i.imgur.com/3Z6kHh0.png" alt="Map of San Francisco" className="w-full h-full object-cover"/>
          <button className="absolute bottom-4 right-4 bg-brand-card/80 backdrop-blur-sm text-brand-text font-semibold rounded-full py-2 px-4 flex items-center">
            <GpsIcon />
            Capture GPS
          </button>
        </div>

        <div>
          <label className="text-sm font-medium text-brand-light mb-1 block">Coordinates</label>
          <input type="text" placeholder="Auto-filled" readOnly className="w-full bg-brand-card border border-brand-secondary text-brand-light rounded-lg py-3 px-4" />
        </div>
        
        <div>
          <label className="text-sm font-medium text-brand-light mb-1 block">Hectares planted</label>
          <input type="number" placeholder="Enter hectares" value={hectares} onChange={e => setHectares(e.target.value)} className="w-full bg-brand-card border border-brand-secondary text-brand-text rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
        </div>

        <div>
            <label className="text-sm font-medium text-brand-light mb-1 block">Species planted</label>
            <div className="relative">
                <select value={species} onChange={e => setSpecies(e.target.value)} className="w-full bg-brand-card border border-brand-secondary text-brand-text rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-accent">
                    <option value="">Select species</option>
                    <option value="Rhizophora mucronata">Rhizophora mucronata</option>
                    <option value="Avicennia marina">Avicennia marina</option>
                    <option value="Thalassia testudinum">Thalassia testudinum</option>
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </div>
        </div>
        
        <div className="pt-4 grid grid-cols-2 gap-4">
            <button onClick={handleSaveDraft} className="w-full bg-brand-secondary text-brand-text font-semibold rounded-lg py-3 transition-transform transform hover:scale-105">Save Draft</button>
            <button onClick={onNext} className="w-full bg-brand-accent text-white font-semibold rounded-lg py-3 transition-transform transform hover:scale-105">Next</button>
        </div>

      </main>
      
      <BottomNavBar activePage={Page.Projects} navigate={navigate} />
    </div>
  );
};

export default NewProjectScreen;
