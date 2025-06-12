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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm">
          <Film className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
          Book Your Session
        </h1>
      </div>
      <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
        Capture your precious moments with our professional photography and videography services.
      </p>
      
      <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 flex-wrap bg-black/20 p-2 rounded-full max-w-fit mx-auto">
        {progressSteps.map(({ step, icon: Icon, label }, index) => (
          <React.Fragment key={step}>
            <motion.div 
              onClick={() => scrollToSection(step)}
              className={`progress-step flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full transition-all ${
                currentStep === step 
                  ? 'bg-primary-foreground text-primary' 
                  : 'text-primary-foreground/70 hover:bg-primary-foreground/10'
              }`}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">{label}</span>
            </motion.div>
            {index < progressSteps.length - 1 && (
              <div className={`w-2 sm:w-6 h-0.5 mx-0.5 sm:mx-1 ${
                currentStep > step ? 'bg-primary-foreground' : 'bg-primary-foreground/30'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default AppHeader;