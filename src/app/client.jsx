"use client";

// import Hero from "@/components/hero";
import { useState } from "react";
import Loader from "@/components/loader";
import Hero2 from "@/components/hero2";
import AboutUs from "@/components/about-us";
import Skills from "@/components/skills";
import HorizontalScroll from "@/components/projects";
// import Details from "@/components/details";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";

export default function Client() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading)
    return <Loader isLoading={isLoading} setIsLoading={setIsLoading} />;
  return (
    <>
      {!isLoading && (
        <>
          <Navbar />
          <Hero2 />
          <AboutUs />
          <Skills />
          <HorizontalScroll />
          <Contact />
        </>
      )}
    </>
  );
}
