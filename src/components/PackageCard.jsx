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
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative flex flex-col h-full w-full"
    >
      <Card 
        className={`package-card cursor-pointer flex flex-col flex-grow relative overflow-hidden ${
          isSelected ? 'selected-package' : ''
        }`}
        onClick={() => onSelect(pkg)}
      >
        {/* Popular Badge */}
        {pkg.popular && (
          <motion.div 
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="popular-badge px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
              <Star className="w-4 h-4" />
              Most Popular
            </div>
          </motion.div>
        )}

        {/* Image Section */}
        {pkg.image && (
          <div className="relative w-full h-48 md:h-56 overflow-hidden">
            <img 
              src={pkg.image} 
              alt={pkg.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Service Icons Overlay */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="p-2 bg-white/90 backdrop-blur-sm rounded-lg">
                <Camera className="w-4 h-4 text-primary" />
              </div>
              {pkg.features.some(f => f.toLowerCase().includes('video') || f.toLowerCase().includes('film')) && (
                <div className="p-2 bg-white/90 backdrop-blur-sm rounded-lg">
                  <Video className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Content Section */}
        <CardHeader className={`text-center pb-4 ${pkg.image ? 'pt-6' : 'pt-8'}`}>
          {!pkg.image && (
            <motion.div 
              className={`mx-auto mb-4 p-4 rounded-2xl ${
                isSelected ? 'bg-primary-foreground/20' : 'bg-gold-light'
              }`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <PackageIcon className={`w-8 h-8 ${
                isSelected ? 'text-primary-foreground' : 'text-gold'
              }`} />
            </motion.div>
          )}
          
          <CardTitle className={`text-lg md:text-xl font-display font-semibold leading-tight mb-3 ${
            isSelected ? 'text-primary-foreground' : 'text-primary'
          }`}>
            {pkg.name}
          </CardTitle>
          
          {/* Price Display */}
          <div className="mb-4">
            {pkg.price > 0 ? (
              <div className="flex items-center justify-center gap-2">
                <span className={`text-3xl md:text-4xl font-bold font-display ${
                  isSelected ? 'text-gold' : 'text-primary'
                }`}>
                  ${pkg.price.toLocaleString()}
                </span>
                <span className={`text-sm opacity-70 ${
                  isSelected ? 'text-primary-foreground' : 'text-warm-gray'
                }`}>
                  USD
                </span>
              </div>
            ) : (
              <div className={`text-xl md:text-2xl font-bold font-display ${
                isSelected ? 'text-gold' : 'text-primary'
              }`}>
                Custom Quote
              </div>
            )}
          </div>
          
          <p className={`text-sm md:text-base leading-relaxed ${
            isSelected ? 'text-primary-foreground/80' : 'text-warm-gray'
          }`}>
            {pkg.description}
          </p>
        </CardHeader>
        
        {/* Features List */}
        <CardContent className="space-y-3 flex-grow flex flex-col px-6 pb-6">
          <ul className="space-y-3 flex-grow text-sm md:text-base">
            {pkg.features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className={`p-1 rounded-full mt-0.5 ${
                  isSelected ? 'bg-gold/20' : 'bg-gold-light'
                }`}>
                  <Check className={`w-3.5 h-3.5 ${
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
          </ul>
          
          {/* Action Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <Button 
              size="lg"
              className={`w-full text-sm md:text-base font-semibold py-3 rounded-xl transition-all duration-300 ${
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
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Selected
                </span>
              ) : (
                pkg.price > 0 ? 'Select Package' : 'Get Custom Quote'
              )}
            </Button>
          </motion.div>
        </CardContent>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </Card>
    </motion.div>
  );
};

export default PackageCard;