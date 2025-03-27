import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';

/**
 * Layout component that wraps the application with header and footer
 */
const Layout = ({ children }) => {
  const [currentApp, setCurrentApp] = useState('Main App');
  
  // Handle app selection change
  const handleAppChange = (app) => {
    setCurrentApp(app);
    // Here you would typically trigger a route change or context update
    // for now just logging for demo purposes
    console.log(`Switched to ${app}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header 
        currentApp={currentApp} 
        onAppChange={handleAppChange}
      />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
