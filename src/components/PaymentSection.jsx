import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderSummary from '@/components/OrderSummary';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CreditCard } from 'lucide-react';

const PaymentSection = React.forwardRef(({
  selectedPackage,
  selectedAddons,
  isQuote,
  totalAmount,
  paypalClientId,
  onPayPalApprove,
  processOrder,
  onBackToDetails,
  toast
}, ref) => {
  const [isPayPalReady, setIsPayPalReady] = useState(false);

  return (
    <motion.section
      ref={ref}
      key="step4-summary"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
      className="scroll-mt-20"
    >
      <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center gap-3">
        <CreditCard className="w-8 h-8" />
        4. Confirm & Pay
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <OrderSummary
          selectedPackage={selectedPackage}
          selectedAddons={selectedAddons}
          isQuote={isQuote}
        />
        <div className="glass-effect p-6 rounded-lg">
          {isQuote ? (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Quote Request</h3>
              <p className="text-foreground/80 mb-6">
                You've selected a custom package. Please submit your details, and we'll contact you shortly with a personalized quote.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => processOrder()}
                className="w-full bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Submit Quote Request
              </motion.button>
            </div>
          ) : paypalClientId === "YOUR_PAYPAL_CLIENT_ID" || !paypalClientId ? ( // Check for placeholder or empty
            <div className="text-center p-4 border border-yellow-500 bg-yellow-500/10 rounded-md">
              <p className="font-semibold text-yellow-700">PayPal Client ID Not Configured</p>
              <p className="text-sm text-yellow-600">Please provide a valid PayPal Client ID to enable payments.</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Complete Your Payment</h3>
              <p className="text-foreground/80 mb-1">Total: <span className="font-bold">${totalAmount.toLocaleString()}</span></p>
              <p className="text-xs text-foreground/60 mb-6">Securely pay with PayPal.</p>
              <PayPalButtons
                style={{ layout: "vertical", color: "black", shape: "rect", label: "pay", tagline: false }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: { value: totalAmount.toFixed(2) }
                    }]
                  });
                }}
                onApprove={onPayPalApprove}
                onError={(err) => {
                  toast({
                    title: "PayPal Error",
                    description: "An error occurred with PayPal. Please try again.",
                    variant: "destructive",
                  });
                  console.error("PayPal Error:", err);
                }}
                onInit={() => setIsPayPalReady(true)}
              />
              {!isPayPalReady && <p className="text-center text-sm text-foreground/70 mt-2">Loading PayPal...</p>}
            </>
          )}
           <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={onBackToDetails}
              className="w-full bg-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/30 transition-colors"
            >
              Back to Your Details
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
});

PaymentSection.displayName = "PaymentSection";
export default PaymentSection;