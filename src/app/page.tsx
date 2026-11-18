import Hero from "@/components/home/Hero";
import Roadmap from "@/components/home/Roadmap";
import AboutProcess from "@/components/home/AboutProcess";
import Services from "@/components/home/Services";
import Why from "@/components/home/Why";
import Material from "@/components/home/Material";
import BookSection from "@/components/home/BookSection";
import BlogSection from "@/components/home/BlogSection";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Roadmap />
      <AboutProcess />
      <Services />
      <Why />
      <Material />
      <BookSection />
      <BlogSection />
      <FinalCta />
    </>
  );
}
