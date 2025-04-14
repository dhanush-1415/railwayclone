import { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Initial context state
const initialState = {
  projects: [],
  currentProject: null,
  environments: [],
  deployments: [],
  canvasPosition: { x: 0, y: 0 },
  canvasScale: 1,
};

// Create context
const CanvasContext = createContext(initialState);

// Provider component
export const CanvasProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      id: uuidv4(),
      name: 'perpetual-respect',
      url: 'cosivix.com',
      createdAt: new Date(),
      environments: ['production', 'staging', 'dev'],
    },
  ]);
  const [currentProject, setCurrentProject] = useState(null);
  const [environments, setEnvironments] = useState([]);
  const [deployments, setDeployments] = useState([
    {
      id: uuidv4(),
      name: 'gallant-encouragement',
      environmentId: 'dev',
      status: 'new',
      settings: 1,
    },
    {
      id: uuidv4(),
      name: 'Portfolio-Next',
      environmentId: 'dev',
      url: 'portfolio-next-dev.up.railway.app',
      updatedAt: '7 hours ago',
      source: 'GitHub',
    },
  ]);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [canvasScale, setCanvasScale] = useState(1);

  // Add new project
  const addProject = useCallback((project) => {
    const newProject = {
      id: uuidv4(),
      createdAt: new Date(),
      ...project,
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  }, []);

  // Select a project
  const selectProject = useCallback((projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setCurrentProject(project);
      // Load project environments
      if (project.environments) {
        setEnvironments(project.environments.map(env => ({
          id: env,
          name: env,
        })));
      }
    }
  }, [projects]);

  // Add deployment
  const addDeployment = useCallback((deployment) => {
    const newDeployment = {
      id: uuidv4(),
      ...deployment,
    };
    setDeployments((prev) => [...prev, newDeployment]);
    return newDeployment;
  }, []);

  // Update canvas position
  const updateCanvasPosition = useCallback((position) => {
    setCanvasPosition(position);
  }, []);

  // Update canvas scale
  const updateCanvasScale = useCallback((scale) => {
    setCanvasScale(scale);
  }, []);

  // Context value
  const value = {
    projects,
    currentProject,
    environments,
    deployments,
    canvasPosition,
    canvasScale,
    addProject,
    selectProject,
    addDeployment,
    updateCanvasPosition,
    updateCanvasScale,
  };

  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
};

// Custom hook to use the canvas context
export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};