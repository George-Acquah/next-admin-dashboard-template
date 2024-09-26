"use client";
import * as React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableImageCell,
  TableHeader,
} from "@/components/ui/table"; // Import custom encapsulated components
import { usePathname } from "next/navigation";
import { DeleteBtn, EditBtn } from "./buttons";
import StatusBadge from "./status";
import NoContent from "../ui/noContent";
import { Typography } from "../ui/typography";

// Helper function to identify boolean fields
const getBooleanFields = (item: _TableRowType) => {
  return Object.keys(item).filter((key) => typeof item[key] === "boolean");
};

// Reusable component for rendering the image cell
const TableImage = React.memo(
  ({ src, desc }: { src: string; desc: string }) => (
    <TableImageCell src={src} alt={desc || "user's avatar"} />
  )
);

// Checkbox component for individual rows
const TableCheckbox = React.memo(
  ({
    checked,
    id,
    onChange,
  }: {
    checked: boolean;
    id: string;
    onChange: () => void;
  }) => (
    <input
      type="checkbox"
      aria-label={id}
      id={id}
      className="form-checkbox h-4 w-4"
      checked={checked}
      onChange={onChange}
    />
  )
);

const renderCell = (column: string, item: _TableRowType) => {
  const value = item[column];

  // Handle array of strings
  if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
    return (
      <Typography variant="span" className="text-base font-mono">
        {value.join(", ")} {/* Join array of strings with comma */}
      </Typography>
    );
  }

  switch (column) {
    case "image":
      return (
        <TableImage src={item.image ?? ""} desc={item.description ?? ""} />
      );
    default:
      return (
        <Typography variant="span" className="text-base font-mono">
          {value ?? "N/A"}
        </Typography>
      );
  }
};

// Button helper for edit and delete actions
const TableButtonHelper = React.memo(
  ({
    id,
    entityType,
    type,
    deleteAction,
  }: {
    id: string;
    entityType: string;
    type?: string;
    deleteAction?: (
      id: string,
      path: string
    ) => Promise<_IApiResponse<void> | undefined | void>;
  }) => {
    const pathname = usePathname();

    return (
      <div className="flex items-center gap-2">
        <EditBtn href={`${pathname}/${id}/update`} />
        {deleteAction && (
          <DeleteBtn id={id} label={"Delete User"} action={deleteAction} />
        )}
      </div>
    );
  }
);

// Main table component with bulk selection
const TableComponent = ({
  data,
  columnData,
  entityType,
  deleteAction,
}: _ITableProps) => {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set()
  );

  if (!data || data.length === 0) {
    return (
      <NoContent
        message="No data available"
        subMessage="Try adding new items or refreshing the page."
        onActionClick={() => console.log("Add New Item")}
        actionLabel="Add New Item"
      />
    );
  }

  // Toggle the selection of a single row
  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  // Handle "Select All" checkbox
  const toggleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set()); // Unselect all
    } else {
      const allIds = new Set(data.map((item) => item._id));
      setSelectedRows(allIds); // Select all
    }
  };
  return (
    <>
      <TableHeader className="">Testing</TableHeader>
      <Table className={""}>
        <TableHead>
          <TableRow isHeader>
            <TableCell isHeader className="px-6">
              <input
                type="checkbox"
                id="check-all"
                aria-label="check-all"
                className="form-checkbox h-4 w-4"
                checked={selectedRows.size === data.length}
                onChange={toggleSelectAll}
              />
            </TableCell>
            {columnData.map((column, index) => (
              <TableCell key={`header-${index}`} isHeader className="px-6">
                {column}
              </TableCell>
            ))}
            {/* <TableCell isHeader className="relative px-2">
            <span className="sr-only">Edit</span>
          </TableCell>
          <TableCell isHeader className="relative px-2">
            <span className="sr-only">Delete</span>
          </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => {
            const booleanFields = getBooleanFields(item); // Identify boolean fields
            const isSelected = selectedRows.has(item._id);

            return (
              <TableRow
                key={`row-${item._id}`}
                className="px-6 align-middle border-none text-xs whitespace-nowrap p-4"
              >
                <TableCell className="px-6">
                  <TableCheckbox
                    checked={isSelected}
                    id={item._id}
                    onChange={() => toggleRowSelection(item._id)}
                  />
                </TableCell>

                {/* Render all columns, including dynamic and boolean fields */}
                {columnData.map((column, columnIndex) => (
                  <TableCell key={`cell-${columnIndex}`} className="px-6">
                    {booleanFields.includes(column) ? (
                      <StatusBadge status={item[column] as boolean} />
                    ) : (
                      renderCell(column, item)
                    )}
                  </TableCell>
                ))}

                <TableCell className="px-6">
                  {item["role"] !== "admin" && (
                    <TableButtonHelper
                      id={item._id}
                      entityType={entityType}
                      deleteAction={deleteAction}
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default React.memo(TableComponent);
