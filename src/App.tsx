import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from './store/useAppStore';
import LandingPage from './components/landing/LandingPage';

// Components
import Header from './components/common/Header';
import WorkflowStepper from './components/workflow/WorkflowStepper';
import AIAssistant from './components/ai/AIAssistant';

// Steps
import InputStep from './components/steps/InputStep';
import Blueprint2DStep from './components/steps/Blueprint2DStep';
import View3DStep from './components/steps/View3DStep';
import ElevationsStep from './components/steps/ElevationsStep';
import ExportStep from './components/steps/ExportStep';          

const App: React.FC = () => {
  const { currentStep, user } = useAppStore();
  const [showLanding, setShowLanding] = React.useState(true);

  // Show main app if user is logged in or has started designing
  const showMainApp = user || !showLanding;

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  if (!showMainApp) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'input':
        return <InputStep />;
      case '2d-edit':
        return <Blueprint2DStep />;
      case '3d-view':
        return <View3DStep />;
      case 'elevations':
        return <ElevationsStep />;
      case 'export':
        return <ExportStep />;
      default:
        return <InputStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <WorkflowStepper />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={currentStep}
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {renderStep()}
        </motion.main>
      </AnimatePresence>

      <AIAssistant />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#F59E0B" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    </div>
  );
};

export default App;