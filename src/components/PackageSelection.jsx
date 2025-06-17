import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import PackageCard from '@/components/PackageCard';
import { Package as PackageIcon, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const PackageSelection = React.forwardRef(({ packages, selectedPackage, onPackageSelect }, ref) => {
  const packageScrollContainerRef = useRef(null);

  const scrollPackages = (direction) => {
    if (packageScrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      packageScrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      ref={ref}
      key="step1-packages"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="scroll-mt-20 relative section-spacing"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center items-center gap-4 mb-6"
        >
          <div className="p-3 bg-gold/10 rounded-2xl">
            <PackageIcon className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
            Choose Your Package
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed"
        >
          Select the perfect photography package that captures your vision and fits your needs
        </motion.p>
      </div>

      {/* Navigation Controls */}
      <motion.div 
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-gold" />
          <span className="text-primary-foreground/80 font-medium">
            {packages.length} Packages Available
          </span>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            onClick={() => scrollPackages('left')}
            className="p-3 glass-effect-dark hover:bg-primary-foreground/10 rounded-xl text-primary-foreground transition-all duration-300"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={() => scrollPackages('right')}
            className="p-3 glass-effect-dark hover:bg-primary-foreground/10 rounded-xl text-primary-foreground transition-all duration-300"
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Package Cards - Single Row with Minimal Size */}
      <motion.div 
        ref={packageScrollContainerRef} 
        className="horizontal-scroll gap-4 pb-6 -mx-4 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {packages.map((pkg, index) => (
          <motion.div 
            key={pkg.id} 
            className="min-w-[240px] max-w-[240px] flex-shrink-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
          >
            <PackageCard
              pkg={pkg}
              isSelected={selectedPackage?.id === pkg.id}
              onSelect={onPackageSelect}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Selection Indicator */}
      {selectedPackage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-3 glass-effect-dark px-6 py-3 rounded-2xl">
            <div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div>
            <span className="text-primary-foreground font-medium">
              {selectedPackage.name} selected
            </span>
          </div>
        </motion.div>
      )}

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-gold/10 rounded-full blur-2xl -z-10"></div>
    </motion.section>
  );
});

PackageSelection.displayName = "PackageSelection";
export default PackageSelection;