import { Typography } from "@/components/ui/typography";

import { cn } from "@/utils/classes.utils";
import dynamic from "next/dynamic";

const Search = dynamic(() => import("@/components/search"), {
  loading: () => <Typography variant="span">Loading...</Typography>
});

const Sidebar = dynamic(() => import("@/components/navigation/sidebar"), {
  loading: () => <Typography variant="span">Loading...</Typography>,
});

const NavbarDropdowns = dynamic(
  () => import("@/components/navigation/navbarDropdowns"),
  {
    loading: () => <Typography variant="span">Loading...</Typography>,
  }
);

export default function DashboardLayout({ children }: _IChildren) {
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  border border-neutral-200 dark:border-neutral-700",
        "h-[100vh]"
      )}
    >
      <Sidebar />
      <div className="flex flex-1">
        <div className="p-2 md:px-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <div className="md:mb-4 flex flex-row justify-between items-center">
            <Search entityType="QUERY" />
            <NavbarDropdowns
              user={{
                name: "George Acquah",
                email: "georgeacquah889@gmail.com",
              }}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
