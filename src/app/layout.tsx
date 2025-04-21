import type { Metadata } from "next";
import { Geist, Geist_Mono,} from "next/font/google";
import "./globals.css";
import Header from "../components/Header/page";
import { ClerkProvider } from "@clerk/nextjs";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drip Check - AI Powered Fashion",
  description: `Weather Meets Style - AI Picks Your Best Outfit Every Day 
  Rain or shine, always dress right! AI-powered outfit picks just for you.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col `} 
      >
        <Header />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
