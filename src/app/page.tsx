"use client";
import Loader from "@/components/Loader";
import Background from "@/components/Background";
import { CarouselPlugin } from "@/components/Carousal";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Footer from "@/components/Footer";
import Magnet from "@/components/Magnet";
import { InteractiveHoverButton } from "@/components/Hoverbutton";

interface AnimatedCounterProps {
  end: string | number;
  duration?: number;
}

const AnimatedCounter = ({ end, duration = 2 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = parseInt(end.toString());
    const increment = target / (duration * 60); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span ref={countRef}>{count}</span>;
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const statsRefMobile = useRef<HTMLDivElement | null>(null);
  const statsRefDesktop = useRef<HTMLDivElement | null>(null);
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (headingRef.current && textRef.current && buttonsRef.current && carouselRef.current) {
        gsap.set(
          [
            headingRef.current,
            textRef.current,
            buttonsRef.current,
            statsRefMobile.current,
            statsRefDesktop.current,
          ],
          {
            opacity: 0,
            y: 50,
          }
        );

        gsap.set(carouselRef.current, {
          opacity: 0,
          scale: 0.9,
        });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => setStartCounting(true),
        });

        tl.to(carouselRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1,
        })
          .to(
            statsRefMobile.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.1,
            },
            "-=0.4"
          )
          .to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
          })
          .to(
            textRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
            },
            "-=0.4"
          )
          .to(
            buttonsRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
            },
            "-=0.4"
          )
          .to(
            statsRefDesktop.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
            },
            "-=0.4"
          );

        const buttons = document.querySelectorAll(".hover-scale");
        buttons.forEach((button) => {
          button.addEventListener("mouseenter", () => {
            gsap.to(button, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });
          button.addEventListener("mouseleave", () => {
            gsap.to(button, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }
    }
  }, [loading]);

  const stats = [
    { value: "20", label: "Active Players", prefix: "", suffix: "+" },
    { value: "120", label: "Monthly Matches", prefix: "", suffix: "+" },
    { value: "10", label: "Pro Teams", prefix: "", suffix: "+" },
    { value: "400", label: "Prize Pool", prefix: "₹", suffix: "/-" },
  ];

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Background>
          <div className="flex flex-col relative w-full justify-center items-center left-0 right-0 top-0 bottom-0 m-auto h-full overflow-x-hidden scrollbar-hide">
            <div className="flex relative flex-col w-full">
              <div
                ref={carouselRef}
                className="px-2 md:px-16  mb-10 mt-[12vh]  w-full"
              >
                <CarouselPlugin />
              </div>
              <div
                ref={statsRefMobile}
                className="sections hidden md:flex justify-center  mt-2 mb-5"
              >
                <section className="stats-section flex flex-wrap gap-6 md:gap-10 justify-center items-center px-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="stat-card bg-black/30 w-[70%] md:w-[15vw] text-center block mb-8 backdrop-blur-lg p-6 rounded-xl hover:bg-black/40 transition-all duration-300 hover:-translate-y-1"
                    >
                      <h3 className="text-3xl md:text-4xl font-bold text-teal-400">
                        {stat.prefix}
                        {startCounting ? (
                          <AnimatedCounter end={stat.value} />
                        ) : (
                          "0"
                        )}
                        {stat.suffix}
                      </h3>
                      <p className="text-gray-300 mt-2">{stat.label}</p>
                    </div>
                  ))}
                </section>
              </div>
              <div className="text-white mt-10 md:mt-2 w-full text-center">
                <h1
                  ref={headingRef}
                  className="text-[5vh] md:text-[8vh] lg:text-[12vh] leading-[1.2] custom-text mb-10"
                >
                  <Magnet padding={500} disabled={false} magnetStrength={50}>
                    <span className="text-[5vh] md:text-[10vh] lg:text-[15vh] text-transparent bg-clip-text bg-gradient-to-r from-[#56c5bc] via-[#14B8A6] to-[#0EA5E9] drop-shadow-[0_0_5px_rgba(14,181,233,0.7)] animate-pulse">
                      Your League,
                    </span>
                  </Magnet>
                  <span className="text-glow">Your Legacy!</span>
                </h1>
                <p
                  ref={textRef}
                  className="tracking-tighter text-[1.5vh] md:text-[2.5vh] lg:text-[3vh] px-2 md:px-4 mx-auto max-w-[85%] md:max-w-[70%] text-gray-200"
                >
                  Kickstart your journey in the eFootball Premier League: a world
                  of epic matches, legendary players, and unforgettable moments on
                  the ultimate digital field!
                </p>
                <div
                  ref={buttonsRef}
                  className="mt-6 md:mt-8 lg:mt-10  flex gap-3 flex-row justify-center items-center"
                >
                    <Link href={"/register"}>
                    <InteractiveHoverButton>Ja Bhai Tu Khel</InteractiveHoverButton>
                    </Link>
                  <h1 className="text-[3vh] md:text-[3.5vh] lg:text-[4vh] font-mono text-gray-500">
                    |
                  </h1>
                    <Link href={"/season"}>
                      <button className="bg-transparent text-[2vh] md:text-[2.5vh] lg:text-[3vh] text-teal-500  hover:text-teal-400 transition-all duration-300">
                        Season
                      </button>
                    </Link>
                </div>
              </div>
              <div
                ref={statsRefDesktop}
                className="sections flex md:hidden mt-24 mb-5"
              >
                <section className="stats-section flex flex-wrap gap-6 md:gap-10 justify-center items-center px-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="stat-card bg-black/30 w-[70%] md:w-[15vw] text-center block mb-8 backdrop-blur-lg p-6 rounded-xl hover:bg-black/40 transition-all duration-300 hover:-translate-y-1"
                    >
                      <h3 className="text-3xl md:text-4xl font-bold text-teal-400">
                        {stat.prefix}
                        {startCounting ? (
                          <AnimatedCounter end={stat.value} />
                        ) : (
                          "0"
                        )}
                        {stat.suffix}
                      </h3>
                      <p className="text-gray-300 mt-2">{stat.label}</p>
                    </div>
                  ))}
                </section>
              </div>
            </div>
            <Footer />
          </div>
        </Background>
      )}
    </>
  );
};

export default Home;