import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiCheck, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';
import { useCanvas } from '../../context/CanvasContext';

const EnvironmentSidebar = ({ selectedEnvironment = 'dev', onSelectEnvironment }) => {
  const { environments, currentProject, addEnvironment } = useCanvas();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newEnvironmentName, setNewEnvironmentName] = useState('');
  const [newEnvironmentId, setNewEnvironmentId] = useState('');
  
  // Generate a color based on environment name
  const generateColor = (name) => {
    const colors = ['#9c5cff', '#f97316', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };
  
  // Handle environment creation
  const handleCreateEnvironment = () => {
    if (newEnvironmentName.trim() === '' || newEnvironmentId.trim() === '') return;
    
    addEnvironment({
      id: newEnvironmentId.toLowerCase(),
      name: newEnvironmentName,
      color: generateColor(newEnvironmentName)
    });
    
    setNewEnvironmentName('');
    setNewEnvironmentId('');
    setCreateModalOpen(false);
  };
  
  return (
    <div className="bg-app-card border-r border-app-border h-full w-64 overflow-y-auto flex flex-col">
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-app-text-secondary text-sm font-medium">Environments</h3>
          <button 
            onClick={() => setCreateModalOpen(true)}
            className="text-app-text-secondary hover:text-app-accent-purple transition-colors"
          >
            <FiPlus size={16} />
          </button>
        </div>
        
        <div className="space-y-2">
          {environments.map((env) => (
            <motion.div
              key={env.id}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              onClick={() => onSelectEnvironment ? onSelectEnvironment(env.id) : null}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer group ${
                env.id === selectedEnvironment ? 'bg-app-accent-purple bg-opacity-10' : ''
              }`}
            >
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: env.color }}
                />
                <span className={env.id === selectedEnvironment ? 'text-app-text-primary' : 'text-app-text-secondary'}>
                  {env.name}
                </span>
              </div>
              
              {/* Action buttons - only show on hover or for selected item */}
              <div className={`space-x-1 ${env.id === selectedEnvironment ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <button className="text-app-text-secondary hover:text-app-text-primary p-1">
                  <FiEdit2 size={14} />
                </button>
                {env.id !== 'dev' && (
                  <button className="text-app-text-secondary hover:text-red-500 p-1">
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Environment Details */}
      <div className="mt-auto p-4 border-t border-app-border">
        <div className="text-xs text-app-text-secondary space-y-2">
          <div className="flex justify-between">
            <span>Type:</span>
            <span className="text-app-text-primary">Production</span>
          </div>
          <div className="flex justify-between">
            <span>Region:</span>
            <span className="text-app-text-primary">US East</span>
          </div>
          <div className="flex justify-between">
            <span>Updated:</span>
            <span className="text-app-text-primary">2 hours ago</span>
          </div>
        </div>
      </div>
      
      {/* Create Environment Modal */}
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-app-text-primary text-xl font-semibold">New Environment</h3>
                <button 
                  onClick={() => setCreateModalOpen(false)}
                  className="text-app-text-secondary hover:text-app-text-primary transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="envName" className="block text-app-text-secondary text-sm mb-1">Environment Name</label>
                  <input 
                    type="text" 
                    id="envName" 
                    value={newEnvironmentName}
                    onChange={(e) => {
                      setNewEnvironmentName(e.target.value);
                      if (!newEnvironmentId) {
                        setNewEnvironmentId(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                      }
                    }}
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                    placeholder="E.g. Production"
                  />
                </div>
                <div>
                  <label htmlFor="envId" className="block text-app-text-secondary text-sm mb-1">Environment ID</label>
                  <input 
                    type="text" 
                    id="envId" 
                    value={newEnvironmentId}
                    onChange={(e) => setNewEnvironmentId(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                    placeholder="E.g. prod"
                  />
                  <p className="text-app-text-secondary text-xs mt-1">Used in URLs and API references.</p>
                </div>
                <div>
                  <label className="block text-app-text-secondary text-sm mb-3">Environment Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-app-background border border-app-accent-purple rounded-md p-3 flex items-start">
                      <input 
                        type="radio" 
                        id="typeDev" 
                        name="envType" 
                        className="mt-1 mr-2" 
                        defaultChecked 
                      />
                      <div>
                        <label htmlFor="typeDev" className="text-app-text-primary font-medium block">Development</label>
                        <span className="text-app-text-secondary text-xs">For testing and development.</span>
                      </div>
                    </div>
                    <div className="bg-app-background border border-app-border rounded-md p-3 flex items-start">
                      <input 
                        type="radio" 
                        id="typeProd" 
                        name="envType" 
                        className="mt-1 mr-2" 
                      />
                      <div>
                        <label htmlFor="typeProd" className="text-app-text-primary font-medium block">Production</label>
                        <span className="text-app-text-secondary text-xs">For live workloads.</span>
                      </div>
                    </div>
                  </div>
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
                  onClick={handleCreateEnvironment}
                  disabled={!newEnvironmentName || !newEnvironmentId}
                >
                  Create Environment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnvironmentSidebar;