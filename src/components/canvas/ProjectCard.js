import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiDatabase, FiServer, FiGlobe, FiGitBranch, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import Draggable from 'react-draggable';

const ProjectCard = ({ project, isCenter = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef(null); // Add this ref for React 18 compatibility

  // Card styles based on whether it's centered in the canvas or a list item
  const cardClasses = isCenter
    ? "bg-app-card border border-app-border rounded-lg shadow-lg w-60 select-none absolute z-10"
    : "bg-app-card border border-app-border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full h-full flex flex-col";

  // Center card content
  if (isCenter) {
    return (
      <Draggable
        bounds="parent"
        onStart={() => setIsDragging(true)}
        onStop={() => setIsDragging(false)}
        position={{ x: 0, y: 0 }}
        nodeRef={nodeRef} // Add the ref to Draggable for React 18 compatibility
      >
        <motion.div 
          ref={nodeRef} // Reference the element
          id="project-center"
          className={cardClasses}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          {/* Card header */}
          <div className="p-4 border-b border-app-border flex items-center">
            <div className="h-8 w-8 rounded-md bg-app-accent-purple text-white flex items-center justify-center mr-3">
              <FiDatabase />
            </div>
            <div>
              <h3 className="text-app-text-primary font-medium">{project.name}</h3>
              <div className="flex items-center text-xs text-app-text-secondary mt-1">
                <span className="flex items-center">
                  <FiGitBranch className="mr-1" size={12} />
                  main
                </span>
                <span className="mx-2">•</span>
                <span>3 environments</span>
              </div>
            </div>
          </div>
          
          {/* Card body */}
          <div className="p-4">
            <div className="text-sm text-app-text-secondary mb-3">
              {project.description || 'No description provided'}
            </div>
            
            {/* Resource metrics */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-app-text-secondary">Web Server</span>
                <span className="text-app-text-primary">2 containers</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-app-text-secondary">API Server</span>
                <span className="text-app-text-primary">1 container</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-app-text-secondary">Database</span>
                <span className="text-app-text-primary">1 instance</span>
              </div>
            </div>
            
            {/* Status */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-app-text-secondary">All systems operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    );
  }

  // List item card
  return (
    <motion.div 
      className={cardClasses}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/project/${project.id}`} className="block h-full">
        <div className="p-4 flex flex-col h-full">
          {/* Project icon and name */}
          <div className="mb-2 flex items-center">
            <div className="h-8 w-8 rounded-md bg-app-accent-purple text-white flex items-center justify-center mr-3">
              <FiDatabase />
            </div>
            <h3 className="text-app-text-primary font-medium">{project.name}</h3>
          </div>
          
          {/* Project description */}
          <p className="text-sm text-app-text-secondary mb-4 line-clamp-2 flex-grow">
            {project.description || 'No description provided'}
          </p>
          
          {/* Environment status */}
          <div className="mt-auto">
            <div className="flex items-center space-x-2 mb-2">
              {project.environments.map((env) => (
                <span 
                  key={env} 
                  className={`text-xs px-2 py-1 rounded-full 
                    ${env === 'dev' ? 'bg-purple-500 bg-opacity-20 text-purple-500' : 
                    env === 'staging' ? 'bg-orange-500 bg-opacity-20 text-orange-500' : 
                    'bg-green-500 bg-opacity-20 text-green-500'}`}
                >
                  {env}
                </span>
              ))}
            </div>
            
            {/* Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-app-text-secondary">Healthy</span>
              </div>
              <FiArrowRight className="text-app-text-secondary" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;