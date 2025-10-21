'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import InputSection from '@/components/InputSection';
import VisualizationCard from '@/components/VisualizationCard';
import { VisualizationData } from '@/types';

export default function Home() {
  const [visualization, setVisualization] = useState<VisualizationData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegenerate = () => {
    setVisualization(null);
    window.scrollTo({ top: document.getElementById('input')?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <InputSection 
          onGenerate={(data) => {
            setVisualization(data);
            setTimeout(() => {
              window.scrollTo({ 
                top: document.body.scrollHeight, 
                behavior: 'smooth' 
              });
            }, 100);
          }}
          loading={loading}
          setLoading={setLoading}
        />
        {visualization && (
          <VisualizationCard 
            data={visualization}
            onRegenerate={handleRegenerate}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Visionary. Powered by AI. Built with ❤️
          </p>
        </div>
      </footer>
    </main>
  );
}