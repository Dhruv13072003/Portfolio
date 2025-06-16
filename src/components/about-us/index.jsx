"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (!paragraphRef.current) return;

    const splitText = new SplitType(paragraphRef.current, { type: "words" });

    // Set initial state to 20% opacity
    gsap.set(splitText.words, { opacity: 0.05, y: 0 });

    const animation = gsap.to(splitText.words, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: paragraphRef.current,
        start: "top 80%", // Start animation when element is 80% from top
        end: "bottom 20%", // End when element is 20% from bottom
        scrub: 1, // Smooth scrubbing animation
        toggleActions: "play reverse play reverse",
        onUpdate: (self) => {
          // Optional: Log progress for debugging
          // console.log("Progress:", self.progress);
        },
      },
    });

    return () => {
      animation.kill();
      splitText.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      className="min-h-screen flex items-center px-2 py-4 sm:py-8 lg:py-40"
      id="about"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
        {/* Left Column */}
        <div className="col-span-1">
          <h2 className="text-sm font-medium md:ps-8 lg:ps-12">About Me</h2>
        </div>

        {/* Right Column */}
        <div className="col-span-3">
          <p
            ref={paragraphRef}
            className="about-us-text leading-relaxed text-gray-300 reveal text-lg"
          >
            Creative and detail-oriented Frontend Developer with hands-on
            experience building responsive and performance-optimized web
            applications. Passionate about intuitive UI, web animations, and
            improving user experience through modern web technologies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
