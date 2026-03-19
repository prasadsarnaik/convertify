import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolWorkspace from "@/components/ToolWorkspace";
import EditPdfWorkspace from "@/components/EditPdfWorkspace";

const formatSlug = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <>
      <Navbar />
      {slug === "edit-pdf" ? (
        <EditPdfWorkspace />
      ) : (
        <ToolWorkspace toolName={formatSlug(slug || "")} toolSlug={slug || ""} />
      )}
      <Footer />
    </>
  );
};

export default ToolPage;
