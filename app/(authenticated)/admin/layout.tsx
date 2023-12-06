import React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

import "../../(public)/globals.css";
import HeaderAdmin from "@/components/header-admin";

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
            <HeaderAdmin />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
