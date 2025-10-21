'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToInput = () => {
    document.getElementById('input')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-5xl mx-auto w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white">AI-Powered Innovation</span>
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Visionary
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mb-8" />
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-3xl md:text-4xl font-light text-gray-200 mb-6"
        >
          Visualize Ideas. <span className="text-cyan-300 font-semibold">Inspire the Future.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 px-4"
        >
          Transform your product concepts into stunning visual showcases with AI-powered insights. 
          Describe your idea, and let our intelligent system generate marketing content, 
          color palettes, and creative visuals instantly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToInput}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            onClick={scrollToInput}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold hover:border-cyan-500 hover:bg-white/5 transition-all"
          >
            See How It Works
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
        >
          {[
            { label: 'AI Models', value: '10+' },
            { label: 'Seconds', value: '<5' },
            { label: 'Designs', value: '∞' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-4xl font-bold text-cyan-400">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}