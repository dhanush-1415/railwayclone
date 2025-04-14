import { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create context
const CanvasContext = createContext();

// Sample data
const initialProjects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Online shopping platform with cart and checkout',
    createdAt: '2025-03-15',
    status: 'active',
    environments: ['dev', 'staging', 'prod'],
  }
];

const initialEnvironments = [
  { id: 'dev', name: 'Development', color: '#9c5cff' },
  { id: 'staging', name: 'Staging', color: '#f97316' },
  { id: 'prod', name: 'Production', color: '#10b981' },
];

const initialDeployments = [
  { 
    id: 'd1', 
    projectId: '1', 
    environmentId: 'dev',
    name: 'API Server',
    status: 'running',
    lastDeployed: '2025-04-12',
    technology: 'Node.js',
    resourceUsage: { cpu: '12%', memory: '256MB' }
  },
  { 
    id: 'd2', 
    projectId: '1', 
    environmentId: 'dev',
    name: 'Web Frontend',
    status: 'running',
    lastDeployed: '2025-04-13',
    technology: 'React',
    resourceUsage: { cpu: '8%', memory: '128MB' }
  },
  { 
    id: 'd3', 
    projectId: '1', 
    environmentId: 'dev',
    name: 'Database',
    status: 'running',
    lastDeployed: '2025-04-10',
    technology: 'PostgreSQL',
    resourceUsage: { cpu: '5%', memory: '512MB' }
  }
];

// Provider component
export const CanvasProvider = ({ children }) => {
  // State
  const [projects, setProjects] = useState(initialProjects);
  const [environments, setEnvironments] = useState(initialEnvironments);
  const [deployments, setDeployments] = useState(initialDeployments);
  const [currentProject, setCurrentProject] = useState(null);
  const [zoom, setZoom] = useState(1);

  // Select project
  const selectProject = useCallback((projectId) => {
    const project = projects.find(p => p.id === projectId);
    setCurrentProject(project || null);
  }, [projects]);

  // Add project
  const addProject = useCallback((projectData) => {
    const newProject = {
      id: uuidv4(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      environments: ['dev'],
      ...projectData
    };
    
    setProjects(prev => [...prev, newProject]);
    return newProject;
  }, []);

  // Add deployment
  const addDeployment = useCallback((deploymentData) => {
    const newDeployment = {
      id: uuidv4(),
      status: 'pending',
      lastDeployed: new Date().toISOString().split('T')[0],
      resourceUsage: { cpu: '0%', memory: '0MB' },
      ...deploymentData
    };
    
    setDeployments(prev => [...prev, newDeployment]);
    return newDeployment;
  }, []);

  // Add environment
  const addEnvironment = useCallback((environmentData) => {
    const newEnvironment = {
      id: environmentData.id || uuidv4(),
      ...environmentData
    };
    
    setEnvironments(prev => [...prev, newEnvironment]);
    return newEnvironment;
  }, []);

  // Update zoom
  const updateZoom = useCallback((newZoom) => {
    setZoom(newZoom);
  }, []);

  // Context value
  const value = {
    projects,
    environments,
    deployments,
    currentProject,
    zoom,
    selectProject,
    addProject,
    addDeployment,
    addEnvironment,
    updateZoom
  };

  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
};

// Custom hook to use the context
export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};