
import React from 'react';
import type { CarbonCredit } from '../types';
import { CARBON_CREDITS } from '../data/demo';
import { ICONS } from '../constants';

const CreditCard: React.FC<{ credit: CarbonCredit }> = ({ credit }) => {
    return (
        <div className="bg-white rounded-2xl border-2 border-primary-light/50 shadow-lg p-6 space-y-4 transform hover:shadow-primary/20 hover:border-primary transition-all duration-300">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-primary-dark">Token ID</h3>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    credit.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                    {credit.status}
                </span>
            </div>
            <p className="font-mono text-sm text-gray-600 break-all">{credit.tokenId}</p>

            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Issued To:</span>
                    <span className="font-mono text-gray-800">{credit.issuedTo.slice(0, 10)}...</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Issue Date:</span>
                    <span className="text-gray-800">{credit.issueDate}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Verified Proof:</span>
                    <a href="#" className="text-primary hover:underline">{credit.proofId}</a>
                </div>
            </div>
            
            {/* Timeline Animation Placeholder */}
            <div className="pt-4">
                 <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="flex items-center text-accent-green">✓ Proof</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="flex items-center text-accent-green">✓ Verification</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="flex items-center text-accent-green">✓ Token Issued</span>
                </div>
            </div>
        </div>
    );
};


const CarbonCreditRegistry: React.FC = () => {
    return (
        <div className="font-display">
             <div className="bg-gradient-to-r from-primary to-primary-dark p-8 rounded-2xl shadow-xl mb-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold">Carbon Credit Registry</h2>
                        <p className="opacity-80 mt-1">A transparent, immutable ledger of all verified blue carbon credits.</p>
                    </div>
                    <div className="text-4xl opacity-50">
                        {ICONS.registry}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CARBON_CREDITS.map(credit => (
                    <CreditCard key={credit.id} credit={credit} />
                ))}
            </div>
        </div>
    );
};

export default CarbonCreditRegistry;
