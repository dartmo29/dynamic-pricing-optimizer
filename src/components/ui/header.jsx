import React, { useState } from 'react';
import ThemeSwitcher from './theme-switcher';

/**
 * Modern header component with responsive navigation and theme switching
 */
const Header = ({ currentApp, onAppChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAppChange = (app) => {
    onAppChange(app);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-card/80 border-b border-border shadow-sm animate-fadeIn">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and App Title */}
        <div className="flex items-center space-x-2">
          <div className="bg-primary rounded-md p-1.5">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5 text-primary-foreground"
            >
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          </div>
          <h1 className="font-bold text-xl">Dynamic Pricing Optimizer</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => handleAppChange('Main App')}
            className={`px-2 py-1 font-medium transition-colors hover:text-primary ${currentApp === 'Main App' ? 'text-primary border-b-2 border-primary' : ''}`}
          >
            Main App
          </button>
          <button 
            onClick={() => handleAppChange('Gradual App')}
            className={`px-2 py-1 font-medium transition-colors hover:text-primary ${currentApp === 'Gradual App' ? 'text-primary border-b-2 border-primary' : ''}`}
          >
            Gradual App
          </button>
          <button 
            onClick={() => handleAppChange('Test App')}
            className={`px-2 py-1 font-medium transition-colors hover:text-primary ${currentApp === 'Test App' ? 'text-primary border-b-2 border-primary' : ''}`}
          >
            Test App
          </button>
          <ThemeSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeSwitcher />
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fadeIn">
          <nav className="flex flex-col px-4 py-2 space-y-2">
            <button 
              onClick={() => handleAppChange('Main App')}
              className={`px-2 py-2 text-left font-medium rounded-md transition-colors ${currentApp === 'Main App' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
            >
              Main App
            </button>
            <button 
              onClick={() => handleAppChange('Gradual App')}
              className={`px-2 py-2 text-left font-medium rounded-md transition-colors ${currentApp === 'Gradual App' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
            >
              Gradual App
            </button>
            <button 
              onClick={() => handleAppChange('Test App')}
              className={`px-2 py-2 text-left font-medium rounded-md transition-colors ${currentApp === 'Test App' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
            >
              Test App
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
