import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiList, FiPlus, FiFilter, FiStar, FiCalendar, FiClock, FiX } from 'react-icons/fi';
import { useCanvas } from '../context/CanvasContext';
import ProjectCard from '../components/canvas/ProjectCard';
import Header from '../components/Header';

export default function Home() {
  const { projects, addProject } = useCanvas();
  const [viewType, setViewType] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  // Create new project
  const handleCreateProject = () => {
    if (newProjectName.trim() === '') return;

    addProject({
      name: newProjectName,
      description: newProjectDescription,
    });

    setNewProjectName('');
    setNewProjectDescription('');
    setCreateModalOpen(false);
  };

  // Project entry animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Head>
        <title>dhanush's Projects - Canvas App</title>
        <meta name="description" content="Canvas App - Project Management" />
      </Head>

      <div className="min-h-screen bg-app-background text-app-text-primary">
        {/* Header */}
        <Header />

        {/* Main content */}
        <div className="container mx-auto pt-28 pb-16 px-4 md:px-6">
          {/* Project header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <h1 className="text-xl font-medium text-app-text-primary mb-2 sm:mb-0">
                Projects <span className="text-app-text-secondary text-sm font-normal">({projects.length})</span>
              </h1>

              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center text-app-text-secondary border border-app-border rounded-md px-3 py-1.5 hover:bg-app-card-hover transition-colors"
                >
                  <FiFilter className="mr-2" size={14} />
                  <span className="text-sm">Filter</span>
                </button>

                <div className="relative">
                  <button className="flex items-center text-app-text-secondary border border-app-border rounded-md px-3 py-1.5 hover:bg-app-card-hover transition-colors">
                    <FiClock className="mr-2" size={14} />
                    <span className="text-sm">Recent</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="bg-app-card border border-app-border rounded-md overflow-hidden flex">
                <button
                  className={`p-2 ${viewType === 'grid' ? 'bg-app-accent-purple text-white' : 'text-app-text-secondary'}`}
                  onClick={() => setViewType('grid')}
                  aria-label="Grid view"
                >
                  <FiGrid size={18} />
                </button>
                <button
                  className={`p-2 ${viewType === 'list' ? 'bg-app-accent-purple text-white' : 'text-app-text-secondary'}`}
                  onClick={() => setViewType('list')}
                  aria-label="List view"
                >
                  <FiList size={18} />
                </button>
              </div>
              <Link href={`/new-project`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}

                  className="bg-app-accent-purple text-white px-4 py-2 rounded-md flex items-center whitespace-nowrap"
                >
                  <FiPlus className="mr-2" size={18} />
                  <span>New Project</span>
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Filter bar - conditionally shown */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-app-card border border-app-border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-app-text-primary">Filter Projects</h3>
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="text-app-text-secondary hover:text-app-text-primary transition-colors"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-app-text-secondary text-sm mb-2">Status</label>
                      <select className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary">
                        <option value="all">All statuses</option>
                        <option value="active">Active</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-app-text-secondary text-sm mb-2">Created</label>
                      <select className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary">
                        <option value="all">Any time</option>
                        <option value="today">Today</option>
                        <option value="week">This week</option>
                        <option value="month">This month</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-app-text-secondary text-sm mb-2">Environment</label>
                      <select className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary">
                        <option value="all">All environments</option>
                        <option value="dev">Development</option>
                        <option value="staging">Staging</option>
                        <option value="prod">Production</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button className="text-app-text-secondary hover:text-app-text-primary transition-colors mr-3">
                      Reset filters
                    </button>
                    <button className="bg-app-accent-purple text-white px-3 py-1.5 rounded-md hover:bg-opacity-90 transition-colors">
                      Apply filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state when no projects */}
          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-app-card border border-app-border rounded-lg p-10 text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 bg-app-background rounded-full mb-4">
                <FiStar className="text-app-accent-purple" size={32} />
              </div>
              <h3 className="text-xl font-medium text-app-text-primary mb-2">No projects yet</h3>
              <p className="text-app-text-secondary mb-6 max-w-md mx-auto">
                Create your first project to get started. Projects help you organize your deployments and environments.
              </p>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="bg-app-accent-purple text-white px-4 py-2 rounded-md inline-flex items-center"
              >
                <FiPlus className="mr-2" />
                Create Project
              </button>
            </motion.div>
          ) : (
            /* Projects grid or list */
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className={`${viewType === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
                }`}
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      <AnimatePresence>
        {createModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-app-text-primary text-xl font-semibold">Create New Project</h3>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="text-app-text-secondary hover:text-app-text-primary transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="projectName" className="block text-app-text-secondary text-sm mb-1">Project Name</label>
                  <input
                    type="text"
                    id="projectName"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                    placeholder="E.g. E-commerce App"
                  />
                </div>
                <div>
                  <label htmlFor="projectDescription" className="block text-app-text-secondary text-sm mb-1">Description</label>
                  <textarea
                    id="projectDescription"
                    rows="3"
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
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
                  onClick={handleCreateProject}
                  disabled={!newProjectName.trim()}
                >
                  Create Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
