/**
 * select.jsx
 * Custom select component with dropdown
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from 'lucide-react';

/**
 * Select component
 * @param {Object} props Component props
 * @returns {JSX.Element} Styled select component
 */
const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none text-gray-500" />
    </div>
  );
});
Select.displayName = "Select";

/**
 * Select Option component
 * @param {Object} props Component props
 * @returns {JSX.Element} Select option component
 */
const SelectOption = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <option
      className={cn("text-sm", className)}
      ref={ref}
      {...props}
    />
  );
});
SelectOption.displayName = "SelectOption";

export { Select, SelectOption };
