import "./globals.css";

import type {Metadata} from "next";
import {Inter} from "next/font/google";
import type {ReactNode} from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Nutri Check",
  description: "Nutri Check checks the nutritional value of your food.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
