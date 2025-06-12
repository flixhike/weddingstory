import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import PackageCard from '@/components/PackageCard';
import { Package as PackageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const PackageSelection = React.forwardRef(({ packages, selectedPackage, onPackageSelect }, ref) => {
  const packageScrollContainerRef = useRef(null);

  const scrollPackages = (direction) => {
    if (packageScrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      packageScrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      ref={ref}
      key="step1-packages"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      className="scroll-mt-20 relative"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary-foreground flex items-center gap-3">
          <PackageIcon className="w-8 h-8" />
          1. Choose Your Package
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scrollPackages('left')}
            className="p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-full text-primary-foreground transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollPackages('right')}
            className="p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-full text-primary-foreground transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div ref={packageScrollContainerRef} className="horizontal-scroll gap-4 md:gap-6 pb-4 -mx-4 px-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] flex-shrink-0">
            <PackageCard
              pkg={pkg}
              isSelected={selectedPackage?.id === pkg.id}
              onSelect={onPackageSelect}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
});

PackageSelection.displayName = "PackageSelection";
export default PackageSelection;