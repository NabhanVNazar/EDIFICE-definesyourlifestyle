import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Box, Plane, Text, Environment, Sky } from '@react-three/drei';
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
  MousePointer,
  Camera,
  Play,
  Pause,
  RotateCw,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import * as THREE from 'three';

// Enhanced 3D House Component with realistic details
const House3D: React.FC<{ project: any; lighting: string }> = ({ project, lighting }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [isRotating, setIsRotating] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current && isRotating) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  if (!project) return null;

  const { plot, requirements } = project;
  const scale = 0.08;
  const houseWidth = plot.width * scale;
  const houseLength = plot.length * scale;
  const floorHeight = 3;

  return (
    <group ref={meshRef}>
      {/* Enhanced Ground with landscaping */}
      <Plane
        args={[houseWidth * 2, houseLength * 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
      >
        <meshStandardMaterial color="#4ade80" />
      </Plane>

      {/* Foundation */}
      <Box
        args={[houseWidth, 0.5, houseLength]}
        position={[0, 0.25, 0]}
      >
        <meshStandardMaterial color="#6b7280" />
      </Box>

      {/* Main Structure - Multiple floors */}
      {[...Array(requirements.floors)].map((_, floor) => (
        <group key={floor} position={[0, 0.5 + floor * floorHeight, 0]}>
          {/* Floor structure */}
          <Box
            args={[houseWidth * 0.9, floorHeight - 0.2, houseLength * 0.9]}
            position={[0, floorHeight / 2, 0]}
          >
            <meshStandardMaterial 
              color={lighting === 'night' ? '#f3f4f6' : '#fef3c7'} 
              roughness={0.8}
            />
          </Box>

          {/* Interior walls visualization */}
          <Box
            args={[0.2, floorHeight - 0.2, houseLength * 0.8]}
            position={[houseWidth * 0.2, floorHeight / 2, 0]}
          >
            <meshStandardMaterial color="#d1d5db" />
          </Box>

          <Box
            args={[houseWidth * 0.6, floorHeight - 0.2, 0.2]}
            position={[0, floorHeight / 2, houseLength * 0.2]}
          >
            <meshStandardMaterial color="#d1d5db" />
          </Box>
        </group>
      ))}

      {/* Enhanced Roof with proper slope */}
      <group position={[0, 0.5 + requirements.floors * floorHeight, 0]}>
        <Box
          args={[houseWidth, 0.3, houseLength]}
          position={[0, 0.15, 0]}
        >
          <meshStandardMaterial color="#7c2d12" roughness={0.3} />
        </Box>
        
        {/* Roof slope */}
        <Box
          args={[houseWidth * 1.1, 0.1, houseLength * 1.1]}
          position={[0, 0.4, 0]}
          rotation={[0, Math.PI / 4, 0]}
        >
          <meshStandardMaterial color="#92400e" />
        </Box>
      </group>

      {/* Enhanced Windows with frames */}
      {[...Array(8)].map((_, i) => {
        const side = Math.floor(i / 2);
        const position = i % 2;
        const x = side === 0 ? -houseWidth * 0.45 : side === 1 ? houseWidth * 0.45 : 0;
        const z = side === 2 ? -houseLength * 0.45 : side === 3 ? houseLength * 0.45 : 
                   (position === 0 ? -houseLength * 0.2 : houseLength * 0.2);
        
        return (
          <group key={`window-${i}`}>
            {/* Window frame */}
            <Box
              args={[side < 2 ? 0.1 : 1.2, 1.5, side < 2 ? 1.2 : 0.1]}
              position={[x, 2, z]}
            >
              <meshStandardMaterial color="#374151" />
            </Box>
            
            {/* Window glass */}
            <Box
              args={[side < 2 ? 0.05 : 1, 1.2, side < 2 ? 1 : 0.05]}
              position={[x, 2, z]}
            >
              <meshStandardMaterial 
                color="#bfdbfe" 
                transparent 
                opacity={0.7}
                roughness={0.1}
                metalness={0.1}
              />
            </Box>
          </group>
        );
      })}

      {/* Enhanced Door with details */}
      <group position={[0, 1.2, houseLength * 0.45]}>
        <Box
          args={[1, 2.4, 0.2]}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial color="#7c2d12" roughness={0.8} />
        </Box>
        
        {/* Door handle */}
        <Box
          args={[0.1, 0.1, 0.15]}
          position={[0.3, 0, 0.1]}
        >
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </Box>
      </group>

      {/* Garage (if required) */}
      {requirements.garage && (
        <group position={[houseWidth * 0.4, 1.5, houseLength * 0.2]}>
          <Box
            args={[3, 3, 2.5]}
            position={[0, 0, 0]}
          >
            <meshStandardMaterial color="#9ca3af" />
          </Box>
          
          {/* Garage door */}
          <Box
            args={[2.5, 2.5, 0.1]}
            position={[0, 0, 1.3]}
          >
            <meshStandardMaterial color="#6b7280" />
          </Box>
        </group>
      )}

      {/* Garden elements */}
      {requirements.garden && (
        <group>
          {/* Trees */}
          {[...Array(4)].map((_, i) => (
            <group key={`tree-${i}`} position={[
              (i % 2 === 0 ? -1 : 1) * (houseWidth * 0.8 + Math.random() * 2),
              0,
              (i < 2 ? -1 : 1) * (houseLength * 0.8 + Math.random() * 2)
            ]}>
              {/* Trunk */}
              <Box
                args={[0.3, 2, 0.3]}
                position={[0, 1, 0]}
              >
                <meshStandardMaterial color="#7c2d12" />
              </Box>
              
              {/* Leaves */}
              <Box
                args={[1.5, 1.5, 1.5]}
                position={[0, 2.5, 0]}
              >
                <meshStandardMaterial color="#16a34a" />
              </Box>
            </group>
          ))}
          
          {/* Pathway */}
          <Box
            args={[1.5, 0.05, houseLength * 0.8]}
            position={[0, 0.02, houseLength * 0.7]}
          >
            <meshStandardMaterial color="#78716c" />
          </Box>
        </group>
      )}

      {/* Balcony (if required) */}
      {requirements.balcony && requirements.floors > 1 && (
        <group position={[0, floorHeight + 0.5, houseLength * 0.5]}>
          <Box
            args={[houseWidth * 0.4, 0.2, 1.5]}
            position={[0, 0, 0]}
          >
            <meshStandardMaterial color="#d1d5db" />
          </Box>
          
          {/* Balcony railing */}
          <Box
            args={[houseWidth * 0.4, 1, 0.1]}
            position={[0, 0.5, 0.7]}
          >
            <meshStandardMaterial color="#374151" />
          </Box>
        </group>
      )}
    </group>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
  </div>
);

const View3DStep: React.FC = () => {
  const { currentProject, setCurrentStep } = useAppStore();
  const [viewMode, setViewMode] = useState<'orbit' | 'walkthrough'>('orbit');
  const [lighting, setLighting] = useState<'day' | 'night' | 'sunset'>('day');
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([15, 10, 15]);

  const viewModes = [
    { id: 'orbit', icon: RotateCcw, label: 'Orbit View', description: 'Rotate around the building' },
    { id: 'walkthrough', icon: Move3D, label: 'Walkthrough', description: 'First-person exploration' }
  ];

  const lightingOptions = [
    { id: 'day', icon: Sun, label: 'Daylight', color: '#ffffff', description: 'Bright natural lighting' },
    { id: 'sunset', icon: Palette, label: 'Sunset', color: '#ff6b35', description: 'Warm golden hour' },
    { id: 'night', icon: Eye, label: 'Night', color: '#4169e1', description: 'Evening with artificial lights' }
  ];

  const cameraPresets = [
    { name: 'Front View', position: [0, 8, 20] as [number, number, number] },
    { name: 'Side View', position: [20, 8, 0] as [number, number, number] },
    { name: 'Aerial View', position: [10, 25, 10] as [number, number, number] },
    { name: 'Corner View', position: [15, 10, 15] as [number, number, number] }
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
      {/* Enhanced Control Panel */}
      <motion.div
        className="w-80 bg-white border-r border-amber-100 p-6 overflow-y-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-amber-900 mb-6 flex items-center">
          <Home className="mr-3" size={20} />
          3D Visualization Studio
        </h3>

        {/* Project Info */}
        <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          <h4 className="font-medium text-amber-900 mb-3">{currentProject.name}</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white p-2 rounded">
              <p className="text-amber-600 font-medium">📐 Dimensions</p>
              <p className="text-amber-900">{currentProject.plot.width} × {currentProject.plot.length} ft</p>
            </div>
            <div className="bg-white p-2 rounded">
              <p className="text-amber-600 font-medium">🏠 Floors</p>
              <p className="text-amber-900">{currentProject.requirements.floors} floor{currentProject.requirements.floors > 1 ? 's' : ''}</p>
            </div>
            <div className="bg-white p-2 rounded">
              <p className="text-amber-600 font-medium">🛏️ Bedrooms</p>
              <p className="text-amber-900">{currentProject.requirements.bedrooms}</p>
            </div>
            <div className="bg-white p-2 rounded">
              <p className="text-amber-600 font-medium">🚿 Bathrooms</p>
              <p className="text-amber-900">{currentProject.requirements.bathrooms}</p>
            </div>
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
                  className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-all ${
                    viewMode === mode.id
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'hover:bg-amber-50 text-amber-700 border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} className="mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{mode.label}</p>
                    <p className="text-xs opacity-75">{mode.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Camera Presets */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-amber-800 mb-3">Camera Angles</h4>
          <div className="grid grid-cols-2 gap-2">
            {cameraPresets.map((preset, index) => (
              <motion.button
                key={index}
                onClick={() => setCameraPosition(preset.position)}
                className="p-2 text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg transition-colors border border-amber-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Camera size={14} className="mx-auto mb-1" />
                {preset.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lighting Options */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-amber-800 mb-3">Lighting & Atmosphere</h4>
          <div className="space-y-2">
            {lightingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setLighting(option.id as 'day' | 'night' | 'sunset')}
                  className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-all ${
                    lighting === option.id
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'hover:bg-amber-50 text-amber-700 border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} className="mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{option.label}</p>
                    <p className="text-xs opacity-75">{option.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Animation Controls */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-amber-800 mb-3">Animation</h4>
          <motion.button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-all ${
              isAutoRotate
                ? 'bg-green-100 text-green-900 border border-green-300'
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isAutoRotate ? <Pause size={16} /> : <Play size={16} />}
            <span className="text-sm font-medium">
              {isAutoRotate ? 'Stop Rotation' : 'Auto Rotate'}
            </span>
          </motion.button>
        </div>

        {/* Controls Guide */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-800 mb-3">3D Controls</h4>
          <div className="text-xs text-gray-600 space-y-2">
            <p className="flex items-center">
              <MousePointer size={12} className="mr-2" />
              Left click + drag to rotate
            </p>
            <p className="flex items-center">
              <Maximize2 size={12} className="mr-2" />
              Scroll wheel to zoom
            </p>
            <p className="flex items-center">
              <Move3D size={12} className="mr-2" />
              Right click + drag to pan
            </p>
            <p className="flex items-center">
              <RotateCw size={12} className="mr-2" />
              Double click to focus
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="text-sm font-medium text-green-800 mb-3">Design Statistics</h4>
          <div className="text-sm text-green-700 space-y-2">
            <div className="flex justify-between">
              <span>Built-up Area:</span>
              <span className="font-medium">{Math.round(currentProject.plot.area * 0.65).toLocaleString()} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span>Open Area:</span>
              <span className="font-medium">{Math.round(currentProject.plot.area * 0.35).toLocaleString()} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span>Est. Construction:</span>
              <span className="font-medium">${Math.round(currentProject.plot.area * 150).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Completion Time:</span>
              <span className="font-medium">8-12 months</span>
            </div>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-medium text-blue-800 mb-3">Included Features</h4>
          <div className="text-sm text-blue-700 space-y-1">
            {[
              { feature: 'Garage', included: currentProject.requirements.garage },
              { feature: 'Garden', included: currentProject.requirements.garden },
              { feature: 'Balcony', included: currentProject.requirements.balcony },
              { feature: 'Study Room', included: currentProject.requirements.study },
              { feature: 'Dining Room', included: currentProject.requirements.diningRoom }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.included ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className={item.included ? 'font-medium' : 'opacity-60'}>{item.feature}</span>
              </div>
            ))}
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
              Interactive {viewMode} view • {lightingOptions.find(l => l.id === lighting)?.label} lighting
              {isAutoRotate && ' • Auto-rotating'}
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

        {/* Enhanced 3D Canvas */}
        <motion.div
          className="flex-1 bg-gradient-to-br from-blue-50 to-amber-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Canvas shadows camera={{ position: cameraPosition, fov: 60 }}>
              <PerspectiveCamera makeDefault position={cameraPosition} fov={60} />
              
              {/* Enhanced Lighting */}
              {lighting === 'day' && (
                <>
                  <ambientLight intensity={0.6} />
                  <directionalLight 
                    position={[10, 10, 5]} 
                    intensity={1.2} 
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={50}
                    shadow-camera-left={-20}
                    shadow-camera-right={20}
                    shadow-camera-top={20}
                    shadow-camera-bottom={-20}
                  />
                  <Sky sunPosition={[100, 20, 100]} />
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
                  <Sky sunPosition={[-100, 10, 100]} />
                </>
              )}
              
              {lighting === 'night' && (
                <>
                  <ambientLight intensity={0.2} color="#1e293b" />
                  <pointLight position={[0, 8, 0]} intensity={0.8} color="#fbbf24" />
                  <pointLight position={[5, 5, 5]} intensity={0.5} color="#60a5fa" />
                  <pointLight position={[-5, 5, -5]} intensity={0.5} color="#60a5fa" />
                </>
              )}

              {/* Enhanced Ground */}
              <Plane
                args={[100, 100]}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.5, 0]}
                receiveShadow
              >
                <meshStandardMaterial color="#22c55e" roughness={0.8} />
              </Plane>

              {/* House Model */}
              <House3D project={currentProject} lighting={lighting} />

              {/* Environment */}
              <Environment preset={lighting === 'night' ? 'night' : 'sunset'} />

              {/* Controls */}
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={isAutoRotate}
                autoRotateSpeed={1}
                minDistance={8}
                maxDistance={50}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
                target={[0, 2, 0]}
              />
            </Canvas>
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
};

export default View3DStep;