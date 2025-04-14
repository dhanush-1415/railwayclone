import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiServer, FiDatabase, FiGlobe, FiCpu, FiHardDrive } from 'react-icons/fi';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';

const DeploymentCard = ({ deployment, position }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(position);
  const nodeRef = useRef(null); // Add this ref for React 18 compatibility

  // Get icon based on deployment type
  const getIcon = () => {
    switch (deployment.technology) {
      case 'Node.js':
        return <FiServer />;
      case 'PostgreSQL':
        return <FiDatabase />;
      case 'React':
        return <FiGlobe />;
      default:
        return <FiServer />;
    }
  };

  // Get status color
  const getStatusColor = () => {
    switch (deployment.status) {
      case 'running':
        return 'bg-green-500';
      case 'stopped':
        return 'bg-gray-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  // Handle drag events
  const handleDrag = (e, data) => {
    setPos({ x: data.x, y: data.y });
  };

  return (
    <>
      {/* Deployment card */}
      <Draggable
        bounds="parent"
        position={pos}
        onStart={() => setIsDragging(true)}
        onDrag={handleDrag}
        onStop={() => setIsDragging(false)}
        nodeRef={nodeRef} // Add the ref to Draggable for React 18 compatibility
      >
        <motion.div
          ref={nodeRef} // Reference the element
          id={`deployment-${deployment.id}`}
          className="bg-app-card border border-app-border rounded-lg shadow-md w-48 select-none absolute z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          {/* Card header */}
          <div className="p-3 border-b border-app-border flex items-center">
            <div className="h-6 w-6 rounded-md bg-app-card-hover text-app-text-primary flex items-center justify-center mr-2">
              {getIcon()}
            </div>
            <div>
              <h3 className="text-app-text-primary text-sm font-medium">{deployment.name}</h3>
              <div className="flex items-center text-xs text-app-text-secondary mt-0.5">
                <span>{deployment.technology}</span>
              </div>
            </div>
          </div>
          
          {/* Card body */}
          <div className="p-3">
            {/* Resource metrics */}
            <div className="space-y-2 mb-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-app-text-secondary flex items-center">
                  <FiCpu className="mr-1" size={12} />
                  CPU
                </span>
                <span className="text-app-text-primary">{deployment.resourceUsage.cpu}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-app-text-secondary flex items-center">
                  <FiHardDrive className="mr-1" size={12} />
                  Memory
                </span>
                <span className="text-app-text-primary">{deployment.resourceUsage.memory}</span>
              </div>
            </div>
            
            {/* Status */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full ${getStatusColor()} mr-2`}></div>
                <span className="text-xs text-app-text-secondary">
                  {deployment.status === 'running' ? 'Online' : deployment.status}
                </span>
              </div>
              <span className="text-xs text-app-text-secondary">
                {deployment.lastDeployed}
              </span>
            </div>
          </div>
        </motion.div>
      </Draggable>
      
      {/* Connection arrow to project card */}
      <Xarrow
        start={`deployment-${deployment.id}`}
        end="project-center"
        color="#4b5563"
        strokeWidth={1}
        path="straight"
        startAnchor="middle"
        endAnchor="middle"
        showHead={false}
        dashness={true}
      />
    </>
  );
};

export default DeploymentCard;