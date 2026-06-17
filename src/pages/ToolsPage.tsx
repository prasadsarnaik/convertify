import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolsGrid from "@/components/ToolsGrid";

const ToolsPage = () => (
  <>
    <SEO
      title="All Tools — Free Online PDF & Image Tools"
      description="Browse every Convertify tool: convert, merge, split, compress, edit and sign PDFs, plus image format converters and editors."
      path="/tools"
    />
    <Navbar />
    <main className="min-h-screen">
      <ToolsGrid />
    </main>
    <Footer />
  </>
);

export default ToolsPage;
