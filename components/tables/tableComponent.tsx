"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableImageCell,
} from "@/components/ui/table"; // Import custom encapsulated components
import { usePathname, useRouter } from "next/navigation";
import { UserType } from "../../lib/constants";
import { DeleteBtn, NormalEditBtn, VerificationButton } from "../users/buttons";
import StatusBadge, { _IStatus } from "../users/status";
import { cardBorder, cardsBg } from "../themes";
import NoContent from "../ui/noContent";

// Reusable component for rendering the image cell
const TableImage = React.memo(
  ({ src, desc }: { src: string; desc: string }) => (
    <TableImageCell src={src} alt={desc ?? "user's avatar"} />
  )
);

// Checkbox component for individual rows
const TableCheckbox = React.memo(
  ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <input
      type="checkbox"
      className="form-checkbox h-4 w-4"
      checked={checked}
      onChange={onChange}
    />
  )
);


// Render cell content based on the column type
const renderCell = (
  entityType: string,
  column: string,
  item: _TableRowType,
  id: string,
  type = UserType.ALL
) => {
  switch (column) {
    case "image":
      return (
        <TableImage
          src={item.image ?? ""}
          desc={String(item.description ?? "")}
        />
      );
    case "isVerified":
      return (
        <div className="flex items-center gap-x-2">
          <StatusBadge status={item[column] as _IStatus} />
          <TableButtonHelper
            id={id}
            entityType={entityType}
            type={type}
            verify
          />
        </div>
      );
    case "isAvailable":
    case "has_insurance":
    case "has_reservation":
      return <StatusBadge status={item[column] as _IStatus} />;
    default:
      const additionalClassName =
        typeof item[column] === "number" ? "text-center" : "";
      return (
        <span
          className={`${additionalClassName} text-base text-black font-mono font-semibold`}
        >
          {item[column]}
        </span>
      );
  }
};

// Button helper for edit and delete actions
const TableButtonHelper = React.memo(
  ({
    id,
    entityType,
    type,
    verify,
    status,
    deleteAction,
  }: {
    id: string;
    entityType: string;
    type?: string;
    deleteAction?: (id: string) => Promise<_IApiResponse<unknown> | undefined>;
    verify?: boolean;
    status?: boolean;
  }) => {
    const pathname = usePathname();

    const isVerification = verify && (
      <VerificationButton id={id} status={status ?? false} />
    );
    const userActions = (
      <div className="flex justify-end gap-3">
        <NormalEditBtn href={`${pathname}/${id}/update`} />
        {deleteAction && (
          <DeleteBtn id={id} label={"Delete User"} action={deleteAction} />
        )}
      </div>
    );

    return isVerification || userActions;
  }
);

// Main table component with bulk selection
const TableComponent = ({
  data,
  columnData,
  type,
  entityType,
  deleteAction,
  onBulkUpdate,
}: _ITableProps & { onBulkUpdate: (selectedIds: string[]) => void }) => {
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

  // Perform bulk update with selected rows
  const handleBulkUpdate = () => {
    onBulkUpdate(Array.from(selectedRows));
  };

  

  return (
    <>
      <button
        onClick={handleBulkUpdate}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Bulk Update Selected
      </button>
      <Table
        className={`mt-8 border border-t-0 rounded-sm min-h-[20rem] ${cardBorder} ${cardsBg}`}
      >
        <TableHeader>
          <TableRow>
            <TableCell isHeader className="px-6">
              <input
                type="checkbox"
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
            <TableCell isHeader className="relative px-12">
              <span className="sr-only">Edit</span>
            </TableCell>
            <TableCell isHeader className="relative px-2">
              <span className="sr-only">Delete</span>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            const columns = Object.keys(item);
            const isSelected = selectedRows.has(item._id);
            return (
              <TableRow
                key={`row-${index}`}
                className="px-6 align-middle border-none text-xs whitespace-nowrap p-4"
              >
                <TableCell className="px-6">
                  <TableCheckbox
                    checked={isSelected}
                    onChange={() => toggleRowSelection(item._id)}
                  />
                </TableCell>
                {columns
                  .filter((column) => !column.includes("_id"))
                  .map((column, columnIndex) => (
                    <TableCell key={`cell-${columnIndex}`} className="px-6">
                      {renderCell(entityType, column, item, item._id, type)}
                    </TableCell>
                  ))}
                <TableCell className="px-6">
                  {item["role"] !== "admin" && (
                    <TableButtonHelper
                      type={type}
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
