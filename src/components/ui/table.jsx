
import React from 'react';

const Table = ({ children, className, ...props }) => {
  return (
    <div className={`w-full overflow-auto ${className}`} {...props}>
      <table className="w-full caption-bottom text-sm">
        {children}
      </table>
    </div>
  );
};

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
));

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th ref={ref} className={`h-12 px-4 text-left align-middle font-medium ${className}`} {...props} />
));

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
));

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr ref={ref} className={`border-b transition-colors ${className}`} {...props} />
));

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td ref={ref} className={`p-4 align-middle ${className}`} {...props} />
));

export { Table, TableHeader, TableHead, TableBody, TableRow, TableCell };
