
import React from 'react';
import type { Project } from '../types';
import { PROJECTS } from '../data/demo';
import { ICONS } from '../constants.tsx';

interface KpiCardProps {
    title: string;
    value: string;
    icon: JSX.Element;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon }) => (
    <div className="bg-primary text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center">
        <div className="bg-white/20 p-4 rounded-full mr-4">
            {icon}
        </div>
        <div>
            <p className="text-lg font-medium opacity-80">{title}</p>
            <p className="text-4xl font-bold">{value}</p>
        </div>
    </div>
);

const ProjectTimeline: React.FC<{ project: Project }> = ({ project }) => {
    const phases = ['Planting', 'Proof', 'Verification', 'Credit Issuance'];
    const currentPhaseIndex = phases.indexOf(project.status);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-xl font-bold text-primary-dark">{project.name}</h3>
                    <p className="text-gray-500">{project.location}</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-accent-green">{project.co2Stored.toLocaleString()} tons CO₂</p>
                    <p className="text-sm text-gray-500">stored</p>
                </div>
            </div>
            <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                    {phases.map((phase, index) => (
                        <div key={phase} className={`text-xs text-center font-semibold inline-block ${index <= currentPhaseIndex ? 'text-primary' : 'text-gray-400'}`}>
                            {phase}
                        </div>
                    ))}
                </div>
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-primary-light/30">
                    {phases.map((phase, index) => {
                        if (index <= currentPhaseIndex) {
                            return (
                                <div
                                    key={phase}
                                    style={{ width: '25%' }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                                ></div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const totalCo2 = PROJECTS.reduce((sum, p) => sum + p.co2Stored, 0);
    const totalCreditsIssued = PROJECTS.reduce((sum, p) => sum + p.creditsIssued, 0);

    return (
        <div className="space-y-8 font-display">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Verified CO₂ Stored" value={`${(totalCo2 / 1000).toFixed(1)}k tons`} icon={ICONS.leaf} />
                <KpiCard title="Credits Issued" value={totalCreditsIssued.toLocaleString()} icon={ICONS.ticket} />
                <KpiCard title="Credits Traded" value="8,450" icon={ICONS.money} />
                <KpiCard title="Active Field Workers" value="48" icon={ICONS.users} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Map */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Project Sites</h2>
                    <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                       <img src="https://i.imgur.com/gSnk2gD.png" alt="Map of project sites" className="w-full h-full object-cover rounded-lg"/>
                    </div>
                </div>

                {/* Projects Overview */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-primary-dark">Projects Timeline</h2>
                    {PROJECTS.map(project => (
                        <ProjectTimeline key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
