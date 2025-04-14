import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiPlus, FiEdit2, FiSettings, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ProjectActionButtons = ({ onCreateDeployment }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [changeCount, setChangeCount] = useState(2);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30">
      <div className="flex items-center bg-app-card border border-app-border rounded-md shadow-md overflow-hidden">
        {/* Apply changes button */}
        {changeCount > 0 && (
          <>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.9)' }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-app-accent-purple text-white transition-colors duration-300"
              onClick={() => setChangeCount(0)}
            >
              Apply {changeCount} changes
            </motion.button>
            
            <div className="w-px h-8 bg-app-border"></div>
          </>
        )}
        
        {/* Details button */}
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className="px-4 py-2 text-app-text-primary transition-colors duration-300"
        >
          Details
        </motion.button>
        
        <div className="w-px h-8 bg-app-border"></div>
        
        {/* Deploy button */}
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
        
        {/* Create deployment button */}
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className="px-4 py-2 text-app-text-primary transition-colors duration-300 flex items-center"
          onClick={onCreateDeployment}
        >
          <FiPlus className="mr-2" size={16} />
          Add
        </motion.button>
        
        <div className="w-px h-8 bg-app-border"></div>
        
        {/* Menu dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            className="px-3 py-2 text-app-text-secondary transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </motion.button>
          
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-app-card border border-app-border rounded-md shadow-lg z-10"
              >
                <div className="py-1">
                  <button 
                    className="flex items-center px-4 py-2 text-app-text-secondary hover:bg-app-background hover:text-app-text-primary w-full text-left"
                    onClick={onCreateDeployment}
                  >
                    <FiPlus className="mr-2" size={14} />
                    Add Deployment
                  </button>
                  <button className="flex items-center px-4 py-2 text-app-text-secondary hover:bg-app-background hover:text-app-text-primary w-full text-left">
                    <FiEdit2 className="mr-2" size={14} />
                    Edit Project
                  </button>
                  <button className="flex items-center px-4 py-2 text-app-text-secondary hover:bg-app-background hover:text-app-text-primary w-full text-left">
                    <FiSettings className="mr-2" size={14} />
                    Project Settings
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProjectActionButtons;