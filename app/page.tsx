import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Research from "@/components/sections/Research";
import Projects from "@/components/sections/Projects";
import Playground from "@/components/sections/Playground";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import BackToTop from "@/components/BackToTop";
import { site } from "@/data/site";

export default function HomePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    image: `${site.url}/profile.jpg`,
    jobTitle: "MS Financial Engineering student and Graduate Teaching Assistant",
    description: site.description,
    sameAs: [site.github, site.linkedin],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "New York University - Tandon School of Engineering" },
      { "@type": "CollegeOrUniversity", name: "Nirma University" }
    ],
    knowsAbout: [
      "Quantitative Finance",
      "Risk Management",
      "Derivatives",
      "Machine Learning",
      "Reinforcement Learning",
      "Large Language Models"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Research />
        <Projects />
        <Playground />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <BackToTop />
    </>
  );
}
