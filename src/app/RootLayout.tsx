import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/global.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "../components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactLenis } from "@/lib/lenis";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eFootball Premier League",
  description: "Home of Official eFootball League, Kolkata, India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} antialiased relative overflow-x-hidden`}>
        <ReactLenis root>
          <NextUIProvider>
            <Navbar />
            {children}
            <ToastContainer />
          </NextUIProvider>
        </ReactLenis>
      </body>
    </html>
  );
} 