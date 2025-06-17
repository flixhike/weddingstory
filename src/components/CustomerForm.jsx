import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, MessageSquare, Building } from 'lucide-react';

const CustomerForm = ({ formData, onFormChange }) => {
  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  const formFields = [
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      icon: User,
      required: true,
      placeholder: 'Enter your first name',
      gridCols: 'md:col-span-1'
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      icon: User,
      required: true,
      placeholder: 'Enter your last name',
      gridCols: 'md:col-span-1'
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      icon: Mail,
      required: true,
      placeholder: 'your.email@example.com',
      gridCols: 'md:col-span-2'
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      icon: Phone,
      required: true,
      placeholder: '+1 (555) 123-4567',
      gridCols: 'md:col-span-1'
    },
    {
      id: 'company',
      label: 'Company Name',
      type: 'text',
      icon: Building,
      required: false,
      placeholder: 'Your company (optional)',
      gridCols: 'md:col-span-1'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass-effect border-white/10 elegant-shadow-lg">
        <CardHeader className="pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardTitle className="text-2xl font-display font-semibold text-foreground flex items-center gap-3">
              <div className="p-2 bg-gold/10 rounded-xl">
                <User className="w-6 h-6 text-gold" />
              </div>
              Your Contact Information
            </CardTitle>
            <p className="text-foreground/70 mt-2 leading-relaxed">
              Please provide your details so we can create the perfect experience for you
            </p>
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Basic Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map((field, index) => (
              <motion.div 
                key={field.id}
                className={`space-y-3 ${field.gridCols}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <Label 
                  htmlFor={field.id} 
                  className="text-sm font-medium text-foreground/90 flex items-center gap-2"
                >
                  <field.icon className="w-4 h-4 text-gold" />
                  {field.label} {field.required && <span className="text-gold">*</span>}
                </Label>
                <Input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="form-input h-12 text-base transition-all duration-300 focus:scale-[1.02]"
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Address Section */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <Label 
              htmlFor="address" 
              className="text-sm font-medium text-foreground/90 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-gold" />
              Address <span className="text-gold">*</span>
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="form-input min-h-[100px] text-base resize-none transition-all duration-300 focus:scale-[1.01]"
              placeholder="Enter your full address including city, state, and postal code"
              rows={4}
              required
            />
          </motion.div>
          
          {/* Special Requirements Section */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            <Label 
              htmlFor="requirements" 
              className="text-sm font-medium text-foreground/90 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-gold" />
              Special Requirements or Notes
            </Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              className="form-input min-h-[120px] text-base resize-none transition-all duration-300 focus:scale-[1.01]"
              placeholder="Tell us about any special requests, preferred styles, specific shots you'd like, or any other details that would help us create the perfect session for you..."
              rows={5}
            />
          </motion.div>

          {/* Form Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="pt-4 border-t border-foreground/10"
          >
            <p className="text-sm text-foreground/60 leading-relaxed">
              <span className="text-gold">*</span> Required fields. Your information is secure and will only be used to provide you with the best possible service.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerForm;