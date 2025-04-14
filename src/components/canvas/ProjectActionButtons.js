import { motion } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';

const ProjectActionButtons = () => {
  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30">
      <div className="flex items-center bg-app-card border border-app-border rounded-md shadow-md overflow-hidden">
        <motion.button
          whileHover={{ backgroundColor: '#6f42c1' }}
          className="px-4 py-2 text-app-text-primary hover:text-white transition-colors duration-300"
        >
          Apply 2 changes
        </motion.button>
        
        <div className="w-px h-8 bg-app-border"></div>
        
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className="px-4 py-2 text-app-text-primary transition-colors duration-300"
        >
          Details
        </motion.button>
        
        <div className="w-px h-8 bg-app-border"></div>
        
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className="px-4 py-2 text-app-text-primary transition-colors duration-300 flex items-center"
        >
          Deploy
          <span className="ml-2 text-xs bg-app-card text-app-text-secondary px-1.5 py-0.5 rounded-full">
            +1 order
          </span>
        </motion.button>
        
        <div className="w-px h-8 bg-app-border"></div>
        
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className="px-2 py-2 text-app-text-secondary transition-colors duration-300"
        >
          <FiMenu size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectActionButtons;