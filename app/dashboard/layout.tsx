import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils/classes.utils";
import { THEME } from "@/utils/constants";
import dynamic from "next/dynamic";

const Search = dynamic(() => import("@/components/search"), {
  loading: () => <Typography variant="span">Loading...</Typography>,
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
        "flex md:flex-row bg-gray-100 dark:bg-neutral-800 w-full border border-neutral-200 dark:border-neutral-700",
        "h-screen" // Changed to h-screen for full height
      )}
    >
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Enable vertical scroll */}
        <div
          className={`p-2 md:px-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 ${THEME.mainBg} flex flex-col gap-2`}
        >
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
