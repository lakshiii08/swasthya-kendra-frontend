import { LanguageProvider } from "@/contexts/LanguageContext";

import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import Script from "next/script";

import "./globals.css";

const geistSans = Geist({
  variable:
    "--font-geist-sans",

  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",

    subsets: ["latin"],
  });

export const metadata:
  Metadata = {

  title:
    "Swasthya Healthcare",

  description:
    "AI & Blockchain Powered Smart Healthcare Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {

  return (

    <html
      lang="en"

      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >

      <body
        className="
          min-h-full
          flex
          flex-col
        "
      >

        {/* RAZORPAY */}

        <Script
          src="
https://checkout.razorpay.com/v1/checkout.js
          "
        />

        <LanguageProvider>

          {children}

        </LanguageProvider>

      </body>

    </html>
  );
}