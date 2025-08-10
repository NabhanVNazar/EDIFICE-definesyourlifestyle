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
import { AIMessage } from '../../types';

const AIAssistant: React.FC = () => {
  const { showAIAssistant, toggleAIAssistant, aiMessages, addAIMessage, currentStep } = useAppStore();
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

    // Simulate AI response
    setTimeout(() => {
      const responses = getContextualResponse(input, currentStep);
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses,
        timestamp: new Date(),
        context: currentStep
      };

      addAIMessage(aiMessage);
      setIsTyping(false);
    }, 1500);
  };

  const getContextualResponse = (query: string, step: string) => {
    const responses = {
      input: "I can help you define your project requirements! Consider factors like family size, lifestyle, budget, and local regulations. Would you like me to suggest room layouts based on your plot size?",
      '2d-edit': "Great question about the floor plan! I can help you optimize room placement, ensure proper circulation, and maintain structural integrity. Try placing the kitchen near the dining area for better flow.",
      '3d-view': "The 3D model helps visualize your design! You can navigate around to check room proportions, lighting, and spatial relationships. Would you like tips on interior layouts?",
      elevations: "For exterior design, consider your local climate, neighborhood aesthetics, and maintenance requirements. Modern styles work well with large windows, while classic styles offer timeless appeal.",
      export: "Your design is ready for export! I can help you prepare construction documents, material lists, or presentation formats. What type of output do you need?"
    };

    return responses[step as keyof typeof responses] || "I'm here to help with your home design project! Feel free to ask about any aspect of the design process.";
  };

  const quickSuggestions = [
    "Help me optimize room layout",
    "Suggest elevation styles",
    "Calculate material costs",
    "Review design standards"
  ];

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