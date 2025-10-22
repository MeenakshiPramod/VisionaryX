'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Loader2, Wand2, X, Image as ImageIcon } from 'lucide-react';
import { VisualizationData } from '@/types';

interface InputSectionProps {
  onGenerate: (data: VisualizationData) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function InputSection({ onGenerate, loading, setLoading }: InputSectionProps) {
  const [productIdea, setProductIdea] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerate = async () => {
    if (!productIdea.trim() || productIdea.trim().length < 10) {
      alert('Please enter at least 10 characters for your product idea');
      return;
    }

    setLoading(true);

    try {
      // Call the API endpoint
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIdea: productIdea.trim(),
          referenceImage: uploadedImage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        console.error('Status:', response.status);
        throw new Error(errorData.error || errorData.details || 'Failed to generate visualization');
      }

      const data = await response.json();
      console.log('Generated data:', data);
      onGenerate(data);
    } catch (error) {
      console.error('Full error details:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate visualization. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="input" className="relative py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-3">Describe Your Product</h2>
            <p className="text-gray-400 text-lg">
              Share your idea and we'll bring it to life with AI-powered visualizations
            </p>
          </div>

          <div className="space-y-8">
            {/* Product Idea */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
                Product Idea *
              </label>
              <textarea
                value={productIdea}
                onChange={(e) => setProductIdea(e.target.value)}
                placeholder="e.g., A sustainable bamboo toothbrush for kids with fun animal designs and biodegradable packaging..."
                disabled={loading}
                rows={5}
                className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all disabled:opacity-50"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">{productIdea.length}/500</span>
                <span className={`text-xs font-semibold ${productIdea.length >= 10 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {productIdea.length >= 10 ? '✓ Ready' : '✗ Min 10 chars'}
                </span>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
                Reference Image <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading}
                className="hidden"
              />

              {!uploadedImage ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="w-full p-8 rounded-xl border-2 border-dashed border-white/20 hover:border-cyan-500 hover:bg-white/5 transition-all flex flex-col items-center gap-3 text-gray-300 disabled:opacity-50"
                >
                  <Upload className="w-10 h-10" />
                  <div className="text-center">
                    <p className="font-semibold mb-1">Click to upload image</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </button>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-white/20">
                  <img src={uploadedImage} alt="Preview" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                    <span className="text-white text-sm font-medium truncate">{fileName}</span>
                    <button
                      onClick={removeImage}
                      className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={handleGenerate}
              disabled={loading || productIdea.length < 10}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Generating Your Vision...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6" />
                  <span>Generate Visualization</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}