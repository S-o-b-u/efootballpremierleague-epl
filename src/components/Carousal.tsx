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

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  // Array of image sources
  const images = [
    "/images/bn1.jpg",
    "/images/bn2.png",
    "/images/bn3.jpg",
    "/images/bn4.jpg",
    "/images/bn5.jpg",
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className=" w-[100%] h-[40vh] md:h-[60vh]"
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
              <Card className="w-full bg-transparent  border-none h-[40vh] md:h-[59vh]">
                <CardContent className="flex items-center justify-center overflow-hidden ">
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
  );
}
