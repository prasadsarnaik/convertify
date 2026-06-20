import { Helmet } from "react-helmet-async";
import {
  SITE_AUTHOR,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from "@/config/site";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  image?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
  keywords?: string[];
}

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

const SEO = ({
  title,
  description,
  path = "/",
  type = "website",
  image = SITE_OG_IMAGE,
  jsonLd,
  noindex,
  keywords,
}: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const full = `${title} — ${SITE_TITLE}`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE_AUTHOR} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
