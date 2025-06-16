"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import fantasyBrawlNBA from "@/assets/projects/fantasy-brawl/nba.png";
import clupChatMain from "@/assets/projects/clup-chat/main.png";
import motari from "@/assets/projects/mi-ride/main.png";

import fantasyBrawl1 from "@/assets/projects/fantasy-brawl/1.png";
import fantasyBrawl2 from "@/assets/projects/fantasy-brawl/2.png";
import fantasyBrawl3 from "@/assets/projects/fantasy-brawl/3.png";
import fantasyBrawl4 from "@/assets/projects/fantasy-brawl/4.png";
import fantasyBrawl5 from "@/assets/projects/fantasy-brawl/5.png";
import fantasyBrawl6 from "@/assets/projects/fantasy-brawl/6.png";
import fantasyBrawl7 from "@/assets/projects/fantasy-brawl/7.png";
import fantasyBrawl8 from "@/assets/projects/fantasy-brawl/8.png";
import fantasyBrawl9 from "@/assets/projects/fantasy-brawl/9.png";
import fantasyBrawl10 from "@/assets/projects/fantasy-brawl/10.png";
import fantasyBrawl11 from "@/assets/projects/fantasy-brawl/11.png";
import fantasyBrawl12 from "@/assets/projects/fantasy-brawl/12.png";
import fantasyBrawl13 from "@/assets/projects/fantasy-brawl/13.png";
import fantasyBrawl14 from "@/assets/projects/fantasy-brawl/14.png";
import fantasyBrawl15 from "@/assets/projects/fantasy-brawl/15.png";
import fantasyBrawl16 from "@/assets/projects/fantasy-brawl/16.png";
import fantasyBrawl17 from "@/assets/projects/fantasy-brawl/17.png";
import fantasyBrawl18 from "@/assets/projects/fantasy-brawl/18.png";
import fantasyBrawl19 from "@/assets/projects/fantasy-brawl/19.png";
import fantasyBrawl20 from "@/assets/projects/fantasy-brawl/20.png";
import fantasyBrawl21 from "@/assets/projects/fantasy-brawl/21.png";
import fantasyBrawl22 from "@/assets/projects/fantasy-brawl/22.png";
import fantasyBrawl23 from "@/assets/projects/fantasy-brawl/23.png";
import fantasyBrawl24 from "@/assets/projects/fantasy-brawl/24.png";
import fantasyBrawl25 from "@/assets/projects/fantasy-brawl/25.png";
import fantasyBrawl26 from "@/assets/projects/fantasy-brawl/26.png";
import fantasyBrawl27 from "@/assets/projects/fantasy-brawl/27.png";
import fantasyBrawl28 from "@/assets/projects/fantasy-brawl/28.png";
import fantasyBrawl29 from "@/assets/projects/fantasy-brawl/29.png";

import clupChat1 from "@/assets/projects/clup-chat/1.png";
import clupChat2 from "@/assets/projects/clup-chat/2.png";
import clupChat3 from "@/assets/projects/clup-chat/3.png";
import clupChat4 from "@/assets/projects/clup-chat/4.png";

import motari1 from "@/assets/projects/mi-ride/1.png";
import motari2 from "@/assets/projects/mi-ride/2.png";
import motari3 from "@/assets/projects/mi-ride/3.png";
import motari4 from "@/assets/projects/mi-ride/4.png";
import ImageTrail from "@/reactbits/Animations/ImageTrail/ImageTrail";

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    title: "Fantasy Brawl",
    image: fantasyBrawlNBA,
    desc: "",
    trailingImages: [
      fantasyBrawl1,
      fantasyBrawl2,
      fantasyBrawl3,
      fantasyBrawl4,
      fantasyBrawl5,
      fantasyBrawl6,
      fantasyBrawl7,
      fantasyBrawl8,
      fantasyBrawl9,
      fantasyBrawl10,
      fantasyBrawl11,
      fantasyBrawl12,
      fantasyBrawl13,
      fantasyBrawl14,
      fantasyBrawl15,
      fantasyBrawl16,
      fantasyBrawl17,
      fantasyBrawl18,
      fantasyBrawl19,
      fantasyBrawl20,
      fantasyBrawl21,
      fantasyBrawl22,
      fantasyBrawl23,
      fantasyBrawl24,
      fantasyBrawl25,
      fantasyBrawl26,
      fantasyBrawl27,
      fantasyBrawl28,
      fantasyBrawl29,
    ],
  },
  {
    title: "Clup Chat",
    image: clupChatMain,
    desc: "",
    trailingImages: [clupChat1, clupChat2, clupChat3, clupChat4],
  },
  {
    title: "motari",
    image: motari,
    desc: "",
    trailingImages: [motari1, motari2, motari3, motari4],
  },
];

const PortfolioShowcase = () => {
  const mainRef = useRef(null);
  const h2Ref = useRef(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    const h2 = h2Ref.current;
    const main = mainRef.current;
    if (!container || !section || !h2 || !mainRef) return;

    gsap.fromTo(
      h2,
      { opacity: 0, transform: "translateY(100%)" },
      {
        opacity: 1,
        transform: "translateY(0%)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: main,
          start: "top 80%", // starts when the top of main is 80% from the top of the viewport
          end: "top 10%", // ends when the top of main is 60% from the top of the viewport
          scrub: 1,
        },
      }
    );

    const scrollLength = container.scrollWidth - window.innerWidth;

    const horizontalScroll = gsap.to(container, {
      x: -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        // start: "top top",
        end: () => `+=${scrollLength}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      horizontalScroll.kill();
    };
  }, []);

  return (
    <section ref={mainRef} id="projects">
      <h2
        className="text-center text-4xl font-bold pt-20 pb-4 sm:pb-8 md:pb-16 lg:pb-20 projects-text lg:min-h-[40vh] flex items-center justify-center"
        ref={h2Ref}
      >
        WORK
      </h2>
      <div
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-black text-white flex flex-col scale-50"
      >
        <div
          ref={containerRef}
          className="flex h-full gap-10 p-20 w-fit relative"
        >
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="panel bg-zinc-800 rounded-2xl shadow-lg shrink-0 relative"
            >
              <Image
                src={item.image}
                alt={item.title}
                className="w-auto h-full object-cover rounded-2xl"
                width={688}
                height={796}
                quality={100}
              />

              <div className="absolute inset-0 z-10">
                <ImageTrail
                  key={`trail-${index}`}
                  items={item.trailingImages}
                  variant={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
