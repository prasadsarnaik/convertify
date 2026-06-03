import SEO, { SITE } from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsGrid from "@/components/ToolsGrid";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import HomeContent, { homeFaqLd } from "@/components/HomeContent";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

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
      title="Free Online File Converter"
      description="Convert PDF, Word, JPG, PNG, and more with Convertify. Free online file converter with fast, secure, and easy tools."
      path="/"
      jsonLd={[orgLd, websiteLd, homeFaqLd]}
    />
    <Navbar />
    <main>
      <Hero />
      <AdSlot slot="0000000000" />
      <ToolsGrid />
      <Features />
      <HowItWorks />
      <HomeContent />
    </main>
    <Footer />
  </>
);

export default Index;
