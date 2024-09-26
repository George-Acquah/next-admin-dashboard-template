'use server'

// Importing any necessary dependencies
import { revalidatePath } from "next/cache"; // revalidatePath to refresh the path after action

// Server action for deleting an entity
export async function deleteEntity(id: string, path: string): Promise<void> {
  try {
    // Perform your server-side delete logic here
    // Example: You could call an API, or a database service to delete the item
    // await fetch(`/api/delete/${id}`, { method: "DELETE" });
    console.log(id, 'delete mimiced');

    // Revalidate the cache for the specific path after deletion to ensure data is refreshed
    revalidatePath(path);
  } catch (error) {
    console.error("Failed to delete entity:", error);
    throw new Error("Failed to delete entity");
  }
}

// Server action for deleting an entity
export async function updateBulkEntity(ids: string[]): Promise<void> {
  try {
    // Perform your server-side delete logic here
    // Example: You could call an API, or a database service to delete the item
    // await fetch(`/api/delete/${id}`, { method: "DELETE" });

    // Revalidate the cache for the specific path after deletion to ensure data is refreshed
    // revalidatePath(path);
    console.log(ids, 'updated mimiced')
    return;
  } catch (error) {
    console.error("Failed to delete entity:", error);
    throw new Error("Failed to delete entity");
  }
}


