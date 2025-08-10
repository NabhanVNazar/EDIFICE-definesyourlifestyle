import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Star, 
  Check, 
  ArrowRight,
  Home,
  Building,
  TreePine,
  Brush
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { ElevationStyle } from '../../types';

const ElevationsStep: React.FC = () => {
  const { currentProject, setCurrentStep } = useAppStore();
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  const elevationStyles: ElevationStyle[] = [
    {
      id: 'modern',
      name: 'Modern Minimalist',
      description: 'Clean lines, large windows, neutral colors',
      thumbnail: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Floor-to-ceiling windows', 'Flat rooflines', 'Minimal ornamentation', 'Steel and glass'],
      materials: ['Concrete', 'Steel', 'Glass', 'Stone']
    },
    {
      id: 'contemporary',
      name: 'Contemporary Style',
      description: 'Mixed materials, asymmetrical design, bold features',
      thumbnail: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Mixed textures', 'Large overhangs', 'Natural lighting', 'Open concepts'],
      materials: ['Wood', 'Stone', 'Metal', 'Stucco']
    },
    {
      id: 'traditional',
      name: 'Traditional Classic',
      description: 'Timeless design, symmetrical layout, classic proportions',
      thumbnail: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Symmetrical design', 'Classic columns', 'Traditional materials', 'Pitched roofs'],
      materials: ['Brick', 'Wood', 'Stone', 'Slate']
    },
    {
      id: 'craftsman',
      name: 'Craftsman Style',
      description: 'Natural materials, handcrafted details, cozy proportions',
      thumbnail: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Natural materials', 'Exposed beams', 'Built-in furniture', 'Front porches'],
      materials: ['Wood', 'Stone', 'Brick', 'Shingles']
    },
    {
      id: 'mediterranean',
      name: 'Mediterranean Villa',
      description: 'Warm colors, arched windows, tile roofs, courtyard layouts',
      thumbnail: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Tile roofing', 'Arched openings', 'Stucco walls', 'Courtyards'],
      materials: ['Stucco', 'Clay tiles', 'Stone', 'Wrought iron']
    },
    {
      id: 'farmhouse',
      name: 'Modern Farmhouse',
      description: 'Rustic charm meets modern comfort, board and batten siding',
      thumbnail: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Board and batten', 'Metal roofing', 'Front porches', 'Barn doors'],
      materials: ['Wood siding', 'Metal', 'Stone', 'Shiplap']
    }
  ];

  const handleContinue = () => {
    setCurrentStep('export');
  };

  if (!currentProject) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-amber-600">No project selected</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-amber-900 mb-4 flex items-center justify-center">
            <Palette className="mr-4" size={36} />
            Choose Your Elevation Style
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Select the exterior design that best matches your vision. Our AI will customize it to your specific requirements.
          </p>
        </motion.div>

        {/* Project Summary */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-amber-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
            <Home className="mr-3" size={20} />
            {currentProject.name}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-amber-50 p-3 rounded-lg">
              <p className="text-amber-600 font-medium">Plot Size</p>
              <p className="text-amber-900">{currentProject.plot.width} × {currentProject.plot.length} ft</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-600 font-medium">Floors</p>
              <p className="text-blue-900">{currentProject.requirements.floors} floor{currentProject.requirements.floors > 1 ? 's' : ''}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-600 font-medium">Bedrooms</p>
              <p className="text-green-900">{currentProject.requirements.bedrooms} bedroom{currentProject.requirements.bedrooms > 1 ? 's' : ''}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-purple-600 font-medium">Kitchen</p>
              <p className="text-purple-900">{currentProject.requirements.kitchen} style</p>
            </div>
          </div>
        </motion.div>

        {/* Style Selection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {elevationStyles.map((style, index) => (
            <motion.div
              key={style.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all cursor-pointer ${
                selectedStyle === style.id
                  ? 'border-amber-500 shadow-xl'
                  : 'border-gray-100 hover:border-amber-300 hover:shadow-lg'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              onClick={() => setSelectedStyle(style.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={style.thumbnail}
                  alt={style.name}
                  className="w-full h-full object-cover"
                />
                {selectedStyle === style.id && (
                  <div className="absolute inset-0 bg-amber-500 bg-opacity-20 flex items-center justify-center">
                    <div className="bg-amber-500 text-white p-2 rounded-full">
                      <Check size={24} />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{style.name}</h3>
                <p className="text-amber-700 text-sm mb-4">{style.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
                    <Star size={14} className="mr-1" />
                    Key Features
                  </h4>
                  <ul className="text-xs text-amber-600 space-y-1">
                    {style.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-1 h-1 bg-amber-400 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials */}
                <div>
                  <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
                    <Brush size={14} className="mr-1" />
                    Materials
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {style.materials.map((material, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Customization Note */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Building size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">AI-Powered Customization</h3>
              <p className="text-blue-700 mb-3">
                Our AI will automatically adapt your selected style to match your specific requirements, plot dimensions, and local building codes.
              </p>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Optimized for your {currentProject.plot.width} × {currentProject.plot.length} ft plot</li>
                <li>• Integrated with your {currentProject.requirements.floors}-floor layout</li>
                <li>• Customized for {currentProject.requirements.bedrooms} bedrooms and {currentProject.requirements.bathrooms} bathrooms</li>
                <li>• Includes your selected features (garage, garden, etc.)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={handleContinue}
            disabled={!selectedStyle}
            className={`px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center space-x-3 ${
              selectedStyle
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-xl cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={selectedStyle ? { scale: 1.05, y: -2 } : {}}
            whileTap={selectedStyle ? { scale: 0.95 } : {}}
          >
            <TreePine size={20} />
            <span>Generate Final Design</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ElevationsStep;