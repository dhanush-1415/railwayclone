import { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion } from 'framer-motion';
import { useCanvas } from '../../context/CanvasContext';

const DraggableCanvas = ({ children }) => {
  const { currentProject } = useCanvas();
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 4000, height: 3000 });
  
  // Auto-center the canvas on initial load
  useEffect(() => {
    // Initial centering of the canvas
    const timer = setTimeout(() => {
      const wrapperElement = document.querySelector('.react-transform-wrapper');
      if (wrapperElement) {
        wrapperElement.style.display = 'flex';
        wrapperElement.style.justifyContent = 'center';
        wrapperElement.style.alignItems = 'center';
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation settings
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Custom pan and zoom controls
  const zoomControls = ({ zoomIn, zoomOut, resetTransform }) => (
    <div className="absolute bottom-6 left-6 z-30">
      <div className="flex flex-col space-y-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => zoomIn(0.2)}
          className="w-10 h-10 bg-app-card border border-app-border text-app-text-primary rounded-md shadow-md hover:bg-app-card-hover transition-all duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => zoomOut(0.2)}
          className="w-10 h-10 bg-app-card border border-app-border text-app-text-primary rounded-md shadow-md hover:bg-app-card-hover transition-all duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => resetTransform()}
          className="w-10 h-10 bg-app-card border border-app-border text-app-text-primary rounded-md shadow-md hover:bg-app-card-hover transition-all duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="7"></circle>
            <line x1="12" y1="9" x2="12" y2="15"></line>
            <line x1="9" y1="12" x2="15" y2="12"></line>
          </svg>
        </motion.button>
      </div>
    </div>
  );

  return (
    <motion.div
      className="w-full h-full bg-app-background relative"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      ref={canvasRef}
    >    
      <TransformWrapper
        initialScale={0.7}
        minScale={0.3}
        maxScale={2}
        limitToBounds={false}
        centerOnInit={true}
        wheel={{ step: 0.05 }}
      >
        {(utils) => (
          <>
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
            >
              <div 
                className="w-full h-full" 
                style={{ 
                  width: canvasSize.width,
                  height: canvasSize.height,
                  backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)`,
                  backgroundSize: '25px 25px',
                  backgroundPosition: '0 0'
                }}
              >
                {/* Environment boxes */}
                {children}
              </div>
            </TransformComponent>
            
            {/* Custom controls */}
            {zoomControls(utils)}
          </>
        )}
      </TransformWrapper>
    </motion.div>
  );
};

export default DraggableCanvas;