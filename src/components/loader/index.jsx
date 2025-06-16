"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ConicLoader({
  isLoading,
  setIsLoading,
  onComplete,
  children,
}) {
  // const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const loaderRef = useRef(null);
  const overlayRef = useRef(null);
  // const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const el = loaderRef.current;
    const overlay = overlayRef.current;

    // Show content behind immediately
    setShowContent(true);

    // Initial scale animation for loader
    gsap.fromTo(
      el,
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    // Conic gradient loading animation
    const obj = { angle: 0 };
    gsap.to(obj, {
      angle: 360,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const angle = obj.angle;
        el.style.setProperty("--angle", `${angle}deg`);
        // setPercentage(Math.round((angle / 360) * 100));
      },
      onComplete: () => {
        // setPercentage(100);

        // Hide the loader circle first
        gsap.to(el, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "back.in(1.7)",
        });

        // Create the expanding circle hole effect
        gsap.to(overlay, {
          clipPath: "circle(200% at 50% 50%)",
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2,
          onComplete: () => {
            setIsLoading(false);
            if (onComplete) onComplete();
          },
        });
      },
    });
  }, [onComplete]);

  return (
    <>
      {/* Main content that will be revealed */}
      {showContent && <div className="fixed inset-0 z-0">{children}</div>}

      {/* Loader overlay with circular reveal */}
      {isLoading && (
        <>
          {/* Black overlay with circular cutout */}
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black z-40"
            style={{
              clipPath: "circle(0% at 50% 50%)",
            }}
          />

          {/* Loader circle on top */}
          <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <div
              ref={loaderRef}
              className="relative"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background:
                  "conic-gradient(white 0deg, white var(--angle), transparent calc(var(--angle) + 0.1deg))",
                "--angle": "0deg",
                transformOrigin: "center center",
              }}
            ></div>
          </div>
        </>
      )}
    </>
  );
}
