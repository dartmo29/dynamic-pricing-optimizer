/**
 * Link.jsx
 * Component for internal and external links with styling support
 */

import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Link component that supports both internal and external links with styling
 * 
 * @param {Object} props Component props
 * @param {string} props.href Link destination URL
 * @param {string} props.className Custom CSS classes
 * @param {boolean} props.external Whether this is an external link
 * @param {React.ReactNode} props.children Content to render inside the link
 * @returns {JSX.Element} Styled link component
 */
const Link = ({ 
  href, 
  className, 
  external = false, 
  children,
  ...props 
}) => {
  // For now, this is a simple implementation. In a real app with routing,
  // we'd integrate with React Router or Next.js Link component
  const classes = cn(
    "text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    className
  );

  // If external, add target="_blank" and rel attributes for security
  if (external) {
    return (
      <a 
        href={href} 
        className={classes} 
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Simple internal link for demo purposes
  // In a real app, we'd use a router's Link component 
  return (
    <a 
      href={href} 
      className={classes}
      {...props}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  external: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export { Link };
