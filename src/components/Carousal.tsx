"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import "../styles/global.css";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Magnet from "./Magnet";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  // Array of image sources
  const images = [
    "/images/bn6.jpeg",
    "/images/bn1.jpeg",
    "/images/bn2.jpeg",
    "/images/bn3.jpeg",
    "/images/bn4.jpeg",
    "/images/bn5.jpeg",
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-4 md:px-16">
      <div className="w-full md:w-[45%] space-y-6 text-white hidden md:block">
        <Magnet padding={500} disabled={false} magnetStrength={50}>
          <h1 className="text-5xl font-bold pb-2 bg-gradient-to-r from-[#56c5bc] via-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(14,181,233,0.7)] ">
            Welcome to eFootball Premier League
          </h1>
        </Magnet>
        <p className="text-xl text-gray-300">
          Experience the thrill of competitive gaming with the best players in
          Kolkata. Join us for intense matches, amazing prizes, and
          unforgettable moments.
        </p>
      </div>
      <div className="w-full md:w-[55%]">
        <Carousel
          plugins={[plugin.current]}
          className="h-[40vh] md:h-[60vh]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((imageSrc, index) => (
              <CarouselItem key={index}>
                <div className="p-1 relative rounded-[30px]">
                  <Card className="w-full bg-transparent border-none h-[40vh] md:h-[59vh]">
                    <CardContent className="flex items-center justify-center overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt="banner 1"
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: "30px",
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
