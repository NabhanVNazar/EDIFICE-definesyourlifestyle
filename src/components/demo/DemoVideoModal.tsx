import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  SkipForward, 
  SkipBack,
  Home,
  Edit3,
  Box,
  Palette,
  Download,
  Sparkles,
  Users,
  Calculator,
  Eye,
  Settings,
  CheckCircle
} from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const demoSteps = [
    {
      title: "Welcome to EDIFICE",
      description: "Your AI-powered home design companion that makes professional architecture accessible to everyone",
      timestamp: 0,
      duration: 20,
      icon: Home,
      highlights: ["No CAD experience needed", "AI-guided process", "Professional results"],
      visual: "intro"
    },
    {
      title: "Step 1: Input Your Requirements",
      description: "Tell us about your plot size, family needs, and lifestyle preferences",
      timestamp: 20,
      duration: 25,
      icon: Users,
      highlights: ["Plot dimensions", "Room requirements", "Special features", "Budget considerations"],
      visual: "input"
    },
    {
      title: "Step 2: AI Blueprint Generation",
      description: "Watch as our AI creates a custom floor plan optimized for your needs",
      timestamp: 45,
      duration: 30,
      icon: Sparkles,
      highlights: ["Intelligent room placement", "Optimal circulation", "Building code compliance", "Energy efficiency"],
      visual: "ai-generation"
    },
    {
      title: "Step 3: Interactive 2D Editor",
      description: "Customize your floor plan with professional drag-and-drop tools",
      timestamp: 75,
      duration: 35,
      icon: Edit3,
      highlights: ["Drag-and-drop rooms", "Add walls and doors", "Real-time updates", "Professional tools"],
      visual: "2d-editor"
    },
    {
      title: "Step 4: 3D Visualization",
      description: "Experience your design in immersive 3D with realistic lighting and materials",
      timestamp: 110,
      duration: 30,
      icon: Box,
      highlights: ["Walkthrough mode", "Realistic lighting", "Material preview", "Multiple camera angles"],
      visual: "3d-view"
    },
    {
      title: "Step 5: AI Elevation Styles",
      description: "Choose from AI-generated exterior designs tailored to your preferences",
      timestamp: 140,
      duration: 25,
      icon: Palette,
      highlights: ["Multiple style options", "Climate optimization", "Material suggestions", "Custom AI generation"],
      visual: "elevations"
    },
    {
      title: "Step 6: Export & Share",
      description: "Get professional files ready for construction and share your vision",
      timestamp: 165,
      duration: 20,
      icon: Download,
      highlights: ["PDF documentation", "CAD files", "Cost estimates", "Shareable links"],
      visual: "export"
    }
  ];

  const visualElements = {
    intro: (
      <div className="text-center space-y-6">
        <motion.div
          className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Home size={48} className="text-white" />
        </motion.div>
        <div className="grid grid-cols-3 gap-4">
          {['AI-Powered', 'User-Friendly', 'Professional'].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-4 rounded-lg shadow-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            >
              <p className="text-sm font-medium text-amber-900">{feature}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    input: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="bg-amber-100 p-4 rounded-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h4 className="font-medium text-amber-900 mb-2">Plot Details</h4>
            <div className="space-y-1 text-sm text-amber-800">
              <p>Width: 50 ft</p>
              <p>Length: 60 ft</p>
              <p>Area: 3,000 sq ft</p>
            </div>
          </motion.div>
          <motion.div
            className="bg-blue-100 p-4 rounded-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <h4 className="font-medium text-blue-900 mb-2">Requirements</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p>3 Bedrooms</p>
              <p>2.5 Bathrooms</p>
              <p>2 Floors</p>
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center">
          <motion.div
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Requirements Complete</span>
          </motion.div>
        </div>
      </div>
    ),
    'ai-generation': (
      <div className="text-center space-y-6">
        <motion.div
          className="relative w-48 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mx-auto flex items-center justify-center"
          animate={{ 
            background: [
              "linear-gradient(135deg, #8B5CF6, #3B82F6)",
              "linear-gradient(135deg, #F59E0B, #EF4444)",
              "linear-gradient(135deg, #10B981, #8B5CF6)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles size={32} className="text-white" />
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
          {['Analyzing Requirements', 'Optimizing Layout', 'Checking Codes', 'Finalizing Design'].map((step, i) => (
            <motion.div
              key={i}
              className="bg-white p-3 rounded-lg shadow-md border-l-4 border-amber-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.5, duration: 0.5 }}
            >
              <p className="text-xs font-medium text-gray-800">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    '2d-editor': (
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {['Living Room', 'Kitchen', 'Bedroom 1', 'Bedroom 2', 'Bedroom 3', 'Bathroom 1', 'Bathroom 2', 'Dining'].map((room, i) => (
              <motion.div
                key={i}
                className="bg-amber-100 p-2 rounded text-xs text-center text-amber-900"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                {room}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center space-x-2">
            {[Edit3, Settings, Eye].map((Icon, i) => (
              <motion.div
                key={i}
                className="bg-amber-500 text-white p-2 rounded-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              >
                <Icon size={16} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
    '3d-view': (
      <div className="space-y-4">
        <motion.div
          className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-lg text-white text-center"
          animate={{ 
            background: [
              "linear-gradient(135deg, #1e3a8a, #7c3aed)",
              "linear-gradient(135deg, #0f172a, #1e293b)",
              "linear-gradient(135deg, #1e3a8a, #7c3aed)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Box size={32} className="mx-auto mb-3" />
          <p className="text-sm font-medium">Immersive 3D Experience</p>
        </motion.div>
        <div className="grid grid-cols-3 gap-2">
          {['Orbit View', 'Walkthrough', 'Interior'].map((mode, i) => (
            <motion.div
              key={i}
              className="bg-blue-100 text-blue-900 p-2 rounded text-xs text-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
            >
              {mode}
            </motion.div>
          ))}
        </div>
      </div>
    ),
    elevations: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {['Modern', 'Traditional', 'Contemporary', 'AI Custom'].map((style, i) => (
            <motion.div
              key={i}
              className="bg-white p-3 rounded-lg shadow-md border-2 border-amber-200"
              animate={{ borderColor: ['#FCD34D', '#F59E0B', '#FCD34D'] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            >
              <div className="w-full h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded mb-2" />
              <p className="text-xs font-medium text-center text-amber-900">{style}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="bg-purple-100 p-3 rounded-lg text-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Sparkles size={20} className="text-purple-600 mx-auto mb-1" />
          <p className="text-xs font-medium text-purple-900">AI Generating Custom Styles</p>
        </motion.div>
      </div>
    ),
    export: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'PDF Package', icon: Download },
            { name: 'CAD Files', icon: Settings },
            { name: 'Cost Report', icon: Calculator },
            { name: 'Share Link', icon: Eye }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                className="bg-green-100 p-3 rounded-lg text-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              >
                <Icon size={20} className="text-green-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-green-900">{item.name}</p>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          className="bg-amber-500 text-white p-3 rounded-lg text-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <CheckCircle size={20} className="mx-auto mb-1" />
          <p className="text-sm font-medium">Design Complete!</p>
        </motion.div>
      </div>
    )
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skipToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setProgress((stepIndex / (demoSteps.length - 1)) * 100);
  };

  const nextStep = () => {
    const next = Math.min(currentStep + 1, demoSteps.length - 1);
    skipToStep(next);
  };

  const prevStep = () => {
    const prev = Math.max(currentStep - 1, 0);
    skipToStep(prev);
  };

  // Auto-advance demo steps when playing
  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      if (currentStep < demoSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setProgress(prev => Math.min(prev + (100 / demoSteps.length), 100));
      } else {
        setIsPlaying(false);
        setProgress(100);
      }
    }, demoSteps[currentStep]?.duration * 100 || 3000);

    return () => clearInterval(timer);
  }, [isPlaying, currentStep]);

  const currentStepData = demoSteps[currentStep];
  const StepIcon = currentStepData?.icon || Home;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">EDIFICE Complete Demo</h2>
                <p className="text-amber-100">Interactive walkthrough of the complete home design process</p>
              </div>
              <motion.button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-3 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            <div className="flex h-[600px]">
              {/* Main Demo Area */}
              <div className="flex-1 flex flex-col">
                {/* Current Step Display */}
                <div className="bg-gradient-to-br from-gray-50 to-amber-50 p-8 flex-1 flex items-center justify-center">
                  <div className="max-w-2xl w-full">
                    {/* Step Header */}
                    <motion.div
                      key={currentStep}
                      className="text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 rounded-full">
                          <StepIcon size={32} className="text-white" />
                        </div>
                        <div className="ml-4 text-left">
                          <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                            Step {currentStep + 1} of {demoSteps.length}
                          </div>
                          <h3 className="text-2xl font-bold text-amber-900">{currentStepData?.title}</h3>
                        </div>
                      </div>
                      <p className="text-lg text-amber-700 max-w-xl mx-auto leading-relaxed">
                        {currentStepData?.description}
                      </p>
                    </motion.div>

                    {/* Visual Demo Content */}
                    <motion.div
                      key={`visual-${currentStep}`}
                      className="mb-8"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {visualElements[currentStepData?.visual as keyof typeof visualElements]}
                    </motion.div>

                    {/* Step Highlights */}
                    <motion.div
                      key={`highlights-${currentStep}`}
                      className="grid grid-cols-2 gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {currentStepData?.highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          className="bg-white p-3 rounded-lg shadow-md border border-amber-200 flex items-center space-x-2"
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          <div className="w-2 h-2 bg-amber-500 rounded-full" />
                          <span className="text-sm text-amber-900 font-medium">{highlight}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="bg-gray-900 p-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.button
                      onClick={prevStep}
                      className="text-white hover:text-amber-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SkipBack size={24} />
                    </motion.button>

                    <motion.button
                      onClick={togglePlay}
                      className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </motion.button>

                    <motion.button
                      onClick={nextStep}
                      className="text-white hover:text-amber-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SkipForward size={24} />
                    </motion.button>

                    <div className="flex-1 mx-4">
                      <div className="bg-white/20 rounded-full h-2 relative">
                        <motion.div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-300 mt-1">
                        <span>0:00</span>
                        <span>{Math.floor(demoSteps.reduce((sum, step) => sum + step.duration, 0) / 60)}:{(demoSteps.reduce((sum, step) => sum + step.duration, 0) % 60).toString().padStart(2, '0')}</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={toggleMute}
                      className="text-white hover:text-amber-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </motion.button>

                    <motion.button
                      className="text-white hover:text-amber-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Maximize size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Enhanced Steps Sidebar */}
              <div className="w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto">
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Sparkles size={20} className="text-amber-500 mr-2" />
                    Demo Walkthrough
                  </h3>
                  
                  <div className="space-y-3">
                    {demoSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = currentStep === index;
                      const isCompleted = currentStep > index;
                      
                      return (
                        <motion.button
                          key={index}
                          onClick={() => skipToStep(index)}
                          className={`w-full text-left p-4 rounded-lg transition-all ${
                            isActive
                              ? 'bg-amber-100 border-2 border-amber-300 text-amber-900'
                              : isCompleted
                              ? 'bg-green-50 border border-green-200 text-green-900'
                              : 'hover:bg-white border border-gray-200 text-gray-700'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              isActive
                                ? 'bg-amber-500 text-white'
                                : isCompleted
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-300 text-gray-600'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle size={16} />
                              ) : (
                                <Icon size={16} />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                              <p className="text-xs opacity-75 mb-2 leading-relaxed">{step.description}</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs opacity-60">{step.duration}s</span>
                                {isActive && (
                                  <motion.div
                                    className="w-2 h-2 bg-amber-500 rounded-full"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Demo Features */}
                  <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Star size={16} className="text-amber-500 mr-2" />
                      What You'll Learn
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <span>Complete design workflow from start to finish</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <span>AI-powered design generation and optimization</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <span>Professional 2D and 3D design tools</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <span>Cost estimation and material planning</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <span>Export options for construction</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <span>AI assistant guidance throughout</span>
                      </li>
                    </ul>
                  </div>

                  {/* Key Benefits */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3">Why EDIFICE?</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="flex items-center space-x-2">
                        <Zap size={14} className="text-blue-600" />
                        <span>10x faster than traditional design methods</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Brain size={14} className="text-blue-600" />
                        <span>AI-powered optimization and suggestions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calculator size={14} className="text-blue-600" />
                        <span>Accurate cost estimation and planning</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users size={14} className="text-blue-600" />
                        <span>No architectural experience required</span>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-6 text-center">
                    <motion.button
                      onClick={onClose}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Designing Now
                    </motion.button>
                    <p className="text-xs text-gray-500 mt-2">Free to start • No credit card required</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DemoVideoModal;