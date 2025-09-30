import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { connection } from "next/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Optimized font loading with Next.js
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

// Use Inter for both primary and secondary fonts to avoid Open Sans loading issues
const openSans = Inter({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://narvex.id'),
  title: "Narvex - Creative Services & Event Production",
  description: "Narvex adalah perusahaan creative services yang berdedikasi untuk membantu brand berkembang melalui solusi kreatif yang inovatif.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // Removed maximumScale to allow users to zoom for accessibility
  // This follows WCAG 2.1 guidelines for text resizing
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Force dynamic rendering to ensure nonce is applied
  await connection();
  
  // Get nonce from headers set by middleware
  const nonce = (await headers()).get('x-nonce');
  
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${openSans.variable} antialiased`}
        {...(nonce && { 'data-nonce': nonce })}
      >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
