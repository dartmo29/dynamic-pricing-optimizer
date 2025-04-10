/**
 * dialog.jsx
 * Dialog component based on Radix UI Dialog primitive
 */

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Dialog Root component
 */
const Dialog = DialogPrimitive.Root;

/**
 * Dialog Trigger component
 */
const DialogTrigger = DialogPrimitive.Trigger;

/**
 * Dialog Portal component
 */
const DialogPortal = DialogPrimitive.Portal;

/**
 * Dialog Close component
 */
const DialogClose = DialogPrimitive.Close;

/**
 * Dialog Overlay component
 * 
 * @param {Object} props Component props
 * @param {string} props.className Custom CSS classes
 * @param {...any} props.props Other props
 * @returns {JSX.Element} Styled dialog overlay
 */
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * Dialog Content component
 * 
 * @param {Object} props Component props
 * @param {string} props.className Custom CSS classes
 * @param {React.ReactNode} props.children Dialog content
 * @param {...any} props.props Other props
 * @returns {JSX.Element} Styled dialog content
 */
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * Dialog Header component
 * 
 * @param {Object} props Component props
 * @param {string} props.className Custom CSS classes
 * @param {...any} props.props Other props
 * @returns {JSX.Element} Styled dialog header
 */
const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

/**
 * Dialog Footer component
 * 
 * @param {Object} props Component props
 * @param {string} props.className Custom CSS classes
 * @param {...any} props.props Other props
 * @returns {JSX.Element} Styled dialog footer
 */
const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

/**
 * Dialog Title component
 * 
 * @param {Object} props Component props
 * @param {string} props.className Custom CSS classes
 * @param {...any} props.props Other props
 * @returns {JSX.Element} Styled dialog title
 */
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold text-gray-900 leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * Dialog Description component
 * 
 * @param {Object} props Component props
 * @param {string} props.className Custom CSS classes
 * @param {...any} props.props Other props
 * @returns {JSX.Element} Styled dialog description
 */
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};