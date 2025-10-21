'use client';

import { motion } from 'framer-motion';
import { Download, RotateCw, Share2, Copy, Check } from 'lucide-react';
import { VisualizationData } from '@/types';
import { useState } from 'react';

interface VisualizationCardProps {
  data: VisualizationData;
  onRegenerate: () => void;
}

export default function VisualizationCard({ data, onRegenerate }: VisualizationCardProps) {
  const [copied, setCopied] = useState(false);

  const copyTagline = () => {
    navigator.clipboard.writeText(data.tagline);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Hero Image */}
          <div className="relative h-96 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-8xl mb-4"
                >
                  🎨
                </motion.div>
                <p className="text-white text-xl font-medium max-w-lg">{data.visualDescription}</p>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-12">
            {/* Badge */}
            <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-sm font-bold mb-6">
              ✨ AI Generated
            </div>

            {/* Title */}
            <h1 className="text-6xl font-black mb-4 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                {data.productTitle}
              </span>
            </h1>

            {/* Tagline */}
            <div className="flex items-start gap-3 mb-8">
              <p className="text-2xl text-cyan-300 font-bold italic">"{data.tagline}"</p>
              <button
                onClick={copyTagline}
                className="mt-2 p-2 hover:bg-white/10 rounded-lg transition-all"
                title="Copy tagline"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-10">{data.description}</p>

            <div className="border-t border-white/10 pt-10 space-y-10">
              {/* Target Audience */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  🎯 Target Audience
                </h3>
                <p className="text-gray-200 text-base">{data.targetAudience}</p>
              </div>

              {/* Color Palette */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  🎨 Color Palette
                </h3>
                <div className="flex gap-4 flex-wrap">
                  {data.colorPalette.map((color, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className="w-20 h-20 rounded-xl shadow-lg cursor-pointer border-2 border-white/20"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-gray-400 mt-2 font-mono">{color}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-4 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-bold hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-4 rounded-xl bg-blue-500/20 border border-blue-500/50 text-blue-400 font-bold hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>

                <motion.button
                  onClick={onRegenerate}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-4 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-400 font-bold hover:bg-purple-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCw className="w-5 h-5" />
                  Regenerate
                </motion.button>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="px-12 pb-8 text-center text-gray-500 text-sm">
            Generated on {new Date(data.generatedAt).toLocaleString()}
          </div>
        </motion.div>
      </div>
    </section>
  );
}