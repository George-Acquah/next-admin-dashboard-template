/**
 * Truncate the message to the specified length and add '...' if it exceeds that length.
 * @param message - The message to truncate.
 * @param maxLength - The maximum number of characters to display before truncating.
 * @returns The truncated message.
 */
export const truncateMessage = (message: string, maxLength: number = 15): string => {
  return message.length > maxLength
    ? message.slice(0, maxLength) + "..."
    : message;
};

// Dropdown styles logic based on screen size
export const getDropdownStyles = (
  mobileLeft: string,
  mobileTop: string,
  desktopLeft: string,
  desktopTop: string,
  isMobile: boolean
) =>
  isMobile
    ? { left: mobileLeft, top: mobileTop } // Mobile styles
    : { left: desktopLeft, top: desktopTop }; // Desktop styles

// Percentage calculation utility
export const calculatePercentage = (total: number, item: number) => {
  if (total === 0) return '0'; // Prevent division by zero
  const percentage = (item / total) * 100;
  return percentage.toFixed(0); // Return the percentage as a whole number
};