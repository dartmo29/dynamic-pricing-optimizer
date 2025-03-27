/**
 * select.jsx
 * Select component with dropdown functionality
 */

import * as React from "react";
import { cn } from "../../utils/cn";
import { ChevronDown } from 'lucide-react';

/**
 * Select Root component
 */
const Select = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="relative" ref={ref} {...props}>
      {children}
    </div>
  );
});
Select.displayName = "Select";

/**
 * Select Trigger component
 */
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </div>
  );
});
SelectTrigger.displayName = "SelectTrigger";

/**
 * Select Value component
 */
const SelectValue = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <span ref={ref} className={cn("block truncate", className)} {...props} />
  );
});
SelectValue.displayName = "SelectValue";

/**
 * Select Content component
 */
const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
        className
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  );
});
SelectContent.displayName = "SelectContent";

/**
 * Select Item component
 */
const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none data-[selected]:bg-blue-100 data-[selected]:text-blue-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100",
        className
      )}
      data-value={value}
      {...props}
    >
      <span className="block truncate">{children}</span>
    </div>
  );
});
SelectItem.displayName = "SelectItem";

export { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
};