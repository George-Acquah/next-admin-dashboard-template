import { cn } from "@/utils/classes.utils";
import { useConfigurator } from "@/utils/contexts/configurator.context";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: _ILinks;
  className?: string;
  props?: LinkProps;
}) => {
  const { state: { openSidenav }} = useConfigurator();
  return (
    <Link
      href={link.href}
      aria-label={link.label}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: openSidenav
              ? "inline-block"
              : "none",
          opacity: openSidenav ? 1 : 0
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
