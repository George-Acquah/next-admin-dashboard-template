import * as React from "react";
import { cn } from "@/utils/classes.utils";

// Type definitions for all table components
type TableProps = React.ComponentPropsWithoutRef<"table"> & {
  className?: string;
};
type TableSectionProps = React.ComponentPropsWithoutRef<
  "thead" | "tbody" | "tfoot"
>;
type TableRowProps = React.ComponentPropsWithoutRef<"tr"> & {
  className?: string;
  isHeader?: boolean;
};
type TableCellProps = React.ComponentPropsWithoutRef<"td" | "th"> & {
  isHeader?: boolean;
  className?: string;
};
type TableImageCellProps = { src: string; alt: string; className?: string };
type TableTitleProps = React.ComponentPropsWithoutRef<"div"> & {
  className?: string;
};
type TableDescriptionProps = React.ComponentPropsWithoutRef<"div"> & {
  className?: string;
};
type TableFooterProps = React.ComponentPropsWithoutRef<"div"> & {
  className?: string;
};

// Main table wrapper component
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <table ref={ref} className={cn("w-full mt-4", className)} {...props} />
  )
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLDivElement, TableTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
);
TableHeader.displayName = "TableHeader";

// Table header, body, and footer sections
const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("", className)} {...props} />
));
TableHead.displayName = "TableHead";

const TableBody = React.forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("", className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("", className)} {...props} />
));
TableFooter.displayName = "TableFooter";

// Table row component
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, isHeader, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        `${
          isHeader
            ? "border-b border-gray-200 dark:border-gray-600"
            : "even:bg-slate-50 dark:even:bg-zinc-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm"
        }`,
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

// Table cell component (handles both regular cells and header cells)
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ isHeader = false, className, ...props }, ref) => {
    const Component = isHeader ? "th" : "td";
    return (
      <Component
        ref={ref}
        className={cn(
          "px-6 py-4 text-sm ",
          isHeader
            ? "text-left text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider"
            : "border-b border-gray-200 dark:border-zinc-900",
          className
        )}
        {...props}
      />
    );
  }
);
TableCell.displayName = "TableCell";

// Specialized table image cell for avatars or images
const TableImageCell = React.forwardRef<
  HTMLTableCellElement,
  TableImageCellProps
>(({ src, alt, className, ...props }, ref) => (
  <td ref={ref} className={cn("px-6 py-4", className)} {...props}>
    <div className="h-10 w-10 flex-shrink-0">
      <img
        className="h-10 w-10 rounded-full object-cover"
        src={src}
        alt={alt}
      />
    </div>
  </td>
));
TableImageCell.displayName = "TableImageCell";

// Table title component for a card-like display
const TableTitle = React.forwardRef<HTMLDivElement, TableTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-lg font-bold text-gray-900", className)}
      {...props}
    />
  )
);
TableTitle.displayName = "TableTitle";

// Table description for subtitles or additional details
const TableDescription = React.forwardRef<
  HTMLDivElement,
  TableDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableDescription.displayName = "TableDescription";

// Footer for card-like table with buttons or pagination
const TableFooterContent = React.forwardRef<HTMLDivElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0 border-t border-gray-200",
        className
      )}
      {...props}
    />
  )
);
TableFooterContent.displayName = "TableFooterContent";

// Export all components
export {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableImageCell,
  TableTitle,
  TableDescription,
  TableFooterContent,
};
