import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Star, 
  Check, 
  ArrowRight,
  Home,
  Building,
  TreePine,
  Brush,
  Sparkles,
  Wand2,
  RefreshCw,
  Download,
  Eye,
  Heart
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { ElevationStyle } from '../../types';
import { AdvancedAIService } from '../../services/advancedAIService';

const ElevationsStep: React.FC = () => {
  const { currentProject, setCurrentStep } = useAppStore();
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<ElevationStyle[]>([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [designImage, setDesignImage] = useState<string>('');

  const baseElevationStyles: ElevationStyle[] = [
    {
      id: 'modern',
      name: 'Modern Minimalist',
      description: 'Clean lines, large windows, neutral colors with steel and glass elements',
      thumbnail: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Floor-to-ceiling windows', 'Flat rooflines', 'Minimal ornamentation', 'Steel and glass facade'],
      materials: ['Concrete', 'Steel', 'Glass', 'Stone']
    },
    {
      id: 'contemporary',
      name: 'Contemporary Fusion',
      description: 'Mixed materials, asymmetrical design, bold architectural features',
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

  const generateAISuggestions = async () => {
    if (!currentProject) return;

    setIsGenerating(true);
    
    try {
      const suggestions = await AdvancedAIService.generateAdvancedElevations(
        currentProject.plot,
        currentProject.requirements,
        customPrompt.trim() || undefined
      );
      
      setAiSuggestions(suggestions);
      setIsGenerating(false);
      setShowAiSuggestions(true);
    } catch (error) {
      console.error('Failed to generate AI suggestions:', error);
      setIsGenerating(false);
    }
  };

  const handleContinue = () => {
    setCurrentStep('export');
  };

  const handlePreview = () => {
    // In a real app, this would generate the actual design
    // For now, we'll use a placeholder image
    setDesignImage('https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200');
    setIsPreviewing(true);
  };

  const handleBackToSelection = () => {
    setIsPreviewing(false);
  };

  if (!currentProject) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-amber-600">No project selected</p>
      </div>
    );
  }

  const allStyles = showAiSuggestions ? [...aiSuggestions, ...baseElevationStyles] : baseElevationStyles;

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
            Select the exterior design that best matches your vision. Our AI will customize it to your specific requirements and local climate.
          </p>
        </motion.div>

        {/* AI Generation Section */}
        <motion.div
          className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8 border border-purple-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Wand2 size={24} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">AI-Powered Custom Designs</h3>
              <p className="text-purple-700 mb-4">
                Let our AI create personalized elevation designs based on your project requirements, local climate, and architectural preferences.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-800 mb-2">
                  Describe your ideal home exterior (optional):
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g., 'I want a modern home with large windows, natural stone accents, and a welcoming entrance...'"
                  className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <motion.button
                onClick={generateAISuggestions}
                disabled={isGenerating}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  isGenerating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
                }`}
                whileHover={!isGenerating ? { scale: 1.02 } : {}}
                whileTap={!isGenerating ? { scale: 0.98 } : {}}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Generating AI Designs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Generate AI Suggestions</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">AI is Creating Your Custom Designs</h3>
                <p className="text-amber-700 mb-4">
                  Analyzing your requirements: {currentProject.plot.width}×{currentProject.plot.length} ft plot, 
                  {currentProject.requirements.floors} floors, {currentProject.requirements.bedrooms} bedrooms
                </p>
                <div className="flex justify-center space-x-4 text-sm text-amber-600">
                  <span>🏗️ Optimizing layout</span>
                  <span>🎨 Selecting materials</span>
                  <span>🌿 Climate adaptation</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Summary */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-amber-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
            <Home className="mr-3" size={20} />
            {currentProject?.name || 'Untitled Project'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="bg-amber-50 p-3 rounded-lg">
              <p className="text-amber-600 font-medium">Plot Size</p>
              <p className="text-amber-900">{currentProject?.plot?.width ?? '-'} × {currentProject?.plot?.length ?? '-'} ft</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-600 font-medium">Floors</p>
              <p className="text-blue-900">{currentProject?.requirements?.floors ?? '-'} floor{(currentProject?.requirements?.floors ?? 1) > 1 ? 's' : ''}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-600 font-medium">Bedrooms</p>
              <p className="text-green-900">{currentProject?.requirements?.bedrooms ?? '-'} bedroom{(currentProject?.requirements?.bedrooms ?? 1) > 1 ? 's' : ''}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-purple-600 font-medium">Kitchen</p>
              <p className="text-purple-900">{currentProject?.requirements?.kitchen ?? '-'}</p>
            </div>
            <div className="bg-pink-50 p-3 rounded-lg">
              <p className="text-pink-600 font-medium">Features</p>
              <p className="text-pink-900">
                {[
                  currentProject?.requirements?.garage && 'Garage',
                  currentProject?.requirements?.garden && 'Garden',
                  currentProject?.requirements?.balcony && 'Balcony'
                ].filter(Boolean).join(', ') || 'Basic'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Style Selection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {allStyles.map((style, index) => {
            const isAiGenerated = style.id.startsWith('ai-');
            return (
              <motion.div
                key={style.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all cursor-pointer relative ${
                  selectedStyle === style.id
                    ? 'border-amber-500 shadow-xl ring-2 ring-amber-200'
                    : 'border-gray-100 hover:border-amber-300 hover:shadow-lg'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                onClick={() => setSelectedStyle(style.id)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* AI Badge */}
                {isAiGenerated && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Sparkles size={10} />
                      <span>AI Generated</span>
                    </div>
                  </div>
                )}

                {/* Selection Indicator */}
                {selectedStyle === style.id && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-amber-500 text-white p-2 rounded-full">
                      <Check size={16} />
                    </div>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={style.thumbnail}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {selectedStyle === style.id && (
                    <div className="absolute inset-0 bg-amber-500 bg-opacity-20 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 p-3 rounded-full">
                        <Heart size={24} className="text-amber-600" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">{style.name}</h3>
                  <p className="text-amber-700 text-sm mb-4 leading-relaxed">{style.description}</p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
                      <Star size={14} className="mr-1" />
                      Key Features
                    </h4>
                    <ul className="text-xs text-amber-600 space-y-1">
                      {style.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                      {style.features.length > 3 && (
                        <li className="text-amber-500 font-medium">
                          +{style.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Materials */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
                      <Brush size={14} className="mr-1" />
                      Materials
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {style.materials.map((material, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs rounded-full ${
                            isAiGenerated
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg transition-colors text-sm">
                      <Eye size={14} />
                      <span>Preview</span>
                    </button>
                    <button className="flex items-center justify-center p-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Preview Section */}
        {selectedStyle && !isPreviewing && (
          <motion.div
            className="text-center mb-8 p-4 bg-amber-50 rounded-lg border border-amber-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-amber-800 font-medium flex items-center justify-center space-x-2 mb-4">
              <Check size={16} className="text-green-600" />
              <span>Selected: {allStyles.find(s => s.id === selectedStyle)?.name}</span>
            </p>
            <motion.button
              onClick={handlePreview}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Preview Design
            </motion.button>
          </motion.div>
        )}

        {/* Design Preview */}
        {isPreviewing && selectedStyle && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-amber-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6 border-b border-amber-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-amber-900">Design Preview</h2>
                <motion.button
                  onClick={handleBackToSelection}
                  className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Selection
                </motion.button>
              </div>
              <p className="text-amber-700 mt-2">
                Preview of your selected {allStyles.find(s => s.id === selectedStyle)?.name} style
              </p>
            </div>
            
            <div className="p-4 bg-gray-50">
              <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200">
                {designImage ? (
                  <img
                    src={designImage}
                    alt="Design preview"
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-100">
                    <div className="text-gray-400">Design preview loading...</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center">
                <motion.button
                  onClick={handleContinue}
                  className="px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Check size={20} />
                  <span>Proceed to Export</span>
                  <ArrowRight size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

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
                Our AI will automatically adapt your selected style to match your specific requirements, plot dimensions, local building codes, and climate conditions.
              </p>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Optimized for your {currentProject.plot.width} × {currentProject.plot.length} ft plot</li>
                <li>• Integrated with your {currentProject.requirements.floors}-floor layout</li>
                <li>• Customized for {currentProject.requirements.bedrooms} bedrooms and {currentProject.requirements.bathrooms} bathrooms</li>
                <li>• Includes your selected features (garage, garden, balcony, etc.)</li>
                <li>• Climate-responsive design elements</li>
                <li>• Energy-efficient material recommendations</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        {!isPreviewing && (
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
        )}
      </div>
    </div>
  );
};

export default ElevationsStep;