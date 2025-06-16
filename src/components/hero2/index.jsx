"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Hero2 = () => {
  const revealRef = useRef(null);
  const spotlightRef = useRef(null);

  useLayoutEffect(() => {
    const reveal = revealRef.current;
    const spotlight = spotlightRef.current;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const coords = { x: centerX, y: centerY };

    reveal.style.setProperty("--reveal-x", `${centerX}px`);
    reveal.style.setProperty("--reveal-y", `${centerY}px`);
    reveal.style.setProperty("--reveal-radius", `0px`);

    spotlight.style.setProperty("--mask-x", `${centerX}px`);
    spotlight.style.setProperty("--mask-y", `${centerY}px`);
    spotlight.style.setProperty("--mask-radius", "0px");

    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to(reveal, {
      duration: 3,
      "--reveal-radius": `${maxRadius}px`,
    }).to(
      reveal,
      {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          reveal.style.display = "none";
        },
      },
      "<+0.3"
    );
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
    <div className="h-screen" id="home">
      <div
        ref={revealRef}
        className="absolute inset-0 z-50 pointer-events-none bg-black"
        style={{
          WebkitMaskImage: `radial-gradient(
            circle var(--reveal-radius, 0px) at var(--reveal-x, 50%) var(--reveal-y, 50%),
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 100%
          )`,
          maskImage: `radial-gradient(
            circle var(--reveal-radius, 0px) at var(--reveal-x, 50%) var(--reveal-y, 50%),
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 100%
          )`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      />
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-20 p-10 pointer-events-none space-y-6 hidden md:block"
        style={{
          WebkitMaskImage: `radial-gradient(
              circle 350px at var(--mask-x, 0px) var(--mask-y, 0px),
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 255, 255, 0.8) 30%,
              rgba(255, 255, 255, 0.2) 60%,
              rgba(255, 255, 255, 0) 100%
            )`,
          maskImage: `radial-gradient(
              circle 350px at var(--mask-x, 0px) var(--mask-y, 0px),
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 255, 255, 0.8) 30%,
              rgba(255, 255, 255, 0.2) 60%,
              rgba(255, 255, 255, 0) 100%
            )`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <div className="flex items-end hero-text h-full">
          <div>
            A developer <br />
            <div className="flex">
              <div className="md:ps-28 lg:ps-36"></div>
              <div>
                <span>with a passion</span> <br />
                <span>for big dreams</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute md:opacity-5 inset-0 z-10 p-10 pointer-events-none space-y-6">
        <div className="flex items-end hero-text h-full">
          <div>
            A developer <br />
            <div className="flex">
              <div className="md:ps-28 lg:ps-36"></div>
              <div>
                <span>with a passion</span> <br />
                <span>for big dreams</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;

// style={{
//     WebkitMaskImage: `radial-gradient(circle 150px at var(--mask-x, 0px) var(--mask-y, 0px), white 0%, transparent 100%)`,
//     maskImage: `radial-gradient(circle 150px at var(--mask-x, 0px) var(--mask-y, 0px), white 0%, transparent 100%)`,
//     WebkitMaskRepeat: "no-repeat",
//     maskRepeat: "no-repeat",
//   }}
