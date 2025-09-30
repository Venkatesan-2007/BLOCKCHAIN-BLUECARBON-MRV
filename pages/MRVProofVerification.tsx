
import React, { useState } from 'react';
import type { Proof, ProofStatus } from '../types';
import { PROOFS } from '../data/demo';

const ProofCard: React.FC<{ proof: Proof, onStatusChange: (id: string, status: ProofStatus) => void }> = ({ proof, onStatusChange }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <img src={proof.imageUrl} alt="Proof" className="w-full h-48 object-cover" />
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm text-gray-500">Project ID: {proof.projectId}</p>
                        <p className="text-sm text-gray-500">GPS: {proof.location}</p>
                        <p className="text-sm text-gray-500">Uploaded by: {proof.uploadedBy}</p>
                        <p className="text-sm text-gray-500">Date: {new Date(proof.timestamp).toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        proof.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        proof.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {proof.status}
                    </span>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-primary-dark text-lg">AI Insights</h4>
                    <div className="flex justify-between mt-2 text-sm">
                        <p className="text-gray-700">Est. Biomass:</p>
                        <p className="font-semibold text-primary-dark">{proof.aiBiomass.toFixed(1)} kg/m²</p>
                    </div>
                    <div className="flex justify-between mt-1 text-sm">
                        <p className="text-gray-700">Est. CO₂ Sequestration:</p>
                        <p className="font-semibold text-primary-dark">{proof.aiCo2Estimate.toFixed(1)} tons/ha</p>
                    </div>
                </div>

                {proof.status === 'Pending' && (
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => onStatusChange(proof.id, 'Approved')}
                            className="w-full bg-accent-green text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md">
                            Approve
                        </button>
                        <button
                            onClick={() => onStatusChange(proof.id, 'Rejected')}
                            className="w-full bg-accent-red text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-md">
                            Reject
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const MRVProofVerification: React.FC = () => {
    const [proofs, setProofs] = useState<Proof[]>(PROOFS);
    const [filter, setFilter] = useState<ProofStatus | 'All'>('All');

    const handleStatusChange = (id: string, status: ProofStatus) => {
        setProofs(currentProofs => 
            currentProofs.map(p => p.id === id ? { ...p, status } : p)
        );
    };

    const filteredProofs = proofs.filter(p => filter === 'All' || p.status === filter);
    const pendingCount = proofs.filter(p => p.status === 'Pending').length;

    return (
        <div className="font-display">
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-primary-dark">Verification Queue</h2>
                    <p className="text-gray-600">{pendingCount} proofs awaiting review.</p>
                </div>
                <div className="flex space-x-2 p-1 bg-gray-200 rounded-full">
                    {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${filter === f ? 'bg-primary text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProofs.map(proof => (
                    <ProofCard key={proof.id} proof={proof} onStatusChange={handleStatusChange} />
                ))}
            </div>
        </div>
    );
};

export default MRVProofVerification;
