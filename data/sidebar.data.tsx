import { ArrowLeftEndOnRectangleIcon, CodeBracketIcon, Cog8ToothIcon, UserIcon  } from "@heroicons/react/24/outline"

export const sidebarLinks: _ILinks[] = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <CodeBracketIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Profile",
    href: "#",
    icon: (
      <UserIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <Cog8ToothIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Logout",
    href: "#",
    icon: (
      <ArrowLeftEndOnRectangleIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];
