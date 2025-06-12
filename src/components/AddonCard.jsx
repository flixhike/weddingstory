import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle } from 'lucide-react';

const AddonCard = ({ addon, isSelected, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card 
        className={`addon-card cursor-pointer transition-all duration-300 h-full flex flex-col ${
          isSelected ? 'selected-addon ring-2 ring-primary-custom' : ''
        }`}
        onClick={() => onToggle(addon)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary-light'}`}>
                <PlusCircle className={`w-5 h-5 ${isSelected ? '' : 'text-primary-custom'}`} />
              </div>
              <div>
                <CardTitle className={`text-base font-semibold ${isSelected ? 'text-primary' : 'text-gray-800'}`}>
                  {addon.name}
                </CardTitle>
                <div className={`text-lg font-bold ${isSelected ? 'text-primary' : 'text-primary-custom'}`}>
                  +${addon.price.toLocaleString()}
                </div>
              </div>
            </div>
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => onToggle(addon)}
              className={isSelected ? 'border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground' : 'border-primary-custom data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'}
            />
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 flex-grow">
          <p className={`text-sm ${isSelected ? 'text-primary/80' : 'text-gray-600'}`}>
            {addon.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddonCard;