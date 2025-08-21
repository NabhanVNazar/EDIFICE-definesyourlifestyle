import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Edit3,
  Box,
  Palette,
  Download,
  CheckCircle
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { WorkflowStep } from '../../types';

const steps = [
  { id: 'input', label: 'Input', icon: FileText, description: 'Project requirements' },
  { id: '2d-edit', label: '2D Blueprint', icon: Edit3, description: 'Floor plan editor' },
  { id: '3d-view', label: '3D Model', icon: Box, description: 'Walkthrough view' },
  { id: 'elevations', label: 'Elevations', icon: Palette, description: 'Exterior design' },
  { id: 'export', label: 'Export', icon: Download, description: 'Final delivery' }
];

const WorkflowStepper: React.FC = () => {
  const { currentStep, setCurrentStep } = useAppStore();
  
  const getStepIndex = (step: WorkflowStep) => steps.findIndex(s => s.id === step);
  const currentStepIndex = getStepIndex(currentStep);

  return (
    <div className="bg-white shadow-sm border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;
              const isClickable = index <= currentStepIndex + 1;

              return (
                <div key={step.id} className="flex items-center">
                  <motion.button
                    className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                      isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => isClickable && setCurrentStep(step.id as WorkflowStep)}
                    whileHover={isClickable ? { scale: 1.05 } : {}}
                    whileTap={isClickable ? { scale: 0.95 } : {}}
                    disabled={!isClickable}
                  >
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-amber-600 text-white shadow-lg' 
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : (
                        <Icon size={20} />
                      )}
                      
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-amber-300"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-amber-900' : isCompleted ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </motion.button>
                  
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 w-16 mx-2 transition-colors duration-300 ${
                      index < currentStepIndex ? 'bg-green-400' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowStepper;