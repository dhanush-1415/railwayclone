import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGitBranch, FiCheck, FiEye } from 'react-icons/fi';
import Draggable from 'react-draggable';

const DeploymentCard = ({ deployment, position }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(position);
  const [hasInitialized, setHasInitialized] = useState(false);
  const nodeRef = useRef(null); // Add this ref for React 18 compatibility

  // Update position when prop changes
  useEffect(() => {
    if (!hasInitialized) {
      setPos(position);
      setHasInitialized(true);
    }
  }, [position, hasInitialized]);

  // Handle drag events - smoother dragging
  const handleDrag = (e, data) => {
    setPos({ x: data.x, y: data.y });
  };

  // Determine the color based on environment name
  const getEnvironmentColor = () => {
    switch (deployment.environmentId) {
      case 'dev':
        return 'text-green-500';
      case 'staging':
        return 'text-yellow-500';
      case 'prod':
        return 'text-blue-500';
      default:
        return 'text-app-accent-purple';
    }
  };

  // Smooth cursor styles
  const getCursorStyle = () => {
    return isDragging ? 'cursor-grabbing' : 'cursor-grab';
  };

  return (
    <Draggable
      bounds="parent"
      position={pos}
      onStart={() => setIsDragging(true)}
      onDrag={handleDrag}
      onStop={() => setIsDragging(false)}
      nodeRef={nodeRef}
      defaultClassName={getCursorStyle()}
    >
      <motion.div
        ref={nodeRef}
        id={`environment-${deployment.id}`}
        className={`bg-app-card border border-app-border rounded-lg shadow-xl w-60 select-none absolute z-10 ${isDragging ? 'shadow-2xl' : ''}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          boxShadow: isDragging ? '0 20px 25px -5px rgba(0, 0, 0, 0.2)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ 
          type: 'spring',
          stiffness: 300, 
          damping: 25,
          duration: 0.3 
        }}
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)", 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {/* Card header with subtle gradient */}
        <div className="p-4 flex items-center border-b border-app-border bg-gradient-to-r from-app-card to-app-card-hover rounded-t-lg">
          <div className={`h-10 w-10 flex-shrink-0 rounded-md bg-app-background ${getEnvironmentColor()} flex items-center justify-center mr-3`}>
            <FiGitBranch size={22} />
          </div>
          <div>
            <h3 className="text-app-text-primary text-md font-medium">{deployment.name}</h3>
            <div className="flex items-center text-xs text-app-text-secondary mt-1">
              <span>portfolio-next-{deployment.environmentId}.railway.app</span>
            </div>
          </div>
        </div>
        
        {/* Card body with improved styling */}
        <div className="p-4">
          <div className="mx-0 mb-3 py-2 px-3 bg-app-background rounded-md border border-app-border border-opacity-50">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-green-500 font-medium">Healthy</span>
            </div>
            <div className="mt-1 text-xs text-app-text-secondary">
              Updated 2 hours ago
            </div>
          </div>
          
          {/* Status indicators */}
          <div className="flex items-center justify-between text-xs text-app-text-secondary">
            <div className="flex items-center">
              <FiCheck className="mr-1" />
              <span>CI/CD: Passing</span>
            </div>
            <div className="flex items-center">
              <FiEye className="mr-1" />
              <span>Region: US East</span>
            </div>
          </div>
        </div>
        
        {/* Tag at the top right with improved styling */}
        {deployment.environmentId === 'dev' ? (
          <div className="absolute top-3 right-3 bg-green-500 bg-opacity-10 text-green-500 text-xs px-2 py-0.5 rounded-full">
            Live
          </div>
        ) : deployment.environmentId === 'staging' ? (
          <div className="absolute top-3 right-3 bg-yellow-500 bg-opacity-10 text-yellow-500 text-xs px-2 py-0.5 rounded-full">
            Staging
          </div>
        ) : deployment.environmentId === 'prod' ? (
          <div className="absolute top-3 right-3 bg-blue-500 bg-opacity-10 text-blue-500 text-xs px-2 py-0.5 rounded-full">
            Production
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-app-accent-purple bg-opacity-10 text-app-accent-purple text-xs px-2 py-0.5 rounded-full">
            {deployment.environmentId}
          </div>
        )}
      </motion.div>
    </Draggable>
  );
};

export default DeploymentCard;