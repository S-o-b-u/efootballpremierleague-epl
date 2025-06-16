import Footer from "@/components/Footer";
import FuzzyText from "@/components/FuzzyText";
import RegisterForm from "@/components/RegisterForm";
import React from "react";

const page = () => {
  return (
    <>
        <RegisterForm />
        {/* <FuzzyText baseIntensity={0.2} hoverIntensity={0.2} enableHover={true}>
          404
        </FuzzyText> */}
      <Footer />
    </>
  );
};

export default page;
