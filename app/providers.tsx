"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import SidebarProvider from "@/utils/contexts/sidebar.context";
import ModalProvider from "@/utils/contexts/modal.context";

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ModalProvider>
      <SidebarProvider>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </SidebarProvider>
    </ModalProvider>
  );
}
