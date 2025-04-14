import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiGrid, FiList, FiPlus } from 'react-icons/fi';
import { useCanvas } from '../context/CanvasContext';
import ProjectCard from '../components/canvas/ProjectCard';
import Header from '../components/Header';

export default function Home() {
  const { projects } = useCanvas();
  const [viewType, setViewType] = useState('grid');

  return (
    <>
      <Head>
        <title>dhanush's Projects - Canvas App</title>
      </Head>

      <div className="min-h-screen bg-app-background text-app-text-primary">
        {/* Header */}
        <Header />

        {/* Main content */}
        <div className="container mx-auto pt-28 pb-16 px-4">
          {/* Project header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-medium text-app-text-primary">1 Project</h1>
              
              <div className="relative">
                <button className="flex items-center text-app-text-secondary border-b border-dashed border-app-text-secondary">
                  <span className="mr-2">Recent Activity</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="bg-app-card border border-app-border rounded-md overflow-hidden flex">
                <button 
                  className={`p-2 ${viewType === 'grid' ? 'bg-app-accent-purple text-white' : 'text-app-text-secondary'}`}
                  onClick={() => setViewType('grid')}
                >
                  <FiGrid size={18} />
                </button>
                <button 
                  className={`p-2 ${viewType === 'list' ? 'bg-app-accent-purple text-white' : 'text-app-text-secondary'}`}
                  onClick={() => setViewType('list')}
                >
                  <FiList size={18} />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-app-accent-purple text-white px-3 py-2 rounded-md flex items-center"
              >
                <FiPlus className="mr-2" />
                <span>New</span>
              </motion.button>
            </div>
          </div>

          {/* Projects grid */}
          <motion.div 
            className={`${viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
