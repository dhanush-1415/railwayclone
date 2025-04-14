import { motion } from 'framer-motion';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { useCanvas } from '../../context/CanvasContext';

const EnvironmentSidebar = () => {
  const { environments, currentProject } = useCanvas();

  return (
    <div className="bg-app-card border-r border-app-border h-full w-64 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-app-text-secondary text-sm font-medium mb-4">Environments</h3>
        
        <div className="space-y-2">
          {environments.map((env) => (
            <motion.div
              key={env.id}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                env.id === 'dev' ? 'bg-app-accent-purple bg-opacity-10' : ''
              }`}
            >
              {env.id === 'dev' && <FiCheck className="mr-2 text-app-accent-purple" />}
              <span className={env.id === 'dev' ? 'text-app-text-primary' : 'text-app-text-secondary'}>
                {env.name}
              </span>
            </motion.div>
          ))}
          
          <motion.div
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            className="flex items-center p-2 rounded-md cursor-pointer text-app-accent-purple"
          >
            <FiPlus className="mr-2" />
            <span>New Environment</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentSidebar;