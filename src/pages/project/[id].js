import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMoreVertical, FiTrash2, FiX } from 'react-icons/fi';
import DraggableCanvas from '../../components/canvas/DraggableCanvas';
import Header from '../../components/Header';
import DeploymentCard from '../../components/canvas/DeploymentCard';
import EnvironmentSidebar from '../../components/canvas/EnvironmentSidebar';
import CanvasToolbar from '../../components/canvas/CanvasToolbar';
import ProjectActionButtons from '../../components/canvas/ProjectActionButtons';
import { useCanvas } from '../../context/CanvasContext';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { deployments, selectProject, currentProject, environments, addDeployment, addEnvironment } = useCanvas();
  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState('dev');
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [newDeploymentName, setNewDeploymentName] = useState('');
  const [newDeploymentTechnology, setNewDeploymentTechnology] = useState('Node.js');

  // Select current project when ID changes
  useEffect(() => {
    if (id) {
      selectProject(id);
    }
  }, [id, selectProject]);

  // Get all environments for this project
  const projectEnvironments = environments.map(env => {
    // Create a deployment-like object for each environment
    return {
      id: env.id,
      name: env.name,
      environmentId: env.id,
      projectId: id,
      status: 'running'
    };
  });

  // Handle adding new environment (creating a deployment is now creating an environment)
  const handleAddDeployment = () => {
    if (newDeploymentName.trim() === '') return;
    
    // First add the environment
    addEnvironment({
      id: newDeploymentName.toLowerCase().replace(/\s+/g, '-'),
      name: newDeploymentName,
      color: '#9c5cff'
    });
    
    setNewDeploymentName('');
    setDeployModalOpen(false);
  };

  // Environment box positions
  const getDeploymentPosition = (index, total) => {
    // Center of the canvas
    const centerX = 1800; // Middle of the 4000px wide canvas
    const centerY = 1000; // Middle of the 3000px high canvas
    
    // If only one environment, place it in the center
    if (total <= 1) {
      return { x: centerX, y: centerY };
    } 
    
    // Place environments in a row with more spacing
    const boxWidth = 300; // Width + margin between cards
    
    if (total === 2) {
      // For 2 environments, place on opposite sides of center
      return index === 0 
        ? { x: centerX - 200, y: centerY }
        : { x: centerX + 200, y: centerY };
    } else if (total === 3) {
      // For 3 environments, place in a triangle
      const radius = 300;
      const angleStep = (2 * Math.PI) / 3;
      const angle = index * angleStep;
      
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
    } else if (total <= 6) {
      // For 4-6 environments, place in a horizontal row
      const startX = centerX - ((total - 1) * boxWidth) / 2;
      return {
        x: startX + (index * boxWidth),
        y: centerY
      };
    } else {
      // For more than 6, arrange in a circle
      const radius = 400;
      const angleStep = (2 * Math.PI) / total;
      const angle = index * angleStep;
      
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
    }
  };

  // If project not found or not loaded yet
  if (!currentProject) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-app-background text-app-text-primary">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="mb-4 text-app-text-secondary">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold mb-2">Project not found</h1>
          <p className="text-app-text-secondary mb-6">The project you're looking for doesn't exist or is still loading.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-app-accent-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Go back to projects
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{currentProject?.name || 'Project Detail'} - Canvas App</title>
        <meta name="description" content={`Details for ${currentProject?.name} - Canvas App`} />
      </Head>

      <div className="h-screen w-full bg-app-background text-app-text-primary overflow-hidden">
        {/* Full screen canvas */}
        <DraggableCanvas>
          {/* Environment boxes */}
          {projectEnvironments.map((env, index) => (
            <DeploymentCard
              key={env.id}
              deployment={env}
              position={getDeploymentPosition(index, projectEnvironments.length)}
            />
          ))}
        </DraggableCanvas>
        
        {/* Empty state when no environments */}
        {projectEnvironments.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-app-card border border-app-border rounded-lg p-8 max-w-md text-center pointer-events-auto shadow-xl"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 bg-app-background rounded-full mb-4">
                <FiPlus className="text-app-accent-purple" size={30} />
              </div>
              <h3 className="text-xl font-medium text-app-text-primary mb-2">No environments</h3>
              <p className="text-app-text-secondary mb-6">
                Get started by creating your first environment for this project.
              </p>
              <button 
                onClick={() => setDeployModalOpen(true)}
                className="bg-app-accent-purple text-white px-4 py-2 rounded-md inline-flex items-center"
              >
                <FiPlus className="mr-2" />
                Create Environment
              </button>
            </motion.div>
          </div>
        )}
        
        {/* Floating action button */}
        <div className="absolute left-8 bottom-8 z-40">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDeployModalOpen(true)}
            className="flex items-center space-x-2 bg-app-accent-purple text-white px-4 py-3 rounded-md shadow-lg hover:bg-opacity-90 transition-all duration-200"
          >
            <FiPlus size={20} />
            <span>New Environment</span>
          </motion.button>
        </div>
        
        {/* Floating home button */}
        <div className="absolute top-8 left-8 z-40">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="bg-app-card border border-app-border text-app-text-primary px-4 py-3 rounded-md shadow-lg hover:border-app-accent-purple transition-colors duration-200 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Projects</span>
          </motion.button>
        </div>
      </div>

      {/* Create Deployment Modal */}
      <AnimatePresence>
        {deployModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeployModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-app-card rounded-lg shadow-xl w-full max-w-md p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-app-text-primary text-xl font-semibold">New Environment</h3>
                <button 
                  onClick={() => setDeployModalOpen(false)}
                  className="text-app-text-secondary hover:text-app-text-primary transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="environmentName" className="block text-app-text-secondary text-sm mb-1">Environment Name</label>
                  <input 
                    type="text" 
                    id="environmentName"
                    value={newDeploymentName}
                    onChange={(e) => setNewDeploymentName(e.target.value)}
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                    placeholder="E.g. Production"
                  />
                </div>
                <div>
                  <label htmlFor="environmentType" className="block text-app-text-secondary text-sm mb-1">Environment Type</label>
                  <select 
                    id="environmentType"
                    value={newDeploymentTechnology}
                    onChange={(e) => setNewDeploymentTechnology(e.target.value)}
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                  >
                    <option value="Node.js">Development</option>
                    <option value="PostgreSQL">Staging</option>
                    <option value="React">Production</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="environmentRegion" className="block text-app-text-secondary text-sm mb-1">Region</label>
                  <select 
                    id="environmentRegion"
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                  >
                    <option value="us-east">US East</option>
                    <option value="us-west">US West</option>
                    <option value="eu-central">EU Central</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  className="px-4 py-2 text-app-text-secondary hover:text-app-text-primary transition-colors"
                  onClick={() => setDeployModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-app-accent-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
                  onClick={handleAddDeployment}
                  disabled={!newDeploymentName.trim()}
                >
                  Create Environment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}