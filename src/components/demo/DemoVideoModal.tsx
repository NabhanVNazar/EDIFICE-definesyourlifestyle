import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const demoSteps = [
    {
      title: "Welcome to EDIFICE",
      description: "Your AI-powered home design companion",
      timestamp: 0,
      duration: 15
    },
    {
      title: "Step 1: Input Requirements",
      description: "Tell us about your plot size, rooms, and preferences",
      timestamp: 15,
      duration: 30
    },
    {
      title: "Step 2: AI Blueprint Generation",
      description: "Watch as AI creates your custom floor plan",
      timestamp: 45,
      duration: 25
    },
    {
      title: "Step 3: 2D Blueprint Editor",
      description: "Edit and customize your floor plan with drag-and-drop tools",
      timestamp: 70,
      duration: 35
    },
    {
      title: "Step 4: 3D Visualization",
      description: "Walk through your design in immersive 3D",
      timestamp: 105,
      duration: 30
    },
    {
      title: "Step 5: Elevation Styles",
      description: "Choose from AI-generated exterior designs",
      timestamp: 135,
      duration: 25
    },
    {
      title: "Step 6: Export & Share",
      description: "Get professional files ready for construction",
      timestamp: 160,
      duration: 20
    }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skipToStep = (stepIndex: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = demoSteps[stepIndex].timestamp;
      setCurrentStep(stepIndex);
    }
  };

  const nextStep = () => {
    const next = Math.min(currentStep + 1, demoSteps.length - 1);
    skipToStep(next);
  };

  const prevStep = () => {
    const prev = Math.max(currentStep - 1, 0);
    skipToStep(prev);
  };

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const step = demoSteps.findIndex((step, index) => {
        const nextStep = demoSteps[index + 1];
        return currentTime >= step.timestamp && (!nextStep || currentTime < nextStep.timestamp);
      });
      if (step !== -1 && step !== currentStep) {
        setCurrentStep(step);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentStep]);

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
            className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">EDIFICE Demo</h2>
                <p className="text-amber-100 text-sm">Complete walkthrough of the home design process</p>
              </div>
              <motion.button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="flex">
              {/* Video Player */}
              <div className="flex-1 bg-black relative">
                {/* Simulated Video Player */}
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                  {/* Demo Content Simulation */}
                  <div className="text-center text-white p-8">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl font-bold">{currentStep + 1}</span>
                      </div>
                      <h3 className="text-2xl font-bold">{demoSteps[currentStep].title}</h3>
                      <p className="text-gray-300 text-lg max-w-md mx-auto">
                        {demoSteps[currentStep].description}
                      </p>
                      
                      {/* Demo Visual Elements */}
                      <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="h-16 bg-amber-500/20 rounded-lg"
                            animate={{ 
                              scale: [1, 1.05, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: i * 0.2 
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        onClick={prevStep}
                        className="text-white hover:text-amber-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <SkipBack size={20} />
                      </motion.button>

                      <motion.button
                        onClick={togglePlay}
                        className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </motion.button>

                      <motion.button
                        onClick={nextStep}
                        className="text-white hover:text-amber-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <SkipForward size={20} />
                      </motion.button>

                      <div className="flex-1">
                        <div className="bg-white/20 rounded-full h-1 relative">
                          <motion.div
                            className="bg-amber-500 h-1 rounded-full"
                            style={{ 
                              width: `${((currentStep + 1) / demoSteps.length) * 100}%` 
                            }}
                            transition={{ duration: 0.3 }}
                          />
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
              </div>

              {/* Steps Sidebar */}
              <div className="w-80 bg-gray-50 p-4 overflow-y-auto">
                <h3 className="font-semibold text-gray-900 mb-4">Demo Steps</h3>
                <div className="space-y-2">
                  {demoSteps.map((step, index) => (
                    <motion.button
                      key={index}
                      onClick={() => skipToStep(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        currentStep === index
                          ? 'bg-amber-100 border border-amber-300 text-amber-900'
                          : 'hover:bg-white border border-gray-200 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          currentStep === index
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{step.title}</h4>
                          <p className="text-xs opacity-75 mt-1">{step.description}</p>
                          <p className="text-xs opacity-50 mt-1">{step.duration}s</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Demo Features */}
                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">What You'll Learn</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      <span>How to input your requirements</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      <span>AI blueprint generation process</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      <span>Using the 2D editor tools</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      <span>3D visualization features</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      <span>Choosing elevation styles</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      <span>Exporting your design</span>
                    </li>
                  </ul>
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