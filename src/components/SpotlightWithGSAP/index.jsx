"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const SpotlightWithGSAP = () => {
  const spotlightRef = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);

  useLayoutEffect(() => {
    const spotlight = spotlightRef.current;

    const coords = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      gsap.to(coords, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3.out",
        onUpdate: () => {
          spotlight.style.setProperty("--mask-x", `${coords.x}px`);
          spotlight.style.setProperty("--mask-y", `${coords.y}px`);
        },
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden select-none">
      {/* Dim Layer */}
      <div className="absolute inset-0 opacity-5 z-10 pointer-events-none p-10 space-y-6">
        <h1 className="text-5xl font-bold">Shine the Light</h1>
        <p className="text-xl">GSAP makes it smoother and nicer.</p>
        <p className="text-xl">Try moving the mouse slowly.</p>
      </div>

      {/* Masked Highlight Layer */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-20 p-10 pointer-events-none space-y-6"
        style={{
          WebkitMaskImage: `radial-gradient(circle 150px at var(--mask-x, 0px) var(--mask-y, 0px), white 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 150px at var(--mask-x, 0px) var(--mask-y, 0px), white 0%, transparent 100%)`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <h1 className="text-5xl font-bold">Shine the Light</h1>
        <p className="text-xl">GSAP makes it smoother and nicer.</p>
        <p className="text-xl">Try moving the mouse slowly.</p>
      </div>
    </div>
  );
};

export default SpotlightWithGSAP;
