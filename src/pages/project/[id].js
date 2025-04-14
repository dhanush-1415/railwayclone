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
  const { deployments, selectProject, currentProject, environments, addDeployment } = useCanvas();
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

  // Filter deployments for selected environment
  const filteredDeployments = deployments.filter(
    (deployment) => deployment.environmentId === selectedEnvironmentId && deployment.projectId === id
  );

  // Handle adding new deployment
  const handleAddDeployment = () => {
    if (newDeploymentName.trim() === '') return;
    
    addDeployment({
      name: newDeploymentName,
      projectId: id,
      environmentId: selectedEnvironmentId,
      technology: newDeploymentTechnology,
      status: 'running',
      resourceUsage: { cpu: '0%', memory: '0MB' }
    });
    
    setNewDeploymentName('');
    setDeployModalOpen(false);
  };

  // Deployment positions - arrange in a circle around the center
  const getDeploymentPosition = (index, total) => {
    // Center of the canvas
    const centerX = 1500;
    const centerY = 1000;
    
    if (total <= 1) {
      // If only one deployment, place it to the right of the center
      return { x: centerX + 300, y: centerY };
    } else if (total === 2) {
      // If two deployments, place them left and right of center
      return index === 0 
        ? { x: centerX - 300, y: centerY } 
        : { x: centerX + 300, y: centerY };
    } else if (total === 3) {
      // If three deployments, arrange in a triangle
      const angles = [0, 2*Math.PI/3, 4*Math.PI/3];
      const angle = angles[index];
      const radius = 300;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    } else {
      // For more than three, arrange in a circle
      const angle = (index * (2 * Math.PI)) / total;
      const radius = 350;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
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

      <div className="flex flex-col h-screen bg-app-background text-app-text-primary">
        {/* Header */}
        <Header projectView={true} />
        
        {/* Main content */}
        <div className="flex flex-1 mt-16 relative">
          {/* Environment sidebar */}
          <EnvironmentSidebar 
            selectedEnvironment={selectedEnvironmentId} 
            onSelectEnvironment={setSelectedEnvironmentId} 
          />
          
          {/* Canvas */}
          <div className="flex-1 relative">
            <DraggableCanvas>
              {/* Deployments */}
              {filteredDeployments.map((deployment, index) => (
                <DeploymentCard
                  key={deployment.id}
                  deployment={deployment}
                  position={getDeploymentPosition(index, filteredDeployments.length)}
                />
              ))}
            </DraggableCanvas>
            
            {/* Empty state when no deployments */}
            {filteredDeployments.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-app-card border border-app-border rounded-lg p-8 max-w-md text-center pointer-events-auto"
                >
                  <div className="inline-flex items-center justify-center h-14 w-14 bg-app-background rounded-full mb-4">
                    <FiPlus className="text-app-accent-purple" size={26} />
                  </div>
                  <h3 className="text-xl font-medium text-app-text-primary mb-2">No deployments</h3>
                  <p className="text-app-text-secondary mb-6">
                    Get started by creating your first deployment in the {selectedEnvironmentId} environment.
                  </p>
                  <button 
                    onClick={() => setDeployModalOpen(true)}
                    className="bg-app-accent-purple text-white px-4 py-2 rounded-md inline-flex items-center"
                  >
                    <FiPlus className="mr-2" />
                    Create Deployment
                  </button>
                </motion.div>
              </div>
            )}
            
            {/* Footer Info */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-app-background border-t border-app-border text-app-text-secondary text-sm flex justify-between items-center">
              <div className="flex items-center">
                <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
                <span>All systems operational</span>
              </div>
              <div className="flex items-center">
                <button className="flex items-center hover:text-app-text-primary transition-colors">
                  <span className="mr-2">Activity Log</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <ProjectActionButtons 
          onCreateDeployment={() => setDeployModalOpen(true)}
        />
        
        {/* Toolbar */}
        <CanvasToolbar />
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
                <h3 className="text-app-text-primary text-xl font-semibold">New Deployment</h3>
                <button 
                  onClick={() => setDeployModalOpen(false)}
                  className="text-app-text-secondary hover:text-app-text-primary transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="deploymentName" className="block text-app-text-secondary text-sm mb-1">Name</label>
                  <input 
                    type="text" 
                    id="deploymentName"
                    value={newDeploymentName}
                    onChange={(e) => setNewDeploymentName(e.target.value)}
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                    placeholder="E.g. API Server"
                  />
                </div>
                <div>
                  <label htmlFor="deploymentType" className="block text-app-text-secondary text-sm mb-1">Technology</label>
                  <select 
                    id="deploymentType"
                    value={newDeploymentTechnology}
                    onChange={(e) => setNewDeploymentTechnology(e.target.value)}
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                  >
                    <option value="Node.js">Node.js</option>
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="React">React</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="environmentSelect" className="block text-app-text-secondary text-sm mb-1">Environment</label>
                  <select 
                    id="environmentSelect"
                    value={selectedEnvironmentId}
                    disabled
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple opacity-70"
                  >
                    {environments.map(env => (
                      <option key={env.id} value={env.id}>{env.name}</option>
                    ))}
                  </select>
                  <p className="text-app-text-secondary text-xs mt-1">Using currently selected environment.</p>
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
                  Create Deployment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}