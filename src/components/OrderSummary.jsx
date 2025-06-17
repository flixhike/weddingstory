import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Plus, Receipt, Check, Star } from 'lucide-react';

const OrderSummary = ({ 
  selectedPackage, 
  selectedAddons, 
  isQuote 
}) => {
  const calculateTotal = () => {
    const packagePrice = selectedPackage ? (selectedPackage.price || 0) : 0;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return packagePrice + addonsPrice;
  };

  const total = calculateTotal();

  if (!selectedPackage) {
    return (
      <Card className="glass-effect border-white/10 sticky top-20 elegant-shadow">
        <CardContent className="p-8 text-center">
          <div className="p-4 bg-gold/10 rounded-2xl w-fit mx-auto mb-4">
            <Package className="w-12 h-12 text-gold" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Your Order Summary</h3>
          <p className="text-foreground/70">Select a package to see your order details.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full sticky top-20"
    >
      <Card className="glass-effect border-white/10 elegant-shadow-lg">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardTitle className="text-xl font-display font-semibold text-foreground flex items-center gap-3">
              <div className="p-2 bg-gold/10 rounded-xl">
                <Receipt className="w-5 h-5 text-gold" />
              </div>
              Order Summary
            </CardTitle>
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Selected Package */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gold/5 to-gold/10 rounded-xl p-4 border border-gold/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{selectedPackage.name}</h4>
                    {selectedPackage.popular && (
                      <div className="flex items-center gap-1 bg-gold/20 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 text-gold" />
                        <span className="text-xs font-medium text-gold">Popular</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {selectedPackage.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <span className="text-lg font-bold font-display text-foreground">
                    {selectedPackage.price > 0 ? `$${selectedPackage.price.toLocaleString()}` : 'Custom'}
                  </span>
                  {selectedPackage.price > 0 && (
                    <p className="text-xs text-foreground/60">USD</p>
                  )}
                </div>
              </div>
              
              {/* Package Features Preview */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gold/20">
                {selectedPackage.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-foreground/80">
                    <Check className="w-3 h-3 text-gold flex-shrink-0" />
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
                {selectedPackage.features.length > 4 && (
                  <div className="col-span-2 text-xs text-gold font-medium">
                    +{selectedPackage.features.length - 4} more features
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Selected Add-ons */}
          {selectedAddons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3"
            >
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Plus className="w-4 h-4 text-gold" />
                Add-ons ({selectedAddons.length})
              </h4>
              
              <div className="space-y-2">
                {selectedAddons.map((addon, index) => (
                  <motion.div 
                    key={addon.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="bg-white/50 dark:bg-black/20 rounded-lg p-3 border border-foreground/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <span className="text-sm font-medium text-foreground">{addon.name}</span>
                        <p className="text-xs text-foreground/60 mt-1 leading-relaxed">
                          {addon.description}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-gold ml-3">
                        +${addon.price.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Total */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="border-t border-foreground/20 pt-4"
          >
            <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold font-display text-foreground">Total</span>
                  {!isQuote && selectedAddons.length > 0 && (
                    <p className="text-xs text-foreground/60">
                      Package + {selectedAddons.length} add-on{selectedAddons.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-display text-gold">
                    {isQuote ? 'Custom Quote' : `$${total.toLocaleString()}`}
                  </span>
                  {!isQuote && (
                    <p className="text-xs text-foreground/60">USD</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quote Notice */}
          {isQuote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gold/10 border border-gold/30 rounded-xl p-4"
            >
              <p className="text-sm text-foreground/80 leading-relaxed">
                <strong className="text-gold">Custom Quote:</strong> We'll provide a personalized quote based on your specific requirements and location.
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderSummary;