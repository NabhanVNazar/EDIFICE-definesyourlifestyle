import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Box, Plane } from '@react-three/drei';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  Move3D, 
  Eye, 
  Sun, 
  Palette,
  ArrowRight,
  Home,
  Maximize2,
  MousePointer
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import * as THREE from 'three';

// 3D House Component
const House3D: React.FC<{ project: any }> = ({ project }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  if (!project) return null;

  const { plot, requirements } = project;
  const scale = 0.1;

  return (
    <group ref={meshRef}>
      {/* Ground/Foundation */}
      <Plane
        args={[plot.width * scale, plot.length * scale]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
      >
        <meshStandardMaterial color="#8B4513" />
      </Plane>

      {/* Main Structure */}
      <Box
        args={[plot.width * scale * 0.8, 3, plot.length * scale * 0.8]}
        position={[0, 1.5, 0]}
      >
        <meshStandardMaterial color="#F5DEB3" />
      </Box>

      {/* Roof */}
      <Box
        args={[plot.width * scale * 0.9, 0.3, plot.length * scale * 0.9]}
        position={[0, 3.2, 0]}
      >
        <meshStandardMaterial color="#8B4513" />
      </Box>

      {/* Windows */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={`window-${i}`}
          args={[0.8, 1, 0.1]}
          position={[
            (i % 2 === 0 ? -1 : 1) * plot.width * scale * 0.4,
            1.8,
            (i < 2 ? -1 : 1) * plot.length * scale * 0.4
          ]}
        >
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
        </Box>
      ))}

      {/* Door */}
      <Box
        args={[0.8, 2, 0.1]}
        position={[0, 1, plot.length * scale * 0.4]}
      >
        <meshStandardMaterial color="#8B4513" />
      </Box>

      {/* Garage (if required) */}
      {requirements.garage && (
        <Box
          args={[3, 2.5, 2]}
          position={[plot.width * scale * 0.3, 1.25, plot.length * scale * 0.2]}
        >
          <meshStandardMaterial color="#D3D3D3" />
        </Box>
      )}
    </group>
  );
};

const View3DStep: React.FC = () => {
  const { currentProject, setCurrentStep } = useAppStore();
  const [viewMode, setViewMode] = useState<'orbit' | 'walkthrough'>('orbit');
  const [lighting, setLighting] = useState<'day' | 'night' | 'sunset'>('day');

  const viewModes = [
    { id: 'orbit', icon: RotateCcw, label: 'Orbit View' },
    { id: 'walkthrough', icon: Move3D, label: 'Walkthrough' }
  ];

  const lightingOptions = [
    { id: 'day', icon: Sun, label: 'Daylight', color: '#ffffff' },
    { id: 'sunset', icon: Palette, label: 'Sunset', color: '#ff6b35' },
    { id: 'night', icon: Eye, label: 'Night', color: '#4169e1' }
  ];

  const handleContinue = () => {
    setCurrentStep('elevations');
  };

  if (!currentProject) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-amber-600">No project selected</p>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Control Panel */}
      <motion.div
        className="w-72 bg-white border-r border-amber-100 p-6 overflow-y-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-amber-900 mb-6 flex items-center">
          <Home className="mr-3" size={20} />
          3D Viewer
        </h3>

        {/* Project Info */}
        <div className="mb-6 p-4 bg-amber-50 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-2">{currentProject.name}</h4>
          <div className="text-sm text-amber-700 space-y-1">
            <p>📐 {currentProject.plot.width} × {currentProject.plot.length} ft</p>
            <p>🏠 {currentProject.requirements.floors} floor{currentProject.requirements.floors > 1 ? 's' : ''}</p>
            <p>🛏️ {currentProject.requirements.bedrooms} bedroom{currentProject.requirements.bedrooms > 1 ? 's' : ''}</p>
            <p>🚿 {currentProject.requirements.bathrooms} bathroom{currentProject.requirements.bathrooms > 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* View Modes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-amber-800 mb-3">View Mode</h4>
          <div className="space-y-2">
            {viewModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <motion.button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as 'orbit' | 'walkthrough')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    viewMode === mode.id
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'hover:bg-amber-50 text-amber-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{mode.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Lighting Options */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-amber-800 mb-3">Lighting</h4>
          <div className="space-y-2">
            {lightingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setLighting(option.id as 'day' | 'night' | 'sunset')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    lighting === option.id
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'hover:bg-amber-50 text-amber-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{option.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Controls Guide */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-800 mb-3">Controls</h4>
          <div className="text-xs text-gray-600 space-y-2">
            <p className="flex items-center">
              <MousePointer size={12} className="mr-2" />
              Click & drag to rotate
            </p>
            <p className="flex items-center">
              <Maximize2 size={12} className="mr-2" />
              Scroll to zoom
            </p>
            <p className="flex items-center">
              <Move3D size={12} className="mr-2" />
              Right-click & drag to pan
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 mb-3">Quick Stats</h4>
          <div className="text-sm text-green-700 space-y-1">
            <p>Built-up Area: {Math.round(currentProject.plot.area * 0.6).toLocaleString()} sq ft</p>
            <p>Open Area: {Math.round(currentProject.plot.area * 0.4).toLocaleString()} sq ft</p>
            <p>Est. Cost: ${Math.round(currentProject.plot.area * 120).toLocaleString()}</p>
          </div>
        </div>
      </motion.div>

      {/* 3D Viewer */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-amber-100 p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-amber-900">3D Model Preview</h2>
            <p className="text-sm text-amber-600">
              Interactive {viewMode} view with {lighting} lighting
            </p>
          </div>
          
          <motion.button
            onClick={handleContinue}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Choose Elevation Style</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* 3D Canvas */}
        <motion.div
          className="flex-1 bg-gradient-to-br from-blue-50 to-amber-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[10, 8, 10]} fov={60} />
            
            {/* Lighting based on selection */}
            {lighting === 'day' && (
              <>
                <ambientLight intensity={0.6} />
                <directionalLight 
                  position={[10, 10, 5]} 
                  intensity={1} 
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                />
              </>
            )}
            
            {lighting === 'sunset' && (
              <>
                <ambientLight intensity={0.4} color="#ff6b35" />
                <directionalLight 
                  position={[-5, 8, 5]} 
                  intensity={0.8} 
                  color="#ff8c42"
                  castShadow
                />
              </>
            )}
            
            {lighting === 'night' && (
              <>
                <ambientLight intensity={0.2} color="#4169e1" />
                <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
                <pointLight position={[5, 3, 5]} intensity={0.3} color="#4169e1" />
              </>
            )}

            {/* Ground */}
            <Plane
              args={[50, 50]}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -0.5, 0]}
              receiveShadow
            >
              <meshStandardMaterial color="#90EE90" />
            </Plane>

            {/* House */}
            <House3D project={currentProject} />

            {/* Controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={30}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </motion.div>
      </div>
    </div>
  );
};

export default View3DStep;