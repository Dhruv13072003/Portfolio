"use client";

import Lenis from "lenis";
import { useLayoutEffect, useRef } from "react";

const Template = ({ children }) => {
  const lenisRef = useRef(null);
  useLayoutEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // smoothing was 0.1 -> Lower = smoother (try 0.05–0.2)
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
  });
  return children;
};

export default Template;
