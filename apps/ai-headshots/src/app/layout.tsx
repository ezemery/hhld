"use client";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
//@ts-expect-error
import { cn } from "@repo/ui/utils";
import "./globals.css";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
