import { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion } from 'framer-motion';
import { useCanvas } from '../../context/CanvasContext';

const DraggableCanvas = ({ children }) => {
  const { canvasPosition, canvasScale, updateCanvasPosition, updateCanvasScale } = useCanvas();
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef(null);

  // Handle transform change
  const handleTransformChange = (ref) => {
    if (ref && ref.instance) {
      const { x, y } = ref.instance.transformState;
      const scale = ref.instance.transformState.scale;
      
      updateCanvasPosition({ x, y });
      updateCanvasScale(scale);
    }
  };

  // Keep canvas centered initially
  useEffect(() => {
    if (canvasRef.current) {
      const centerX = (window.innerWidth - canvasRef.current.clientWidth) / 2;
      const centerY = (window.innerHeight - canvasRef.current.clientHeight) / 2;
      updateCanvasPosition({ x: centerX, y: centerY });
    }
  }, [updateCanvasPosition]);

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden bg-app-background">
      <TransformWrapper
        initialScale={canvasScale}
        initialPositionX={canvasPosition.x}
        initialPositionY={canvasPosition.y}
        minScale={0.5}
        maxScale={2}
        centerOnInit={true}
        onTransformed={handleTransformChange}
        onPanning={() => setIsDragging(true)}
        onPanningStop={() => setIsDragging(false)}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Canvas Controls */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => zoomIn(0.1)}
                className="bg-app-button-secondary text-app-text-primary p-2 rounded-md shadow-md hover:bg-app-card-hover transition-all duration-300"
                aria-label="Zoom in"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => zoomOut(0.1)}
                className="bg-app-button-secondary text-app-text-primary p-2 rounded-md shadow-md hover:bg-app-card-hover transition-all duration-300"
                aria-label="Zoom out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => resetTransform()}
                className="bg-app-button-secondary text-app-text-primary p-2 rounded-md shadow-md hover:bg-app-card-hover transition-all duration-300"
                aria-label="Reset view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-app-button-secondary text-app-text-primary p-2 rounded-md shadow-md hover:bg-app-card-hover transition-all duration-300"
                aria-label="Fullscreen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </motion.button>
            </div>
            
            <TransformComponent 
              wrapperClassName="!w-full !h-full"
              contentClassName="!w-full !h-full"
            >
              <div 
                ref={canvasRef}
                className={`w-[3000px] h-[2000px] relative transition-cursor duration-300 ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
              >
                {children}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default DraggableCanvas;