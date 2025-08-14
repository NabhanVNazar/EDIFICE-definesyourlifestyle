import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Sparkles, 
  Users, 
  Award, 
  ArrowRight,
  Play,
  Check,
  Star,
  Grid3X3,
  Palette,
  Box,
  Download,
  ChevronRight,
  Building,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import Logo from '../common/Logo';
import AuthModal from './AuthModal';
import DemoVideoModal from '../demo/DemoVideoModal';

const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [showDemoModal, setShowDemoModal] = useState(false);

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Design',
      description: 'Our advanced AI generates professional blueprints from your requirements in seconds',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Grid3X3,
      title: 'Interactive 2D Editor',
      description: 'Drag-and-drop floor plan editor with real-time updates and smart suggestions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Box,
      title: '3D Visualization',
      description: 'Walk through your design with immersive 3D models and realistic lighting',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'Style Selection',
      description: 'Choose from modern, traditional, and contemporary elevation styles',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Download,
      title: 'Professional Export',
      description: 'Export CAD files, PDFs, and high-resolution images for construction',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: Users,
      title: 'Collaboration Tools',
      description: 'Share designs with family, contractors, and architects seamlessly',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Design your home in hours, not months'
    },
    {
      icon: Zap,
      title: 'No Experience Needed',
      description: 'Professional results without CAD knowledge'
    },
    {
      icon: Shield,
      title: 'Cost Effective',
      description: 'Avoid expensive architect fees'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'EDIFICE helped me design my dream home without any architectural experience. The AI suggestions were spot-on!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Mike Chen',
      role: 'Contractor',
      content: 'The CAD exports are professional-grade. My clients love seeing their designs in 3D before construction.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Interior Designer',
      content: 'This tool has revolutionized how I present initial concepts to clients. The workflow is incredibly intuitive.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    onGetStarted();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-md shadow-sm border-b border-amber-100 sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-amber-900 hover:text-amber-700 font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-amber-900 hover:text-amber-700 font-medium transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-amber-900 hover:text-amber-700 font-medium transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-amber-900 hover:text-amber-700 font-medium transition-colors">
                Pricing
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => {
                  setAuthMode('signin');
                  setShowAuthModal(true);
                }}
                className="text-amber-900 font-medium hover:text-amber-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  🚀 AI-Powered Design
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  No Experience Required
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-amber-900 mb-6 leading-tight">
                Design Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  Dream Home
                </span>
                with AI
              </h1>
              
              <p className="text-xl text-amber-700 mb-8 leading-relaxed">
                Create professional home designs in minutes, not months. Our AI-powered platform guides you through every step, from initial concept to construction-ready plans.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles size={20} />
                  <span>Start Designing Free</span>
                  <ArrowRight size={20} />
                </motion.button>
                
                <motion.button
                  onClick={() => setShowDemoModal(true)}
                  className="border-2 border-amber-300 text-amber-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-50 transition-all duration-300 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={20} />
                  <span>Watch Demo</span>
                </motion.button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-amber-600">
                <div className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span>Professional results</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-amber-100">
                <img
                  src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Modern home design"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700 font-medium">Design Progress</span>
                    <span className="text-amber-900 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-amber-100 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-amber-900">3</div>
                      <div className="text-xs text-amber-600">Bedrooms</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-900">2.5</div>
                      <div className="text-xs text-amber-600">Bathrooms</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-900">2,400</div>
                      <div className="text-xs text-amber-600">Sq Ft</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Check size={20} />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles size={20} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#F59E0B" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Everything You Need to Design Your Home
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              From initial concept to construction-ready plans, EDIFICE provides all the tools you need in one intuitive platform.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-3">{feature.title}</h3>
                  <p className="text-amber-700 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Simple 5-Step Process
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Our AI guides you through each step, making professional home design accessible to everyone.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: 1, title: 'Input Requirements', description: 'Tell us about your plot, rooms, and preferences', icon: Home },
              { step: 2, title: 'AI Blueprint', description: 'Our AI generates a custom 2D floor plan', icon: Grid3X3 },
              { step: 3, title: 'Edit & Refine', description: 'Drag and drop to customize your layout', icon: Building },
              { step: 4, title: '3D Visualization', description: 'Walk through your design in 3D', icon: Box },
              { step: 5, title: 'Export & Build', description: 'Get construction-ready files', icon: Download }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    {index < 4 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-amber-300 -translate-y-1/2" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">{step.title}</h3>
                  <p className="text-amber-700 text-sm">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-amber-900 mb-6">
                Why Choose EDIFICE?
              </h2>
              <p className="text-xl text-amber-700 mb-8">
                Traditional home design is expensive, time-consuming, and requires specialized knowledge. EDIFICE changes that.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <Icon size={20} className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-amber-900 mb-1">{benefit.title}</h3>
                        <p className="text-amber-700">{benefit.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Beautiful home design"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Traditional Process</p>
                    <p className="text-2xl font-bold text-gray-900">3-6 months</p>
                  </div>
                  <ChevronRight size={24} className="text-amber-600" />
                  <div>
                    <p className="text-sm text-amber-600">With EDIFICE</p>
                    <p className="text-2xl font-bold text-amber-900">2-3 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Loved by Thousands of Users
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              See what our users say about their experience with EDIFICE.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-amber-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-amber-900">{testimonial.name}</p>
                    <p className="text-sm text-amber-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Design Your Dream Home?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already created their perfect home designs with EDIFICE.
            </p>
            
            <motion.button
              onClick={() => {
                setAuthMode('signup');
                setShowAuthModal(true);
              }}
              className="bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles size={20} />
              <span>Start Your Free Design</span>
              <ArrowRight size={20} />
            </motion.button>
            
            <p className="text-amber-100 text-sm mt-4">
              No credit card required • Free forever plan available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-amber-200 text-sm leading-relaxed">
                Making professional home design accessible to everyone through the power of AI.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-amber-200">
            <p>&copy; 2024 EDIFICE. All rights reserved. Built with ❤️ for dreamers and builders.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSuccess={handleAuthSuccess}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />

      {/* Demo Video Modal */}
      <DemoVideoModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />
    </div>
  );
};

export default LandingPage;