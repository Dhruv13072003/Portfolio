"use client";

import React, { useState } from "react";

const SpotlightReveal = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative h-screen bg-black text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dimmed Content */}
      <div className="absolute inset-0 z-10 opacity-10 pointer-events-none select-none p-10 space-y-4">
        <h1 className="text-5xl font-bold">Welcome to the Future</h1>
        <p className="text-xl">
          Everything is hidden... until you shine a light.
        </p>
        <p className="text-xl">Try moving your mouse around!</p>
        <p className="text-xl">Spotlight reveals the hidden truth.</p>
      </div>

      {/* Visible Content */}
      <div
        className="absolute inset-0 z-20 pointer-events-none select-none p-10 space-y-4"
        style={{
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, white 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, white 0%, transparent 100%)`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <h1 className="text-5xl font-bold">Welcome to the Future</h1>
        <p className="text-xl">
          Everything is hidden... until you shine a light.
        </p>
        <p className="text-xl">Try moving your mouse around!</p>
        <p className="text-xl">Spotlight reveals the hidden truth.</p>
      </div>
    </div>
  );
};

export default SpotlightReveal;
