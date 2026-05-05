import SEO, { SITE } from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsGrid from "@/components/ToolsGrid";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Convertify",
  url: SITE,
  logo: `${SITE}/favicon.png`,
  sameAs: [],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Convertify",
  url: SITE,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE}/tools?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const Index = () => (
  <>
    <SEO
      title="Convert Anything Instantly"
      description="The easiest way to convert, compress, and edit your files online. Free, secure PDF and image tools that work right in your browser."
      path="/"
      jsonLd={[orgLd, websiteLd]}
    />
    <Navbar />
    <Hero />
    <ToolsGrid />
    <Features />
    <HowItWorks />
    <Footer />
  </>
);

export default Index;
