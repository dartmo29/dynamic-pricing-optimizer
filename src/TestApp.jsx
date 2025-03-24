import React from 'react';

// A simple test component with no dependencies
const TestApp = () => {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1 style={{ color: '#3b82f6' }}>Dynamic Pricing Optimizer - Test Mode</h1>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f0f9ff', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2>React is Working</h2>
        <p>This is a minimal test component with no dependencies.</p>
        <p>If you can see this message, React is correctly rendering components.</p>
        <p><strong>React Version:</strong> {React.version}</p>
        <p><strong>Current Time:</strong> {new Date().toLocaleTimeString()}</p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => alert('Button click working!')}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Test Interactivity
        </button>
        
        <button 
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#9ca3af',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginLeft: '10px'
          }}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default TestApp;
