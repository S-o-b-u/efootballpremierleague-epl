"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="w-full max-w-[95vw] sm:max-w-xs md:max-w-[60vw] mx-auto flex justify-center items-center antialiased font-sans px-4">
      <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-1">
        <div className="flex justify-center">
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-[45vh] md:w-[20vw]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={200}
                    height={200}
                    draggable={false}
                    quality={100}
                    className="h-full w-full rounded-2xl sm:rounded-3xl md:rounded-full object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4 text-center md:text-left">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {testimonials[active].name}
            </h3>
            <p
              className={`text-sm ${
                testimonials[active].designation.includes("Developer")
                  ? "text-lime-400"
                  : "text-blue-400"
              }`}
            >
              {testimonials[active].designation}
            </p>
            {testimonials[active].designation.includes("Developer") && (
              <div className="mt-2 flex justify-center md:justify-start gap-2">
                {testimonials[active].name.includes("Souvik") ? (
                  <>
                    <Link href="https://www.linkedin.com/in/souvik-rahut-3059a128a/">
                      <button className="transform hover:scale-110 transition-transform">
                        <Image
                          src="/images/ln.svg"
                          alt="linkedin"
                          width={25}
                          height={25}
                          draggable={false}
                          quality={100}
                        />
                      </button>
                    </Link>
                    <Link href="https://www.instagram.com/maihoonshobu/">
                      <button className="transform hover:scale-110 transition-transform">
                        <Image
                          src="/images/ig.png"
                          alt="instagram"
                          width={25}
                          height={25}
                          draggable={false}
                          quality={100}
                        />
                      </button>
                    </Link>
                  </>
                ) : (
                  <Link href="https://www.linkedin.com/in/abir-dutta-a30b22251/">
                    <button className="transform hover:scale-110 transition-transform">
                      <Image
                        src="/images/ln.svg"
                        alt="linkedin"
                        width={25}
                        height={25}
                        draggable={false}
                        quality={100}
                      />
                    </button>
                  </Link>
                )}
              </div>
            )}
            <motion.p className="text-sm sm:text-md text-gray-100 font-semibold dark:text-neutral-300 mt-4">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex justify-center md:justify-start gap-4 pt-8 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-8 w-8 sm:h-7 sm:w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-8 w-8 sm:h-7 sm:w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
