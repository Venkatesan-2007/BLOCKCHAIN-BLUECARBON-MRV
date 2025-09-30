import React from 'react';
import { useAuth } from '../App';
import { ICONS } from '../constants';

// Reusable card component for styling consistency
const SettingsCard = ({ title, icon, children }: { title: string, icon: JSX.Element, children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl shadow-lg">
        <div className="flex items-center p-4 border-b border-gray-200">
            <div className="text-primary mr-3">{icon}</div>
            <h3 className="text-xl font-bold text-primary-dark">{title}</h3>
        </div>
        <div className="p-6 space-y-4">
            {children}
        </div>
    </div>
);

// Reusable input field
const InputField = ({ label, type, id, defaultValue, readOnly = false }: { label: string, type: string, id: string, defaultValue: string, readOnly?: boolean }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            id={id}
            defaultValue={defaultValue}
            readOnly={readOnly}
            className={`w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow ${readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
        />
    </div>
);

// Reusable toggle switch
const ToggleSwitch = ({ label, id, defaultChecked }: { label: string, id: string, defaultChecked?: boolean }) => (
     <div className="flex items-center justify-between">
        <span className="text-gray-700">{label}</span>
        <label htmlFor={id} className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" defaultChecked={defaultChecked} id={id} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
    </div>
);

const Profile: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <div className="p-8 text-center">Loading user profile...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 font-display">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative">
                    <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-full object-cover border-4 border-primary" />
                    <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 hover:bg-primary-dark transition-all" title="Upload new photo" aria-label="Upload new photo">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                    </button>
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-primary-dark">{user.name}</h1>
                    <p className="text-lg text-gray-500">{user.role}</p>
                </div>
            </div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SettingsCard title="Profile Settings" icon={ICONS.user}>
                    <InputField label="Full Name" type="text" id="name" defaultValue={user.name} />
                    <InputField label="Email Address" type="email" id="email" defaultValue={user.email} />
                    <InputField label="Role" type="text" id="role" defaultValue={user.role} readOnly={true} />
                </SettingsCard>

                <SettingsCard title="Account Security" icon={ICONS.shield}>
                    <InputField label="Current Password" type="password" id="current-password" defaultValue="••••••••" />
                    <InputField label="New Password" type="password" id="new-password" defaultValue="" />
                    <InputField label="Confirm New Password" type="password" id="confirm-password" defaultValue="" />
                     <button className="w-full mt-2 bg-primary-dark text-white font-bold py-2 px-4 rounded-lg hover:bg-primary transition-colors">
                        Change Password
                    </button>
                </SettingsCard>

                <div className="lg:col-span-2">
                     <SettingsCard title="Notification Settings" icon={React.cloneElement(ICONS.bell, { className: "h-6 w-6" })}>
                        <ToggleSwitch label="Project Updates" id="notif-project" defaultChecked />
                        <ToggleSwitch label="Community Mentions" id="notif-community" defaultChecked />
                        <ToggleSwitch label="Marketplace Alerts" id="notif-market" />
                        <ToggleSwitch label="Weekly Summary Email" id="notif-summary" />
                    </SettingsCard>
                </div>
            </div>
            
            <div className="flex justify-end space-x-4">
                <button className="px-6 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                    Discard Changes
                </button>
                <button className="px-6 py-2 text-white bg-accent-green rounded-lg hover:bg-green-600 transition-colors shadow-md">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Profile;