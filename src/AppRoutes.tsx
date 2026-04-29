import { Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import ToolPage from "@/pages/ToolPage";
import ToolsPage from "@/pages/ToolsPage";
import FeaturesPage from "@/pages/FeaturesPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import Disclaimer from "@/pages/Disclaimer";
import ToolStatusPage from "@/pages/ToolStatusPage";
import SitemapPage from "@/pages/SitemapPage";
import NotFound from "@/pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/tools" element={<ToolsPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/tool/:slug" element={<ToolPage />} />
      <Route path="/tool-status" element={<ToolStatusPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsConditions />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/sitemap" element={<SitemapPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default AppRoutes;
