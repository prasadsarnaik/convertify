import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsGrid from "@/components/ToolsGrid";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <SEO title="Convert Anything Instantly" description="The easiest way to convert, compress, and edit your files online. Fast, secure, and completely free." path="/" />
    <Navbar />
    <Hero />
    <ToolsGrid />
    <Features />
    <HowItWorks />
    <Footer />
  </>
);

export default Index;
