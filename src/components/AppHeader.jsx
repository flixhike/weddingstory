import React from 'react';
import { motion } from 'framer-motion';
import { Package as PackageIcon, Sparkles, Shield, Film, CreditCard } from 'lucide-react';

const AppHeader = ({ currentStep, scrollToSection, sectionRefs }) => {
  const progressSteps = [
    { step: 1, icon: PackageIcon, label: "Package", refKey: "packageSectionRef" },
    { step: 2, icon: Sparkles, label: "Add-ons", refKey: "addonsSectionRef" },
    { step: 3, icon: Shield, label: "Details", refKey: "detailsSectionRef" },
    { step: 4, icon: CreditCard, label: "Payment", refKey: "summarySectionRef" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-16 relative"
    >
      {/* Hero Section */}
      <div className="relative mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
            <div className="relative p-4 rounded-full glass-effect-dark">
              <Film className="w-10 h-10 text-red-500" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground leading-none">
              Capture Your
            </h1>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-red-500 leading-none">
              Perfect Moment
            </h1>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Professional photography and videography services that transform your precious moments into timeless memories
        </motion.p>
      </div>
      
      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-2 sm:gap-3 glass-effect-dark p-3 rounded-2xl">
          {progressSteps.map(({ step, icon: Icon, label }, index) => (
            <React.Fragment key={step}>
              <motion.div 
                onClick={() => scrollToSection(step)}
                className={`progress-step flex items-center gap-2 sm:gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  currentStep === step 
                    ? 'active' 
                    : 'text-primary-foreground/70 hover:bg-primary-foreground/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  currentStep === step 
                    ? 'bg-white/20' 
                    : 'bg-primary-foreground/10'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium block">{label}</span>
                  <span className="text-xs opacity-70">Step {step}</span>
                </div>
              </motion.div>
              {index < progressSteps.length - 1 && (
                <motion.div 
                  className={`w-8 h-0.5 mx-1 transition-colors ${
                    currentStep > step ? 'bg-red-500' : 'bg-primary-foreground/20'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"></div>
    </motion.div>
  );
};

export default AppHeader;