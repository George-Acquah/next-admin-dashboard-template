import React from "react";
import { THEME } from "@/utils/constants/index"; // Import your theme

interface SkeletonProps {
  numRows: number; // Number of rows to render in the skeleton
  numColumns: number; // Number of columns (fields) to render
}

const SkeletonTable: React.FC<SkeletonProps> = ({ numRows, numColumns }) => {
  // Render an array of skeleton rows based on the numRows prop
  const skeletonRows = Array.from({ length: numRows }, (_, rowIndex) => (
    <div
      key={`skeleton-row-${rowIndex}`}
      className={`flex gap-4 items-center p-2 ${THEME.secBg} rounded`}
    >
      {/* Render skeleton cells based on numColumns */}
      {Array.from({ length: numColumns }, (_, colIndex) => (
        <div
          key={`skeleton-col-${colIndex}`}
          className="h-6 w-full bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse"
        />
      ))}
    </div>
  ));

  return (
    <div className={`w-full ${THEME.mainBg} p-4 rounded-lg`}>
      {skeletonRows}
    </div>
  );
};

export default SkeletonTable;
