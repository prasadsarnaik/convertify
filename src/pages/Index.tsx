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
      description="Free online PDF and image tools — merge, split, compress, convert, sign and protect documents securely in your browser. No sign-up, no watermark."
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
