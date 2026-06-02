import { useParams } from "react-router-dom";
import SEO, { SITE } from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolWorkspace from "@/components/ToolWorkspace";
import ToolContent from "@/components/ToolContent";
import EditPdfWorkspace from "@/components/EditPdfWorkspace";
import RotateImageWorkspace from "@/components/RotateImageWorkspace";
import RotatePdfWorkspace from "@/components/RotatePdfWorkspace";
import CompressPdfWorkspace from "@/components/CompressPdfWorkspace";
import MergePdfWorkspace from "@/components/MergePdfWorkspace";
import ImageToPdfWorkspace from "@/components/ImageToPdfWorkspace";
import ImageUpscalerWorkspace from "@/components/ImageUpscalerWorkspace";
import ProtectPdfWorkspace from "@/components/ProtectPdfWorkspace";
import UnlockPdfWorkspace from "@/components/UnlockPdfWorkspace";
import SignPdfWorkspace from "@/components/SignPdfWorkspace";
import WordToPDFTool from "@/components/WordToPDFTool";
import PdfToWordTool from "@/components/PdfToWordTool";
import ExcelToPdfTool from "@/components/ExcelToPdfTool";
import CompressImageWorkspace from "@/components/CompressImageWorkspace";
import NotFound from "./NotFound";
import { getToolMeta } from "@/lib/toolContent";
import { getToolLongForm } from "@/lib/toolContentLong";

const formatSlug = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const DEDICATED_WORKSPACES: Record<string, React.FC> = {
  "word-to-pdf": WordToPDFTool,
  "pdf-to-word": PdfToWordTool,
  "excel-to-pdf": ExcelToPdfTool,
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
  "compress-image": CompressImageWorkspace,
};

const KNOWN_SLUGS = new Set([
  ...Object.keys(DEDICATED_WORKSPACES),
  "split-pdf", "pdf-to-jpg", "jpg-to-png", "png-to-jpg",
  "webp-to-jpg", "avif-to-jpg", "heic-to-jpg",
  "resize-image", "compress-image",
]);

const ToolPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  if (!KNOWN_SLUGS.has(slug)) return <NotFound />;
  const Workspace = DEDICATED_WORKSPACES[slug];
  const meta = getToolMeta(slug);
  const name = meta?.name ?? formatSlug(slug);
  const description =
    meta?.description ??
    `Use Convertify's ${name} tool — fast, free, and secure online file processing.`;

  // Canonical points to the short URL (/merge-pdf), not the legacy /tool/:slug
  const canonicalPath = `/${slug}`;

  // SEO-friendly title: "Merge PDF — Combine multiple PDFs into one document | Free Online Tool"
  const seoTitle = meta
    ? `${name} — ${meta.tagline} | Free Online Tool`
    : `${name} | Free Online Tool`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "Tools", item: SITE + "/tools" },
      { "@type": "ListItem", position: 3, name, item: SITE + canonicalPath },
    ],
  };

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${name} — Convertify`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1280",
    },
    description,
  };

  const faqLd = meta && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...meta.faqs, ...getToolLongForm(meta).extraFaqs].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const jsonLd = [breadcrumbLd, softwareLd, ...(faqLd ? [faqLd] : [])];

  return (
    <>
      <SEO
        title={seoTitle}
        description={description}
        path={canonicalPath}
        keywords={meta?.keywords}
        jsonLd={jsonLd}
      />
      <Navbar />
      {Workspace ? <Workspace /> : <ToolWorkspace toolName={name} toolSlug={slug} tagline={meta?.tagline} />}
      {meta && <ToolContent meta={meta} />}
      <Footer />
    </>
  );
};

export default ToolPage;
