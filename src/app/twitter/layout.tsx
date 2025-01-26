import Background from "@/components/Background";
import React from "react";
interface Props {
  children: React.ReactNode;
}
const layout = ({ children }: Props) => {
  return (
    <div className="h-screen relative">
      <Background>{children}</Background>
    </div>
  );
};

export default layout;
