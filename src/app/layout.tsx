import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlayStation Games Explorer | Mouse & Keyboard Support",
  description: "Find PlayStation games that support mouse, keyboard, or both input methods. Filter by input type and discover the most playable games.",
  keywords: ["PlayStation", "games", "mouse support", "keyboard support", "PS5", "PS4", "input methods"],
  authors: [{ name: "BartekTricks" }],
  openGraph: {
    title: "PlayStation Games Explorer",
    description: "Find PlayStation games that support your preferred input method",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlayStation Games Explorer",
    description: "Find PlayStation games that support your preferred input method",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster duration={18000} richColors />
      </body>
    </html>
  );
}
