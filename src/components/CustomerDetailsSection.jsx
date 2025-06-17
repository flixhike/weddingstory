import React from 'react';
import { motion } from 'framer-motion';
import CustomerForm from '@/components/CustomerForm';
import { Shield, ArrowLeft, ArrowRight } from 'lucide-react';

const CustomerDetailsSection = React.forwardRef(({ customerData, onFormChange, onBackToAdons, onProceedToPayment }, ref) => {
  return (
    <motion.section
      ref={ref}
      key="step3-details"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      className="scroll-mt-20 section-spacing"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center items-center gap-4 mb-6"
        >
          <div className="p-3 bg-gold/10 rounded-2xl">
            <Shield className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
            Your Details
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed"
        >
          Help us personalize your experience with your contact information
        </motion.p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <CustomerForm formData={customerData} onFormChange={onFormChange} />
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-center gap-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }} 
          whileTap={{ scale: 0.95 }}
          onClick={onBackToAdons}
          className="btn-secondary flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all w-full sm:w-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Add-ons
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }} 
          whileTap={{ scale: 0.95 }}
          onClick={onProceedToPayment}
          className="btn-gold flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all w-full sm:w-auto shadow-lg"
        >
          Proceed to Payment
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gold/10 rounded-full blur-2xl -z-10"></div>
    </motion.section>
  );
});

CustomerDetailsSection.displayName = "CustomerDetailsSection";
export default CustomerDetailsSection;