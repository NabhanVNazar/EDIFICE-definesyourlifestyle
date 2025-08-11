import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Settings, HelpCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import Logo from './Logo';

const Header: React.FC = () => {
  const { user, toggleAIAssistant } = useAppStore();

  return (
    <motion.header 
      className="bg-white shadow-sm border-b border-amber-100 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <motion.a
              href="#"
              className="text-amber-900 hover:text-amber-700 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projects
            </motion.a>
            <motion.a
              href="#"
              className="text-amber-900 hover:text-amber-700 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Gallery
            </motion.a>
            <motion.a
              href="#"
              className="text-amber-900 hover:text-amber-700 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Account
            </motion.a>

            <motion.a
              href="#"
              className="text-amber-900 hover:text-amber-700 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Settings
            </motion.a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleAIAssistant}
              className="p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle size={20} />
            </motion.button>

            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-amber-900 font-medium">{user.name}</span>
                <motion.button
                  className="p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User size={20} />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.button
                  className="text-amber-900 font-medium hover:text-amber-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;