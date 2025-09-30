
import React, { useState } from 'react';
import { Page, UploadedFile } from '../types';
import { mockUploadedFiles } from '../data/mockData';
import BottomNavBar from './BottomNavBar';

interface UploadDataScreenProps {
  onBack: () => void;
  navigate: (page: Page) => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const DroneIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const ImageIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);


const UploadDataScreen: React.FC<UploadDataScreenProps> = ({ onBack, navigate }) => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(mockUploadedFiles);

    const dataTypes = [
        { name: 'Drone Imagery', formats: 'GeoTIFF/JPEG', icon: <DroneIcon/> },
        { name: 'Field Images', formats: 'JPEG/PNG', icon: <ImageIcon/> },
        { name: 'CSV Files', formats: 'Field Measurements/Soil', icon: <FileIcon/> }
    ];

    const handleRemoveFile = (id: number) => {
        setUploadedFiles(files => files.filter(file => file.id !== id));
    };

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col">
            <header className="p-6 flex items-center">
                <button onClick={onBack} className="mr-4"><BackArrowIcon /></button>
                <h1 className="text-xl font-semibold">Upload Data</h1>
            </header>
            
            <main className="flex-grow px-6 pb-24 space-y-8">
                <section>
                    <h2 className="text-lg font-semibold mb-1">Upload Files</h2>
                    <p className="text-sm text-brand-light mb-4">Select the data types you want to upload.</p>
                    <div className="space-y-3">
                        {dataTypes.map(type => (
                            <div key={type.name} className="bg-brand-card p-4 rounded-lg flex items-center justify-between cursor-pointer transition-transform transform hover:scale-105">
                                <div className="flex items-center space-x-4">
                                    <div className="text-brand-accent">{type.icon}</div>
                                    <div>
                                        <h3 className="font-semibold">{type.name}</h3>
                                        <p className="text-xs text-brand-light">{type.formats}</p>
                                    </div>
                                </div>
                                <ChevronRightIcon />
                            </div>
                        ))}
                    </div>
                </section>
                
                <section>
                    <h2 className="text-lg font-semibold mb-4">Uploaded Files Preview</h2>
                    <div className="space-y-3">
                        {uploadedFiles.map(file => (
                            <div key={file.id} className="bg-brand-card p-3 rounded-lg flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    {file.preview ?
                                        <img src={file.preview} alt={file.name} className="w-12 h-12 rounded-md object-cover"/> :
                                        <div className="w-12 h-12 rounded-md bg-brand-secondary flex items-center justify-center"><FileIcon/></div>
                                    }
                                    <div>
                                        <p className="text-sm font-medium text-brand-text truncate w-48">{file.name}</p>
                                        <p className="text-xs text-brand-light">{file.size}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveFile(file.id)}>
                                    <CloseIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
                
                <div className="pt-4">
                    <button className="w-full bg-brand-accent text-white font-semibold rounded-lg py-3 transition-transform transform hover:scale-105">Submit for AI Processing</button>
                </div>
            </main>
            
            <BottomNavBar activePage={Page.Projects} navigate={navigate} />
        </div>
    );
};

export default UploadDataScreen;
