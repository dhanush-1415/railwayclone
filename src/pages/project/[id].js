// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiPlus, FiMoreVertical, FiTrash2, FiX } from 'react-icons/fi';
// import DraggableCanvas from '../../components/canvas/DraggableCanvas';
// import Header from '../../components/Header';
// import DeploymentCard from '../../components/canvas/DeploymentCard';
// import EnvironmentSidebar from '../../components/canvas/EnvironmentSidebar';
// import CanvasToolbar from '../../components/canvas/CanvasToolbar';
// import ProjectActionButtons from '../../components/canvas/ProjectActionButtons';
// import { useCanvas } from '../../context/CanvasContext';

// export default function ProjectDetail() {
//   const router = useRouter();
//   const { id } = router.query;
//   const { deployments, selectProject, currentProject, environments, addDeployment, addEnvironment } = useCanvas();
//   const [selectedEnvironmentId, setSelectedEnvironmentId] = useState('dev');
//   const [deployModalOpen, setDeployModalOpen] = useState(false);
//   const [newDeploymentName, setNewDeploymentName] = useState('');
//   const [newDeploymentTechnology, setNewDeploymentTechnology] = useState('Node.js');

//   // Select current project when ID changes
//   useEffect(() => {
//     if (id) {
//       selectProject(id);
//     }
//   }, [id, selectProject]);

//   // Get all environments for this project
//   const projectEnvironments = environments.map(env => {
//     // Create a deployment-like object for each environment
//     return {
//       id: env.id,
//       name: env.name,
//       environmentId: env.id,
//       projectId: id,
//       status: 'running'
//     };
//   });

//   // Handle adding new environment (creating a deployment is now creating an environment)
//   const handleAddDeployment = () => {
//     if (newDeploymentName.trim() === '') return;

//     // First add the environment
//     addEnvironment({
//       id: newDeploymentName.toLowerCase().replace(/\s+/g, '-'),
//       name: newDeploymentName,
//       color: '#9c5cff'
//     });

//     setNewDeploymentName('');
//     setDeployModalOpen(false);
//   };

//   // Environment box positions - explicitly position each environment
//   const getDeploymentPosition = (index, total) => {
//     // Center of the canvas (using the larger canvas dimensions - see DraggableCanvas)
//     const centerX = 2000; // Center of 4000px canvas
//     const centerY = 1500; // Center of 3000px canvas

//     // If only one environment, place it in the center
//     if (total <= 1) {
//       return { x: centerX, y: centerY };
//     }

//     // For multiple environments, arrange in a horizontal line with spacing
//     const boxWidth = 250; // width + margin between boxes
//     const totalWidth = (total - 1) * boxWidth;
//     const startX = centerX - (totalWidth / 2);

//     return {
//       x: startX + (index * boxWidth),
//       y: centerY
//     };
//   };

//   // If project not found or not loaded yet
//   if (!currentProject) {
//     return (
//       <div className="flex flex-col h-screen items-center justify-center bg-app-background text-app-text-primary">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center"
//         >
//           <div className="mb-4 text-app-text-secondary">
//             <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h1 className="text-xl font-semibold mb-2">Project not found</h1>
//           <p className="text-app-text-secondary mb-6">The project you're looking for doesn't exist or is still loading.</p>
//           <button 
//             onClick={() => router.push('/')}
//             className="bg-app-accent-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
//           >
//             Go back to projects
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>{currentProject?.name || 'Project Detail'} - Canvas App</title>
//         <meta name="description" content={`Details for ${currentProject?.name} - Canvas App`} />
//       </Head>

//       <div className="flex flex-col h-screen bg-app-background text-app-text-primary">
//         {/* Header */}
//         <Header projectView={true} />

//         {/* Main content */}
//         <div className="flex flex-1  relative">
//           {/* Environment sidebar */}
//           {/* <EnvironmentSidebar 
//             selectedEnvironment={selectedEnvironmentId} 
//             onSelectEnvironment={setSelectedEnvironmentId} 
//           /> */}

//           {/* Canvas - Full width and height */}
//           <div className="flex-1 relative overflow-hidden">
//             <DraggableCanvas>
//               {/* Environment boxes */}
//               {projectEnvironments.map((env, index) => (
//                 <DeploymentCard
//                   key={env.id}
//                   deployment={env}
//                   position={getDeploymentPosition(index, projectEnvironments.length)}
//                 />
//               ))}
//             </DraggableCanvas>

//             {/* Empty state when no environments */}
//             {projectEnvironments.length === 0 && (
//               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                 <motion.div 
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="bg-app-card border border-app-border rounded-lg p-8 max-w-md text-center pointer-events-auto"
//                 >
//                   <div className="inline-flex items-center justify-center h-14 w-14 bg-app-background rounded-full mb-4">
//                     <FiPlus className="text-app-accent-purple" size={26} />
//                   </div>
//                   <h3 className="text-xl font-medium text-app-text-primary mb-2">No environments</h3>
//                   <p className="text-app-text-secondary mb-6">
//                     Get started by creating your first environment for this project.
//                   </p>
//                   <button 
//                     onClick={() => setDeployModalOpen(true)}
//                     className="bg-app-accent-purple text-white px-4 py-2 rounded-md inline-flex items-center"
//                   >
//                     <FiPlus className="mr-2" />
//                     Create Environment
//                   </button>
//                 </motion.div>
//               </div>
//             )}

//             {/* Footer Info */}
//             <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-app-background border-t border-app-border text-app-text-secondary text-sm flex justify-between items-center">
//               <div className="flex items-center">
//                 <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
//                 <span>All systems operational</span>
//               </div>
//               <div className="flex items-center">
//                 <button className="flex items-center hover:text-app-text-primary transition-colors">
//                   <span className="mr-2">Activity Log</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <polyline points="18 15 12 9 6 15"></polyline>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action buttons */}
//         <ProjectActionButtons 
//           onCreateDeployment={() => setDeployModalOpen(true)}
//         />

//         {/* Toolbar */}
//         <CanvasToolbar />
//       </div>

//       {/* Create Deployment Modal */}
//       <AnimatePresence>
//         {deployModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//             onClick={() => setDeployModalOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", duration: 0.5 }}
//               className="bg-app-card rounded-lg shadow-xl w-full max-w-md p-6"
//               onClick={e => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-app-text-primary text-xl font-semibold">New Environment</h3>
//                 <button 
//                   onClick={() => setDeployModalOpen(false)}
//                   className="text-app-text-secondary hover:text-app-text-primary transition-colors"
//                 >
//                   <FiX size={20} />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="environmentName" className="block text-app-text-secondary text-sm mb-1">Environment Name</label>
//                   <input 
//                     type="text" 
//                     id="environmentName"
//                     value={newDeploymentName}
//                     onChange={(e) => setNewDeploymentName(e.target.value)}
//                     className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
//                     placeholder="E.g. Production"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="environmentType" className="block text-app-text-secondary text-sm mb-1">Environment Type</label>
//                   <select 
//                     id="environmentType"
//                     value={newDeploymentTechnology}
//                     onChange={(e) => setNewDeploymentTechnology(e.target.value)}
//                     className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
//                   >
//                     <option value="Node.js">Development</option>
//                     <option value="PostgreSQL">Staging</option>
//                     <option value="React">Production</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label htmlFor="environmentRegion" className="block text-app-text-secondary text-sm mb-1">Region</label>
//                   <select 
//                     id="environmentRegion"
//                     className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
//                   >
//                     <option value="us-east">US East</option>
//                     <option value="us-west">US West</option>
//                     <option value="eu-central">EU Central</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-3 mt-6">
//                 <button 
//                   className="px-4 py-2 text-app-text-secondary hover:text-app-text-primary transition-colors"
//                   onClick={() => setDeployModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="px-4 py-2 bg-app-accent-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
//                   onClick={handleAddDeployment}
//                   disabled={!newDeploymentName.trim()}
//                 >
//                   Create Environment
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
















































// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiPlus, FiX } from 'react-icons/fi';
// import DraggableCanvas from '../../components/canvas/DraggableCanvas';
// import Header from '../../components/Header';
// import DeploymentCard from '../../components/canvas/DeploymentCard';
// import CanvasToolbar from '../../components/canvas/CanvasToolbar';
// import ProjectActionButtons from '../../components/canvas/ProjectActionButtons';
// import { useCanvas } from '../../context/CanvasContext';

// export default function ProjectDetail() {
//   const router = useRouter();
//   const { id } = router.query;
//   const { deployments, selectProject, currentProject, environments, addDeployment, addEnvironment } = useCanvas();
//   const [deployModalOpen, setDeployModalOpen] = useState(false);
//   const [newDeploymentName, setNewDeploymentName] = useState('');

// useEffect(() => {
//   if (id) {
//     selectProject(id);

//     if (environments.length === 0) {
//       addEnvironment({
//         id: 'default-dev',
//         name: 'Development',
//         color: '#9c5cff'
//       });
//     }
//   }
// }, [id, selectProject, environments.length, addEnvironment]);

// const handleAddDeployment = () => {
//   if (newDeploymentName.trim() === '') return;

//   addEnvironment({
//     id: newDeploymentName.toLowerCase().replace(/\s+/g, '-'),
//     name: newDeploymentName,
//     color: '#9c5cff'
//   });

//   setNewDeploymentName('');
//   setDeployModalOpen(false);
// };

//   const projectEnvironments = environments.map(env => ({
//     id: env.id,
//     name: env.name,
//     environmentId: env.id,
//     projectId: id,
//     status: 'running'
//   }));

// if (!currentProject) {
//   return (
//     <div className="flex flex-col h-screen items-center justify-center bg-app-background text-app-text-primary">
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
//         <div className="mb-4 text-app-text-secondary">
//           <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>
//         <h1 className="text-xl font-semibold mb-2">Project not found</h1>
//         <p className="text-app-text-secondary mb-6">The project you're looking for doesn't exist or is still loading.</p>
//         <button
//           onClick={() => router.push('/')}
//           className="bg-app-accent-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
//         >
//           Go back to projects
//         </button>
//       </motion.div>
//     </div>
//   );
// }

//   return (
//     <>
// <Head>
//   <title>{currentProject?.name || 'Project Detail'} - Canvas App</title>
//   <meta name="description" content={`Details for ${currentProject?.name} - Canvas App`} />
// </Head>

//       <div className="flex flex-col h-screen bg-app-background text-app-text-primary overflow-hidden">
//         <Header projectView={true} />

//         <div className="flex-1 relative">
//           <DraggableCanvas>
//             {projectEnvironments.map((env) => (
//               <DeploymentCard
//                 key={env.id}
//                 deployment={env}
//               />
//             ))}
//           </DraggableCanvas>

//           {projectEnvironments.length === 0 && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-app-card border border-app-border rounded-lg p-8 max-w-md text-center pointer-events-auto"
//               >
//                 <div className="inline-flex items-center justify-center h-14 w-14 bg-app-background rounded-full mb-4">
//                   <FiPlus className="text-app-accent-purple" size={26} />
//                 </div>
//                 <h3 className="text-xl font-medium text-app-text-primary mb-2">No environments</h3>
//                 <p className="text-app-text-secondary mb-6">
//                   Get started by creating your first environment for this project.
//                 </p>
//                 <button
//                   onClick={() => setDeployModalOpen(true)}
//                   className="bg-app-accent-purple text-white px-4 py-2 rounded-md inline-flex items-center"
//                 >
//                   <FiPlus className="mr-2" />
//                   Create Environment
//                 </button>
//               </motion.div>
//             </div>
//           )}
//         </div>

// <ProjectActionButtons onCreateDeployment={() => setDeployModalOpen(true)} />
// <CanvasToolbar />
//       </div>

//       <AnimatePresence>
//         {deployModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//             onClick={() => setDeployModalOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", duration: 0.5 }}
//               className="bg-app-card rounded-lg shadow-xl w-full max-w-md p-6"
//               onClick={e => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-app-text-primary text-xl font-semibold">New Environment</h3>
//                 <button
//                   onClick={() => setDeployModalOpen(false)}
//                   className="text-app-text-secondary hover:text-app-text-primary transition-colors"
//                 >
//                   <FiX size={20} />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="environmentName" className="block text-app-text-secondary text-sm mb-1">Environment Name</label>
//                   <input
//                     type="text"
//                     id="environmentName"
//                     value={newDeploymentName}
//                     onChange={(e) => setNewDeploymentName(e.target.value)}
//                     className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
//                     placeholder="E.g. Production"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   className="px-4 py-2 text-app-text-secondary hover:text-app-text-primary transition-colors"
//                   onClick={() => setDeployModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-app-accent-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
//                   onClick={handleAddDeployment}
//                   disabled={!newDeploymentName.trim()}
//                 >
//                   Create Environment
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }





































// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FiPlus,
//   FiMinus,
//   FiX,
//   FiMaximize2,
//   FiMinimize2,
//   FiRotateCw,
//   FiRotateCcw,
//   FiGrid
// } from 'react-icons/fi'; import DraggableCanvas from '../../components/canvas/DraggableCanvas';
// import Header from '../../components/Header';
// import DeploymentCard from '../../components/canvas/DeploymentCard';
// import CanvasToolbar from '../../components/canvas/CanvasToolbar';
// import ProjectActionButtons from '../../components/canvas/ProjectActionButtons';
// import { useCanvas } from '../../context/CanvasContext';


// const InteractiveCanvas = () => {

//   const router = useRouter();
//   const { id } = router.query;
//   const { deployments, selectProject, currentProject, environments, addDeployment, addEnvironment } = useCanvas();
//   const [deployModalOpen, setDeployModalOpen] = useState(false);
//   const [newDeploymentName, setNewDeploymentName] = useState('');

//   console.log(deployments, currentProject, environments, "oooooooooooooooooooo")

//   useEffect(() => {
//     if (id) {
//       selectProject(id);

//       if (environments.length === 0) {
//         addEnvironment({
//           id: 'default-dev',
//           name: 'Development',
//           color: '#9c5cff'
//         });
//       }
//     }
//   }, [id, selectProject, environments.length, addEnvironment]);

//   const projectEnvironments = environments.map(env => ({
//     id: env.id,
//     name: env.name,
//     environmentId: env.id,
//     projectId: id,
//     status: 'running'
//   }));

//   const handleAddDeployment = () => {
//     if (newDeploymentName.trim() === '') return;

//     addEnvironment({
//       id: newDeploymentName.toLowerCase().replace(/\s+/g, '-'),
//       name: newDeploymentName,
//       color: '#9c5cff'
//     });

//     setNewDeploymentName('');
//     setDeployModalOpen(false);
//   };

//   // Configuration constants
//   const CANVAS_SIZE = 10000;
//   const BOX_SIZE = 100;
//   const VIEWPORT_SIZE = 800;
//   const MIN_SCALE = 0.2;
//   const MAX_SCALE = 4;
//   const ZOOM_STEP = 0.2;
//   const DOT_SPACING = 20;

//   // State management
//   const [scale, setScale] = useState(1);
//   const [boxPosition, setBoxPosition] = useState({
//     x: CANVAS_SIZE / 2 - BOX_SIZE / 2,
//     y: CANVAS_SIZE / 2 - BOX_SIZE / 2
//   });
//   const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });
//   const [dragState, setDragState] = useState({
//     type: null,
//     startPos: { x: 0, y: 0 }
//   });

//   // Refs
//   const containerRef = useRef(null);
//   const boxRef = useRef(null);

//   // Handle zoom with strict boundaries
//   const handleZoom = (direction) => {
//     setScale(prev => {
//       const newScale = direction === 'in'
//         ? prev + ZOOM_STEP
//         : prev - ZOOM_STEP;
//       return Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
//     });
//   };

//   // Mouse down handler - determine drag type
//   const handleMouseDown = (e) => {
//     if (e.target === boxRef.current) {
//       setDragState({
//         type: 'box',
//         startPos: { x: e.clientX, y: e.clientY }
//       });
//     } else {
//       setDragState({
//         type: 'canvas',
//         startPos: {
//           x: e.clientX - viewOffset.x,
//           y: e.clientY - viewOffset.y
//         }
//       });
//       if (containerRef.current) {
//         containerRef.current.style.cursor = 'grabbing';
//       }
//     }
//   };

//   const IconButton = ({ icon: Icon, tooltip, onClick, disabled = false }) => (
//     <div className="relative group">
//       <button
//         onClick={onClick}
//         disabled={disabled}
//         className="p-2 rounded hover:bg-app-card-hover transition-colors disabled:opacity-30"
//       >
//         <Icon size={20} />
//       </button>
//       <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-app-card text-app-text-secondary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
//         {tooltip}
//       </span>
//     </div>
//   );

//   // Mouse move handler - handle both drag types
//   const handleMouseMove = (e) => {
//     if (!dragState.type) return;

//     if (dragState.type === 'box') {
//       // Calculate new box position
//       if (!containerRef.current) return;

//       const rect = containerRef.current.getBoundingClientRect();
//       const containerCenterX = rect.width / 2;
//       const containerCenterY = rect.height / 2;

//       const relativeX = (e.clientX - rect.left - containerCenterX - viewOffset.x) / scale;
//       const relativeY = (e.clientY - rect.top - containerCenterY - viewOffset.y) / scale;

//       setBoxPosition({
//         x: Math.max(0, Math.min(CANVAS_SIZE - BOX_SIZE, relativeX + CANVAS_SIZE / 2 - BOX_SIZE / 2)),
//         y: Math.max(0, Math.min(CANVAS_SIZE - BOX_SIZE, relativeY + CANVAS_SIZE / 2 - BOX_SIZE / 2))
//       });
//     } else {
//       // Calculate new view offset with boundaries
//       const newOffset = {
//         x: e.clientX - dragState.startPos.x,
//         y: e.clientY - dragState.startPos.y
//       };

//       const maxOffsetX = (CANVAS_SIZE * scale - VIEWPORT_SIZE) / 2;
//       const maxOffsetY = (CANVAS_SIZE * scale - VIEWPORT_SIZE) / 2;

//       setViewOffset({
//         x: Math.max(-maxOffsetX, Math.min(maxOffsetX, newOffset.x)),
//         y: Math.max(-maxOffsetY, Math.min(maxOffsetY, newOffset.y))
//       });
//     }
//   };

//   // Clean up drag state
//   const handleMouseUp = () => {
//     setDragState({ type: null, startPos: { x: 0, y: 0 } });
//     if (containerRef.current) {
//       containerRef.current.style.cursor = 'grab';
//     }
//   };

//   // Reset to initial state
//   const resetView = () => {
//     setScale(1);
//     setViewOffset({ x: 0, y: 0 });
//     setBoxPosition({
//       x: CANVAS_SIZE / 2 - BOX_SIZE / 2,
//       y: CANVAS_SIZE / 2 - BOX_SIZE / 2
//     });
//   };

//   // Add wheel-based zoom
//   useEffect(() => {
//     const handleWheel = (e) => {
//       e.preventDefault();
//       handleZoom(e.deltaY < 0 ? 'in' : 'out');
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('wheel', handleWheel, { passive: false });
//       return () => container.removeEventListener('wheel', handleWheel);
//     }
//   }, []);


//   if (!currentProject) {
//     return (
//       <div className="flex flex-col h-screen items-center justify-center bg-app-background text-app-text-primary">
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
//           <div className="mb-4 text-app-text-secondary">
//             <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h1 className="text-xl font-semibold mb-2">Project not found</h1>
//           <p className="text-app-text-secondary mb-6">The project you're looking for doesn't exist or is still loading.</p>
//           <button
//             onClick={() => router.push('/')}
//             className="bg-app-accent-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
//           >
//             Go back to projects
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>{currentProject?.name || 'Project Detail'} - Canvas App</title>
//         <meta name="description" content={`Details for ${currentProject?.name} - Canvas App`} />
//       </Head>

//       <div className="relative w-full h-screen overflow-hidden bg-gray-100">
//         {/* Control Panel */}
//         <Header projectView={true} />

//         <div className="absolute top-44 border border-app-border left-4 z-10 bg-app-card p-2 rounded-xl shadow-lg flex flex-col items-center gap-4 text-app-text-primary">
//           <IconButton icon={FiGrid} tooltip="Menu" />

//           <div className="flex flex-col items-center gap-2">
//             <IconButton
//               icon={FiPlus}
//               tooltip="Zoom In"
//               onClick={() => handleZoom('in')}
//               disabled={scale >= MAX_SCALE}
//             />
//             <IconButton
//               icon={FiMinus}
//               tooltip="Zoom Out"
//               onClick={() => handleZoom('out')}
//               disabled={scale <= MIN_SCALE}
//             />
//             <IconButton
//               icon={FiMaximize2}
//               tooltip="Reset View"
//               onClick={resetView}
//             />
//           </div>

//           <div className="flex flex-col items-center gap-2">
//             <IconButton icon={FiRotateCw} tooltip="Rotate CW" />
//             <IconButton icon={FiRotateCcw} tooltip="Rotate CCW" />
//           </div>
//         </div>

//         {/* Interactive Canvas Area */}
//         {projectEnvironments.length === 0 && (
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-app-card border border-app-border rounded-lg p-8 max-w-md text-center pointer-events-auto"
//             >
//               <div className="inline-flex items-center justify-center h-14 w-14 bg-app-background rounded-full mb-4">
//                 <FiPlus className="text-app-accent-purple" size={26} />
//               </div>
//               <h3 className="text-xl font-medium text-app-text-primary mb-2">No environments</h3>
//               <p className="text-app-text-secondary mb-6">
//                 Get started by creating your first environment for this project.
//               </p>
//               <button
//                 onClick={() => setDeployModalOpen(true)}
//                 className="bg-app-accent-purple text-white px-4 py-2 rounded-md inline-flex items-center"
//               >
//                 <FiPlus className="mr-2" />
//                 Create Environment
//               </button>
//             </motion.div>
//           </div>
//         )}

//         {/* <ProjectActionButtons onCreateDeployment={() => setDeployModalOpen(true)} /> */}
//         <CanvasToolbar setDeployModalOpen={setDeployModalOpen} />

//         <AnimatePresence>
//           {deployModalOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//               onClick={() => setDeployModalOpen(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ type: "spring", duration: 0.5 }}
//                 className="bg-app-card rounded-lg shadow-xl w-full max-w-md p-6"
//                 onClick={e => e.stopPropagation()}
//               >
//                 <motion.div className="flex justify-between items-center mb-4">
//                   <h3 className="text-app-text-primary text-xl font-semibold">New Environment</h3>
//                   <button
//                     onClick={() => setDeployModalOpen(false)}
//                     className="text-app-text-secondary hover:text-app-text-primary transition-colors"
//                   >
//                     <FiX size={20} />
//                   </button>
//                 </motion.div>

//                 <motion.div className="space-y-4">
//                   <div>
//                     <label htmlFor="environmentName" className="block text-app-text-secondary text-sm mb-1">Environment Name</label>
//                     <input
//                       type="text"
//                       id="environmentName"
//                       value={newDeploymentName}
//                       onChange={(e) => setNewDeploymentName(e.target.value)}
//                       className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
//                       placeholder="E.g. Production"
//                     />
//                   </div>
//                 </motion.div>
//                 <motion.div className="flex justify-end space-x-3 mt-6">
//                   <button
//                     className="px-4 py-2 text-app-text-secondary hover:text-app-text-primary transition-colors"
//                     onClick={() => setDeployModalOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-app-accent-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
//                     onClick={handleAddDeployment}
//                     disabled={!newDeploymentName.trim()}
//                   >
//                     Create Environment
//                   </button>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <motion.div
//           ref={containerRef}
//           className="w-full h-full cursor-grab"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//         >
//           {/* Dotted Background */}
//           <motion.div
//             className="relative bg-app-card"
//             style={{
//               width: `${CANVAS_SIZE}px`,
//               height: `${CANVAS_SIZE}px`,
//               transform: `translate(${viewOffset.x}px, ${viewOffset.y}px) scale(${scale})`,
//               transformOrigin: 'center center',
//               backgroundImage: `
//               radial-gradient(circle at 1px 1px, #999 1px, transparent 0),
//               radial-gradient(circle at 1px 1px, #999 1px, transparent 0)
//             `,
//               backgroundSize: `${DOT_SPACING}px ${DOT_SPACING}px`,
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               marginLeft: `-${CANVAS_SIZE / 2}px`,
//               marginTop: `-${CANVAS_SIZE / 2}px`,
//             }}
//           >
//             {/* Draggable Box */}

//             {environments?.map((item, index) => (
//               <motion.div
//                 key={item.id} // Don't forget to add a unique key
//                 ref={boxRef}
//                 className="absolute bg-red-500/70 border-2 border-yellow-700 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-red-600/80 transition-colors"
//                 style={{
//                   width: `${BOX_SIZE}px`,
//                   height: `${BOX_SIZE}px`,
//                   left: `${boxPosition.x + (index * (BOX_SIZE + 10))}px`, // Add spacing between boxes
//                   top: `${boxPosition.y}px`,
//                   backgroundColor: item.color, // Use the environment's color
//                 }}
//               >
//                 {item.name} {/* Display the environment name */}
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default InteractiveCanvas;































// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FiPlus,
//   FiMinus,
//   FiX,
//   FiMaximize2,
//   FiRotateCw,
//   FiRotateCcw,
//   FiGrid
// } from 'react-icons/fi';
// import { useCanvas } from '../../context/CanvasContext';

// const InteractiveCanvas = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { selectProject, currentProject, environments, addEnvironment } = useCanvas();
//   const [deployModalOpen, setDeployModalOpen] = useState(false);
//   const [newDeploymentName, setNewDeploymentName] = useState('');

//   // Configuration constants
//   const CANVAS_SIZE = 10000;
//   const BOX_SIZE = 200;
//   const VIEWPORT_SIZE = 800;
//   const MIN_SCALE = 0.2;
//   const MAX_SCALE = 4;
//   const ZOOM_STEP = 0.2;
//   const DOT_SPACING = 20;

//   // State management
//   const [scale, setScale] = useState(1);
//   const [boxPositions, setBoxPositions] = useState({});
//   const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });
//   const [dragState, setDragState] = useState({
//     type: null,
//     startPos: { x: 0, y: 0 },
//     envId: null,
//     boxStartPos: { x: 0, y: 0 }
//   });

//   // Refs
//   const containerRef = useRef(null);

//   // Initialize positions when environments change
//   useEffect(() => {
//     if (environments.length > 0) {
//       const initialPositions = {};
//       environments.forEach((env, index) => {
//         if (!boxPositions[env.id]) {
//           initialPositions[env.id] = {
//             x: CANVAS_SIZE / 2 - BOX_SIZE / 2 + (index * (BOX_SIZE + 50)),
//             y: CANVAS_SIZE / 2 - BOX_SIZE / 2
//           };
//         }
//       });
//       if (Object.keys(initialPositions).length > 0) {
//         setBoxPositions(prev => ({ ...prev, ...initialPositions }));
//       }
//     }
//   }, [environments]);

//   useEffect(() => {
//     if (id) {
//       selectProject(id);
      
//       if (environments.length === 0) {
//         addEnvironment({
//           id: 'default-dev',
//           name: 'Development',
//           color: '#9c5cff'
//         });
//       }
//     }
//   }, [id, selectProject, environments.length, addEnvironment]);

//   const handleAddDeployment = () => {
//     if (newDeploymentName.trim() === '') return;

//     const newEnv = {
//       id: `env-${Date.now()}`,
//       name: newDeploymentName,
//       color: `#${Math.floor(Math.random()*16777215).toString(16)}`
//     };

//     addEnvironment(newEnv);

//     setBoxPositions(prev => ({
//       ...prev,
//       [newEnv.id]: {
//         x: CANVAS_SIZE / 2 - BOX_SIZE / 2 + (Object.keys(prev).length * (BOX_SIZE + 50)),
//         y: CANVAS_SIZE / 2 - BOX_SIZE / 2
//       }
//     }));

//     setNewDeploymentName('');
//     setDeployModalOpen(false);
//   };

//   // Handle zoom with boundaries
//   const handleZoom = (direction) => {
//     setScale(prev => {
//       const newScale = direction === 'in' 
//         ? Math.min(MAX_SCALE, prev + ZOOM_STEP)
//         : Math.max(MIN_SCALE, prev - ZOOM_STEP);
//       return newScale;
//     });
//   };

//   // Mouse down handler
//   const handleMouseDown = (e, envId = null) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (envId && boxPositions[envId]) {
//       setDragState({
//         type: 'box',
//         startPos: { x: e.clientX, y: e.clientY },
//         envId: envId,
//         boxStartPos: { ...boxPositions[envId] }
//       });
//     } else {
//       setDragState({
//         type: 'canvas',
//         startPos: { x: e.clientX, y: e.clientY },
//         currentOffset: { ...viewOffset }
//       });
//       if (containerRef.current) {
//         containerRef.current.style.cursor = 'grabbing';
//       }
//     }
//   };

//   // Mouse move handler
//   const handleMouseMove = (e) => {
//     if (!dragState.type) return;

//     if (dragState.type === 'box' && dragState.envId) {
//       const deltaX = (e.clientX - dragState.startPos.x) / scale;
//       const deltaY = (e.clientY - dragState.startPos.y) / scale;

//       setBoxPositions(prev => ({
//         ...prev,
//         [dragState.envId]: {
//           x: Math.max(0, Math.min(CANVAS_SIZE - BOX_SIZE, dragState.boxStartPos.x + deltaX)),
//           y: Math.max(0, Math.min(CANVAS_SIZE - BOX_SIZE, dragState.boxStartPos.y + deltaY))
//         }
//       }));
//     } else if (dragState.type === 'canvas') {
//       const deltaX = e.clientX - dragState.startPos.x;
//       const deltaY = e.clientY - dragState.startPos.y;

//       setViewOffset({
//         x: dragState.currentOffset.x + deltaX,
//         y: dragState.currentOffset.y + deltaY
//       });
//     }
//   };

//   // Clean up drag state
//   const handleMouseUp = () => {
//     setDragState({ type: null, startPos: { x: 0, y: 0 }, envId: null, boxStartPos: { x: 0, y: 0 } });
//     if (containerRef.current) {
//       containerRef.current.style.cursor = 'grab';
//     }
//   };

//   // Reset to initial state
//   const resetView = () => {
//     setScale(1);
//     setViewOffset({ x: 0, y: 0 });
    
//     const resetPositions = {};
//     environments.forEach((env, index) => {
//       resetPositions[env.id] = {
//         x: CANVAS_SIZE / 2 - BOX_SIZE / 2 + (index * (BOX_SIZE + 50)),
//         y: CANVAS_SIZE / 2 - BOX_SIZE / 2
//       };
//     });
//     setBoxPositions(resetPositions);
//   };

//   // Handle wheel zoom
//   useEffect(() => {
//     const handleWheel = (e) => {
//       e.preventDefault();
//       const direction = e.deltaY < 0 ? 'in' : 'out';
//       handleZoom(direction);
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('wheel', handleWheel, { passive: false });
//       return () => container.removeEventListener('wheel', handleWheel);
//     }
//   }, []);

//   const IconButton = ({ icon: Icon, tooltip, onClick, disabled = false }) => (
//     <div className="relative group">
//       <button
//         onClick={onClick}
//         disabled={disabled}
//         className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-30"
//       >
//         <Icon size={20} />
//       </button>
//       <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white text-gray-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow z-10">
//         {tooltip}
//       </span>
//     </div>
//   );

//   if (!currentProject) {
//     return (
//       <div className="flex flex-col h-screen items-center justify-center bg-gray-50 text-gray-800">
//         <div className="text-center">
//           <div className="mb-4 text-gray-500">
//             <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h1 className="text-xl font-semibold mb-2">Project not found</h1>
//           <p className="text-gray-500 mb-6">The project you're looking for doesn't exist or is still loading.</p>
//           <button
//             onClick={() => router.push('/')}
//             className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
//           >
//             Go back to projects
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>{currentProject?.name || 'Project Detail'} - Canvas App</title>
//         <meta name="description" content={`Details for ${currentProject?.name} - Canvas App`} />
//       </Head>

//       <div className="relative w-full h-screen overflow-hidden bg-gray-100">
//         {/* Control Panel */}
//         <div className="absolute top-20 left-4 z-10 bg-white p-2 rounded-xl shadow-lg flex flex-col items-center gap-4">
//           <div className="flex flex-col items-center gap-2">
//             <IconButton
//               icon={FiPlus}
//               tooltip="Zoom In"
//               onClick={() => handleZoom('in')}
//               disabled={scale >= MAX_SCALE}
//             />
//             <IconButton
//               icon={FiMinus}
//               tooltip="Zoom Out"
//               onClick={() => handleZoom('out')}
//               disabled={scale <= MIN_SCALE}
//             />
//             <IconButton
//               icon={FiMaximize2}
//               tooltip="Reset View"
//               onClick={resetView}
//             />
//           </div>

//           <div className="flex flex-col items-center gap-2">
//             <IconButton icon={FiRotateCw} tooltip="Rotate CW" />
//             <IconButton icon={FiRotateCcw} tooltip="Rotate CCW" />
//           </div>
//         </div>

//         {/* Add Environment Button */}
//         <div className="absolute bottom-4 right-4 z-10">
//           <button
//             onClick={() => setDeployModalOpen(true)}
//             className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
//           >
//             <FiPlus size={24} />
//           </button>
//         </div>

//         {/* Canvas Area */}
//         <div
//           ref={containerRef}
//           className="w-full h-full cursor-grab"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//         >
//           {/* Dotted Background */}
//           <div
//             className="relative bg-white"
//             style={{
//               width: `${CANVAS_SIZE}px`,
//               height: `${CANVAS_SIZE}px`,
//               transform: `translate(${viewOffset.x}px, ${viewOffset.y}px) scale(${scale})`,
//               transformOrigin: 'center center',
//               backgroundImage: `
//                 radial-gradient(circle at 1px 1px, #999 1px, transparent 0),
//                 radial-gradient(circle at 1px 1px, #999 1px, transparent 0)
//               `,
//               backgroundSize: `${DOT_SPACING}px ${DOT_SPACING}px`,
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               marginLeft: `-${CANVAS_SIZE / 2}px`,
//               marginTop: `-${CANVAS_SIZE / 2}px`,
//             }}
//           >
//             {/* Draggable Boxes */}
//             {environments.map((env) => {
//               const position = boxPositions[env.id] || {
//                 x: CANVAS_SIZE / 2 - BOX_SIZE / 2,
//                 y: CANVAS_SIZE / 2 - BOX_SIZE / 2
//               };

//               return (
//                 <div
//                   key={env.id}
//                   className="absolute flex items-center justify-center text-white font-bold cursor-move transition-all duration-200 select-none"
//                   style={{
//                     width: `${BOX_SIZE}px`,
//                     height: `${BOX_SIZE}px`,
//                     left: `${position.x}px`,
//                     top: `${position.y}px`,
//                     backgroundColor: env.color,
//                     borderRadius: '12px',
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//                     border: '2px solid rgba(255, 255, 255, 0.2)',
//                     transform: dragState.envId === env.id ? 'scale(1.05)' : 'scale(1)',
//                     zIndex: dragState.envId === env.id ? 10 : 1
//                   }}
//                   onMouseDown={(e) => handleMouseDown(e, env.id)}
//                 >
//                   <div className="text-center p-2">
//                     <div className="font-medium text-lg">{env.name}</div>
//                     <div className="text-sm opacity-80">Drag to move</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Add Environment Modal */}
//         {deployModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold">New Environment</h3>
//                 <button
//                   onClick={() => setDeployModalOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <FiX size={20} />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="environmentName" className="block text-sm mb-1">Environment Name</label>
//                   <input
//                     type="text"
//                     id="environmentName"
//                     value={newDeploymentName}
//                     onChange={(e) => setNewDeploymentName(e.target.value)}
//                     className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
//                     placeholder="E.g. Production"
//                     onKeyDown={(e) => e.key === 'Enter' && handleAddDeployment()}
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   className="px-4 py-2 text-gray-500 hover:text-gray-700"
//                   onClick={() => setDeployModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//                   onClick={handleAddDeployment}
//                   disabled={!newDeploymentName.trim()}
//                 >
//                   Create Environment
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default InteractiveCanvas;









// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FiPlus,
//   FiMinus,
//   FiX,
//   FiMaximize2,
//   FiMinimize2,
//   FiRotateCw,
//   FiRotateCcw,
//   FiGrid
// } from 'react-icons/fi';
// import Header from '../../components/Header';
// import CanvasToolbar from '../../components/canvas/CanvasToolbar';
// import { useCanvas } from '../../context/CanvasContext';

// const InteractiveCanvas = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { selectProject, currentProject, environments, addEnvironment } = useCanvas();
//   const [deployModalOpen, setDeployModalOpen] = useState(false);
//   const [newDeploymentName, setNewDeploymentName] = useState('');

//   // Configuration constants
//   const CANVAS_SIZE = 10000;
//   const BOX_SIZE = 200;
//   const VIEWPORT_SIZE = 800;
//   const MIN_SCALE = 0.2;
//   const MAX_SCALE = 4;
//   const ZOOM_STEP = 0.2;
//   const DOT_SPACING = 20;

//   // State management
//   const [scale, setScale] = useState(1);
//   const [boxPositions, setBoxPositions] = useState({});
//   const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });
//   const [dragState, setDragState] = useState({
//     type: null,
//     startPos: { x: 0, y: 0 },
//     envId: null,
//     boxStartPos: { x: 0, y: 0 }
//   });

//   // Refs
//   const containerRef = useRef(null);

//   // Initialize positions when environments change
//   useEffect(() => {
//     if (environments.length > 0) {
//       const initialPositions = {};
//       environments.forEach((env, index) => {
//         if (!boxPositions[env.id]) {
//           initialPositions[env.id] = {
//             x: CANVAS_SIZE / 2 - BOX_SIZE / 2 + (index * (BOX_SIZE + 50)),
//             y: CANVAS_SIZE / 2 - BOX_SIZE / 2
//           };
//         }
//       });
//       if (Object.keys(initialPositions).length > 0) {
//         setBoxPositions(prev => ({ ...prev, ...initialPositions }));
//       }
//     }
//   }, [environments]);

//   useEffect(() => {
//     if (id) {
//       selectProject(id);
      
//       if (environments.length === 0) {
//         addEnvironment({
//           id: 'default-dev',
//           name: 'Development',
//           color: '#9c5cff'
//         });
//       }
//     }
//   }, [id, selectProject, environments.length, addEnvironment]);

//   const handleAddDeployment = () => {
//     if (newDeploymentName.trim() === '') return;

//     const newEnv = {
//       id: `env-${Date.now()}`,
//       name: newDeploymentName,
//       color: `#${Math.floor(Math.random()*16777215).toString(16)}`
//     };

//     addEnvironment(newEnv);

//     setBoxPositions(prev => ({
//       ...prev,
//       [newEnv.id]: {
//         x: CANVAS_SIZE / 2 - BOX_SIZE / 2 + (Object.keys(prev).length * (BOX_SIZE + 50)),
//         y: CANVAS_SIZE / 2 - BOX_SIZE / 2
//       }
//     }));

//     setNewDeploymentName('');
//     setDeployModalOpen(false);
//   };

//   // Handle zoom with boundaries
//   const handleZoom = (direction) => {
//     setScale(prev => {
//       const newScale = direction === 'in' 
//         ? Math.min(MAX_SCALE, prev + ZOOM_STEP)
//         : Math.max(MIN_SCALE, prev - ZOOM_STEP);
//       return newScale;
//     });
//   };

//   // Mouse down handler
//   const handleMouseDown = (e, envId = null) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (envId && boxPositions[envId]) {
//       setDragState({
//         type: 'box',
//         startPos: { x: e.clientX, y: e.clientY },
//         envId: envId,
//         boxStartPos: { ...boxPositions[envId] }
//       });
//     } else {
//       setDragState({
//         type: 'canvas',
//         startPos: { x: e.clientX, y: e.clientY },
//         currentOffset: { ...viewOffset }
//       });
//       if (containerRef.current) {
//         containerRef.current.style.cursor = 'grabbing';
//       }
//     }
//   };

//   // Mouse move handler
//   const handleMouseMove = (e) => {
//     if (!dragState.type) return;

//     if (dragState.type === 'box' && dragState.envId) {
//       const deltaX = (e.clientX - dragState.startPos.x) / scale;
//       const deltaY = (e.clientY - dragState.startPos.y) / scale;

//       setBoxPositions(prev => ({
//         ...prev,
//         [dragState.envId]: {
//           x: Math.max(0, Math.min(CANVAS_SIZE - BOX_SIZE, dragState.boxStartPos.x + deltaX)),
//           y: Math.max(0, Math.min(CANVAS_SIZE - BOX_SIZE, dragState.boxStartPos.y + deltaY))
//         }
//       }));
//     } else if (dragState.type === 'canvas') {
//       const deltaX = e.clientX - dragState.startPos.x;
//       const deltaY = e.clientY - dragState.startPos.y;

//       setViewOffset({
//         x: dragState.currentOffset.x + deltaX,
//         y: dragState.currentOffset.y + deltaY
//       });
//     }
//   };

//   // Clean up drag state
//   const handleMouseUp = () => {
//     setDragState({ type: null, startPos: { x: 0, y: 0 }, envId: null, boxStartPos: { x: 0, y: 0 } });
//     if (containerRef.current) {
//       containerRef.current.style.cursor = 'grab';
//     }
//   };

//   // Reset to initial state
//   const resetView = () => {
//     setScale(1);
//     setViewOffset({ x: 0, y: 0 });
    
//     const resetPositions = {};
//     environments.forEach((env, index) => {
//       resetPositions[env.id] = {
//         x: CANVAS_SIZE / 2 - BOX_SIZE / 2 + (index * (BOX_SIZE + 50)),
//         y: CANVAS_SIZE / 2 - BOX_SIZE / 2
//       };
//     });
//     setBoxPositions(resetPositions);
//   };

//   // Handle wheel zoom
//   useEffect(() => {
//     const handleWheel = (e) => {
//       e.preventDefault();
//       const direction = e.deltaY < 0 ? 'in' : 'out';
//       handleZoom(direction);
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('wheel', handleWheel, { passive: false });
//       return () => container.removeEventListener('wheel', handleWheel);
//     }
//   }, []);

//   const IconButton = ({ icon: Icon, tooltip, onClick, disabled = false }) => (
//     <div className="relative group">
//       <button
//         onClick={onClick}
//         disabled={disabled}
//         className="p-2 rounded hover:bg-app-card-hover transition-colors disabled:opacity-30"
//       >
//         <Icon size={20} />
//       </button>
//       <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-app-card text-app-text-secondary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
//         {tooltip}
//       </span>
//     </div>
//   );

//   if (!currentProject) {
//     return (
//       <div className="flex flex-col h-screen items-center justify-center bg-app-background text-app-text-primary">
//         <div className="text-center">
//           <div className="mb-4 text-app-text-secondary">
//             <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h1 className="text-xl font-semibold mb-2">Project not found</h1>
//           <p className="text-app-text-secondary mb-6">The project you're looking for doesn't exist or is still loading.</p>
//           <button
//             onClick={() => router.push('/')}
//             className="bg-app-accent-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
//           >
//             Go back to projects
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>{currentProject?.name || 'Project Detail'} - Canvas App</title>
//         <meta name="description" content={`Details for ${currentProject?.name} - Canvas App`} />
//       </Head>

//       <div className="relative w-full h-screen overflow-hidden bg-app-background">
//         {/* Header */}
//         <Header projectView={true} />

//         {/* Control Panel */}
//         <div className="absolute top-44 border border-app-border left-4 z-10 bg-app-card p-2 rounded-xl shadow-lg flex flex-col items-center gap-4 text-app-text-primary">
//           <IconButton icon={FiGrid} tooltip="Menu" />

//           <div className="flex flex-col items-center gap-2">
//             <IconButton
//               icon={FiPlus}
//               tooltip="Zoom In"
//               onClick={() => handleZoom('in')}
//               disabled={scale >= MAX_SCALE}
//             />
//             <IconButton
//               icon={FiMinus}
//               tooltip="Zoom Out"
//               onClick={() => handleZoom('out')}
//               disabled={scale <= MIN_SCALE}
//             />
//             <IconButton
//               icon={FiMaximize2}
//               tooltip="Reset View"
//               onClick={resetView}
//             />
//           </div>

//           <div className="flex flex-col items-center gap-2">
//             <IconButton icon={FiRotateCw} tooltip="Rotate CW" />
//             <IconButton icon={FiRotateCcw} tooltip="Rotate CCW" />
//           </div>
//         </div>

//         {/* Canvas Toolbar */}
//         <CanvasToolbar setDeployModalOpen={setDeployModalOpen} />

//         {/* Canvas Area */}
//         <div
//           ref={containerRef}
//           className="w-full h-full cursor-grab"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//         >
//           {/* Dotted Background */}
//           <div
//             className="relative bg-app-card"
//             style={{
//               width: `${CANVAS_SIZE}px`,
//               height: `${CANVAS_SIZE}px`,
//               transform: `translate(${viewOffset.x}px, ${viewOffset.y}px) scale(${scale})`,
//               transformOrigin: 'center center',
//               backgroundImage: `
//                 radial-gradient(circle at 1px 1px, var(--app-border) 1px, transparent 0),
//                 radial-gradient(circle at 1px 1px, var(--app-border) 1px, transparent 0)
//               `,
//               backgroundSize: `${DOT_SPACING}px ${DOT_SPACING}px`,
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               marginLeft: `-${CANVAS_SIZE / 2}px`,
//               marginTop: `-${CANVAS_SIZE / 2}px`,
//             }}
//           >
//             {/* Draggable Boxes */}
//             {environments.map((env) => {
//               const position = boxPositions[env.id] || {
//                 x: CANVAS_SIZE / 2 - BOX_SIZE / 2,
//                 y: CANVAS_SIZE / 2 - BOX_SIZE / 2
//               };

//               return (
//                 <div
//                   key={env.id}
//                   className="absolute flex items-center justify-center text-white font-bold cursor-move transition-all duration-200 select-none"
//                   style={{
//                     width: `${BOX_SIZE}px`,
//                     height: `${BOX_SIZE}px`,
//                     left: `${position.x}px`,
//                     top: `${position.y}px`,
//                     backgroundColor: env.color,
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                     border: '2px solid rgba(255, 255, 255, 0.2)',
//                     transform: dragState.envId === env.id ? 'scale(1.05)' : 'scale(1)',
//                     zIndex: dragState.envId === env.id ? 10 : 1
//                   }}
//                   onMouseDown={(e) => handleMouseDown(e, env.id)}
//                 >
//                   <div className="text-center p-2">
//                     <div className="font-medium text-lg">{env.name}</div>
//                     <div className="text-sm opacity-80">Drag to move</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Add Environment Modal */}
//         <AnimatePresence>
//           {deployModalOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//               onClick={() => setDeployModalOpen(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ type: "spring", duration: 0.5 }}
//                 className="bg-app-card rounded-lg shadow-xl w-full max-w-md p-6"
//                 onClick={e => e.stopPropagation()}
//               >
//                 <motion.div className="flex justify-between items-center mb-4">
//                   <h3 className="text-app-text-primary text-xl font-semibold">New Environment</h3>
//                   <button
//                     onClick={() => setDeployModalOpen(false)}
//                     className="text-app-text-secondary hover:text-app-text-primary transition-colors"
//                   >
//                     <FiX size={20} />
//                   </button>
//                 </motion.div>

//                 <motion.div className="space-y-4">
//                   <div>
//                     <label htmlFor="environmentName" className="block text-app-text-secondary text-sm mb-1">Environment Name</label>
//                     <input
//                       type="text"
//                       id="environmentName"
//                       value={newDeploymentName}
//                       onChange={(e) => setNewDeploymentName(e.target.value)}
//                       className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
//                       placeholder="E.g. Production"
//                     />
//                   </div>
//                 </motion.div>
//                 <motion.div className="flex justify-end space-x-3 mt-6">
//                   <button
//                     className="px-4 py-2 text-app-text-secondary hover:text-app-text-primary transition-colors"
//                     onClick={() => setDeployModalOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-app-accent-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
//                     onClick={handleAddDeployment}
//                     disabled={!newDeploymentName.trim()}
//                   >
//                     Create Environment
//                   </button>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// };

// export default InteractiveCanvas;



'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus,
  FiMinus,
  FiX,
  FiMaximize2,
  FiMinimize2,
  FiRotateCw,
  FiRotateCcw,
  FiGrid,
  FiGitBranch
} from 'react-icons/fi';
import Header from '../../components/Header';
import CanvasToolbar from '../../components/canvas/CanvasToolbar';
import { useCanvas } from '../../context/CanvasContext';

const InteractiveCanvas = () => {
  const router = useRouter();
  const { id } = router.query;
  const { selectProject, currentProject, environments, addEnvironment } = useCanvas();
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [newDeploymentName, setNewDeploymentName] = useState('');

  // Configuration constants
  const CANVAS_SIZE = 10000;
  const BOX_WIDTH = 192; // Matches the w-48 in the UI component (48 * 4 = 192px)
  const BOX_HEIGHT = 164; // Approximate height of the UI component
  const VIEWPORT_SIZE = 800;
  const MIN_SCALE = 0.2;
  const MAX_SCALE = 4;
  const ZOOM_STEP = 0.2;
  const DOT_SPACING = 20;

  // State management
  const [scale, setScale] = useState(1);
  const [boxPositions, setBoxPositions] = useState({});
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });
  const [dragState, setDragState] = useState({
    type: null,
    startPos: { x: 0, y: 0 },
    envId: null,
    boxStartPos: { x: 0, y: 0 },
    isDragging: false
  });

  // Refs
  const containerRef = useRef(null);

  // Initialize positions when environments change
  useEffect(() => {
    if (environments.length > 0) {
      const initialPositions = {};
      environments.forEach((env, index) => {
        if (!boxPositions[env.id]) {
          initialPositions[env.id] = {
            x: CANVAS_SIZE / 2 - BOX_WIDTH / 2 + (index * (BOX_WIDTH + 50)),
            y: CANVAS_SIZE / 2 - BOX_HEIGHT / 2
          };
        }
      });
      if (Object.keys(initialPositions).length > 0) {
        setBoxPositions(prev => ({ ...prev, ...initialPositions }));
      }
    }
  }, [environments]);

  useEffect(() => {
    if (id) {
      selectProject(id);
      
      if (environments.length === 0) {
        addEnvironment({
          id: 'default-dev',
          name: 'Development',
          color: '#9c5cff',
          environmentId: 'dev'
        });
      }
    }
  }, [id, selectProject, environments.length, addEnvironment]);

  const handleAddDeployment = () => {
    if (newDeploymentName.trim() === '') return;

    const newEnv = {
      id: `env-${Date.now()}`,
      name: newDeploymentName,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      environmentId: newDeploymentName.toLowerCase().includes('prod') ? 'prod' : 'dev'
    };

    addEnvironment(newEnv);

    setBoxPositions(prev => ({
      ...prev,
      [newEnv.id]: {
        x: CANVAS_SIZE / 2 - BOX_WIDTH / 2 + (Object.keys(prev).length * (BOX_WIDTH + 50)),
        y: CANVAS_SIZE / 2 - BOX_HEIGHT / 2
      }
    }));

    setNewDeploymentName('');
    setDeployModalOpen(false);
  };

  // Handle zoom with boundaries
  const handleZoom = (direction) => {
    setScale(prev => {
      const newScale = direction === 'in' 
        ? Math.min(MAX_SCALE, prev + ZOOM_STEP)
        : Math.max(MIN_SCALE, prev - ZOOM_STEP);
      return newScale;
    });
  };

  // Mouse down handler
  const handleMouseDown = (e, envId = null) => {
    e.preventDefault();
    e.stopPropagation();

    if (envId && boxPositions[envId]) {
      setDragState({
        type: 'box',
        startPos: { x: e.clientX, y: e.clientY },
        envId: envId,
        boxStartPos: { ...boxPositions[envId] },
        isDragging: false
      });
    } else {
      setDragState({
        type: 'canvas',
        startPos: { x: e.clientX, y: e.clientY },
        currentOffset: { ...viewOffset }
      });
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
      }
    }
  };

  // Mouse move handler
  const handleMouseMove = (e) => {
    if (!dragState.type) return;

    if (dragState.type === 'box' && dragState.envId) {
      const deltaX = (e.clientX - dragState.startPos.x) / scale;
      const deltaY = (e.clientY - dragState.startPos.y) / scale;

      // Update dragging state if movement exceeds threshold
      if (!dragState.isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
        setDragState(prev => ({ ...prev, isDragging: true }));
      }

      setBoxPositions(prev => ({
        ...prev,
        [dragState.envId]: {
          x: Math.max(0, Math.min(CANVAS_SIZE - BOX_WIDTH, dragState.boxStartPos.x + deltaX)),
          y: Math.max(0, Math.min(CANVAS_SIZE - BOX_HEIGHT, dragState.boxStartPos.y + deltaY))
        }
      }));
    } else if (dragState.type === 'canvas') {
      const deltaX = e.clientX - dragState.startPos.x;
      const deltaY = e.clientY - dragState.startPos.y;

      setViewOffset({
        x: dragState.currentOffset.x + deltaX,
        y: dragState.currentOffset.y + deltaY
      });
    }
  };

  // Clean up drag state
  const handleMouseUp = () => {
    setDragState({ type: null, startPos: { x: 0, y: 0 }, envId: null, boxStartPos: { x: 0, y: 0 }, isDragging: false });
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  // Reset to initial state
  const resetView = () => {
    setScale(1);
    setViewOffset({ x: 0, y: 0 });
    
    const resetPositions = {};
    environments.forEach((env, index) => {
      resetPositions[env.id] = {
        x: CANVAS_SIZE / 2 - BOX_WIDTH / 2 + (index * (BOX_WIDTH + 50)),
        y: CANVAS_SIZE / 2 - BOX_HEIGHT / 2
      };
    });
    setBoxPositions(resetPositions);
  };

  // Handle wheel zoom
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const direction = e.deltaY < 0 ? 'in' : 'out';
      handleZoom(direction);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const IconButton = ({ icon: Icon, tooltip, onClick, disabled = false }) => (
    <div className="relative group">
      <button
        onClick={onClick}
        disabled={disabled}
        className="p-2 rounded hover:bg-app-card-hover transition-colors disabled:opacity-30"
      >
        <Icon size={20} />
      </button>
      <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-app-card text-app-text-secondary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {tooltip}
      </span>
    </div>
  );

  if (!currentProject) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-app-background text-app-text-primary">
        <div className="text-center">
          <div className="mb-4 text-app-text-secondary">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold mb-2">Project not found</h1>
          <p className="text-app-text-secondary mb-6">The project you're looking for doesn't exist or is still loading.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-app-accent-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Go back to projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{currentProject?.name || 'Project Detail'} - Canvas App</title>
        <meta name="description" content={`Details for ${currentProject?.name} - Canvas App`} />
      </Head>

      <div className="relative w-full h-screen overflow-hidden bg-app-background">
        {/* Header */}
        <Header projectView={true} />

        {/* Control Panel */}
        <div className="absolute top-44 border border-app-border left-4 z-10 bg-app-card p-2 rounded-xl shadow-lg flex flex-col items-center gap-4 text-app-text-primary">
          <IconButton icon={FiGrid} tooltip="Menu" />

          <div className="flex flex-col items-center gap-2">
            <IconButton
              icon={FiPlus}
              tooltip="Zoom In"
              onClick={() => handleZoom('in')}
              disabled={scale >= MAX_SCALE}
            />
            <IconButton
              icon={FiMinus}
              tooltip="Zoom Out"
              onClick={() => handleZoom('out')}
              disabled={scale <= MIN_SCALE}
            />
            <IconButton
              icon={FiMaximize2}
              tooltip="Reset View"
              onClick={resetView}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconButton icon={FiRotateCw} tooltip="Rotate CW" />
            <IconButton icon={FiRotateCcw} tooltip="Rotate CCW" />
          </div>
        </div>

        {/* Canvas Toolbar */}
        <CanvasToolbar setDeployModalOpen={setDeployModalOpen} />

        {/* Canvas Area */}
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Dotted Background */}
          <div
            className="relative bg-app-card"
            style={{
              width: `${CANVAS_SIZE}px`,
              height: `${CANVAS_SIZE}px`,
              transform: `translate(${viewOffset.x}px, ${viewOffset.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              backgroundImage: `
                radial-gradient(circle at 1px 1px, var(--app-border) 1px, transparent 0),
                radial-gradient(circle at 1px 1px, var(--app-border) 1px, transparent 0)
              `,
              backgroundSize: `${DOT_SPACING}px ${DOT_SPACING}px`,
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: `-${CANVAS_SIZE / 2}px`,
              marginTop: `-${CANVAS_SIZE / 2}px`,
            }}
          >
            {/* Draggable Environment Cards */}
            {environments.map((env) => {
              const position = boxPositions[env.id] || {
                x: CANVAS_SIZE / 2 - BOX_WIDTH / 2,
                y: CANVAS_SIZE / 2 - BOX_HEIGHT / 2
              };

              return (
                <motion.div
                  key={env.id}
                  id={`environment-${env.id}`}
                  className={`bg-app-card border border-app-border rounded-lg shadow-md w-48 select-none absolute z-10 cursor-move ${dragState.envId === env.id && dragState.isDragging ? 'shadow-lg' : ''}`}
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ 
                    scale: dragState.envId === env.id && dragState.isDragging ? 1.05 : 1,
                    opacity: 1,
                    zIndex: dragState.envId === env.id ? 10 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  onMouseDown={(e) => handleMouseDown(e, env.id)}
                >
                  {/* Card header */}
                  <div className="p-3 flex items-center border-b border-app-border">
                    <div className="h-8 w-8 flex-shrink-0 rounded-md bg-app-background text-app-accent-purple flex items-center justify-center mr-3">
                      <FiGitBranch size={18} />
                    </div>
                    <div>
                      <h3 className="text-app-text-primary text-sm font-medium">{env.name}</h3>
                      <div className="flex items-center text-xs text-app-text-secondary mt-0.5">
                        <span>portfolio-next-{env.environmentId || 'dev'}.railway.app</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card body */}
                  <div className="mx-3 mt-2 mb-3 py-2 px-3 bg-app-background rounded-md">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-green-500 font-medium">Healthy</span>
                    </div>
                    <div className="mt-1 text-xs text-app-text-secondary">
                      Updated 8 hours ago
                    </div>
                  </div>
                  
                  {/* Tag at the bottom */}
                  {env.environmentId === 'dev' && (
                    <div className="absolute top-3 right-3 bg-green-500 bg-opacity-10 text-green-500 text-xs px-2 py-0.5 rounded-full">
                      Live
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Add Environment Modal */}
        <AnimatePresence>
          {deployModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setDeployModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-app-card rounded-lg shadow-xl w-full max-w-md p-6"
                onClick={e => e.stopPropagation()}
              >
                <motion.div className="flex justify-between items-center mb-4">
                  <h3 className="text-app-text-primary text-xl font-semibold">New Environment</h3>
                  <button
                    onClick={() => setDeployModalOpen(false)}
                    className="text-app-text-secondary hover:text-app-text-primary transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </motion.div>

                <motion.div className="space-y-4">
                  <div>
                    <label htmlFor="environmentName" className="block text-app-text-secondary text-sm mb-1">Environment Name</label>
                    <input
                      type="text"
                      id="environmentName"
                      value={newDeploymentName}
                      onChange={(e) => setNewDeploymentName(e.target.value)}
                      className="w-full bg-app-background border border-app-border rounded-md py-2 px-3 text-app-text-primary focus:outline-none focus:ring-1 focus:ring-app-accent-purple focus:border-app-accent-purple"
                      placeholder="E.g. Production"
                    />
                  </div>
                </motion.div>
                <motion.div className="flex justify-end space-x-3 mt-6">
                  <button
                    className="px-4 py-2 text-app-text-secondary hover:text-app-text-primary transition-colors"
                    onClick={() => setDeployModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-app-accent-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
                    onClick={handleAddDeployment}
                    disabled={!newDeploymentName.trim()}
                  >
                    Create Environment
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default InteractiveCanvas;