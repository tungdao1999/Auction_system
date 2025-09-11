'use client';

import { ThemeProvider } from "next-themes";
import { WebSocketProvider } from "./providers/socketProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WebSocketProvider>
      <ThemeProvider defaultTheme="light" attribute="class">
        {children}
      </ThemeProvider>
    </WebSocketProvider>
  );
}