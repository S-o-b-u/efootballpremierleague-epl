import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/global.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "../components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactLenis } from "@/lib/lenis";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

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
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} antialiased relative overflow-x-hidden`}>
        <ReactLenis root>
          <NextUIProvider>
            <Navbar />
            {children}
            <button
              onClick={scrollToTop}
              className={`fixed bottom-8 right-8 p-3 rounded-full bg-cyan-400 text-white shadow-lg transition-all duration-300 hover:bg-cyan-500 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} z-50`}
            >
              <ArrowUp className="h-6 w-6" />
            </button>
            <ToastContainer />
          </NextUIProvider>
        </ReactLenis>
      </body>
    </html>
  );
}