"use client";

import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { ThemeProvider } from "next-themes";
import { ThemeChanger } from "@/components/theme-changer";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/sonner";
import { Poppins } from '@next/font/google';
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="pt-BR">
      <body className={`antialiased ${poppins.className}`}>
        <ScrollArea className="h-screen w-full">
          <main>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <SessionProvider refetchInterval={100 * 60}>
                <Toaster theme="dark" richColors position="top-center" />
                <HelmetProvider>
                  <Helmet titleTemplate="%s | HIGH ERP" />
                  <QueryClientProvider client={queryClient}>
                    <TooltipProvider>{children}</TooltipProvider>
                    <ThemeChanger />
                  </QueryClientProvider>
                </HelmetProvider>
              </SessionProvider>
            </ThemeProvider>
          </main>
        </ScrollArea>
      </body>
    </html>
  );
}
