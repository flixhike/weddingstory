import React from 'react';
import { motion } from 'framer-motion';
import AddonCard from '@/components/AddonCard';
import { Sparkles, Plus, ArrowLeft, ArrowRight } from 'lucide-react';

const AddonSelection = React.forwardRef(({ addons, selectedAddons, onAddonToggle, onBackToPackages, onContinueToDetails }, ref) => {
  return (
    <motion.section
      ref={ref}
      key="step2-addons"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="scroll-mt-20 section-spacing"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center gap-4 mb-6"
        >
          <div className="p-3 bg-red-500/10 rounded-2xl">
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
            Enhance Your Experience
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed"
        >
          Add premium services to make your session even more special
        </motion.p>

        {/* Selection Counter */}
        {selectedAddons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 inline-flex items-center gap-3 glass-effect-dark px-6 py-3 rounded-2xl"
          >
            <Plus className="w-4 h-4 text-red-500" />
            <span className="text-primary-foreground font-medium">
              {selectedAddons.length} add-on{selectedAddons.length !== 1 ? 's' : ''} selected
            </span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </motion.div>
        )}
      </div>

      {/* Add-ons Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {addons.map((addon, index) => (
          <motion.div
            key={addon.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
          >
            <AddonCard
              addon={addon}
              isSelected={selectedAddons.some(a => a.id === addon.id)}
              onToggle={onAddonToggle}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }} 
          whileTap={{ scale: 0.95 }}
          onClick={onBackToPackages}
          className="btn-secondary flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all w-full sm:w-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          Change Package
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }} 
          whileTap={{ scale: 0.95 }}
          onClick={onContinueToDetails}
          className="btn-red flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all w-full sm:w-auto shadow-lg"
        >
          Continue to Details
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/3 right-0 w-56 h-56 bg-red-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-40 h-40 bg-red-500/10 rounded-full blur-2xl -z-10"></div>
    </motion.section>
  );
});

AddonSelection.displayName = "AddonSelection";
export default AddonSelection;