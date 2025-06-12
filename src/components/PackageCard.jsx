import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Package as PackageIcon } from 'lucide-react';

const PackageCard = ({ pkg, isSelected, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="relative flex flex-col h-full w-full"
    >
      <Card 
        className={`package-card cursor-pointer transition-all duration-300 flex flex-col flex-grow ${
          isSelected ? 'selected-package ring-4 ring-primary-custom' : ''
        }`}
        onClick={() => onSelect(pkg)}
      >
        {pkg.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
              <Star className="w-3 h-3" />
              Most Popular
            </div>
          </div>
        )}

        {pkg.image && (
          <div className="w-full h-40 md:h-48 overflow-hidden rounded-t-lg">
            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
          </div>
        )}
        
        <CardHeader className={`text-center pb-3 ${pkg.image ? 'pt-3' : 'pt-6'}`}>
          {!pkg.image && (
            <div className={`mx-auto mb-2 p-3 rounded-full ${isSelected ? 'bg-primary-foreground/20' : 'bg-primary-light'}`}>
              <PackageIcon className={`w-7 h-7 ${isSelected ? 'text-primary-foreground' : 'text-primary-custom'}`} />
            </div>
          )}
          <CardTitle className={`text-base md:text-lg font-semibold leading-tight ${isSelected ? 'text-primary-foreground' : 'text-gray-800'}`}>
            {pkg.name}
          </CardTitle>
          {pkg.price > 0 ? (
            <div className={`text-2xl md:text-3xl font-bold ${isSelected ? 'text-primary-foreground' : 'text-primary-custom'}`}>
              ${pkg.price.toLocaleString()}
            </div>
          ) : (
            <div className={`text-lg md:text-xl font-bold ${isSelected ? 'text-primary-foreground' : 'text-primary-custom'}`}>
              Custom Quote
            </div>
          )}
          <p className={`text-xs md:text-sm ${isSelected ? 'text-primary-foreground/80' : 'text-gray-600'} mt-1`}>
            {pkg.description}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-1.5 flex-grow flex flex-col px-3 md:px-4 pb-3 md:pb-4">
          <ul className="space-y-1.5 flex-grow text-xs md:text-sm">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-1.5">
                <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isSelected ? 'text-green-300' : 'text-green-500'}`} />
                <span className={`${isSelected ? 'text-primary-foreground/90' : 'text-gray-700'}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          
          <Button 
            size="sm"
            className={`w-full mt-4 text-xs md:text-sm ${
              isSelected 
                ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(pkg);
            }}
          >
            {isSelected ? 'Selected' : (pkg.price > 0 ? 'Select Package' : 'Get Quote')}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PackageCard;