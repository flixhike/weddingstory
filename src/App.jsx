import React, { useState, useEffect, useRef } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import AppHeader from '@/components/AppHeader';
import PackageSelection from '@/components/PackageSelection';
import AddonSelection from '@/components/AddonSelection';
import CustomerDetailsSection from '@/components/CustomerDetailsSection';
import PaymentSection from '@/components/PaymentSection';

import { packages as initialPackages, addons as initialAddons } from '@/data/packages';

const PAYPAL_CLIENT_ID = "AXM92L_z6VePt-8hGpnBYN32FQ8DRFmlGSYfYz_5ushXKI3cAFgU1lmscPBhdN0fHbijVNBjqCpUi6fo";

function App() {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useLocalStorage('selectedPackage', null);
  const [selectedAddons, setSelectedAddons] = useLocalStorage('selectedAddons', []);
  const [customerData, setCustomerData] = useLocalStorage('customerData', {
    firstName: '', lastName: '', email: '', phone: '', company: '', address: '', requirements: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  
  const packageSectionRef = useRef(null);
  const addonsSectionRef = useRef(null);
  const detailsSectionRef = useRef(null);
  const summarySectionRef = useRef(null);

  const sectionRefs = {
    1: packageSectionRef,
    2: addonsSectionRef,
    3: detailsSectionRef,
    4: summarySectionRef,
  };

  const scrollToSection = (step) => {
    setCurrentStep(step);
    sectionRefs[step]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  useEffect(() => {
    if (selectedPackage && currentStep === 1) {
      scrollToSection(2);
    }
    if (!selectedPackage && currentStep > 1 && currentStep < 4) {
      scrollToSection(1);
    }
  }, [selectedPackage, currentStep]);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    toast({
      title: "Package Selected!",
      description: `${pkg.name} has been added to your order.`,
    });
    if (currentStep === 1) {
      setTimeout(() => scrollToSection(2), 100);
    }
  };

  const handleAddonToggle = (addon) => {
    const isSelected = selectedAddons.some(a => a.id === addon.id);
    if (isSelected) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
      toast({ title: "Add-on Removed", description: `${addon.name} removed.` });
    } else {
      setSelectedAddons([...selectedAddons, addon]);
      toast({ title: "Add-on Added!", description: `${addon.name} added.` });
    }
  };

  const processOrder = (paymentDetails = null) => {
    const packagePrice = selectedPackage?.price || 0;
    const total = packagePrice + selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const isQuoteRequest = total <= 0 && packagePrice === 0;

    const order = {
      id: paymentDetails?.id || Date.now().toString(),
      package: selectedPackage,
      addons: selectedAddons,
      customer: customerData,
      total: isQuoteRequest ? "Custom Quote" : total,
      status: isQuoteRequest ? 'quote_requested' : (paymentDetails ? 'confirmed' : 'pending_payment'),
      paymentMethod: paymentDetails ? 'PayPal' : (isQuoteRequest ? 'N/A' : 'Pending'),
      paymentDetails: paymentDetails,
      createdAt: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

    toast({
      title: isQuoteRequest ? "Quote Request Sent!" : "Order Confirmed!",
      description: isQuoteRequest ? "We'll contact you shortly." : "Your order has been placed successfully.",
    });

    setSelectedPackage(null);
    setSelectedAddons([]);
    setCustomerData({ firstName: '', lastName: '', email: '', phone: '', company: '', address: '', requirements: '' });
    scrollToSection(1);
  };
  
  const handlePayPalApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      processOrder(details);
    }).catch(err => {
       toast({
        title: "Payment Error",
        description: "There was an issue processing your PayPal payment. Please try again.",
        variant: "destructive",
      });
      console.error("PayPal Error:", err);
    });
  };

  const validateAndProceed = (nextStep) => {
    if (currentStep === 3) { // Validating Customer Details
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address'];
      const missingFields = requiredFields.filter(field => !customerData[field]);
      if (missingFields.length > 0) {
        toast({
          title: "Missing Information",
          description: `Please fill in: ${missingFields.join(', ')}.`,
          variant: "destructive"
        });
        return;
      }
    }
    scrollToSection(nextStep);
  };
  
  const getAvailableAddons = () => initialAddons;

  const initialPayPalOptions = {
    "client-id": PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  const calculateTotal = () => {
    const packagePrice = selectedPackage ? (selectedPackage.price || 0) : 0;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return packagePrice + addonsPrice;
  };
  const totalAmount = calculateTotal();
  const isQuote = selectedPackage && selectedPackage.price === 0 && totalAmount === 0;

  return (
    <PayPalScriptProvider options={initialPayPalOptions}>
      <div className="min-h-screen gradient-bg text-foreground overflow-x-hidden">
        <div className="container mx-auto px-4 py-8">
          <AppHeader 
            currentStep={currentStep} 
            scrollToSection={scrollToSection}
            sectionRefs={{packageSectionRef, addonsSectionRef, detailsSectionRef, summarySectionRef}}
          />

          <div className="space-y-12">
            <PackageSelection
              ref={packageSectionRef}
              packages={initialPackages}
              selectedPackage={selectedPackage}
              onPackageSelect={handlePackageSelect}
            />

            {selectedPackage && (
              <>
                <AddonSelection
                  ref={addonsSectionRef}
                  addons={getAvailableAddons()}
                  selectedAddons={selectedAddons}
                  onAddonToggle={handleAddonToggle}
                  onBackToPackages={() => { setSelectedPackage(null); scrollToSection(1); }}
                  onContinueToDetails={() => scrollToSection(3)}
                />
                
                <CustomerDetailsSection
                  ref={detailsSectionRef}
                  customerData={customerData}
                  onFormChange={setCustomerData}
                  onBackToAdons={() => scrollToSection(2)}
                  onProceedToPayment={() => validateAndProceed(4)}
                />

                <PaymentSection
                  ref={summarySectionRef}
                  selectedPackage={selectedPackage}
                  selectedAddons={selectedAddons}
                  isQuote={isQuote}
                  totalAmount={totalAmount}
                  paypalClientId={PAYPAL_CLIENT_ID}
                  onPayPalApprove={handlePayPalApprove}
                  processOrder={processOrder}
                  onBackToDetails={() => scrollToSection(3)}
                  toast={toast}
                />
              </>
            )}
          </div>
        </div>
        <Toaster />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;