'use client'

import { motion } from "framer-motion";
import { DesktopSidebar, MobileSidebar } from "./sidebarTypes";
import { useSidebar } from "@/utils/contexts/sidebar.context";
import { Logo, LogoIcon } from "../ui/logo";
import { sidebarLinks } from "@/data/sidebar.data";
import { SidebarLink } from "./sidebarLinks";
import Image from 'next/image';

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

const Sidebar = () => {
  const { open } = useSidebar();
  return (
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {sidebarLinks.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Manu Arora",
              href: "#",
              icon: (
                <Image
                  src="https://assets.aceternity.com/manu.png"
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
  );
};

export default Sidebar;