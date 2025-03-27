import React from 'react';

/**
 * Enhanced card component with various styles and interactive options
 */
const Card = ({ 
  children, 
  className = '', 
  variant = 'default', 
  interactive = false,
  selected = false,
  onClick = null,
  icon = null,
  title = null,
  subtitle = null,
  footer = null,
  ...props 
}) => {
  // Base classes for all cards
  const baseClasses = "rounded-lg border border-border overflow-hidden";
  
  // Variant-specific classes
  const variantClasses = {
    default: "bg-card",
    outline: "bg-background border-2",
    filled: "bg-muted",
    elevated: "bg-card shadow-lg",
    primary: "bg-primary text-primary-foreground",
    gradient: "bg-gradient-to-tr from-primary/10 via-card to-accent/10",
  };
  
  // Interactive and selected states
  const stateClasses = {
    interactive: interactive ? "cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1" : "",
    selected: selected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "",
  };

  // Combine all classes
  const cardClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    stateClasses.interactive,
    stateClasses.selected,
    className
  ].join(' ');

  // If we have a title/subtitle, render a structured card
  if (title || icon) {
    return (
      <div 
        className={cardClasses}
        onClick={interactive ? onClick : undefined}
        {...props}
      >
        {/* Card Header with icon and title */}
        {(icon || title) && (
          <div className="p-4 flex items-start space-x-4 border-b border-border">
            {icon && (
              <div className={`
                flex-shrink-0 p-2 rounded-full
                ${variant === 'primary' ? 'bg-primary-foreground text-primary' : 'bg-primary/10 text-primary'}
              `}>
                {icon}
              </div>
            )}
            <div className="flex-1">
              {title && <h3 className="font-medium text-lg">{title}</h3>}
              {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
            </div>
          </div>
        )}
        
        {/* Card Content */}
        <div className="p-4">
          {children}
        </div>
        
        {/* Optional Card Footer */}
        {footer && (
          <div className="px-4 py-3 bg-muted/50 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    );
  }
  
  // Simple card with just children
  return (
    <div 
      className={cardClasses}
      onClick={interactive ? onClick : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
