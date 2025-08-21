import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot,
  User,
  Lightbulb,
  Zap,
  Image,
  Sparkles,
  Camera,
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { AIMessage } from '../../types';
import { AIService } from '../../services/aiService';

const AIAssistant: React.FC = () => {
  const { showAIAssistant, toggleAIAssistant, aiMessages, addAIMessage, currentStep, currentProject } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
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
      // Get AI response using the enhanced AI service
      const response = await AIService.getChatResponse(
        input, 
        currentStep, 
        currentProject,
        aiMessages
      );
      
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        context: currentStep
      };

      addAIMessage(aiMessage);
      setIsTyping(false);
    } catch (error) {
      console.error('AI response error:', error);
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again or rephrase your question.",
        timestamp: new Date(),
        context: currentStep
      };
      addAIMessage(errorMessage);
      setIsTyping(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;

    setIsGeneratingImage(true);
    
    try {
      const image = await AIService.generateDesignImage(
        imagePrompt,
        'modern', // Could be dynamic based on user's style preference
        currentProject
      );
      
      setGeneratedImage(image);
      
      // Add image message to chat
      const imageMessage: AIMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Here's a design visualization based on your description: "${imagePrompt}"`,
        timestamp: new Date(),
        context: currentStep
      };
      
      addAIMessage(imageMessage);
      setImagePrompt('');
    } catch (error) {
      console.error('Image generation error:', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'edifice-design.jpg';
    link.click();
  };

  const quickSuggestions = [
    "Help me optimize the room layout for better flow",
    "What elevation style works best for my climate?",
    "Calculate construction costs for my design",
    "Suggest energy-efficient materials",
    "Review my design for building code compliance",
    "Generate a 3D visualization of my exterior"
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
                <p className="text-xs text-amber-100">Chat • Image Generation • Expert Guidance</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setShowImageGenerator(!showImageGenerator)}
                className={`text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors ${
                  showImageGenerator ? 'bg-white bg-opacity-20' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Image Generator"
              >
                <Image size={16} />
              </motion.button>
              <motion.button
                onClick={toggleAIAssistant}
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            </div>
          </div>

          {/* Image Generator Panel */}
          <AnimatePresence>
            {showImageGenerator && (
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 border-b border-purple-400"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles size={16} className="text-white" />
                  <h4 className="text-white font-medium">AI Image Generator</h4>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Describe the design you want to visualize..."
                    className="flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerateImage()}
                  />
                  <motion.button
                    onClick={handleGenerateImage}
                    disabled={!imagePrompt.trim() || isGeneratingImage}
                    className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isGeneratingImage ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <Camera size={14} />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {aiMessages.length === 0 && (
              <div className="text-center py-6">
                <Lightbulb className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm mb-4">
                  Hi! I'm your AI design assistant. I can help with design advice, generate images, and guide you through every step.
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
                      
                      {/* Message Actions */}
                      {message.type === 'assistant' && (
                        <div className="flex items-center space-x-2 mt-2">
                          <motion.button
                            onClick={() => copyToClipboard(message.content)}
                            className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Copy size={10} />
                            <span>Copy</span>
                          </motion.button>
                          <motion.button
                            className="text-xs text-gray-500 hover:text-green-600 flex items-center space-x-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ThumbsUp size={10} />
                          </motion.button>
                          <motion.button
                            className="text-xs text-gray-500 hover:text-red-600 flex items-center space-x-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ThumbsDown size={10} />
                          </motion.button>
                        </div>
                      )}
                    </div>
                </div>
              </motion.div>
            ))}

            {/* Generated Image Display */}
            {generatedImage && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-gray-100 p-3 rounded-2xl max-w-[80%]">
                  <div className="flex items-start space-x-2">
                    <Bot size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <img
                        src={generatedImage}
                        alt="AI Generated Design"
                        className="w-full max-w-xs rounded-lg mb-2"
                      />
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => downloadImage(generatedImage)}
                          className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Download size={10} />
                          <span>Download</span>
                        </motion.button>
                        <motion.button
                          onClick={() => copyToClipboard(generatedImage)}
                          className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Copy size={10} />
                          <span>Copy URL</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

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
          <div className="p-4 border-t border-gray-100 space-y-3">
            {/* Main Chat Input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about design, materials, costs, or anything else..."
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
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500">Quick:</span>
              <motion.button
                onClick={() => setInput("Calculate construction costs for my design")}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💰 Costs
              </motion.button>
              <motion.button
                onClick={() => setInput("Suggest energy-efficient materials")}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full hover:bg-green-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🌱 Materials
              </motion.button>
              <motion.button
                onClick={() => setInput("Review my design for any issues")}
                className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔍 Review
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