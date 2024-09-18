import Sidebar from "@/components/navigation/sidebar";
import { cn } from "@/utils/classes.utils";

export default function DashboardLayout({children}: _IChildren) {
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]"
      )}
    >
      <Sidebar />
      {children}
    </div>
  );
}