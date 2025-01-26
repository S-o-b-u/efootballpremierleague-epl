"use client";

import React, { createContext, useContext, useState } from "react";
interface Props {
    children: React.ReactNode;
  }
const LoadingContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});

export const LoadingProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext); 