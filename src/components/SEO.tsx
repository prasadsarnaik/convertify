import { Helmet } from "react-helmet-async";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  imagePath?: string;
  noindex?: boolean;
  keywords?: string[];
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SEO = ({
  title,
  description,
  path = "/",
  type = "website",
  imagePath = siteConfig.ogImagePath,
  noindex = false,
  keywords,
  structuredData,
}: SEOProps) => {
  const url = getAbsoluteUrl(path);
  const image = getAbsoluteUrl(imagePath);
  const full = `${title} | ${siteConfig.name}`;
  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta
        name="googlebot"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />
      <meta name="application-name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
