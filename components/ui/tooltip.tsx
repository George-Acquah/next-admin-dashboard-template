"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Button } from "./button";
import { cn } from "@/utils/classes.utils";
import { useTheme } from "next-themes";

interface _ITooltip {
  items: _ITooltipItem[];
  className?: string;
}

export const AnimatedTooltip = ({
  items,
  className = "-top-16 -left-1/2 translate-x-1/2",
}: _ITooltip) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme, setTheme, systemTheme } = useTheme();
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  // Resolve the theme if "system" is selected
  const resolvedTheme = (theme: string ) => theme === "system" ? systemTheme : theme;

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  const renderIcon = (icon: any, themeProp?: string) => {
    const Icon = icon;
    return (
      <Button
        onMouseMove={handleMouseMove}
        variant="default"
        size="default"
        className="px-2 py-2"
      >
        <Icon
          onClick={() => setTheme(themeProp ?? "system")}
          className="object-cover !m-0 !p-0 object-top h-8 w-8 group-hover:scale-105 group-hover:z-30 relative transition duration-500"
        />
      </Button>
    );
  };

  return (
    <>
      {items.map((item) => (
        <div
          className="-mr-4 relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className={cn(
                  "absolute flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2",
                  className
                )}
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                <div className="font-bold text-white relative z-30 text-base">
                  {item.name}
                </div>
                {item.designation && (
                  <div className="text-white text-xs">{item.designation}</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {item.image && (
            <Image
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
            />
          )}
          {item.icon && renderIcon(item.icon, resolvedTheme(item.theme))}
        </div>
      ))}
    </>
  );
};
