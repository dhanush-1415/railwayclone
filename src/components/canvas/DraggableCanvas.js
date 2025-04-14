import { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'framer-motion';
import { useCanvas } from '../../context/CanvasContext';

const DraggableCanvas = ({ children }) => {
  const { currentProject } = useCanvas();
  const canvasRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Animation settings
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    // Mark as initialized after initial render
    setIsInitialized(true);
  }, []);

  // Custom pan and zoom controls with better styling
  const zoomControls = ({ zoomIn, zoomOut, resetTransform }) => (
    <div className="absolute bottom-8 right-8 z-40">
      <div className="flex flex-col space-y-3">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => zoomIn(0.2)}
          className="w-12 h-12 bg-app-card border border-app-border text-app-text-primary rounded-md shadow-lg hover:border-app-accent-purple transition-all duration-200 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => zoomOut(0.2)}
          className="w-12 h-12 bg-app-card border border-app-border text-app-text-primary rounded-md shadow-lg hover:border-app-accent-purple transition-all duration-200 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => resetTransform()}
          className="w-12 h-12 bg-app-card border border-app-border text-app-text-primary rounded-md shadow-lg hover:border-app-accent-purple transition-all duration-200 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="7"></circle>
            <line x1="12" y1="9" x2="12" y2="15"></line>
            <line x1="9" y1="12" x2="15" y2="12"></line>
          </svg>
        </motion.button>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        className="w-full h-full bg-app-background relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        ref={canvasRef}
      >
        {/* Better canvas background pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-70" 
          style={{
            backgroundSize: '50px 50px',
            backgroundImage: `
              radial-gradient(circle, rgba(255, 255, 255, 0.09) 1px, transparent 1px)
            `,
            backgroundPosition: '0 0',
          }}
        />
      
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          minScale={0.4}
          maxScale={3}
          limitToBounds={false}
          centerOnInit={true}
          centerZoomedOut={false}
          wheel={{ step: 0.08 }}
          smooth={true}
          pinch={{ step: 5 }}
        >
          {(utils) => (
            <>
              <TransformComponent 
                wrapperClass="w-full h-full" 
                contentClass="w-full h-full"
                wrapperStyle={{ transition: 'all 0.2s ease-out' }}
              >
                <div className="canvas-grid w-[4000px] h-[3000px] relative">
                  {/* Environment cards and other elements */}
                  {children}
                </div>
              </TransformComponent>
              
              {/* Custom controls with better positioning */}
              {zoomControls(utils)}
            </>
          )}
        </TransformWrapper>
      </motion.div>
    </AnimatePresence>
  );
};

export default DraggableCanvas;