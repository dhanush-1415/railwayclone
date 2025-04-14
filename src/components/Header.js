import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { FiSearch, FiHelpCircle, FiBell, FiUser, FiPlus, FiLogOut, FiSettings, FiMoon } from 'react-icons/fi';
import { useCanvas } from '../context/CanvasContext';
import ThemeToggle from './ThemeToggle';

const Header = ({ projectView = false }) => {
  const router = useRouter();
  const { currentProject } = useCanvas();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Create project modal
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-app-card border-b border-app-border z-50">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo and navigation */}
        <div className="flex items-center h-full">
          <Link href="/" className="font-bold text-app-text-primary text-lg mr-8">
            Canvas<span className="text-app-accent-purple">App</span>
          </Link>
          
          {projectView && currentProject && (
            <div className="flex items-center h-full">
              <Link href="/" className="text-app-text-secondary h-full flex items-center border-b-2 border-transparent hover:text-app-text-primary transition-colors">
                Projects
              </Link>
              <span className="mx-2 text-app-text-secondary">/</span>
              <span className="text-app-text-primary border-b-2 border-app-accent-purple h-full flex items-center">
                {currentProject.name}
              </span>
            </div>
          )}
        </div>
        
        {/* Search */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects, deployments..."
              className="w-full bg-app-background border border-app-border rounded-md py-1.5 pl-9 pr-4 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-app-text-secondary" />
          </div>
        </div>
        
        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Create new button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center space-x-1 bg-app-accent-purple hover:bg-opacity-90 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
          >
            <FiPlus size={16} />
            <span className="hidden md:inline">New</span>
          </motion.button>
          
          {/* Theme toggle */}
          <ThemeToggle />
          
          {/* Help */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-app-text-secondary p-1.5 rounded-md hover:bg-app-background transition-colors duration-200"
          >
            <FiHelpCircle size={20} />
          </motion.button>
          
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-app-text-secondary p-1.5 rounded-md hover:bg-app-background transition-colors duration-200"
          >
            <FiBell size={20} />
          </motion.button>
          
          {/* Profile menu */}
          <div className="relative" ref={profileMenuRef}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="h-8 w-8 bg-app-accent-purple rounded-full flex items-center justify-center text-white cursor-pointer"
            >
              <FiUser size={16} />
            </motion.div>
            
            {/* Dropdown menu */}
            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-app-card border border-app-border rounded-md shadow-lg z-10"
                >
                  <div className="p-3 border-b border-app-border">
                    <p className="text-app-text-primary font-medium">dhanush</p>
                    <p className="text-app-text-secondary text-sm">dhanush@example.com</p>
                  </div>
                  
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-app-text-secondary rounded-md hover:bg-app-background hover:text-app-text-primary flex items-center">
                      <FiSettings className="mr-2" size={16} />
                      Account settings
                    </button>
                    <button className="w-full text-left px-3 py-2 text-app-text-secondary rounded-md hover:bg-app-background hover:text-app-text-primary flex items-center">
                      <FiLogOut className="mr-2" size={16} />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      <AnimatePresence>
        {createModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setCreateModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-app-card rounded-lg shadow-xl w-full max-w-md p-6"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-app-text-primary text-xl font-semibold mb-4">Create New Project</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="projectName" className="block text-app-text-secondary text-sm mb-1">Project Name</label>
                  <input 
                    type="text" 
                    id="projectName" 
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                    placeholder="E.g. E-commerce App"
                  />
                </div>
                <div>
                  <label htmlFor="projectDescription" className="block text-app-text-secondary text-sm mb-1">Description</label>
                  <textarea 
                    id="projectDescription" 
                    rows="3"
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                    placeholder="What is this project about?"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  className="px-4 py-2 text-app-text-secondary hover:text-app-text-primary transition-colors"
                  onClick={() => setCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-app-accent-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;