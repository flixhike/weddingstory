import React from 'react';
import { motion } from 'framer-motion';
import AddonCard from '@/components/AddonCard';
import { Sparkles } from 'lucide-react';

const AddonSelection = React.forwardRef(({ addons, selectedAddons, onAddonToggle, onBackToPackages, onContinueToDetails }, ref) => {
  return (
    <motion.section
      ref={ref}
      key="step2-addons"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
      className="scroll-mt-20"
    >
      <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center gap-3">
        <Sparkles className="w-8 h-8" />
        2. Enhance Your Package (Optional)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {addons.map((addon) => (
          <AddonCard
            key={addon.id}
            addon={addon}
            isSelected={selectedAddons.some(a => a.id === addon.id)}
            onToggle={onAddonToggle}
          />
        ))}
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onBackToPackages}
          className="bg-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/30 transition-colors w-full sm:w-auto"
        >
          Change Package
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onContinueToDetails}
          className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors w-full sm:w-auto"
        >
          Continue to Your Details
        </motion.button>
      </div>
    </motion.section>
  );
});

AddonSelection.displayName = "AddonSelection";
export default AddonSelection;