import React from 'react';
import { motion } from 'framer-motion';
import { Grid3X3 } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <motion.div 
      className="flex items-center space-x-3"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="relative">
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center shadow-lg"
          animate={{ 
            boxShadow: [
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              "0 8px 12px -1px rgba(245, 158, 11, 0.2)",
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Grid3X3 size={20} className="text-white" />
        </motion.div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 rounded-lg opacity-20">
          <svg className="w-full h-full" viewBox="0 0 40 40">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      <div className="flex flex-col">
        <motion.h1 
          className="text-2xl font-bold text-amber-900 tracking-tight"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          EDIFICE
        </motion.h1>
        <motion.p 
          className="text-xs text-amber-600 -mt-1 tracking-wide"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          AI Home Design
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Logo;