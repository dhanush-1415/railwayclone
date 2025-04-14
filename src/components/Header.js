import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FiSearch, FiHelpCircle, FiBell, FiUser } from 'react-icons/fi';
import { useCanvas } from '../context/CanvasContext';

const Header = ({ projectView = false }) => {
  const router = useRouter();
  const { currentProject } = useCanvas();
  const [searchQuery, setSearchQuery] = useState('');

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
              <Link href="/" className="text-app-text-secondary h-full flex items-center border-b-2 border-transparent">
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
              placeholder="Search..."
              className="w-full bg-app-background border border-app-border rounded-md py-1.5 pl-9 pr-4 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-app-text-secondary" />
          </div>
        </div>
        
        {/* Right section */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-app-text-secondary p-1.5 rounded-md hover:bg-app-background transition-colors duration-200"
          >
            <FiHelpCircle size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-app-text-secondary p-1.5 rounded-md hover:bg-app-background transition-colors duration-200"
          >
            <FiBell size={20} />
          </motion.button>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="h-8 w-8 bg-app-accent-purple rounded-full flex items-center justify-center text-white cursor-pointer"
          >
            <FiUser size={16} />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;