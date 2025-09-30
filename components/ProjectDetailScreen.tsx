
import React from 'react';
import { Project, ProjectStatus } from '../types';

interface ProjectDetailScreenProps {
  project: Project;
  onBack: () => void;
  onViewReport: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

// Fix: Corrected props destructuring for StatusIcon component.
const StatusIcon = ({ status, children }: { status: 'complete' | 'active' | 'pending', children: React.ReactNode }) => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center";
    const statusClasses = {
        complete: "bg-brand-accent text-white",
        active: "bg-brand-accent ring-4 ring-brand-accent/30 text-white",
        pending: "bg-brand-secondary text-brand-light"
    };
    return <div className={`${baseClasses} ${statusClasses[status]}`}>{children}</div>;
};

const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>);
const SendIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>);


const ProjectDetailScreen: React.FC<ProjectDetailScreenProps> = ({ project, onBack, onViewReport }) => {

    const statusSteps = [
        { name: 'Draft', description: 'Project created and in progress', statusEnum: ProjectStatus.Draft, icon: <EditIcon /> },
        { name: 'Submitted', description: 'Project submitted for verification', statusEnum: ProjectStatus.Submitted, icon: <SendIcon /> },
        { name: 'Verified', description: 'Awaiting verification', statusEnum: ProjectStatus.Verified, icon: <CheckIcon/> },
        { name: 'Approved', description: 'Awaiting approval', statusEnum: ProjectStatus.Approved, icon: <CheckIcon/> }
    ];
    
    const currentStatusIndex = statusSteps.findIndex(step => step.statusEnum === project.status);

    const getStatus = (index: number): 'complete' | 'active' | 'pending' => {
        if (index < currentStatusIndex) return 'complete';
        if (index === currentStatusIndex) return 'active';
        return 'pending';
    };
    
    // Project details can come from the project prop
    const projectDetails = [
        { label: 'Project Name', value: "Coastal Restoration Initiative" },
        { label: 'Project ID', value: project.id },
        { label: 'Project Type', value: project.type },
        { label: 'Location', value: project.location },
        { label: 'Start Date', value: project.startDate },
        { label: 'End Date', value: project.endDate },
    ];
    
    const blockchainProof = [
        { label: 'Report Hash', value: '0xabc123def456...' },
        { label: 'IPFS CID', value: 'Qmxyz789uvw012...' }
    ];


  return (
    <div className="min-h-screen bg-brand-dark pb-6">
      <header className="p-6 flex items-center">
        <button onClick={onBack} className="mr-4"><BackArrowIcon /></button>
        <h1 className="text-xl font-semibold">Project Status</h1>
      </header>
      
      <main className="px-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Project Details</h2>
          <div className="bg-brand-card p-4 rounded-lg space-y-3">
            {projectDetails.map((item, index) => (
              <div key={item.label} className={`flex justify-between text-sm ${index < projectDetails.length - 1 ? 'border-b border-brand-secondary pb-3' : ''}`}>
                <span className="text-brand-light">{item.label}</span>
                <span className="font-medium text-brand-text">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Status Tracker</h2>
          <div className="relative pl-5">
            <div className="absolute left-10 top-5 bottom-5 w-0.5 bg-brand-secondary"></div>
             {statusSteps.map((step, index) => (
               <div key={step.name} className="relative flex items-start mb-8 last:mb-0">
                 <StatusIcon status={getStatus(index)}>{step.icon}</StatusIcon>
                 <div className="ml-6">
                   <h3 className="font-semibold text-lg">{step.name}</h3>
                   <p className="text-sm text-brand-light">{step.description}</p>
                 </div>
               </div>
             ))}
           </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold mb-4">Blockchain Proof</h2>
            <div className="bg-brand-card p-4 rounded-lg space-y-3">
                {blockchainProof.map((item, index) => (
                    <div key={item.label} className={`flex justify-between items-center text-sm ${index < blockchainProof.length -1 ? 'border-b border-brand-secondary pb-3' : ''}`}>
                        <span className="text-brand-light">{item.label}</span>
                        <div className="flex items-center space-x-2">
                           <span className="font-medium text-brand-text font-mono">{item.value}</span>
                           <button><CopyIcon /></button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        
        <button onClick={onViewReport} className="w-full bg-brand-accent text-white font-semibold rounded-lg py-3 mt-4 transition-transform transform hover:scale-105">View Carbon Report</button>
      </main>
    </div>
  );
};

export default ProjectDetailScreen;