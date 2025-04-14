import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGitBranch, FiServer, FiGlobe } from 'react-icons/fi';
import Draggable from 'react-draggable';

const DeploymentCard = ({ deployment, position }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(position);
  const nodeRef = useRef(null); // Add this ref for React 18 compatibility

  // Set position on mount only
  useEffect(() => {
    setPos(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle drag events
  const handleDrag = (e, data) => {
    setPos({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      bounds="parent"
      position={pos}
      defaultPosition={position}
      onStart={() => setIsDragging(true)}
      onDrag={handleDrag}
      onStop={() => setIsDragging(false)}
      nodeRef={nodeRef} // Add the ref to Draggable for React 18 compatibility
    >
      <motion.div
        ref={nodeRef} // Reference the element
        id={`environment-${deployment.id}`}
        className={`bg-app-card border border-app-border rounded-lg shadow-md w-48 select-none absolute z-10 cursor-move ${isDragging ? 'shadow-lg' : ''}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      >
        {/* Card header */}
        <div className="p-3 flex items-center border-b border-app-border">
          <div className="h-8 w-8 flex-shrink-0 rounded-md bg-app-background text-app-accent-purple flex items-center justify-center mr-3">
            <FiGitBranch size={18} />
          </div>
          <div>
            <h3 className="text-app-text-primary text-sm font-medium">{deployment.name}</h3>
            <div className="flex items-center text-xs text-app-text-secondary mt-0.5">
              <span>portfolio-next-{deployment.environmentId}.railway.app</span>
            </div>
          </div>
        </div>
        
        {/* Card body */}
        <div className="mx-3 mt-2 mb-3 py-2 px-3 bg-app-background rounded-md">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs text-green-500 font-medium">Healthy</span>
          </div>
          <div className="mt-1 text-xs text-app-text-secondary">
            Updated 8 hours ago
          </div>
        </div>
        
        {/* Tag at the bottom */}
        {deployment.environmentId === 'dev' && (
          <div className="absolute top-3 right-3 bg-green-500 bg-opacity-10 text-green-500 text-xs px-2 py-0.5 rounded-full">
            Live
          </div>
        )}
      </motion.div>
    </Draggable>
  );
};

export default DeploymentCard;