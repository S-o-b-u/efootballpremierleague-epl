
import Background from "@/components/Background";
import React from "react";
interface Props {
  children: React.ReactNode;
}
const layout = ({ children }: Props) => {
  return (
  <Background>{children}</Background>
  )
};

export default layout;
