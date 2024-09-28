import { cn } from "@/utils/classes.utils";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // for the outline version
import { setOpenSidenav, useConfigurator } from "@/utils/contexts/configurator.context";

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { dispatch, state: { openSidenav }} = useConfigurator();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <Bars3Icon
            className="text-neutral-800 dark:text-neutral-200 w-4 h-4"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          />
        </div>
        <AnimatePresence>
          {openSidenav && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div className="absolute right-10 top-10 z-50">
                <XMarkIcon
                  className="text-neutral-800 dark:text-neutral-200 w-4 h-4"
                  onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const {
    dispatch,
    state: { openSidenav, animateSidenav },
  } = useConfigurator();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[60px] flex-shrink-0",
          className
        )}
        animate={{
          width: openSidenav
              ? "250px"
              : "60px"
        }}
        onMouseEnter={animateSidenav ? () => setOpenSidenav(dispatch, true): undefined}
        onMouseLeave={animateSidenav ? () => setOpenSidenav(dispatch, false) : undefined}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};
