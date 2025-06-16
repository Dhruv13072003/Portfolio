"use client";
import { useEffect, useRef } from "react";
import Matter from "matter-js";
import image1 from "@/assets/skills/1.png";
import image2 from "@/assets/skills/2.png";
import image3 from "@/assets/skills/3.png";
import image4 from "@/assets/skills/4.png";
import image5 from "@/assets/skills/5.png";
import image6 from "@/assets/skills/6.png";
import image7 from "@/assets/skills/7.png";
import image8 from "@/assets/skills/8.png";
import image9 from "@/assets/skills/9.png";
import image10 from "@/assets/skills/10.png";
import image11 from "@/assets/skills/11.png";
import image12 from "@/assets/skills/12.png";
import image13 from "@/assets/skills/13.png";
import image14 from "@/assets/skills/14.png";
import image15 from "@/assets/skills/15.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
];

const Skills = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());

  // Function to create circular canvas from any image
  const createCircularTexture = (imgSrc, size = 200) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.crossOrigin = "anonymous";

    return new Promise((resolve) => {
      img.onload = () => {
        // Create circular clipping path
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.clip();

        // Fill with white background (optional)
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Calculate dimensions to fit image in circle while maintaining aspect ratio
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight, drawX, drawY;

        if (imgAspect > 1) {
          // Image is wider - fit by height
          drawHeight = size;
          drawWidth = size * imgAspect;
          drawX = (size - drawWidth) / 2;
          drawY = 0;
        } else {
          // Image is taller or square - fit by width
          drawWidth = size;
          drawHeight = size / imgAspect;
          drawX = 0;
          drawY = (size - drawHeight) / 2;
        }

        // Draw the image
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

        resolve(canvas.toDataURL());
      };

      img.src = imgSrc;
    });
  };

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%", // when top of text is 80% down viewport
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    gsap.fromTo(
      ".skills-small-text",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section is visible, create balls
            const engine = engineRef.current;
            const world = engine.world;
            const container = containerRef.current;
            if (!container) return;

            // Handle wheel to prevent scroll if container is not scrollable
            const handleWheel = (e) => {
              if (container.scrollHeight > container.clientHeight) return;
              window.scrollBy({ top: e.deltaY });
            };

            const width = container.clientWidth;
            const height = container.clientHeight;

            const render = Matter.Render.create({
              element: container,
              engine: engine,
              options: {
                width,
                height,
                wireframes: false,
                background: "transparent",
                showVelocity: false,
                showAngleIndicator: false,
                showDebug: false,
              },
            });

            const runner = Matter.Runner.create();

            // Fixed boundaries
            const wallThickness = 20;
            const walls = [
              // Bottom wall
              Matter.Bodies.rectangle(width / 2, height + 45, width, 100, {
                isStatic: true,
                render: { visible: false },
              }),
              // Left wall
              Matter.Bodies.rectangle(-wallThickness, height / 2, 45, height, {
                isStatic: true,
                render: { visible: false },
              }),
              // Right wall
              Matter.Bodies.rectangle(
                width + wallThickness,
                height / 2,
                45,
                height,
                {
                  isStatic: true,
                  render: { visible: false },
                }
              ),
              // Top wall
              Matter.Bodies.rectangle(width / 2, -45, width, 100, {
                isStatic: true,
                render: { visible: false },
              }),
            ];

            Matter.World.add(world, walls);

            // Create balls with circular textures
            // (Note: You need to implement `createCircularTexture` or use a placeholder)
            const createBalls = async () => {
              const circularTextures = await Promise.all(
                images.map((img) => createCircularTexture(img.src))
              );

              // const radius = Math.max(45, Math.min(90, width / 15));

              let radius;
              if (width < 500) {
                radius = width / 10; // Small devices
              } else if (width < 768) {
                radius = width / 12; // Medium devices
              } else {
                // radius = width / 15; // Large devices
                radius = Math.max(45, Math.min(90, width / 15));
              }
              radius = Math.max(30, Math.min(80, radius)); // Clamp radius

              const padding = radius * 0.5;
              const xSpacing = radius * 2.2;
              const yRange = height - padding * 2;

              const balls = circularTextures.map((texture, i) => {
                const x = padding + ((i * xSpacing) % (width - padding * 2));
                const y = padding + Math.random() * yRange;

                const ball = Matter.Bodies.circle(x, y, radius, {
                  restitution: 0.8,
                  frictionAir: 0.005,
                  render: {
                    sprite: {
                      texture: texture,
                      xScale: (radius * 2) / 200,
                      yScale: (radius * 2) / 200,
                    },
                  },
                });

                Matter.Body.setAngularVelocity(
                  ball,
                  (Math.random() - 0.5) * 0.05
                );
                return ball;
              });

              Matter.World.add(world, balls);
            };

            createBalls();

            // Mouse control
            const mouse = Matter.Mouse.create(render.canvas);
            const mouseConstraint = Matter.MouseConstraint.create(engine, {
              mouse,
              constraint: {
                stiffness: 0.2,
                render: { visible: false },
              },
            });
            Matter.World.add(world, mouseConstraint);
            render.mouse = mouse;

            const handleMouseDown = (e) => {
              const mousePoint = mouse.position;
              const bodies = Matter.Composite.allBodies(world);
              for (let body of bodies) {
                if (
                  !body.isStatic &&
                  Matter.Bounds.contains(body.bounds, mousePoint)
                ) {
                  e.preventDefault();
                  break;
                }
              }
            };

            render.canvas.addEventListener("mousedown", handleMouseDown);
            render.canvas.addEventListener("touchstart", handleMouseDown, {
              passive: false,
            });
            Matter.Runner.run(runner, engine);
            Matter.Render.run(render);
            container.addEventListener("wheel", handleWheel, {
              passive: false,
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <section className="flex aspect-[4/5] flex-col bg-black p-4 sm:p-8 font-primary text-white md:aspect-auto md:h-screen md:p-12">
      <div
        className="h-full rounded-[5vw] lg:rounded-[110px] border border-white/20 relative isolate overflow-hidden"
        id="skills"
      >
        <div
          ref={containerRef}
          className="w-full h-full"
          style={{
            touchAction: "pan-y",
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mix-blend-difference pointer-events-none z-10">
          <span
            className={`skills-small-text block text-nowrap text-white font-rajdhani`}
          >
            drag • drop • explore
          </span>
          <span
            className={`skills-text text-white text-[10vw] font-bold uppercase font-orbitron`}
            ref={textRef}
          >
            ARSENAL
          </span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
