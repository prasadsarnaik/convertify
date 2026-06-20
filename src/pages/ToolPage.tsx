import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
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
import PdfToExcelTool from "@/components/PdfToExcelTool";
import CompressImageWorkspace from "@/components/CompressImageWorkspace";
import NotFound from "./NotFound";
import { getToolMeta } from "@/lib/toolContent";
import { getToolLongForm } from "@/lib/toolContentLong";
import { SITE_NAME, SITE_URL } from "@/config/site";

const formatSlug = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const DEDICATED_WORKSPACES: Record<string, React.FC> = {
  "word-to-pdf": WordToPDFTool,
  "pdf-to-word": PdfToWordTool,
  "excel-to-pdf": ExcelToPdfTool,
  "pdf-to-excel": PdfToExcelTool,
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
  "split-pdf",
  "pdf-to-jpg",
  "jpg-to-png",
  "png-to-jpg",
  "webp-to-jpg",
  "avif-to-jpg",
  "heic-to-jpg",
  "resize-image",
]);

const ToolPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  if (!KNOWN_SLUGS.has(slug)) return <NotFound />;
  const Workspace = DEDICATED_WORKSPACES[slug];
  const meta = getToolMeta(slug);
  const name = meta?.name ?? formatSlug(slug);
  const description =
    meta?.description ??
    `Use Convertify's ${name} tool â€” fast, free, and secure online file processing.`;

  const canonicalPath = `/${slug}`;
  const seoTitle = meta
    ? `${name} â€” ${meta.tagline} | Free Online Tool`
    : `${name} | Free Online Tool`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name, item: `${SITE_URL}${canonicalPath}` },
    ],
  };

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${name} â€” ${SITE_NAME}`,
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
      <main className="pt-28 pb-20">
        <div className="container max-w-7xl mx-auto px-6">
          <AdSlot placement="header" variant="compact" label="Sponsored" style={{ minHeight: "90px" }} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-8">
            <div className="min-w-0 space-y-10">
              {Workspace ? <Workspace /> : <ToolWorkspace toolName={name} toolSlug={slug} tagline={meta?.tagline} />}

              <AdSlot
                placement="mobile"
                variant="compact"
                className="lg:hidden"
                label="Sponsored"
                style={{ minHeight: "100px" }}
              />

              {meta && <ToolContent meta={meta} />}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-6">
                <AdSlot
                  placement="sidebar"
                  variant="sidebar"
                  label="Sponsored"
                  style={{ minHeight: "250px" }}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ToolPage;
