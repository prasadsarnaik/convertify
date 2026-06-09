import SEO, { SITE } from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsGrid from "@/components/ToolsGrid";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import HomeContent, { homeFaqLd } from "@/components/HomeContent";
import Footer from "@/components/Footer";


const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Convertify",
  alternateName: "Convertify – Free Online File Converter",
  url: SITE,
  logo: `${SITE}/favicon.png`,
  description:
    "Convertify is a free, privacy-first online file converter for PDF, Word, JPG, PNG and more. All processing happens entirely in your browser.",
  founder: {
    "@type": "Person",
    name: "Prasad Shivaji Sarnaik",
    jobTitle: "Founder & UI/UX Designer",
    url: `${SITE}/about`,
    sameAs: [
      "https://www.linkedin.com/in/prasad-shivaji-sarnaik",
      "https://github.com/prasadsarnaik028",
      "https://www.instagram.com/prasad_sarnaik028",
    ],
  },
  sameAs: [
    "https://www.linkedin.com/in/prasad-shivaji-sarnaik",
    "https://github.com/prasadsarnaik028",
    "https://www.instagram.com/prasad_sarnaik028",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Convertify",
  url: SITE,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: "Convertify",
    founder: { "@type": "Person", name: "Prasad Shivaji Sarnaik" },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE}/tools?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const Index = () => (
  <>
    <SEO
      title="Free Online File Converter"
      description="Convert PDF, Word, JPG, PNG, and more with Convertify. Free online file converter with fast, secure, and easy tools."
      path="/"
      jsonLd={[orgLd, websiteLd, homeFaqLd]}
    />
    <Navbar />
    <main>
      <Hero />
      
      <ToolsGrid />
      <Features />
      <HowItWorks />
      <HomeContent />
    </main>
    <Footer />
  </>
);

export default Index;
