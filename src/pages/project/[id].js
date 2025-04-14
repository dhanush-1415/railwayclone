import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
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
  const { deployments, selectProject, currentProject } = useCanvas();

  // Select current project when ID changes
  useEffect(() => {
    if (id) {
      selectProject(id);
    }
  }, [id, selectProject]);

  // Filter deployments for current project's dev environment
  const devDeployments = deployments.filter(
    (deployment) => deployment.environmentId === 'dev'
  );

  // Deployment positions
  const getDeploymentPosition = (index) => {
    // Center of the canvas
    const centerX = 1500;
    const centerY = 1000;
    
    // Calculate position based on index
    switch (index) {
      case 0:
        return { x: centerX - 150, y: centerY };
      case 1:
        return { x: centerX + 150, y: centerY };
      default:
        // Calculate position in a circle around the center
        const angle = (index * (2 * Math.PI)) / deployments.length;
        const radius = 300;
        return {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
        };
    }
  };

  return (
    <>
      <Head>
        <title>{currentProject?.name || 'Project Detail'} - Canvas App</title>
      </Head>

      <div className="flex flex-col h-screen bg-app-background text-app-text-primary">
        {/* Header */}
        <Header projectView={true} />
        
        {/* Main content */}
        <div className="flex flex-1 mt-16 relative">
          {/* Environment sidebar */}
          <EnvironmentSidebar />
          
          {/* Canvas */}
          <div className="flex-1 relative">
            <DraggableCanvas>
              {/* Deployments */}
              {devDeployments.map((deployment, index) => (
                <DeploymentCard
                  key={deployment.id}
                  deployment={deployment}
                  position={getDeploymentPosition(index)}
                />
              ))}
            </DraggableCanvas>
            
            {/* Footer Info */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-app-background border-t border-app-border text-app-text-secondary text-sm flex justify-between items-center">
              <div>
                Set up your project locally
              </div>
              <div className="flex items-center">
                <span className="mr-2">Activity</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <ProjectActionButtons />
        
        {/* Toolbar */}
        <CanvasToolbar />
      </div>
    </>
  );
}