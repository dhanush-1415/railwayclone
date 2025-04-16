import { motion } from 'framer-motion';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';

const CanvasToolbar = ({setDeployModalOpen}) => {
  return (
    <div className="absolute bottom-6 right-6 z-30">
      <div className="flex flex-col space-y-3">
        {/* Sync button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-app-card border border-app-border text-app-text-primary p-3 rounded-md shadow-md hover:bg-app-card-hover transition-all duration-300 flex items-center justify-center"
        >
          <FiRefreshCw className="mr-2" />
          <span>Sync</span>
        </motion.button>
        
        {/* Create button */}
        <motion.button
          onClick={(e) => setDeployModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-app-accent-purple text-white p-3 rounded-md shadow-md hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center"
        >
          <FiPlus className="mr-2" />
          <span>Create</span>
        </motion.button>
      </div>
    </div>
  );
};

export default CanvasToolbar;