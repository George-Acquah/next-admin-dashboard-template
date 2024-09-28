"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import ModalProvider from "@/utils/contexts/modal.context";
import ConfiguratorProvider from "@/utils/contexts/configurator.context";
type _TProviderProps = ThemeProviderProps;

export default function Providers({ children, ...props }: _TProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      disableTransitionOnChange // Ensures no theme flickering on change
    >
      <ConfiguratorProvider>
        <ModalProvider>{children}</ModalProvider>
      </ConfiguratorProvider>
    </NextThemesProvider>
  );
}
