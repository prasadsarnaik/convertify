import SEO from "@/components/SEO";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolWorkspace from "@/components/ToolWorkspace";
import ToolContentSections from "@/components/ToolContentSections";
import WordToPDFTool from "@/components/WordToPDFTool";
import PdfToWordTool from "@/components/PdfToWordTool";
import MergePdfWorkspace from "@/components/MergePdfWorkspace";
import EditPdfWorkspace from "@/components/EditPdfWorkspace";
import RotateImageWorkspace from "@/components/RotateImageWorkspace";
import RotatePdfWorkspace from "@/components/RotatePdfWorkspace";
import CompressPdfWorkspace from "@/components/CompressPdfWorkspace";
import ImageToPdfWorkspace from "@/components/ImageToPdfWorkspace";
import ImageUpscalerWorkspace from "@/components/ImageUpscalerWorkspace";
import ProtectPdfWorkspace from "@/components/ProtectPdfWorkspace";
import UnlockPdfWorkspace from "@/components/UnlockPdfWorkspace";
import SignPdfWorkspace from "@/components/SignPdfWorkspace";
import { getAbsoluteUrl, toolSeoMap } from "@/lib/site";
import NotFound from "@/pages/NotFound";

const formatSlug = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const DEDICATED_WORKSPACES: Record<string, React.FC> = {
  "word-to-pdf": WordToPDFTool,
  "pdf-to-word": PdfToWordTool,
  "merge-pdf": MergePdfWorkspace,
  "edit-pdf": EditPdfWorkspace,
  "rotate-image": RotateImageWorkspace,
  "rotate-pdf": RotatePdfWorkspace,
  "compress-pdf": CompressPdfWorkspace,
  "image-to-pdf": ImageToPdfWorkspace,
  "jpg-to-pdf": ImageToPdfWorkspace,
  "image-upscaler": ImageUpscalerWorkspace,
  "protect-pdf": ProtectPdfWorkspace,
  "unlock-pdf": UnlockPdfWorkspace,
  "sign-pdf": SignPdfWorkspace,
};

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const toolSlug = slug || "";
  const tool = toolSeoMap[toolSlug];

  if (!tool) {
    return <NotFound />;
  }

  const Workspace = slug ? DEDICATED_WORKSPACES[slug] : undefined;
  const toolName = tool.name || formatSlug(slug || "");
  const description =
    tool.metaDescription ||
    `Use Convertify's ${toolName} tool online for practical browser-based file processing.`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      name: `${tool.name} - Convertify`,
      description: tool.metaDescription,
      url: getAbsoluteUrl(`/tool/${tool.slug}`),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <SEO
        title={toolName}
        description={description}
        path={`/tool/${slug}`}
        keywords={[toolName.toLowerCase(), `${toolName.toLowerCase()} online`, "convertify"]}
        structuredData={structuredData}
      />
      <Navbar />
      {Workspace ? (
        <Workspace />
      ) : (
        <ToolWorkspace toolName={toolName} toolSlug={slug || ""} />
      )}
      <ToolContentSections toolSlug={toolSlug} />
      <Footer />
    </>
  );
};

export default ToolPage;
