'use client';

import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 mx-auto mb-4"
        >
          <div className="w-full h-full border-4 border-white/20 border-t-cyan-500 rounded-full" />
        </motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-lg"
        >
          Generating your visualization...
        </motion.p>
      </motion.div>
    </div>
  );
}