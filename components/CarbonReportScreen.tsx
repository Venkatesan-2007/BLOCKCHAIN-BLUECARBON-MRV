
import React from 'react';
import { Page } from '../types';
import BottomNavBar from './BottomNavBar';

interface CarbonReportScreenProps {
  onBack: () => void;
  navigate: (page: Page) => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const CarbonReportScreen: React.FC<CarbonReportScreenProps> = ({ onBack, navigate }) => {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <header className="p-6 flex items-center">
        <button onClick={onBack} className="mr-4"><BackArrowIcon /></button>
        <h1 className="text-xl font-semibold">Carbon Report</h1>
      </header>

      <main className="flex-grow px-6 pb-24 space-y-6">
        <div className="bg-brand-card p-6 rounded-lg">
          <div className="flex justify-between items-start">
            <p className="text-brand-light">Estimated Carbon Stock</p>
            <div className="flex items-center text-xs text-brand-light space-x-1">
              <InfoIcon />
              <span>tCO₂e</span>
            </div>
          </div>
          <p className="text-5xl font-bold mt-2">123<span className="text-3xl">.45</span> <span className="text-lg font-normal text-brand-light ml-1">±10%</span></p>
        </div>

        <div className="bg-brand-card p-6 rounded-lg">
          <div className="flex justify-between items-start">
            <p className="text-brand-light">Validated Area</p>
            <div className="flex items-center text-xs text-brand-light space-x-1">
              <ImageIcon />
              <span>ha</span>
            </div>
          </div>
          <p className="text-5xl font-bold mt-2">100</p>
        </div>

        <div className="pt-8 space-y-4">
            <button className="w-full flex items-center justify-center bg-brand-secondary text-brand-text font-semibold rounded-lg py-3 transition-transform transform hover:scale-105">
                <DownloadIcon />
                Download PDF report
            </button>
            <button className="w-full flex items-center justify-center bg-brand-accent text-white font-semibold rounded-lg py-3 transition-transform transform hover:scale-105">
                Submit to NCCR
                <ArrowRightIcon />
            </button>
        </div>

      </main>

      <BottomNavBar activePage={Page.Projects} navigate={navigate} />
    </div>
  );
};

export default CarbonReportScreen;
