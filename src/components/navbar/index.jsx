"use client";
import { useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";
gsap.registerPlugin(ScrollToPlugin);
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth scroll function using GSAP
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 80 },
        duration: 1,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full p-2">
        <div className="rounded-2xl border border-white/5 border-t-transparent px-4 py-6 flex items-center justify-between gap-2 font-rajdhani">
          <h2>Hello 👋</h2>
          <button
            className="flex items-center gap-2 cursor-pointer z-50 relative"
            onClick={toggleMenu}
          >
            <div className="w-8 h-6 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out origin-center ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out origin-center ${
                  isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white/10 backdrop-blur-md border-l border-white/10 z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-24 px-8">
          <nav className="space-y-6">
            <button
              onClick={() => scrollToSection("home")}
              className="block text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-300 transform hover:translate-x-2 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-300 transform hover:translate-x-2 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="block text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-300 transform hover:translate-x-2 cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-300 transform hover:translate-x-2 cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-300 transform hover:translate-x-2 cursor-pointer"
            >
              Contact
            </button>
            <button
              className="block text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-300 transform hover:translate-x-2 cursor-pointer"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Dhruv Parmar Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Resume
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
