
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, DonutChart } from 'recharts';
import type { CarbonCredit } from '../types';
import { CARBON_CREDITS } from '../data/demo';

const priceTrendData = [
  { name: 'Jan', price: 12.5 },
  { name: 'Feb', price: 13.0 },
  { name: 'Mar', price: 14.2 },
  { name: 'Apr', price: 14.0 },
  { name: 'May', price: 15.5 },
  { name: 'Jun', price: 16.8 },
  { name: 'Jul', price: 17.2 },
  { name: 'Aug', price: 18.0 },
];

const availabilityData = [
  { name: 'Credits Sold', value: 8450 },
  { name: 'Credits Available', value: 14500 - 8450 },
];
const COLORS = ['#1565C0', '#4CAF50'];

const MarketplaceCreditCard: React.FC<{ credit: CarbonCredit }> = ({ credit }) => (
    <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
        <div>
            <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-xl">1 Ton CO₂</p>
                <p className="text-sm bg-white/20 px-2 py-1 rounded-full">Batch #{credit.proofId.slice(-4)}</p>
            </div>
            <p className="font-mono text-xs opacity-70 break-all mb-4">{credit.tokenId}</p>
        </div>
        <div className="text-center mt-4">
            <p className="text-4xl font-bold mb-4">${credit.price?.toFixed(2)}</p>
            <button className="w-full bg-accent-green font-bold py-3 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-green transition-all shadow-md">
                Buy Credit
            </button>
        </div>
    </div>
);


const Marketplace: React.FC = () => {
    const availableCredits = CARBON_CREDITS.filter(c => c.status === 'Available');

    return (
        <div className="flex flex-col lg:flex-row gap-8 font-display">
            {/* Main Content */}
            <div className="flex-grow">
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Blue Carbon Credits for Sale</h2>
                    <div className="flex items-center space-x-4">
                        <input type="text" placeholder="Filter by batch, price..." className="flex-grow px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"/>
                        <button className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark">Filter</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {availableCredits.map(credit => <MarketplaceCreditCard key={credit.id} credit={credit} />)}
                </div>
            </div>

            {/* Analytics Sidebar */}
            <div className="w-full lg:w-1/3 xl:w-1/4 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="font-bold text-xl text-primary-dark mb-4">Price Trends (USD)</h3>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={priceTrendData}>
                                <XAxis dataKey="name" stroke="#90A4AE" />
                                <YAxis stroke="#90A4AE" />
                                <Tooltip wrapperClassName="rounded-lg shadow-lg" />
                                <Legend />
                                <Line type="monotone" dataKey="price" stroke="#1E88E5" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="font-bold text-xl text-primary-dark mb-4">Credit Availability</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={availabilityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {availabilityData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
