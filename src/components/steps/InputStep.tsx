import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Maximize, 
  Users, 
  Bath, 
  ChefHat, 
  Car,
  TreePine,
  Building,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Plot, Requirements, Project } from '../../types';
import { AIService } from '../../services/aiService';

const InputStep: React.FC = () => {
  const { setCurrentStep, addProject, user } = useAppStore();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [plot, setPlot] = useState<Plot>({
    type: 'residential',
    width: 40,
    length: 60,
    area: 2400
  });

  const [requirements, setRequirements] = useState<Requirements>({
    floors: 2,
    bedrooms: 3,
    bathrooms: 2,
    kitchen: 'open',
    garage: true,
    garden: true,
    balcony: false,
    study: false,
    diningRoom: true,
    livingRoom: true
  });

  const [projectName, setProjectName] = useState('My Dream Home');

  const handlePlotChange = (key: keyof Plot, value: number | string) => {
    const updatedPlot = { ...plot, [key]: value };
    if (key === 'width' || key === 'length') {
      updatedPlot.area = updatedPlot.width * updatedPlot.length;
    }
    setPlot(updatedPlot);
  };

  const handleContinue = async () => {
    setIsGenerating(true);
    
    const project: Project = {
      id: Date.now().toString(),
      name: projectName,
      description: `${plot.type} property with ${requirements.bedrooms} bedrooms`,
      plot,
      requirements,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      // Generate AI blueprint
      const blueprint = await AIService.generateBlueprint(plot, requirements);
      project.blueprint = blueprint as any;
      
      addProject(project);
      setCurrentStep('2d-edit');
    } catch (error) {
      console.error('Failed to generate blueprint:', error);
      // Continue anyway with basic project
      addProject(project);
      setCurrentStep('2d-edit');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.h1 
            className="text-4xl font-bold text-amber-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Let's Design Your Dream Home
          </motion.h1>
          <motion.p 
            className="text-lg text-amber-700 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Tell us about your requirements and our AI will create a personalized design just for you
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Project Info */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center">
              <Home className="mr-3 text-amber-600" size={24} />
              Project Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-800 mb-3">
                  Plot Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'residential', label: 'Residential', icon: Home },
                    { value: 'commercial', label: 'Commercial', icon: Building },
                    { value: 'mixed', label: 'Mixed Use', icon: Building }
                  ].map(({ value, label, icon: Icon }) => (
                    <motion.button
                      key={value}
                      onClick={() => handlePlotChange('type', value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        plot.type === value
                          ? 'border-amber-500 bg-amber-50 text-amber-900'
                          : 'border-gray-200 hover:border-amber-300 text-gray-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={20} className="mx-auto mb-2" />
                      <span className="text-sm font-medium">{label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Width (ft)
                  </label>
                  <input
                    type="number"
                    value={plot.width}
                    onChange={(e) => handlePlotChange('width', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Length (ft)
                  </label>
                  <input
                    type="number"
                    value={plot.length}
                    onChange={(e) => handlePlotChange('length', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-amber-800 font-medium flex items-center">
                  <Maximize className="mr-2" size={16} />
                  Total Area: {plot.area.toLocaleString()} sq ft
                </p>
              </div>
            </div>
          </motion.div>

          {/* Requirements */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center">
              <Users className="mr-3 text-amber-600" size={24} />
              Requirements
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Floors
                  </label>
                  <select
                    value={requirements.floors}
                    onChange={(e) => setRequirements({...requirements, floors: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num} Floor{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={requirements.bedrooms}
                    onChange={(e) => setRequirements({...requirements, bedrooms: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} Bedroom{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Bathrooms
                  </label>
                  <select
                    value={requirements.bathrooms}
                    onChange={(e) => setRequirements({...requirements, bathrooms: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {[1, 1.5, 2, 2.5, 3, 3.5, 4].map(num => (
                      <option key={num} value={num}>{num} Bathroom{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Kitchen Style
                  </label>
                  <select
                    value={requirements.kitchen}
                    onChange={(e) => setRequirements({...requirements, kitchen: e.target.value as 'open' | 'closed' | 'island'})}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="open">Open Kitchen</option>
                    <option value="closed">Closed Kitchen</option>
                    <option value="island">Island Kitchen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-800 mb-3">
                  Additional Features
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'garage', label: 'Garage', icon: Car },
                    { key: 'garden', label: 'Garden', icon: TreePine },
                    { key: 'balcony', label: 'Balcony', icon: Building },
                    { key: 'study', label: 'Study Room', icon: Home },
                    { key: 'diningRoom', label: 'Dining Room', icon: ChefHat },
                    { key: 'livingRoom', label: 'Living Room', icon: Home }
                  ].map(({ key, label, icon: Icon }) => (
                    <motion.label
                      key={key}
                      className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        requirements[key as keyof Requirements]
                          ? 'border-amber-500 bg-amber-50 text-amber-900'
                          : 'border-gray-200 hover:border-amber-300 text-gray-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="checkbox"
                        checked={requirements[key as keyof Requirements] as boolean}
                        onChange={(e) => setRequirements({...requirements, [key]: e.target.checked})}
                        className="sr-only"
                      />
                      <Icon size={16} className="mr-2" />
                      <span className="text-sm font-medium">{label}</span>
                    </motion.label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Continue Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={handleContinue}
            disabled={isGenerating}
            className={`px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center space-x-3 ${
              isGenerating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-xl'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating AI Blueprint...</span>
              </>
            ) : (
              <>
                <Sparkles size={20} />
                <span>Generate AI Blueprint</span>
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InputStep;