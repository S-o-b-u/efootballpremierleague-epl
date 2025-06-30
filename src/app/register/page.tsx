import Footer from "@/components/Footer";
import FuzzyText from "@/components/FuzzyText";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Centered 404 Section */}
      <main className="flex flex-1 items-center justify-center py-24 px-4">
        <div className="w-full max-w-3xl flex justify-center">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontSize="clamp(3rem, 10vw, 8rem)"
            fontWeight={900}
          >
            404
          </FuzzyText>
        </div>
      </main>

      {/* Footer at the Bottom */}
      <Footer />
    </div>
  );
};

export default page;
