"use client";

import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";

// Import your components as before
import dynamic from "next/dynamic";

import Loader from "@/components/loader";

// import Hero2 from "@/components/hero2";
const Hero2 = dynamic(() => import("@/components/hero2"));
const AboutUs = dynamic(() => import("@/components/about-us"));
const Skills = dynamic(() => import("@/components/skills"));
const Projects = dynamic(() => import("@/components/projects"));
const Contact = dynamic(() => import("@/components/contact"));
const Navbar = dynamic(() => import("@/components/navbar"));

// (Optional) Import Lenis CSS if you want default styles
import "lenis/dist/lenis.css";

export default function Client() {
  const [isLoading, setIsLoading] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Only initialize Lenis after loading is done
    if (!isLoading) {
      const lenis = new Lenis({
        lerp: 0.1, // Lower = smoother (try 0.05–0.2)
        smoothWheel: true, // Smooths mouse wheel
        smoothTouch: true, // Smooths touch events
      });
      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Cleanup on unmount
      return () => {
        lenis.destroy();
      };
    }
  }, [isLoading]);

  if (isLoading)
    return <Loader isLoading={isLoading} setIsLoading={setIsLoading} />;
  return (
    <>
      {!isLoading && (
        <>
          <Navbar />
          <Hero2 />
          <AboutUs />
          <Skills />
          <Projects />
          <Contact />
        </>
      )}
    </>
  );
}
