import dynamic from "next/dynamic";

import Loader from "@/components/loader";
const Hero2 = dynamic(() => import("@/components/hero2"));
const AboutUs = dynamic(() => import("@/components/about-us"));
const Skills = dynamic(() => import("@/components/skills"));
const Projects = dynamic(() => import("@/components/projects"));
const Contact = dynamic(() => import("@/components/contact"));
const Navbar = dynamic(() => import("@/components/navbar"));

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <Hero2 />
      <AboutUs />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
