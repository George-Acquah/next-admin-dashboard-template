"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import SidebarProvider from "@/utils/contexts/sidebar.context";
import ModalProvider from "@/utils/contexts/modal.context";
import ConfiguratorProvider from "@/utils/contexts/configurator.context";
interface _IProviderProps extends ThemeProviderProps {
  animate?: boolean;
}

export default function Providers({
  children,
  animate = true,
  ...props
}: _IProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      disableTransitionOnChange // Ensures no theme flickering on change
    >
      <ConfiguratorProvider>
        <SidebarProvider animate={animate}>
          <ModalProvider>{children}</ModalProvider>
        </SidebarProvider>
      </ConfiguratorProvider>
    </NextThemesProvider>
  );
}
