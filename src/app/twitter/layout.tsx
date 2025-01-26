"use client";

import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";
import Background from "@/components/Background";
interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }:Props) => {
  const { setLoading } = useLoading();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      setLoading(false);
    };

    // Listen for route changes
    window.addEventListener("beforeunload", handleRouteChange);
    window.addEventListener("load", handleRouteComplete);

    return () => {
      window.removeEventListener("beforeunload", handleRouteChange);
      window.removeEventListener("load", handleRouteComplete);
    };
  }, [setLoading]);

  return (
    <div className="h-screen relative">
      <Background>{children}</Background>
    </div>
  );
};

export default Layout;
