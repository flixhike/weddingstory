import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderSummary from '@/components/OrderSummary';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CreditCard, ArrowLeft, Send, Shield, Lock } from 'lucide-react';

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
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      className="scroll-mt-20 section-spacing"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center items-center gap-4 mb-6"
        >
          <div className="p-3 bg-red-500/10 rounded-2xl">
            <CreditCard className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
            Confirm & {isQuote ? 'Request Quote' : 'Pay'}
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed"
        >
          {isQuote 
            ? 'Review your selection and submit your custom quote request'
            : 'Review your order and complete your secure payment'
          }
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <OrderSummary
            selectedPackage={selectedPackage}
            selectedAddons={selectedAddons}
            isQuote={isQuote}
          />
        </motion.div>

        {/* Payment/Quote Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="glass-effect-dark border-white/10 p-8 rounded-2xl elegant-shadow-lg"
        >
          {isQuote ? (
            /* Quote Request Section */
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="p-4 bg-red-500/10 rounded-2xl w-fit mx-auto mb-4">
                  <Send className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                  Custom Quote Request
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  You've selected a custom package. We'll review your requirements and contact you within 24 hours with a personalized quote.
                </p>
              </div>

              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  What happens next?
                </h4>
                <ul className="space-y-3 text-sm text-foreground/80">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-red-500">1</span>
                    </div>
                    <span>We'll review your package selection and requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-red-500">2</span>
                    </div>
                    <span>Our team will prepare a detailed, personalized quote</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-red-500">3</span>
                    </div>
                    <span>We'll contact you within 24 hours to discuss your project</span>
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }} 
                whileTap={{ scale: 0.98 }}
                onClick={() => processOrder()}
                className="w-full btn-red flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
              >
                <Send className="w-5 h-5" />
                Submit Quote Request
              </motion.button>
            </div>
          ) : paypalClientId === "YOUR_PAYPAL_CLIENT_ID" || !paypalClientId ? (
            /* PayPal Configuration Error */
            <div className="text-center p-6 border border-yellow-500/30 bg-yellow-500/10 rounded-xl">
              <div className="p-3 bg-yellow-500/20 rounded-xl w-fit mx-auto mb-4">
                <Lock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-yellow-700 mb-2">Payment Configuration Required</h3>
              <p className="text-sm text-yellow-600">
                Please configure PayPal Client ID to enable secure payments.
              </p>
            </div>
          ) : (
            /* Payment Section */
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="p-4 bg-red-500/10 rounded-2xl w-fit mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                  Secure Payment
                </h3>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-foreground">
                    Total: <span className="text-red-500 font-display">${totalAmount.toLocaleString()}</span>
                  </p>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    Complete your booking with our secure PayPal payment system
                  </p>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-400 text-sm">
                      Secure & Protected
                    </h4>
                    <p className="text-xs text-green-700 dark:text-green-500">
                      Your payment is processed securely through PayPal's encrypted system
                    </p>
                  </div>
                </div>
              </div>

              {/* PayPal Buttons */}
              <div className="space-y-4">
                <PayPalButtons
                  style={{ 
                    layout: "vertical", 
                    color: "black", 
                    shape: "rect", 
                    label: "pay", 
                    tagline: false,
                    height: 50
                  }}
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
                      title: "Payment Error",
                      description: "An error occurred with PayPal. Please try again.",
                      variant: "destructive",
                    });
                    console.error("PayPal Error:", err);
                  }}
                  onInit={() => setIsPayPalReady(true)}
                />
                
                {!isPayPalReady && (
                  <div className="text-center py-4">
                    <div className="loading-skeleton h-12 rounded-lg"></div>
                    <p className="text-sm text-foreground/70 mt-2">Loading secure payment...</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8 pt-6 border-t border-foreground/10">
            <motion.button
              whileHover={{ scale: 1.02, x: -5 }} 
              whileTap={{ scale: 0.98 }}
              onClick={onBackToDetails}
              className="w-full btn-secondary flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Your Details
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-56 h-56 bg-red-500/10 rounded-full blur-2xl -z-10"></div>
    </motion.section>
  );
});

PaymentSection.displayName = "PaymentSection";
export default PaymentSection;