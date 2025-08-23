import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Lightbulb,
  Zap
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { AIMessage, Project, ElevationStyle, CostEstimate, PartialBlueprint } from '../../types';
import { AIService } from '../../services/aiService';

const AIAssistant: React.FC = () => {
  const { showAIAssistant, toggleAIAssistant, aiMessages, addAIMessage, currentStep, currentProject } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      context: currentStep
    };

    addAIMessage(userMessage);
    setInput('');
    setIsTyping(true);

    try {
      // Get AI response using the AIService
      const aiResponse = await getAIResponse(input, currentStep, currentProject);
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        context: currentStep
      };

      addAIMessage(aiMessage);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      // Handle error case
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Sorry, I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date(),
        context: currentStep
      };
      addAIMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  // Helper function to check if query is cost-related
  const isCostQuery = (query: string) => {
    return query.toLowerCase().includes('cost') ||
           query.toLowerCase().includes('budget') ||
           query.toLowerCase().includes('price') ||
           query.toLowerCase().includes('estimate');
  };

  // Helper function to check if query is elevation-related
  const isElevationQuery = (query: string) => {
    return query.toLowerCase().includes('elevation') ||
           query.toLowerCase().includes('exterior') ||
           query.toLowerCase().includes('style');
  };

  // Helper function to check if query is room layout-related
  const isRoomLayoutQuery = (query: string) => {
    return query.toLowerCase().includes('room') &&
           (query.toLowerCase().includes('layout') ||
            query.toLowerCase().includes('arrangement') ||
            query.toLowerCase().includes('placement'));
  };

  const getAIResponse = async (query: string, step: string, project: Project | null) => {
    try {
      // Handle special queries first
      if (isCostQuery(query)) {
        return await handleCostQuery(project);
      }
      
      if (isElevationQuery(query)) {
        return await handleElevationQuery(project);
      }
      
      if (isRoomLayoutQuery(query)) {
        return await handleRoomLayoutQuery(project);
      }
      
      // Use step-specific responses
      return await getStepSpecificResponse(step, project);
    } catch (error) {
      console.error('AI response generation failed:', error);
      return "I'm currently unable to process your request. Please try rephrasing or ask about a different aspect of your design.";
    }
  };

  const handleCostQuery = async (project: Project | null) => {
    if (project?.plot && project?.requirements) {
      const costEstimate: CostEstimate = await AIService.calculateCosts(project.plot, project.requirements, []);
      return `Based on your ${project.plot.width}×${project.plot.length} ft plot and requirements, the estimated cost for your project is $${costEstimate.totalCost.toLocaleString()}. This includes foundation, structure, roofing, and finishing costs. Would you like me to break down the cost estimate further?`;
    }
    return "To provide a cost estimate, I need details about your plot size and project requirements. Please fill in the project details in the Input step first.";
  };

  const handleElevationQuery = async (project: Project | null) => {
    if (project?.plot && project?.requirements) {
      const styles: ElevationStyle[] = await AIService.generateElevationStyles(project.plot, project.requirements);
      const styleNames = styles.map((style) => style.name).join(', ');
      return `I've generated some elevation style suggestions for your ${project.plot.width}×${project.plot.length} ft plot: ${styleNames}. You can select one of these styles in the Elevation step, or I can help you customize them further. Which style interests you most?`;
    }
    return "To suggest elevation styles, I need details about your plot size and project requirements. Please fill in the project details in the Input step first.";
  };

  const handleRoomLayoutQuery = async (project: Project | null) => {
    if (project?.plot && project?.requirements) {
      // Generate a blueprint for room layout suggestions
      const blueprint: PartialBlueprint = await AIService.generateBlueprint(project.plot, project.requirements);
      
      // Count the number of rooms in the blueprint
      const roomCount = blueprint.rooms?.length || 0;
      
      return `I've analyzed your requirements and created an optimized room layout for your ${project.plot.width}×${project.plot.length} ft plot. The layout includes ${roomCount} rooms with optimal flow between spaces. Would you like me to explain any specific aspect of this layout?`;
    }
    return "To suggest room layouts, I need details about your plot size and project requirements. Please fill in the project details in the Input step first.";
  };

  const getStepSpecificResponse = async (step: string, project: Project | null) => {
    switch (step) {
      case 'input':
        // For input step, we could generate suggestions based on plot size
        if (project?.plot) {
          return `Based on your ${project.plot.width}×${project.plot.length} ft plot, I recommend considering factors like local building codes, climate, and your family's needs. Would you like me to suggest room layouts?`;
        }
        return "I can help you define your project requirements! Consider factors like family size, lifestyle, budget, and local regulations. Would you like me to suggest room layouts based on your plot size?";
        
      case '2d-edit':
        // For 2D editing, we could generate room layout suggestions
        if (project?.requirements) {
          const rooms = [];
          if (project.requirements.livingRoom) rooms.push('living room');
          if (project.requirements.bedrooms > 0) rooms.push(`${project.requirements.bedrooms} bedroom${project.requirements.bedrooms > 1 ? 's' : ''}`);
          if (project.requirements.bathrooms > 0) rooms.push(`${project.requirements.bathrooms} bathroom${project.requirements.bathrooms > 1 ? 's' : ''}`);
          if (project.requirements.kitchen) rooms.push('kitchen');
          if (project.requirements.garage) rooms.push('garage');
          if (project.requirements.garden) rooms.push('garden');
          if (project.requirements.balcony) rooms.push('balcony');
          if (project.requirements.study) rooms.push('study');
          if (project.requirements.diningRoom) rooms.push('dining room');
          
          return `I see you're working on your 2D floor plan with ${rooms.join(', ')}. I can help you optimize room placement, ensure proper circulation, and maintain structural integrity. Try placing the kitchen near the dining area for better flow.`;
        }
        return "Great question about the floor plan! I can help you optimize room placement, ensure proper circulation, and maintain structural integrity. Try placing the kitchen near the dining area for better flow.";
        
      case '3d-view':
        return "The 3D model helps visualize your design! You can navigate around to check room proportions, lighting, and spatial relationships. Would you like tips on interior layouts?";
        
      case 'elevations':
        // For elevations, we could generate style suggestions
        if (project?.plot && project?.requirements) {
          return `For your ${project.plot.width}×${project.plot.length} ft plot with ${project.requirements.floors} floor${project.requirements.floors > 1 ? 's' : ''} and ${project.requirements.bedrooms} bedroom${project.requirements.bedrooms > 1 ? 's' : ''}, I recommend considering your local climate, neighborhood aesthetics, and maintenance requirements. Modern styles work well with large windows, while classic styles offer timeless appeal.`;
        }
        return "For exterior design, consider your local climate, neighborhood aesthetics, and maintenance requirements. Modern styles work well with large windows, while classic styles offer timeless appeal.";
        
      case 'export':
        return "Your design is ready for export! I can help you prepare construction documents, material lists, or presentation formats. What type of output do you need?";
        
      default:
        return "I'm here to help with your home design project! Feel free to ask about any aspect of the design process.";
    }
  };

  const getQuickSuggestions = () => {
    switch (currentStep) {
      case 'input':
        return [
          "What plot size should I consider?",
          "How many floors are ideal for my family?",
          "What rooms are essential for my lifestyle?",
          "How do I account for local building codes?"
        ];
      case '2d-edit':
        return [
          "Help me optimize room layout",
          "How should I position the kitchen?",
          "What's the ideal flow between rooms?",
          "How can I maximize natural light?"
        ];
      case '3d-view':
        return [
          "How can I improve the lighting?",
          "What interior design styles suit my layout?",
          "How do I choose the right materials?",
          "What furniture fits in this space?"
        ];
      case 'elevations':
        return [
          "Suggest elevation styles for my plot",
          "What materials work best for exteriors?",
          "How do I choose the right roof style?",
          "What colors complement my design?"
        ];
      case 'export':
        return [
          "What documents do I need for construction?",
          "How do I prepare a material list?",
          "What presentation formats are available?",
          "How do I share my design with others?"
        ];
      default:
        return [
          "Help me optimize room layout",
          "Suggest elevation styles",
          "Calculate material costs",
          "Review design standards"
        ];
    }
  };

  const quickSuggestions = getQuickSuggestions();

  return (
    <AnimatePresence>
      {showAIAssistant && (
        <motion.div
          className="fixed right-4 bottom-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-amber-100 z-50 flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Assistant</h3>
                <p className="text-xs text-amber-100">Always here to help</p>
              </div>
            </div>
            <motion.button
              onClick={toggleAIAssistant}
              className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {aiMessages.length === 0 && (
              <div className="text-center py-6">
                <Lightbulb className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm mb-4">
                  Hi! I'm your AI design assistant. I can help you with every step of your home design process.
                </p>
                <div className="space-y-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      className="block w-full text-left text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 p-2 rounded-lg transition-colors"
                      onClick={() => setInput(suggestion)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {aiMessages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'assistant' && (
                      <Bot size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User size={14} className="text-amber-100 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Bot size={14} className="text-amber-600" />
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-amber-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your design..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <motion.button
                onClick={handleSendMessage}
                className="bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                disabled={!input.trim() || isTyping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating AI Button */}
      {!showAIAssistant && (
        <motion.button
          onClick={toggleAIAssistant}
          className="fixed right-4 bottom-4 w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              "0 8px 12px -1px rgba(245, 158, 11, 0.3)",
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageSquare size={20} />
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Zap size={8} className="text-white" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default AIAssistant;