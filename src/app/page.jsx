import Loader from "@/components/loader";
import Hero2 from "@/components/hero2";
import AboutUs from "@/components/about-us";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";

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
