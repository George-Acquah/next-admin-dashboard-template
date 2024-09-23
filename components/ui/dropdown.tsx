"use client";

import React, { useState, forwardRef, ReactNode, useRef } from "react";
import {
  CheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid"; // Heroicons for icons
import { motion, AnimatePresence } from "framer-motion"; // Framer motion for animations
import { cn } from "@/utils/classes.utils"; // Utility for conditional classnames
import { _TButtonVariants, Button } from "./button";
import { useOutsideClick } from "@/utils/hooks/useOutsideClick";

// Types for the component props
interface DropdownMenuProps {
  trigger: ReactNode;
  children: (onClose: () => void) => ReactNode; // Pass onClose to children;
  className?: string;
  style: React.CSSProperties;
}

interface DropdownItemProps {
  className?: string;
  inset?: boolean;
  children: ReactNode;
  onClick?: () => void; // Add the onClick prop here
}

interface _IDropdownSubMenuProps extends DropdownItemProps {
  trigger: ReactNode;
  position: "left" | "right";
  style: React.CSSProperties;
}

interface _IDropDownTriggerProps extends DropdownItemProps{
  variant: _TButtonVariants;
  size: _TSizes;
}

interface DropdownCheckboxItemProps extends DropdownItemProps {
  checked: boolean;
  checkboxClassName?: string;
}

interface DropdownRadioItemProps extends DropdownItemProps {
  radioClassName?: string;
}

type DropdownMenuLabelProps = DropdownItemProps;

interface DropdownMenuSubContentProps {
  className?: string;
  children: ReactNode;
  position: "left" | "right";
  style: React.CSSProperties;
}

// Base Dropdown Menu component with animations
export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, style = {}, children, className} ) => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to detect clicks outside the dropdown menu
  useOutsideClick(dropdownMenuRef, closeMenu);
  return (
    <div ref={dropdownMenuRef} className="relative inline-block text-left">
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              "absolute z-50 mt-2 shadow-lg ring-opacity-5",
              className
            )}
            style={style}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {children(closeMenu)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Dropdown Menu Trigger component
export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  _IDropDownTriggerProps
>(({ className, size, variant, children, ...props }, ref) => (
  <Button
    variant={variant}
    size={size}
    ref={ref}
    className={cn("", className)}
    {...props}
  >
    {children}
  </Button>
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// Dropdown Menu Content component with framer-motion
export const DropdownMenuContent: React.FC<{
  className?: string;
  children: ReactNode;
}> = ({ className, children }) => (
  <div className={cn("py-1", className)}>{children}</div>
);

// Dropdown Menu Item component with hover animations
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, inset, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex cursor-pointer items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100",
        inset && "pl-8",
        className
      )}
      onClick={props.onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

// Dropdown Menu Checkbox Item
export const DropdownMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  DropdownCheckboxItemProps
>(({ className, children, checkboxClassName, checked, ...props }, ref) => (
  <motion.div
    ref={ref}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "relative flex cursor-pointer items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100",
      className
    )}
    {...props}
  >
    <span
      className={cn(
        `absolute rounded-sm border flex h-3.5 w-3.5 items-center justify-center`,
        checkboxClassName
      )}
    >
      {checked && <CheckIcon className={cn("h-4 w-4")} />}
    </span>
    {children}
  </motion.div>
));

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// Dropdown Menu Radio Item
export const DropdownMenuRadioItem = forwardRef<
  HTMLDivElement,
  DropdownRadioItemProps
>(({ className, radioClassName, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "relative flex cursor-pointer items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100",
      className
    )}
    {...props}
  >
    <span
      className={cn(
        `absolute border border-neutral-500 rounded-full flex h-3.5 w-3.5 items-center justify-center`
      )}
    >
      <div className={cn("rounded-full", radioClassName)} />
    </span>
    {children}
  </motion.div>
));

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// Dropdown Menu Sub Trigger with animations
export const DropdownMenuSubTrigger = forwardRef<
  HTMLDivElement,
  _IDropdownSubMenuProps
>(({ className, trigger, position, style = {}, inset, children, ...props }, ref) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex cursor-pointer items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100",
        inset && "pl-8",
        className
      )}
      onMouseEnter={() => setOpen(true)} // Open on mouse enter
        onMouseLeave={() => setOpen(false)} // Close on mouse leave
      {...props}
    >
      {trigger}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
      <AnimatePresence>
        {open && <DropdownMenuSubContent position={position} style={style}>{children}</DropdownMenuSubContent>}
      </AnimatePresence>
    </motion.div>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

// Dropdown Menu Sub Content with motion
export const DropdownMenuSubContent: React.FC<DropdownMenuSubContentProps> = ({
  style,
  position,
  className,
  children,
}) => (
  <motion.div
    className={cn(
      "absolute top-0 w-48 mt-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5",
      className
    )}
    initial={{ opacity: 0, x: position === "left" ? 10 : -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: position === "left" ? 10 : -10 }}
    transition={{ duration: 0.2 }}
    style={style}
  >
    {children}
  </motion.div>
);


// Dropdown Menu Separator
export const DropdownMenuSeparator: React.FC = () => (
  <div className="border-t border-gray-200 my-1"></div>
);

// Dropdown Menu Label
export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({
  className,
  inset,
  children,
}) => (
  <div
    className={cn(
      "px-4 py-2 text-sm font-semibold text-gray-700",
      inset && "pl-8",
      className
    )}
  >
    {children}
  </div>
);

// Shortcut key helper
export const DropdownMenuShortcut: React.FC<DropdownItemProps> = ({
  className,
  children,
}) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)}>
    {children}
  </span>
);
