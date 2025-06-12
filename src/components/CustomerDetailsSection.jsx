import React from 'react';
import { motion } from 'framer-motion';
import CustomerForm from '@/components/CustomerForm';
import { Shield } from 'lucide-react';

const CustomerDetailsSection = React.forwardRef(({ customerData, onFormChange, onBackToAdons, onProceedToPayment }, ref) => {
  return (
    <motion.section
      ref={ref}
      key="step3-details"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
      className="scroll-mt-20"
    >
      <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center gap-3">
        <Shield className="w-8 h-8" />
        3. Your Details
      </h2>
      <CustomerForm formData={customerData} onFormChange={onFormChange} />
      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onBackToAdons}
          className="bg-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/30 transition-colors w-full sm:w-auto"
        >
          Back to Add-ons
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onProceedToPayment}
          className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors w-full sm:w-auto"
        >
          Proceed to Payment
        </motion.button>
      </div>
    </motion.section>
  );
});

CustomerDetailsSection.displayName = "CustomerDetailsSection";
export default CustomerDetailsSection;