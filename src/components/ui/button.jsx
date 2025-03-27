import React from 'react';

/**
 * Enhanced button component with various styles and states
 */
const Button = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  rounded = false,
  icon = null,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  type = 'button',
  onClick = () => {},
  ...props 
}) => {
  // Base classes for all buttons
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed";
  
  // Variant-specific classes
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80",
    outline: "bg-background border border-input hover:bg-muted",
    ghost: "hover:bg-muted active:bg-muted/50",
    link: "text-primary underline-offset-4 hover:underline",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-amber-500 text-white hover:bg-amber-600",
    info: "bg-blue-500 text-white hover:bg-blue-600",
  };
  
  // Size-specific classes
  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
    xl: "text-lg px-6 py-3",
  };
  
  // Rounded styles
  const roundedClasses = rounded ? "rounded-full" : "rounded-md";
  
  // Combine all classes
  const buttonClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    roundedClasses,
    className
  ].join(' ');

  // Loading spinner
  const LoadingSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button 
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
