"use client";

import { useEffect, useRef } from "react";

const Hero2 = () => {
  const revealRef = useRef(null);
  const spotlightRef = useRef(null);
  const coords = useRef({
    x: 0,
    y: 0,
  });
  const animationFrame = useRef(null);

  useEffect(() => {
    const reveal = revealRef.current;
    const spotlight = spotlightRef.current;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);

    // Initial state
    reveal.style.setProperty("--reveal-x", `${centerX}px`);
    reveal.style.setProperty("--reveal-y", `${centerY}px`);
    reveal.style.setProperty("--reveal-radius", `0px`);

    spotlight.style.setProperty("--mask-x", `${centerX}px`);
    spotlight.style.setProperty("--mask-y", `${centerY}px`);

    // Reveal animation without GSAP
    let start = null;
    const duration = 3000; // in ms
    const fadeOutDuration = 1000;

    const animateReveal = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const radius = progress * maxRadius;

      reveal.style.setProperty("--reveal-radius", `${radius}px`);

      if (progress < 1) {
        requestAnimationFrame(animateReveal);
      } else {
        // Start fade out
        reveal.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
        reveal.style.opacity = 0;

        setTimeout(() => {
          reveal.style.display = "none";
        }, fadeOutDuration);
      }
    };
    requestAnimationFrame(animateReveal);

    // Mouse movement handler
    const handleMouseMove = (e) => {
      coords.current.x += (e.clientX - coords.current.x) * 0.2;
      coords.current.y += (e.clientY - coords.current.y) * 0.2;

      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(() => {
        spotlight.style.setProperty("--mask-x", `${coords.current.x}px`);
        spotlight.style.setProperty("--mask-y", `${coords.current.y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div className="h-screen relative" id="home">
      {/* Reveal Overlay */}
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

      {/* Spotlight Reveal */}
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
        <div className="flex items-end hero-text h-full font-semibold">
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

      {/* Dimmed Background */}
      <div className="absolute md:opacity-5 inset-0 z-10 p-10 pointer-events-none space-y-6">
        <div className="flex items-end hero-text h-full font-semibold">
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
