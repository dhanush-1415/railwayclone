import { useState } from 'react';
import { motion } from 'framer-motion';
import Draggable from 'react-draggable';
import { FiClock, FiGithub, FiSettings } from 'react-icons/fi';

const DeploymentCard = ({ deployment, onDragStop, position = { x: 0, y: 0 } }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);

  // Determine badge color based on status or source
  const getBadgeClasses = () => {
    if (deployment.status === 'new') {
      return 'bg-app-badge-green text-app-badge-text-green';
    } else if (deployment.source === 'GitHub') {
      return 'bg-app-badge-purple text-app-badge-text-purple';
    }
    return 'bg-app-button-secondary text-app-text-primary';
  };

  // Handle drag stop
  const handleDragStop = (e, data) => {
    setCurrentPosition({ x: data.x, y: data.y });
    if (onDragStop) {
      onDragStop(deployment.id, { x: data.x, y: data.y });
    }
  };

  return (
    <Draggable
      defaultPosition={position}
      onStart={() => setIsDragging(true)}
      onStop={(e, data) => {
        setIsDragging(false);
        handleDragStop(e, data);
      }}
      bounds="parent"
      position={currentPosition}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          absolute bg-app-card border border-app-border rounded-lg p-4 w-64
          shadow-canvas-card cursor-move transition-shadow duration-300
          ${isDragging ? 'shadow-lg z-50' : 'z-10'}
        `}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            {deployment.status === 'new' ? (
              <span className="text-app-accent-green mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </span>
            ) : (
              <span className="text-app-text-primary mr-2">
                <FiGithub size={16} />
              </span>
            )}
            <h3 className="text-md font-medium text-app-text-primary line-clamp-1">
              {deployment.name}
            </h3>
          </div>
          {deployment.status === 'new' && (
            <span className={`text-xs px-2 py-1 rounded-full ${getBadgeClasses()}`}>
              {deployment.status}
            </span>
          )}
        </div>
        
        {deployment.url && (
          <div className="text-sm text-app-text-secondary mb-2 truncate">
            {deployment.url}
          </div>
        )}
        
        <div className="flex items-center text-xs text-app-text-secondary mt-3">
          {deployment.settings && (
            <div className="flex items-center mr-4">
              <FiSettings className="mr-1" size={12} />
              <span>{deployment.settings} Setting</span>
            </div>
          )}
          
          {deployment.updatedAt && (
            <div className="flex items-center">
              <FiClock className="mr-1" size={12} />
              <span>{deployment.updatedAt}</span>
            </div>
          )}
        </div>
      </motion.div>
    </Draggable>
  );
};

export default DeploymentCard;