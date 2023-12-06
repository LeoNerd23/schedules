import React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import HeaderMobile from "@/components/header";

export const metadata: Metadata = {
  title: "Agendamento",
  description: "Agendamento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          <header className="mb-4">
            <HeaderMobile />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
