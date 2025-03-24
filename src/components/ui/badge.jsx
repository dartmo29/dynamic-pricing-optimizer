/**
 * badge.jsx
 * Badge component for status indicators and labels
 */

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Badge variants
 * @type {Object}
 */
const badgeVariants = {
  default: "bg-gray-100 text-gray-800",
  primary: "bg-blue-100 text-blue-800",
  secondary: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-sky-100 text-sky-800",
};

/**
 * Badge component
 * @param {Object} props Component props
 * @returns {JSX.Element} Styled badge component
 */
const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge, badgeVariants };
