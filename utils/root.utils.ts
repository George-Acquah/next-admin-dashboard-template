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
