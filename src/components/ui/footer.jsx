import React from 'react';

/**
 * Modern footer component with links and copyright information
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border bg-card/80 backdrop-blur-sm py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright Information */}
          <div className="text-sm text-muted-foreground mb-2 md:mb-0">
            © {currentYear} Dynamic Pricing Optimizer
          </div>
          
          {/* Links */}
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Help
            </a>
            <a 
              href="#" 
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
