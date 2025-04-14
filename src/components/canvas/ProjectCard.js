import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiLink } from 'react-icons/fi';
import { useCanvas } from '../../context/CanvasContext';

const ProjectCard = ({ project }) => {
  const { selectProject } = useCanvas();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-app-card hover:bg-app-card-hover border border-app-border rounded-lg p-4 w-full max-w-xs shadow-canvas-card cursor-pointer"
      onClick={() => selectProject(project.id)}
    >
      <Link 
        href={`/project/${project.id}`}
        className="block"
      >
        <h3 className="text-lg font-medium text-app-text-primary mb-2">{project.name}</h3>
        
        {project.url && (
          <div className="flex items-center text-app-text-secondary text-sm mb-3">
            <FiLink className="mr-1" size={14} />
            <span>{project.url}</span>
          </div>
        )}
        
        <motion.div 
          className="mt-4 bg-app-button-primary text-white text-center py-2 rounded-md"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          View Project
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;