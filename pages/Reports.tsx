
import React from 'react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { ICONS } from '../constants';

const sequestrationData = [
  { month: 'Jan', tons: 1200 }, { month: 'Feb', tons: 1500 }, { month: 'Mar', tons: 2100 },
  { month: 'Apr', tons: 2400 }, { month: 'May', tons: 3200 }, { month: 'Jun', tons: 3500 },
];

const creditsByProjectData = [
  { name: 'Karimun Jawa', credits: 14500 }, { name: 'Sunda Kelapa', credits: 8000 },
  { name: 'Bali Initiative', credits: 3200 }, { name: 'Riau Peatland', credits: 500 },
];

const creditStatusData = [{ name: 'Issued', value: 26200 }, { name: 'Traded', value: 8450 }];
const COLORS = ['#1E88E5', '#4CAF50'];

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-primary-dark mb-6">{title}</h2>
        <div className="h-80">{children}</div>
    </div>
);

const Reports: React.FC = () => {
    return (
        <div className="space-y-8 font-display">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary-dark">Reports & Analytics</h1>
                <div className="flex space-x-4">
                    <button className="flex items-center bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors shadow-md">
                        {ICONS.pdf}
                        Export PDF
                    </button>
                    <button className="flex items-center bg-accent-green text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors shadow-md">
                        {ICONS.csv}
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartCard title="Monthly CO₂ Sequestration (tons)">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sequestrationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="tons" stroke="#1E88E5" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Credits Issued by Project">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={creditsByProjectData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" width={120} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="credits" fill="#64B5F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
                
                <ChartCard title="Credit Status Overview">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={creditStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} label>
                                {creditStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
};

export default Reports;
