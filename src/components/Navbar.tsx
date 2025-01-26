'use client'
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/ui/dropdown";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Initial setup
    gsap.set([logoRef.current, linksRef.current, buttonRef.current], {
      opacity: 0,
      y: -20
    });

    // Animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    tl.to(navbarRef.current, {
      opacity: 1,
      duration: 0.5
    })
    .to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5
    })
    .to(linksRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, "-=0.3")
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, "-=0.3");
  }, []);

  return (
    <>
      <div ref={navbarRef} className="fixed w-full top-0 h-[10vh] bg-zinc-900 text-white flex justify-between items-center px-4 md:px-14 backdrop-filter backdrop-blur-lg bg-opacity-30 z-50">
        <div ref={logoRef} className="flex justify-center items-center gap-3">
          <Link href={"/"} className="flex justify-center items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Description of the image"
              width={55}
              height={40}
            />
            <h1 className="hidden lg:block text-[3vh] md:text-[4.5vh]">
              Premier League
            </h1>
          </Link>
        </div>
        <div ref={linksRef} className="flex justify-center items-center gap-3 md:gap-5 lg:gap-10 text-gray-50 ">
          <div className="hidden md:flex justify-center items-center gap-2  lg:gap-10">
            <Link className="hover:text-teal-400 duration-300" href={"/tournaments"}>Tournament</Link>
            <Link className="hover:text-teal-400 duration-300" href={"/rankings"}>Rankings</Link>
            <Link className="hover:text-teal-400 duration-300" href={"/season"}>Season</Link>
            <Link className="hover:text-teal-400 duration-300" href={"/about"}>About Us</Link>
            <Link className="hover:text-teal-400 duration-300" href={"/contact"}>Contact Us</Link>
          </div>
          <div className=" md:hidden justify-center items-center gap-2 lg:gap-10">
            <Menu/>
          </div>
          <div ref={buttonRef}>
            <Link
              href={
                "https://www.instagram.com/efootballpremierleague/profilecard/"
              }
            >
              <button
                className="cursor-pointer bg-cyan-400 py-2 px-4 rounded-xl text-white font-semibold hover:bg-cyan-500 transition-all duration-300"
              >
                Join Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}