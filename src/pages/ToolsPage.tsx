import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import ToolsGrid from "@/components/ToolsGrid";

const ToolsPage = () => (
  <>
    <SEO
      title="All Tools — Free PDF, Word & Image Converters"
      description="Browse every Convertify tool: convert, merge, split, compress, edit and sign PDFs, plus Word, spreadsheet and image converters."
      path="/tools"
    />
    <Navbar />
    <main className="min-h-screen">
      <AdSlot placement="header" variant="compact" label="Sponsored" style={{ minHeight: "90px" }} />
      <ToolsGrid />
    </main>
    <Footer />
  </>
);

export default ToolsPage;
