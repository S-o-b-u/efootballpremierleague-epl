import Footer from "@/components/Footer";
import FuzzyText from "@/components/FuzzyText";
import RegisterForm from "@/components/RegisterForm";
import React from "react";

const page = () => {
  return (
    <>
      <div className="h-screen w-full flex flex-col gap-8 items-center justify-center">
        {/* <RegisterForm /> */}
        <FuzzyText baseIntensity={0.2} hoverIntensity={0.2} enableHover={true}>
          404
        </FuzzyText>
      </div>
      <Footer />
    </>
  );
};

export default page;
