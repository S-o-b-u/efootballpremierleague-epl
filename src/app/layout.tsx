"use client";

import { LoadingProvider } from "@/context/LoadingContext";
import RootLayout from "./RootLayout"; // Import the new RootLayout
interface Props {
  children: React.ReactNode;
} 
const Layout = ({ children }: Props) => {
  return (
    <LoadingProvider>
      <RootLayout>{children}</RootLayout>
    </LoadingProvider>
  );
};

export default Layout;
