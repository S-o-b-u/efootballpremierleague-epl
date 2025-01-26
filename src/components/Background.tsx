"use client";
import React from "react";
import { useLoading } from "@/context/LoadingContext";
import { Vortex } from "../components/ui/vortex";
import "@/app/globals.css";

interface Props {
  children: React.ReactNode;
}

export default function Background({ children }: Props) {
  const { loading } = useLoading();

  return (
    <div className={`relative w-full h-screen scrollbar-hide ${loading ? 'bg-black' : ''}`}>
      {/* Vortex background */}
      <div className="fixed bg-black inset-0 z-0">
        {/* <Vortex
          particleCount={200}
          baseHue={120}
          backgroundColor="#000000"
          containerClassName="w-full h-full fixed inset-0"
        /> */}
      </div>
      {/* Content */}
      <div className="relative z-10 w-full scrollbar-hide overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
