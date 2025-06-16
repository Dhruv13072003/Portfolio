"use client";

import Silk from "@/reactbits/Backgrounds/Silk/Silk";
import Link from "next/link";

const Contact = () => {
  return (
    <section className="p-4 sm:p-8 md:p-12 lg:p-20 h-screen">
      <div
        className="rounded-[110px] w-full h-full overflow-hidden relative flex items-center justify-center"
        id="contact"
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <Silk
            speed={5}
            scale={1}
            color="#7B7481"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          <h2 className="contact-title-text font-orbitron font-bold text-center">
            Let's Make Dream Come True Together
          </h2>
          <Link
            className="border-2 px-8 py-2 lg:py-4 text-center max-w-48 w-full rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 font-rajdhani"
            href={"mailto:dparmar130703@gmail.com"}
          >
            Connect Now!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
