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
  RefreshCw,
  Wand2,
  Brain,
  Calculator,
  Palette,
  Home,
  Settings,
  HelpCircle,
  Star,
  TrendingUp,
  Shield,
  Leaf
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { AIMessage } from '../../types';
import { AIService } from '../../services/aiService';

const AIAssistant: React.FC = () => {
  const { showAIAssistant, toggleAIAssistant, aiMessages, addAIMessage, currentStep, currentProject } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'analysis' | 'suggestions'>('chat');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
      const response = await AIService.getChatResponse(
        input, 
        currentStep, 
        currentProject || undefined,
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
    } finally {
      setIsTyping(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;

    setIsGeneratingImage(true);
    
    try {
      const image = await AIService.generateDesignImage(
        imagePrompt,
        'modern',
        currentProject || undefined
      );
      
      setGeneratedImages(prev => [...prev, image]);
      
      const imageMessage: AIMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `I've generated a design visualization based on: "${imagePrompt}". This image shows how your concept might look when implemented.`,
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

  const runProjectAnalysis = async () => {
    if (!currentProject) return;

    setIsAnalyzing(true);
    setActiveTab('analysis');

    try {
      const [costAnalysis, energyAnalysis, codeCompliance] = await Promise.all([
        AIService.calculateCosts(currentProject.plot, currentProject.requirements, []),
        AIService.analyzeEnergyEfficiency(currentProject.blueprint || { rooms: [], walls: [], doors: [], windows: [] }, 'temperate', []),
        AIService.checkBuildingCodes(currentProject.blueprint || { rooms: [], walls: [], doors: [], windows: [] }, 'general')
      ]);

      setAnalysisData({
        cost: costAnalysis,
        energy: energyAnalysis,
        compliance: codeCompliance,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
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

  const getContextualSuggestions = () => {
    switch (currentStep) {
      case 'input':
        return [
          { icon: Home, text: "What's the ideal plot size for my family?", query: "What plot size should I consider for a family of 4 with future expansion plans?" },
          { icon: Calculator, text: "Help me plan room requirements", query: "How should I plan room requirements for optimal family living?" },
          { icon: TrendingUp, text: "Optimize for resale value", query: "What design choices maximize resale value?" },
          { icon: Leaf, text: "Make it energy efficient", query: "How can I design for maximum energy efficiency?" }
        ];
      case '2d-edit':
        return [
          { icon: Brain, text: "Optimize room layout", query: "Can you analyze my current room layout and suggest improvements for better flow?" },
          { icon: Lightbulb, text: "Improve natural lighting", query: "How can I optimize window placement for maximum natural light?" },
          { icon: Shield, text: "Check building codes", query: "Does my current layout comply with building codes?" },
          { icon: Settings, text: "Add smart home features", query: "Where should I plan smart home infrastructure in my layout?" }
        ];
      case '3d-view':
        return [
          { icon: Palette, text: "Interior design suggestions", query: "What interior design styles would work well with my layout?" },
          { icon: Lightbulb, text: "Lighting design advice", query: "How should I plan interior lighting for optimal ambiance?" },
          { icon: Home, text: "Furniture placement tips", query: "Can you suggest optimal furniture placement for my rooms?" },
          { icon: Star, text: "Luxury upgrade ideas", query: "What luxury features could enhance my design?" }
        ];
      case 'elevations':
        return [
          { icon: Wand2, text: "Generate custom styles", query: "Create elevation styles that match my personal taste and local architecture" },
          { icon: Leaf, text: "Sustainable materials", query: "What sustainable materials work best for my elevation style?" },
          { icon: Calculator, text: "Compare style costs", query: "Compare the costs of different elevation styles for my project" },
          { icon: TrendingUp, text: "Market appeal analysis", query: "Which elevation style has the best market appeal in my area?" }
        ];
      case 'export':
        return [
          { icon: Calculator, text: "Final cost breakdown", query: "Provide a detailed cost breakdown for my complete design" },
          { icon: Settings, text: "Construction timeline", query: "What's the optimal construction timeline for my project?" },
          { icon: Shield, text: "Quality control tips", query: "What should I monitor during construction to ensure quality?" },
          { icon: Star, text: "Value engineering", query: "How can I reduce costs without compromising design quality?" }
        ];
      default:
        return [
          { icon: Brain, text: "Design optimization", query: "How can I optimize my overall design?" },
          { icon: Calculator, text: "Cost analysis", query: "Analyze costs for my project" },
          { icon: Leaf, text: "Sustainability tips", query: "Make my design more sustainable" },
          { icon: Star, text: "Expert review", query: "Review my design like a professional architect" }
        ];
    }
  };

  const contextualSuggestions = getContextualSuggestions();

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'analysis', label: 'Analysis', icon: Brain },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb }
  ];

  return (
    <AnimatePresence>
      {showAIAssistant && (
        <motion.div
          className="fixed right-4 bottom-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-amber-100 z-50 flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">EDIFICE AI Assistant</h3>
                  <p className="text-xs text-amber-100">Expert Architectural Guidance</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => setShowImageGenerator(!showImageGenerator)}
                  className={`text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors ${
                    showImageGenerator ? 'bg-white bg-opacity-20' : ''
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="AI Image Generator"
                >
                  <Image size={16} />
                </motion.button>
                <motion.button
                  onClick={toggleAIAssistant}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-white bg-opacity-20 rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md transition-all text-sm ${
                      activeTab === tab.id
                        ? 'bg-white text-amber-600 shadow-sm'
                        : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
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
                  <h4 className="text-white font-medium">AI Design Visualizer</h4>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Describe your design vision..."
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

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div
                  key="chat"
                  className="h-full flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {aiMessages.length === 0 && (
                      <div className="text-center py-6">
                        <Brain className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                        <p className="text-gray-600 text-sm mb-4">
                          Hi! I'm your expert AI architect. I can help with design optimization, cost analysis, building codes, and creative solutions.
                        </p>
                        <div className="space-y-2">
                          {contextualSuggestions.slice(0, 3).map((suggestion, index) => {
                            const Icon = suggestion.icon;
                            return (
                              <motion.button
                                key={index}
                                className="block w-full text-left text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 p-3 rounded-lg transition-colors flex items-center space-x-2"
                                onClick={() => setInput(suggestion.query)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Icon size={14} className="text-amber-600" />
                                <span>{suggestion.text}</span>
                              </motion.button>
                            );
                          })}
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
                        <div className={`max-w-[85%] p-3 rounded-2xl ${
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
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              
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
                        </div>
                      </motion.div>
                    ))}

                    {/* Generated Images Display */}
                    {generatedImages.map((image, index) => (
                      <motion.div
                        key={index}
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="bg-gray-100 p-3 rounded-2xl max-w-[85%]">
                          <div className="flex items-start space-x-2">
                            <Bot size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <img
                                src={image}
                                alt="AI Generated Design"
                                className="w-full max-w-xs rounded-lg mb-2"
                              />
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  onClick={() => downloadImage(image)}
                                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Download size={10} />
                                  <span>Download</span>
                                </motion.button>
                                <motion.button
                                  onClick={() => copyToClipboard(image)}
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

                  {/* Chat Input */}
                  <div className="p-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about design, costs, codes, or get expert advice..."
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

              {activeTab === 'analysis' && (
                <motion.div
                  key="analysis"
                  className="h-full p-4 overflow-y-auto"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Project Analysis</h4>
                      <motion.button
                        onClick={runProjectAnalysis}
                        disabled={!currentProject || isAnalyzing}
                        className="bg-amber-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-amber-700 transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isAnalyzing ? (
                          <RefreshCw size={12} className="animate-spin" />
                        ) : (
                          'Analyze'
                        )}
                      </motion.button>
                    </div>

                    {!currentProject && (
                      <div className="text-center py-8">
                        <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">
                          Start a project to get AI-powered analysis and insights
                        </p>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="text-center py-8">
                        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-gray-600 text-sm">Analyzing your design...</p>
                      </div>
                    )}

                    {analysisData && (
                      <div className="space-y-4">
                        {/* Cost Analysis */}
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h5 className="font-medium text-green-900 mb-2 flex items-center">
                            <Calculator size={16} className="mr-2" />
                            Cost Analysis
                          </h5>
                          <p className="text-green-800 text-sm mb-2">
                            Total: ${analysisData.cost?.totalCost?.toLocaleString() || 'Calculating...'}
                          </p>
                          <div className="space-y-1">
                            {analysisData.cost?.breakdown?.slice(0, 3).map((item: any, i: number) => (
                              <div key={i} className="flex justify-between text-xs text-green-700">
                                <span>{item.category}</span>
                                <span>${item.cost?.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Energy Analysis */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h5 className="font-medium text-blue-900 mb-2 flex items-center">
                            <Leaf size={16} className="mr-2" />
                            Energy Efficiency
                          </h5>
                          <p className="text-blue-800 text-sm mb-2">
                            Rating: {analysisData.energy?.efficiency || 'B+'} • 
                            Annual Cost: ${analysisData.energy?.annualCost?.toLocaleString() || '2,400'}
                          </p>
                          <div className="space-y-1">
                            {analysisData.energy?.recommendations?.slice(0, 2).map((rec: any, i: number) => (
                              <div key={i} className="text-xs text-blue-700">
                                • {rec.upgrade}: ${rec.savings}/year savings
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Code Compliance */}
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <h5 className="font-medium text-purple-900 mb-2 flex items-center">
                            <Shield size={16} className="mr-2" />
                            Building Compliance
                          </h5>
                          <p className="text-purple-800 text-sm mb-2">
                            Status: {analysisData.compliance?.compliant ? '✅ Compliant' : '⚠️ Needs Review'}
                          </p>
                          {analysisData.compliance?.issues?.length > 0 && (
                            <div className="space-y-1">
                              {analysisData.compliance.issues.slice(0, 2).map((issue: string, i: number) => (
                                <div key={i} className="text-xs text-purple-700">
                                  • {issue}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'suggestions' && (
                <motion.div
                  key="suggestions"
                  className="h-full p-4 overflow-y-auto"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Smart Suggestions</h4>
                    
                    {contextualSuggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <motion.button
                          key={index}
                          onClick={() => {
                            setActiveTab('chat');
                            setInput(suggestion.query);
                          }}
                          className="w-full text-left p-4 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-lg border border-amber-200 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="bg-amber-500 text-white p-2 rounded-lg">
                              <Icon size={16} />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-amber-900 mb-1">{suggestion.text}</h5>
                              <p className="text-xs text-amber-700 opacity-75">{suggestion.query}</p>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}

                    {/* Expert Tips */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-900 mb-3 flex items-center">
                        <Star size={16} className="mr-2" />
                        Expert Tips for {currentStep.replace('-', ' ').toUpperCase()}
                      </h5>
                      <div className="space-y-2 text-sm text-blue-800">
                        {currentStep === 'input' && (
                          <>
                            <p>• Consider future needs - growing family, aging in place</p>
                            <p>• Plan for 15-20% more space than you think you need</p>
                            <p>• Think about natural light and ventilation early</p>
                          </>
                        )}
                        {currentStep === '2d-edit' && (
                          <>
                            <p>• Create clear circulation paths between rooms</p>
                            <p>• Group plumbing fixtures to reduce costs</p>
                            <p>• Consider furniture placement when sizing rooms</p>
                          </>
                        )}
                        {currentStep === '3d-view' && (
                          <>
                            <p>• Check ceiling heights for proper proportions</p>
                            <p>• Verify sight lines and visual connections</p>
                            <p>• Consider how spaces feel at human scale</p>
                          </>
                        )}
                        {currentStep === 'elevations' && (
                          <>
                            <p>• Choose materials appropriate for your climate</p>
                            <p>• Consider long-term maintenance requirements</p>
                            <p>• Balance curb appeal with neighborhood context</p>
                          </>
                        )}
                        {currentStep === 'export' && (
                          <>
                            <p>• Include detailed specifications for contractors</p>
                            <p>• Plan for construction sequencing and logistics</p>
                            <p>• Budget 10-15% contingency for unexpected costs</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Enhanced Floating AI Button */}
      {!showAIAssistant && (
        <motion.button
          onClick={toggleAIAssistant}
          className="fixed right-4 bottom-4 w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
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
          <MessageSquare size={24} />
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Brain size={10} className="text-white" />
          </motion.div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI Expert Assistant
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default AIAssistant;