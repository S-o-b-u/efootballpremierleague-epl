"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/ui/dropdown";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollProgress } from "./Scrollprogress";

export default function Navbar() {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Initial setup
    gsap.set([logoRef.current, linksRef.current, buttonRef.current], {
      opacity: 0,
      y: -20,
    });

    // Animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to(navbarRef.current, {
      opacity: 1,
      duration: 0.5,
    })
      .to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      })
      .to(
        linksRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      );
  }, []);

  return (
    <>
      <ScrollProgress className="bottom-0" />

      <div
        ref={navbarRef}
        className="fixed w-full top-0 h-[10vh] bg-black bg-opacity-80 text-white flex items-center px-4 md:px-14 z-50"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <Menu />
            </div>
            <div ref={logoRef} className="flex items-center gap-3">
              <Link href={"/"} className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="Premier League Logo"
                  width={55}
                  height={40}
                  className="object-contain"
                />
                <h1 className="hidden lg:block text-[3vh] md:text-[4.5vh] font-semibold">
                  Premier League
                </h1>
              </Link>
            </div>
            <div className="flex ml-2 items-center gap-5">
              <div className="relative flex items-center">
                <span className="absolute -left-2 w-2 h-2 bg-lime-400 rounded-full animate-ping"></span>
                <span className="absolute -left-2 w-2 h-2 bg-lime-400 rounded-full"></span>
                <p className="text-lime-500 font-semibold ml-2 animate-pulse">
                  LIVE
                </p>
              </div>
            </div>
          </div>

          <div
            ref={linksRef}
            className="flex items-center gap-3 md:gap-5 lg:gap-10"
          >
            <div className="hidden md:flex items-center gap-2 lg:gap-10">
              <Link
                className="hover:text-teal-400 text-[#D53385] duration-300"
                href={"/fixtures"}
              >
                Fixtures
              </Link>
              <Link
                className="hover:text-teal-400 text-[#D53385] duration-300"
                href={"/season"}
              >
                Hall Of Fame
              </Link>
              <Link
                className="hover:text-teal-400 duration-300"
                href={"/tournaments"}
              >
                Tournament
              </Link>
              <Link
                className="hover:text-teal-400 duration-300"
                href={"/instagram"}
              >
                Feed
              </Link>
              <Link
                className="hover:text-teal-400 duration-300"
                href={"/about"}
              >
                About Us
              </Link>
              <Link
                className="hover:text-teal-400 duration-300"
                href={"/contact"}
              >
                Contact Us
              </Link>
            </div>

            <div ref={buttonRef}>
              <Link
                href={
                  "https://www.instagram.com/efootballpremierleague/profilecard/"
                }
              >
                <button className="cursor-pointer bg-cyan-400 py-2 px-4 rounded-xl text-white font-semibold hover:bg-cyan-500 transition-all duration-300">
                  Join Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
