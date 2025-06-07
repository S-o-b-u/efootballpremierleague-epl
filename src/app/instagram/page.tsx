"use client";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

import { useEffect } from "react";
import localFont from 'next/font/local';
import Footer from "@/components/Footer";

const barriecito = localFont({
  src: '../../../public/fonts/Barriecito-Regular.ttf',
  variable: '--font-barriecito'
});

export default function InstagramGrid() {
  useEffect(() => {
    if (!window.instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        window.instgrm?.Embeds.process();
      };
    } else {
      window.instgrm.Embeds.process();
    }
  }, []);

  const posts = [
    "https://www.instagram.com/p/DKaIHKQT3A_/",
    "https://www.instagram.com/p/DKUUm6UzICV/",
    "https://www.instagram.com/p/DDAcEfTznEB/",

    "https://www.instagram.com/p/DKaHCRlz300/",
    "https://www.instagram.com/p/DDm6Ijrz0Wl",
    "https://www.instagram.com/p/DKZ8RWrT5e0/",
    "https://www.instagram.com/p/DDmwiadT8eV",

  ];

  return (
    <section className="min-h-screen py-20 px-4 overflow-y-auto scroll-smooth">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-5xl text-center text-white font-bold mb-12 ${barriecito.className}`}>
          Our Instagram Feed 🐐
        </h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {posts.map((url, index) => (
            <div
              key={index}
              className="bg-[#ffffff] rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 break-inside-avoid-column"
            >
              <blockquote
                className="instagram-media w-full"
                data-instgrm-captioned="false"
                data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
                data-instgrm-version="14"
                style={{
                  background: "#1e1e1e",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "none",
                  minWidth: "100%",
                  padding: 0,
                  margin: 0,
                }}
              ></blockquote>
              <style>{`
                .instagram-media {
                  background: #1e1e1e !important;
                  color: #ffffff !important;
                }
                .instagram-media a {
                  color: #e4e4e4 !important;
                }
                .instagram-media header {
                  background: transparent !important;
                }
                .instagram-media footer {
                  background: transparent !important;
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>
      <Footer />

    </section>
  );
}
