import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiPlus, FiSettings, FiBell, FiChevronDown } from 'react-icons/fi';
import { useCanvas } from '../context/CanvasContext';

const Header = ({ projectView = false }) => {
  const { currentProject } = useCanvas();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-app-background border-b border-app-border h-16 z-30">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left side */}
        <div className="flex items-center">
          <Link href="/" className="text-app-text-primary mr-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 mr-2 text-app-text-primary" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              {projectView ? (
                <div className="flex items-center">
                  <span className="text-app-text-primary font-medium">
                    {currentProject?.name || 'perpetual-respect'}
                  </span>
                  <FiChevronDown className="ml-1 text-app-text-secondary" />
                </div>
              ) : (
                <span className="text-app-text-primary font-medium">dhanush's Projects</span>
              )}
            </motion.div>
          </Link>
          
          {projectView && (
            <div className="flex items-center space-x-6 text-app-text-secondary">
              <div className="relative">
                <span className="cursor-pointer hover:text-app-text-primary transition-colors font-medium">dev</span>
                <FiChevronDown className="inline-block ml-1" />
              </div>
              <Link href="#" className="text-app-text-secondary hover:text-app-text-primary transition-colors">
                Architecture
              </Link>
              <Link href="#" className="text-app-text-secondary hover:text-app-text-primary transition-colors">
                Observability
              </Link>
              <Link href="#" className="text-app-text-secondary hover:text-app-text-primary transition-colors">
                Logs
              </Link>
              <Link href="#" className="text-app-text-secondary hover:text-app-text-primary transition-colors">
                Settings
              </Link>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {!projectView ? (
            <>
              <Link href="#" className="text-app-text-secondary hover:text-app-text-primary transition-colors">
                Help
              </Link>
              <span className="text-app-text-secondary px-2 py-1 rounded-full bg-app-card">
                d
              </span>
            </>
          ) : (
            <>
              <span className="text-xs bg-app-badge-green text-app-badge-text-green px-2 py-0.5 rounded-full">
                TRIAL
              </span>
              <span className="text-app-text-secondary">$ 4.99</span>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-app-button-secondary text-app-text-primary px-3 py-1.5 rounded-md"
              >
                Share
              </motion.button>
              
              <span 
                className="text-app-text-secondary bg-app-card p-1.5 rounded-full cursor-pointer hover:text-app-text-primary transition-colors"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                d
              </span>
              
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-16 right-4 bg-app-card border border-app-border rounded-md shadow-lg z-50 w-64"
                >
                  <div className="p-4 border-b border-app-border">
                    <div className="flex items-center">
                      <span className="text-app-text-secondary bg-app-button-secondary p-2 rounded-full mr-3">d</span>
                      <div>
                        <p className="text-app-text-primary font-medium">dhanush</p>
                        <p className="text-app-text-secondary text-sm">Workspace Owner</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-app-card-hover text-app-text-secondary hover:text-app-text-primary transition-colors">
                      <FiSettings className="mr-3" />
                      <span>Account Settings</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-app-card-hover text-app-text-secondary hover:text-app-text-primary transition-colors">
                      <FiSettings className="mr-3" />
                      <span>Workspace Settings</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-app-card-hover text-app-text-secondary hover:text-app-text-primary transition-colors">
                      <FiSettings className="mr-3" />
                      <span>Project Usage</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
      
      {!projectView && (
        <div className="flex items-center justify-between h-10 px-4 border-t border-app-border">
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-xs bg-app-card text-app-text-secondary px-2 py-0.5 rounded-full">
              TRIAL
            </span>
            <span className="text-app-text-secondary">$ 4.99</span>
            <div className="text-app-text-secondary">
              512 MB of RAM, 1 GB of Disk, and 2 vCPU
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-app-accent-purple text-white px-3 py-1 rounded-md text-sm"
          >
            Choose a Plan
          </motion.button>
        </div>
      )}
    </header>
  );
};

export default Header;