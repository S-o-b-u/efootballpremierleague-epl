"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@nextui-org/react";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { key: "Home", href: "/fixtures", label: "Fixtures", isSpecial: true },
    { key: "HallOfFame", href: "/season", label: "Hall Of Fame", isSpecial: true },
    { key: "tournaments", href: "/tournaments", label: "Tournaments" },
    { key: "Feed", href: "/instagram", label: "Feed" },
    { key: "about", href: "/about", label: "About Us" },
    { key: "contact", href: "/contact", label: "Contact Us" }
  ];

  // 🔒 Lock scroll on open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#ffffff] hover:text-teal-400 transition-colors z-50 relative"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 w-full h-full z-50 flex justify-center items-center bg-black/90 backdrop-blur-md"
          >
            <div className="w-full max-w-md flex flex-col items-center p-6 sm:p-10">
              <button
                onClick={() => setIsOpen(false)}
                className="self-end p-3 text-white hover:text-teal-400 transition-colors duration-300 mb-10 sm:mb-16"
                aria-label="Close menu"
              >
                <X size={36} />
              </button>

              <nav className="flex flex-col items-center justify-center gap-8 sm:gap-10">
                {menuItems.map((item, idx) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="overflow-hidden"
                  >
                    <Link
                      href={item.href}
                      className={`text-2xl sm:text-3xl font-semibold transition-all duration-300
                        ${item.isSpecial
                          ? 'text-pink-500 hover:text-teal-300'
                          : 'text-white hover:text-teal-300'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
