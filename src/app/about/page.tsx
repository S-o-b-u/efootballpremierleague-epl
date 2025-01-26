import EmojiFeedback from "@/components/Feedback";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import React from "react";

const page = () => {
  return (
    <>
    <div className="flex justify-center items-center m-auto w-full min-h-screen  overflow-hidden scrollbar-hide">
      <div className="flex pt-20 mt-5 mb-6 justify-center flex-col gap-10 md:mt-10">
        <Testimonials />
        <EmojiFeedback />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default page;