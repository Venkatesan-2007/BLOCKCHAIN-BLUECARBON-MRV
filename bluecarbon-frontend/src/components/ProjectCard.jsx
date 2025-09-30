import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
          {project.status || 'Draft'}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {project.location || 'Location not set'}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
          </svg>
          {project.hectares ? `${project.hectares} hectares` : 'Area not set'}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Link 
          to={`/projects/${project.id}/upload`} 
          className="text-center text-sm px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Upload
        </Link>
        <Link 
          to={`/projects/${project.id}/report`} 
          className="text-center text-sm px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Report
        </Link>
        <Link 
          to={`/projects/${project.id}/status`} 
          className="text-center text-sm px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Status
        </Link>
      </div>
    </div>
  );
}
