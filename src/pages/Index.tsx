import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AdSlot from "@/components/AdSlot";
import ToolsGrid from "@/components/ToolsGrid";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import HomeContent, { homeFaqLd } from "@/components/HomeContent";
import Footer from "@/components/Footer";
import { SITE_AUTHOR, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/config/site";

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: `${SITE_NAME} â€“ Free Online File Converter`,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "Convertify is a free, privacy-first online file converter for PDF, Word, JPG, PNG and more. All processing happens entirely in your browser.",
  founder: {
    "@type": "Person",
    name: SITE_AUTHOR,
    jobTitle: "Founder & UI/UX Designer",
    url: `${SITE_URL}/about`,
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
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    founder: { "@type": "Person", name: SITE_AUTHOR },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/tools?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const Index = () => (
  <>
    <SEO
      title="Free Online PDF, Word & Image Converter"
      description="Convert PDF, Word, JPG, PNG, Excel and more directly in your browser with Convertify. Free, private and easy to use."
      path="/"
      image={SITE_OG_IMAGE}
      jsonLd={[orgLd, websiteLd, homeFaqLd]}
    />
    <Navbar />
    <main>
      <Hero />
      <AdSlot placement="header" variant="compact" label="Sponsored" style={{ minHeight: "90px" }} />
      <ToolsGrid />
      <AdSlot placement="inContent" variant="compact" label="Sponsored" style={{ minHeight: "90px" }} />
      <Features />
      <HowItWorks />
      <HomeContent />
    </main>
    <Footer />
  </>
);

export default Index;
