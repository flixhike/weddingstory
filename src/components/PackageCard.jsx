import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Package as PackageIcon, Camera, Video } from 'lucide-react';

const PackageCard = ({ pkg, isSelected, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative flex flex-col h-full w-full"
    >
      <Card 
        className={`package-card cursor-pointer flex flex-col flex-grow relative overflow-visible ${
          isSelected ? 'selected-package' : ''
        }`}
        onClick={() => onSelect(pkg)}
      >
        {/* Popular Badge - Fixed positioning and visibility */}
        {pkg.popular && (
          <motion.div 
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg border-2 border-white">
              <Star className="w-3 h-3 fill-current" />
              Most Popular
            </div>
          </motion.div>
        )}

        {/* Image Section */}
        {pkg.image && (
          <div className="relative w-full h-32 overflow-hidden rounded-t-lg">
            <img 
              src={pkg.image} 
              alt={pkg.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Service Icons Overlay */}
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="p-1 bg-white/90 backdrop-blur-sm rounded">
                <Camera className="w-3 h-3 text-primary" />
              </div>
              {pkg.features.some(f => f.toLowerCase().includes('video') || f.toLowerCase().includes('film')) && (
                <div className="p-1 bg-white/90 backdrop-blur-sm rounded">
                  <Video className="w-3 h-3 text-primary" />
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Content Section */}
        <CardHeader className={`text-center pb-2 px-3 ${pkg.image ? 'pt-3' : 'pt-6'}`}>
          {!pkg.image && (
            <motion.div 
              className={`mx-auto mb-2 p-2 rounded-xl ${
                isSelected ? 'bg-primary-foreground/20' : 'bg-gold-light'
              }`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <PackageIcon className={`w-5 h-5 ${
                isSelected ? 'text-primary-foreground' : 'text-gold'
              }`} />
            </motion.div>
          )}
          
          <CardTitle className={`text-sm font-display font-semibold leading-tight mb-2 ${
            isSelected ? 'text-primary-foreground' : 'text-primary'
          }`}>
            {pkg.name}
          </CardTitle>
          
          {/* Price Display */}
          <div className="mb-2">
            {pkg.price > 0 ? (
              <div className="flex items-center justify-center gap-1">
                <span className={`text-lg font-bold font-display ${
                  isSelected ? 'text-gold' : 'text-primary'
                }`}>
                  ${pkg.price.toLocaleString()}
                </span>
                <span className={`text-xs opacity-70 ${
                  isSelected ? 'text-primary-foreground' : 'text-warm-gray'
                }`}>
                  USD
                </span>
              </div>
            ) : (
              <div className={`text-sm font-bold font-display ${
                isSelected ? 'text-gold' : 'text-primary'
              }`}>
                Custom Quote
              </div>
            )}
          </div>
          
          <p className={`text-xs leading-relaxed ${
            isSelected ? 'text-primary-foreground/80' : 'text-warm-gray'
          }`}>
            {pkg.description}
          </p>
        </CardHeader>
        
        {/* Features List */}
        <CardContent className="space-y-1.5 flex-grow flex flex-col px-3 pb-3">
          <ul className="space-y-1.5 flex-grow text-xs">
            {pkg.features.slice(0, 3).map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className={`p-0.5 rounded-full mt-0.5 ${
                  isSelected ? 'bg-gold/20' : 'bg-gold-light'
                }`}>
                  <Check className={`w-2.5 h-2.5 ${
                    isSelected ? 'text-gold' : 'text-gold'
                  }`} />
                </div>
                <span className={`leading-relaxed ${
                  isSelected ? 'text-primary-foreground/90' : 'text-primary/80'
                }`}>
                  {feature}
                </span>
              </motion.li>
            ))}
            {pkg.features.length > 3 && (
              <li className={`text-xs ${isSelected ? 'text-gold' : 'text-gold'} font-medium`}>
                +{pkg.features.length - 3} more
              </li>
            )}
          </ul>
          
          {/* Action Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-3"
          >
            <Button 
              size="sm"
              className={`w-full text-xs font-semibold py-2 rounded-lg transition-all duration-300 ${
                isSelected 
                  ? 'btn-gold shadow-lg' 
                  : 'btn-primary'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(pkg);
              }}
            >
              {isSelected ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Selected
                </span>
              ) : (
                pkg.price > 0 ? 'Select' : 'Quote'
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PackageCard;