import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsGrid from "@/components/ToolsGrid";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

const Index = () => (
  <>
    <SEO
      title={siteConfig.defaultTitle}
      description={siteConfig.defaultDescription}
      path="/"
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.siteUrl,
          description: siteConfig.defaultDescription,
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.siteUrl,
          email: siteConfig.supportEmail,
          logo: getAbsoluteUrl(siteConfig.ogImagePath),
        },
      ]}
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
