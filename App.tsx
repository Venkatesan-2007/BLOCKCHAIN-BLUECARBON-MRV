
import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import NewProjectScreen from './components/NewProjectScreen';
import ProjectDetailScreen from './components/ProjectDetailScreen';
import CarbonReportScreen from './components/CarbonReportScreen';
import UploadDataScreen from './components/UploadDataScreen';
import SettingsScreen from './components/SettingsScreen';
import { Page, Project } from './types';
import { mockProjects } from './data/mockData';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleLogin = () => navigate(Page.Dashboard);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    navigate(Page.ProjectDetail);
  };

  const handleCreateNewProject = () => {
    setSelectedProject(null);
    navigate(Page.NewProject);
  };
  
  const handleSaveProject = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
    navigate(Page.Dashboard);
  };

  const renderContent = () => {
    switch (currentPage) {
      case Page.Login:
        return <LoginScreen onLogin={handleLogin} />;
      case Page.Dashboard:
        return (
          <DashboardScreen
            projects={projects}
            onSelectProject={handleSelectProject}
            onCreateNew={handleCreateNewProject}
            navigate={navigate}
            activePage={currentPage}
          />
        );
      case Page.Projects:
      case Page.NewProject:
        return <NewProjectScreen onSave={handleSaveProject} onBack={() => navigate(Page.Dashboard)} onNext={() => navigate(Page.UploadData)} navigate={navigate} />;
      case Page.ProjectDetail:
        return selectedProject ? (
          <ProjectDetailScreen project={selectedProject} onBack={() => navigate(Page.Dashboard)} onViewReport={() => navigate(Page.CarbonReport)} />
        ) : (
          <DashboardScreen projects={projects} onSelectProject={handleSelectProject} onCreateNew={handleCreateNewProject} navigate={navigate} activePage={Page.Dashboard} />
        );
      case Page.CarbonReport:
        return <CarbonReportScreen onBack={() => navigate(Page.ProjectDetail)} navigate={navigate} />;
       case Page.UploadData:
        return <UploadDataScreen onBack={() => navigate(Page.NewProject)} navigate={navigate} />;
      case Page.Settings:
        return <SettingsScreen navigate={navigate} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-md mx-auto bg-brand-dark shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
