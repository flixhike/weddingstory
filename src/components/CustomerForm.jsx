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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <User className="w-5 h-5" />
            Your Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName" className="text-sm text-foreground/80 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                First Name *
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/60"
                placeholder="Enter first name"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="lastName" className="text-sm text-foreground/80 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Last Name *
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/60"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm text-foreground/80 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/60"
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm text-foreground/80 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/60"
              placeholder="Enter phone number"
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="company" className="text-sm text-foreground/80 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" />
              Company Name (Optional)
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/60"
              placeholder="Enter company name"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-sm text-foreground/80 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Address *
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/60"
              placeholder="Enter full address"
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="requirements" className="text-sm text-foreground/80 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Special Requirements (Optional)
            </Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/60"
              placeholder="Any special instructions or notes..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerForm;