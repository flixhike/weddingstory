import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Check } from 'lucide-react';

const AddonCard = ({ addon, isSelected, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="h-full"
    >
      <Card 
        className={`addon-card cursor-pointer transition-all duration-300 h-full flex flex-col relative overflow-hidden ${
          isSelected ? 'selected-addon' : ''
        }`}
        onClick={() => onToggle(addon)}
      >
        {/* Selection Indicator */}
        <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
          isSelected ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-transparent'
        }`}></div>

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              {/* Icon */}
              <motion.div 
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isSelected ? 'bg-red-500/20' : 'bg-red-500/10'
                }`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {isSelected ? (
                  <Check className="w-5 h-5 text-red-500" />
                ) : (
                  <PlusCircle className="w-5 h-5 text-red-500" />
                )}
              </motion.div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <CardTitle className={`text-base md:text-lg font-semibold leading-tight mb-2 ${
                  isSelected ? 'text-primary-foreground' : 'text-primary-foreground'
                }`}>
                  {addon.name}
                </CardTitle>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xl md:text-2xl font-bold font-display ${
                    isSelected ? 'text-red-500' : 'text-red-500'
                  }`}>
                    +${addon.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-warm-gray">USD</span>
                </div>
              </div>
            </div>
            
            {/* Checkbox */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Checkbox 
                checked={isSelected}
                onCheckedChange={() => onToggle(addon)}
                className={`w-5 h-5 transition-all duration-300 ${
                  isSelected 
                    ? 'border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white' 
                    : 'border-red-500/50 data-[state=checked]:bg-red-500 data-[state=checked]:text-white'
                }`}
              />
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 flex-grow">
          <p className={`text-sm md:text-base leading-relaxed ${
            isSelected ? 'text-primary-foreground/80' : 'text-warm-gray'
          }`}>
            {addon.description}
          </p>
          
          {/* Enhanced visual feedback for selection */}
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 flex items-center gap-2 text-red-500 text-sm font-medium"
            >
              <Check className="w-4 h-4" />
              Added to your package
            </motion.div>
          )}
        </CardContent>

        {/* Hover Effect Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${
          isSelected ? 'opacity-100' : 'hover:opacity-100'
        }`}></div>
      </Card>
    </motion.div>
  );
};

export default AddonCard;