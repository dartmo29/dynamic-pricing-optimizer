@echo off
echo Creating missing UI components...

if not exist "src\lib" mkdir src\lib
if not exist "src\components\ui" mkdir src\components\ui

echo Creating utils.js...
echo /**^
 * utils.js^
 * Utility functions for the application^
 */^
^
import { clsx } from "clsx";^
import { twMerge } from "tailwind-merge";^
^
/**^
 * Combines multiple class names and merges Tailwind CSS classes^
 * ^
 * @param  {...any} inputs - Class names or conditional class name objects^
 * @returns {string} Merged class names^
 */^
export function cn(...inputs) {^
  return twMerge(clsx(inputs));^
}^
^
/**^
 * Format a number as currency^
 * ^
 * @param {number} value - The value to format^
 * @param {string} currency - The currency symbol (default: '$')^
 * @param {number} decimals - Number of decimal places (default: 2)^
 * @returns {string} Formatted currency string^
 */^
export function formatCurrency(value, currency = '$', decimals = 2) {^
  return `${currency}${value.toFixed(decimals)}`;^
}^
^
/**^
 * Format a number as a percentage^
 * ^
 * @param {number} value - The value to format (0-1)^
 * @param {number} decimals - Number of decimal places (default: 0)^
 * @returns {string} Formatted percentage string^
 */^
export function formatPercentage(value, decimals = 0) {^
  return `${(value * 100).toFixed(decimals)}%%`;^
} > src\lib\utils.js

echo Creating input.jsx...
echo /**^
 * input.jsx^
 * Input component with consistent styling^
 */^
^
import * as React from "react";^
import { cn } from "@/lib/utils";^
^
/**^
 * Input component^
 * @param {Object} props Component props^
 * @returns {JSX.Element} Styled input component^
 */^
const Input = React.forwardRef(({ className, type, ...props }, ref) => {^
  return (^
    ^<input^
      type={type}^
      className={cn(^
        "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",^
        className^
      )}^
      ref={ref}^
      {...props}^
    /^>^
  );^
});^
Input.displayName = "Input";^
^
export { Input }; > src\components\ui\input.jsx

echo Creating card.jsx...
echo /**^
 * card.jsx^
 * Card component for content containers^
 */^
^
import * as React from "react";^
import { cn } from "@/lib/utils";^
^
/**^
 * Card component^
 */^
const Card = React.forwardRef(({ className, ...props }, ref) => (^
  ^<div^
    ref={ref}^
    className={cn(^
      "rounded-lg border bg-white text-gray-950 shadow-sm",^
      className^
    )}^
    {...props}^
  /^>^
));^
Card.displayName = "Card";^
^
/**^
 * CardHeader component^
 */^
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (^
  ^<div^
    ref={ref}^
    className={cn("flex flex-col space-y-1.5 p-6", className)}^
    {...props}^
  /^>^
));^
CardHeader.displayName = "CardHeader";^
^
/**^
 * CardTitle component^
 */^
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (^
  ^<h3^
    ref={ref}^
    className={cn(^
      "text-2xl font-semibold leading-none tracking-tight",^
      className^
    )}^
    {...props}^
  /^>^
));^
CardTitle.displayName = "CardTitle";^
^
/**^
 * CardDescription component^
 */^
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (^
  ^<p^
    ref={ref}^
    className={cn("text-sm text-gray-500", className)}^
    {...props}^
  /^>^
));^
CardDescription.displayName = "CardDescription";^
^
/**^
 * CardContent component^
 */^
const CardContent = React.forwardRef(({ className, ...props }, ref) => (^
  ^<div ref={ref} className={cn("p-6 pt-0", className)} {...props} /^>^
));^
CardContent.displayName = "CardContent";^
^
/**^
 * CardFooter component^
 */^
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (^
  ^<div^
    ref={ref}^
    className={cn("flex items-center p-6 pt-0", className)}^
    {...props}^
  /^>^
));^
CardFooter.displayName = "CardFooter";^
^
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }; > src\components\ui\card.jsx

echo Creating button.jsx...
echo /**^
 * button.jsx^
 * Button component with variants^
 */^
^
import * as React from "react";^
import { cn } from "@/lib/utils";^
^
/**^
 * Button component^
 * @param {Object} props Component props^
 * @returns {JSX.Element} Styled button component^
 */^
const Button = React.forwardRef(^
  ({ className, variant = "default", size = "default", ...props }, ref) => {^
    const variants = {^
      default: "bg-blue-600 text-white hover:bg-blue-700",^
      destructive: "bg-red-600 text-white hover:bg-red-700",^
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",^
      ghost: "hover:bg-gray-100 hover:text-gray-800",^
    };^
^
    const sizes = {^
      default: "h-10 px-4 py-2",^
      sm: "h-8 px-3 text-xs",^
      lg: "h-12 px-6 text-lg",^
      icon: "h-10 w-10",^
    };^
^
    return (^
      ^<button^
        className={cn(^
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",^
          variants[variant],^
          sizes[size],^
          className^
        )}^
        ref={ref}^
        {...props}^
      /^>^
    );^
  }^
);^
Button.displayName = "Button";^
^
export { Button }; > src\components\ui\button.jsx

echo Creating label.jsx...
echo /**^
 * label.jsx^
 * Label component^
 */^
^
import * as React from "react";^
import { cn } from "@/lib/utils";^
^
/**^
 * Label component^
 * @param {Object} props Component props^
 * @returns {JSX.Element} Styled label component^
 */^
const Label = React.forwardRef(({ className, ...props }, ref) => (^
  ^<label^
    ref={ref}^
    className={cn(^
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",^
      className^
    )}^
    {...props}^
  /^>^
));^
Label.displayName = "Label";^
^
export { Label }; > src\components\ui\label.jsx

echo Creating slider.jsx...
echo /**^
 * slider.jsx^
 * Custom slider component^
 */^
^
import * as React from "react";^
import { cn } from "@/lib/utils";^
^
/**^
 * Slider component^
 * ^
 * @param {Object} props Component props passed to the Slider^
 * @returns {JSX.Element} Styled slider component^
 */^
const Slider = React.forwardRef(({ className, ...props }, ref) => (^
  ^<div^
    ref={ref}^
    className={cn(^
      "relative flex w-full touch-none select-none items-center",^
      className^
    )}^
    {...props}^
  ^>^
    ^<div className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100"^>^
      ^<div className="absolute h-full bg-blue-500" style={{ width: `${(props.value?.[0] / props.max) * 100}%%` }} /^>^
    ^</div^>^
    ^
    {props.value?.map((_, i) => (^
      ^<div^
        key={i}^
        className="absolute h-5 w-5 cursor-pointer rounded-full border-2 border-blue-500 bg-white"^
        style={{ left: `calc(${(props.value[i] / props.max) * 100}%% - 0.5rem)` }}^
      /^>^
    ))}^
  ^</div^>^
));^
^
Slider.displayName = "Slider";^
^
export { Slider }; > src\components\ui\slider.jsx

echo Creating or updating index.html...
echo ^<!DOCTYPE html^>^
^<html lang="en"^>^
  ^<head^>^
    ^<meta charset="UTF-8" /^>^
    ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>^
    ^<title^>Dynamic Pricing Optimizer^</title^>^
  ^</head^>^
  ^<body^>^
    ^<div id="root"^>^</div^>^
    ^<script type="module" src="/src/index.jsx"^>^</script^>^
  ^</body^>^
^</html^> > index.html

echo Creating or updating vite.config.js...
echo import { defineConfig } from 'vite';^
import react from '@vitejs/plugin-react';^
import path from 'path';^
^
export default defineConfig({^
  plugins: [react()],^
  resolve: {^
    alias: {^
      '@': path.resolve(__dirname, './src')^
    }^
  },^
  optimizeDeps: {^
    esbuildOptions: {^
      loader: {^
        '.js': 'jsx',^
      }^
    }^
  },^
  esbuild: {^
    loader: 'jsx',^
    include: /src\/.*\.(js|jsx)$/,^
    exclude: []^
  }^
}); > vite.config.js

if exist src\index.js (
  echo Renaming index.js to index.jsx...
  ren src\index.js index.jsx
)

echo Done! Now run 'npm run dev' to start the development server.
