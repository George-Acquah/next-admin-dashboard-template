"use client";

import React, { useState, forwardRef, ReactNode, useRef } from "react";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Heroicons for icons
import { cn } from "@/utils/classes.utils"; // Utility for conditional classnames
import { _TButtonVariants, Button } from "./button";
import { useOutsideClick } from "@/utils/hooks/useOutsideClick";

// Types for the component props
interface DropdownMenuProps {
  trigger: ReactNode;
  children: (onClose: () => void) => ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface DropdownItemProps {
  className?: string;
  inset?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

interface _IDropdownSubMenuProps extends DropdownItemProps {
  trigger: ReactNode;
  position: "left" | "right";
  style?: React.CSSProperties;
}

interface _IDropDownTriggerProps extends DropdownItemProps {
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
  style?: React.CSSProperties;
}

// Base Dropdown Menu component with Tailwind animations
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  style = {},
  children,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to detect clicks outside the dropdown menu
  useOutsideClick(dropdownMenuRef, closeMenu);

  return (
    <div ref={dropdownMenuRef} className="relative inline-block text-left">
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>

      {open && (
        <div
          className={cn(
            "absolute z-50 mt-2 shadow-lg ring-opacity-5 bg-white rounded-lg transform transition-all duration-200 ease-in-out",
            open ? "opacity-100 scale-100" : "opacity-0 scale-95",
            className
          )}
          style={style}
        >
          {children(closeMenu)}
        </div>
      )}
    </div>
  );
};

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

// Dropdown Menu Content component
export const DropdownMenuContent: React.FC<{
  className?: string;
  children: ReactNode;
}> = ({ className, children }) => (
  <div className={cn("py-1", className)}>{children}</div>
);

// Dropdown Menu Item component with Tailwind hover and tap animations
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, inset, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center rounded-md px-4 py-2 text-sm transition-transform duration-150 hover:bg-gray-100 active:scale-95",
        inset && "pl-8",
        className
      )}
      onClick={props.onClick}
      {...props}
    >
      {children}
    </div>
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

// Dropdown Menu Checkbox Item
export const DropdownMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  DropdownCheckboxItemProps
>(({ className, children, checkboxClassName, checked, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100 transition-transform duration-150 active:scale-95",
      className
    )}
    {...props}
  >
    <span
      className={cn(
        "absolute rounded-sm border flex h-3.5 w-3.5 items-center justify-center",
        checkboxClassName
      )}
    >
      {checked && <CheckIcon className={cn("h-4 w-4")} />}
    </span>
    {children}
  </div>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// Dropdown Menu Radio Item
export const DropdownMenuRadioItem = forwardRef<
  HTMLDivElement,
  DropdownRadioItemProps
>(({ className, radioClassName, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100 transition-transform duration-150 active:scale-95",
      className
    )}
    {...props}
  >
    <span
      className={cn(
        "absolute border border-neutral-500 rounded-full flex h-3.5 w-3.5 items-center justify-center"
      )}
    >
      <div className={cn("rounded-full", radioClassName)} />
    </span>
    {children}
  </div>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// Dropdown Menu Sub Trigger
export const DropdownMenuSubTrigger = forwardRef<
  HTMLDivElement,
  _IDropdownSubMenuProps
>(
  (
    { className, trigger, position, style = {}, inset, children, ...props },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-pointer items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100 transition-transform duration-150 active:scale-95",
          inset && "pl-8",
          className
        )}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {trigger}
        <ChevronRightIcon className="ml-auto h-4 w-4" />
        {open && (
          <DropdownMenuSubContent position={position} style={style}>
            {children}
          </DropdownMenuSubContent>
        )}
      </div>
    );
  }
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

// Dropdown Menu Sub Content
export const DropdownMenuSubContent: React.FC<DropdownMenuSubContentProps> = ({
  style,
  position,
  className,
  children,
}) => (
  <div
    className={cn(
      "absolute top-0 w-48 mt-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200",
      position === "right" ? "left-full" : "right-full",
      className
    )}
    style={style}
  >
    {children}
  </div>
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
