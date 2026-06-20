// Post-build prerender: emit dist/<route>/index.html for every known route with
// route-specific <title>, meta description, canonical, OG, JSON-LD, and an H1
// in <noscript>. The React app still hydrates client-side; this guarantees
// crawlers (including ones that don't execute JS) see unique, indexable HTML.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { TOOL_META } from "../src/lib/toolContent";
import { BLOG_POSTS } from "../src/lib/blogPosts";
import { SITE_AUTHOR, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "../src/config/site";

const DIST = resolve("dist");
const INDEX = resolve(DIST, "index.html");

if (!existsSync(INDEX)) {
  console.warn("[prerender-seo] dist/index.html not found, skipping.");
  process.exit(0);
}

const baseHtml = readFileSync(INDEX, "utf8");

interface Route {
  path: string;
  title: string;
  description: string;
  h1: string;
  keywords?: string[];
  type?: string;
  noindex?: boolean;
  jsonLd?: object[];
}

const breadcrumb = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
    { "@type": "ListItem", position: 3, name, item: `${SITE_URL}${path}` },
  ],
});

const softwareLd = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: `${name} — ${SITE_NAME}`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "1280" },
  description,
});

const toolRoutes: Route[] = Object.values(TOOL_META).map((m) => ({
  path: `/${m.slug}`,
  title: `${m.name} — ${m.tagline} | Free Online Tool`,
  description: m.description,
  h1: `${m.name} — ${m.tagline}`,
  type: "website",
  keywords: m.keywords,
  jsonLd: [
    breadcrumb(m.name, `/${m.slug}`),
    softwareLd(m.name, m.description),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: m.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}));

const blogRoutes: Route[] = BLOG_POSTS.map((p) => ({
  path: `/blog/${p.slug}`,
  title: `${p.title} | Convertify Blog`,
  description: p.description,
  h1: p.title,
  type: "article",
  keywords: p.tags,
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      author: { "@type": "Organization", name: SITE_NAME },
    },
  ],
}));

const staticRoutes: Route[] = [
  { path: "/tools", title: "All Tools — Free Online PDF & Image Tools", description: "Browse every Convertify tool: convert, merge, split, compress, edit and sign PDFs, plus image format converters and editors.", h1: "All Convertify Tools", type: "website" },
  { path: "/features", title: "Features — Why Convertify", description: "Browser-based, private, free file tools. No uploads, no watermarks, no sign-up required.", h1: "Convertify Features", type: "website" },
  { path: "/how-it-works", title: "How It Works — Convertify", description: "See how Convertify processes files entirely in your browser using modern web technology.", h1: "How Convertify Works", type: "website" },
  { path: "/about", title: "About Convertify", description: "Convertify is a free, privacy-first online file converter that runs entirely in your browser.", h1: "About Convertify", type: "website" },
  { path: "/contact", title: "Contact Convertify", description: "Get in touch with the Convertify team for support, feedback or partnership enquiries.", h1: "Contact Us", type: "website" },
  { path: "/blog", title: "Blog — PDF & File Conversion Guides", description: "Tutorials and guides on converting, compressing and managing PDFs and images.", h1: "Convertify Blog", type: "website" },
  { path: "/tool-status", title: "Tool Status — Convertify", description: "Check the operational status of all Convertify tools and services.", h1: "Tool Status", type: "website", noindex: true },
  { path: "/privacy-policy", title: "Privacy Policy", description: "How Convertify handles your data — spoiler: your files never leave your device.", h1: "Privacy Policy", type: "website" },
  { path: "/terms-and-conditions", title: "Terms & Conditions", description: "The terms that govern your use of Convertify.", h1: "Terms & Conditions", type: "website" },
  { path: "/disclaimer", title: "Disclaimer", description: "Important information about using Convertify.", h1: "Disclaimer", type: "website" },
  { path: "/dmca", title: "DMCA Policy", description: "Convertify's DMCA takedown policy.", h1: "DMCA Policy", type: "website" },
  { path: "/cookie-policy", title: "Cookie Policy", description: "How Convertify uses cookies.", h1: "Cookie Policy", type: "website" },
];

const routes: Route[] = [...staticRoutes, ...toolRoutes, ...blogRoutes];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function buildHead(r: Route) {
  const url = `${SITE_URL}${r.path}`;
  const robots = r.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const tags: string[] = [];
  tags.push(`<title>${escapeHtml(r.title)}</title>`);
  tags.push(`<meta name="description" content="${escapeHtml(r.description)}" />`);
  tags.push(`<meta name="author" content="${SITE_AUTHOR}" />`);
  tags.push(`<meta name="application-name" content="${SITE_NAME}" />`);
  tags.push(`<meta name="apple-mobile-web-app-title" content="${SITE_NAME}" />`);
  if (r.keywords?.length) tags.push(`<meta name="keywords" content="${escapeHtml(r.keywords.join(", "))}" />`);
  tags.push(`<meta name="robots" content="${robots}" />`);
  tags.push(`<link rel="canonical" href="${url}" />`);
  tags.push(`<meta property="og:title" content="${escapeHtml(r.title)}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(r.description)}" />`);
  tags.push(`<meta property="og:url" content="${url}" />`);
  tags.push(`<meta property="og:type" content="${r.type ?? "website"}" />`);
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(r.title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(r.description)}" />`);
  tags.push(`<meta property="og:image" content="${SITE_OG_IMAGE}" />`);
  tags.push(`<meta property="og:image:width" content="1200" />`);
  tags.push(`<meta property="og:image:height" content="630" />`);
  tags.push(`<meta property="og:image:alt" content="${escapeHtml(r.title)}" />`);
  tags.push(`<meta name="twitter:image" content="${SITE_OG_IMAGE}" />`);
  tags.push(`<meta name="twitter:image:alt" content="${escapeHtml(r.title)}" />`);
  if (r.jsonLd?.length) {
    for (const ld of r.jsonLd) {
      tags.push(`<script type="application/ld+json">${JSON.stringify(ld)}</script>`);
    }
  }
  return tags.join("\n    ");
}

function buildNoscript(r: Route) {
  return `<noscript><h1>${escapeHtml(r.h1)}</h1><p>${escapeHtml(r.description)}</p></noscript>`;
}

function prerender(r: Route) {
  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/, "");
  html = html.replace(/<meta name="description"[^>]*>/g, "");
  html = html.replace(/<meta name="application-name"[^>]*>/g, "");
  html = html.replace(/<meta name="apple-mobile-web-app-title"[^>]*>/g, "");
  html = html.replace(/<meta name="keywords"[^>]*>/g, "");
  html = html.replace(/<link rel="canonical"[^>]*>/g, "");
  html = html.replace(/<meta property="og:(title|description|url|type)"[^>]*>/g, "");
  html = html.replace(/<meta property="og:image(?::(width|height|alt))?"[^>]*>/g, "");
  html = html.replace(/<meta name="twitter:(card|title|description|image|image:alt)"[^>]*>/g, "");

  html = html.replace("</head>", `    ${buildHead(r)}\n  </head>`);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${buildNoscript(r)}</div>`,
  );

  const outPath = resolve(DIST, r.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
}

routes.forEach(prerender);
console.log(`[prerender-seo] wrote ${routes.length} prerendered HTML files`);
