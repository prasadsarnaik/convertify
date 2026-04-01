import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolWorkspace from "@/components/ToolWorkspace";
import EditPdfWorkspace from "@/components/EditPdfWorkspace";
import RotateImageWorkspace from "@/components/RotateImageWorkspace";
import RotatePdfWorkspace from "@/components/RotatePdfWorkspace";
import CompressPdfWorkspace from "@/components/CompressPdfWorkspace";
import ImageToPdfWorkspace from "@/components/ImageToPdfWorkspace";
import ImageUpscalerWorkspace from "@/components/ImageUpscalerWorkspace";

const formatSlug = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const DEDICATED_WORKSPACES: Record<string, React.FC> = {
  "edit-pdf": EditPdfWorkspace,
  "rotate-image": RotateImageWorkspace,
  "rotate-pdf": RotatePdfWorkspace,
  "compress-pdf": CompressPdfWorkspace,
  "image-to-pdf": ImageToPdfWorkspace,
  "jpg-to-pdf": ImageToPdfWorkspace,
  "image-upscaler": ImageUpscalerWorkspace,
};

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const Workspace = slug ? DEDICATED_WORKSPACES[slug] : undefined;

  return (
    <>
      <Navbar />
      {Workspace ? (
        <Workspace />
      ) : (
        <ToolWorkspace toolName={formatSlug(slug || "")} toolSlug={slug || ""} />
      )}
      <Footer />
    </>
  );
};

export default ToolPage;
