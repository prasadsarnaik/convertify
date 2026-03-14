import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolWorkspace from "@/components/ToolWorkspace";

const formatSlug = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <>
      <Navbar />
      <ToolWorkspace toolName={formatSlug(slug || "")} />
      <Footer />
    </>
  );
};

export default ToolPage;
