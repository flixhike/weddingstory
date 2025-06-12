import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Plus, Receipt } from 'lucide-react';

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
      <Card className="glass-effect border-white/20 sticky top-20">
        <CardContent className="p-6 text-center">
          <Package className="w-10 h-10 text-foreground/60 mx-auto mb-3" />
          <p className="text-foreground/80">Select a package to see your order summary.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="glass-effect border-white/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Your Order
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedPackage && (
            <>
              <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-foreground font-semibold text-sm">{selectedPackage.name}</span>
                  <span className="text-foreground font-bold text-sm">
                    {selectedPackage.price > 0 ? `$${selectedPackage.price.toLocaleString()}` : 'Custom'}
                  </span>
                </div>
                <p className="text-foreground/70 text-xs">{selectedPackage.description}</p>
              </div>

              {selectedAddons.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-foreground font-semibold flex items-center gap-1.5 text-sm">
                    <Plus className="w-3.5 h-3.5" />
                    Add-ons:
                  </h4>
                  {selectedAddons.map((addon) => (
                    <div key={addon.id} className="bg-black/5 dark:bg-white/5 rounded-lg p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground text-xs">{addon.name}</span>
                        <span className="text-green-600 dark:text-green-400 font-semibold text-xs">
                          +${addon.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-black/10 dark:border-white/10 pt-3 mt-3">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-foreground font-bold">Total:</span>
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    {isQuote ? 'Custom Quote' : `$${total.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderSummary;