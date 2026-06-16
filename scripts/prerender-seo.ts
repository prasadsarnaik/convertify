// Post-build prerender: emit dist/<route>/index.html for every known route with
// route-specific <title>, meta description, canonical, OG, JSON-LD, and an H1
// in <noscript>. The React app still hydrates client-side; this guarantees
// crawlers (including ones that don't execute JS) see unique, indexable HTML.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { TOOL_META } from "../src/lib/toolContent";
import { BLOG_POSTS } from "../src/lib/blogPosts";

const SITE = "https://convertifyall.com";
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
  jsonLd?: object[];
}

const breadcrumb = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name, item: `${SITE}${path}` },
  ],
});

const softwareLd = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: `${name} — Convertify`,
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
  keywords: p.tags,
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      author: { "@type": "Organization", name: "Convertify" },
    },
  ],
}));

const staticRoutes: Route[] = [
  { path: "/tools", title: "All Tools — Free Online PDF & Image Tools", description: "Browse every Convertify tool: convert, merge, split, compress, edit and sign PDFs, plus image format converters and editors.", h1: "All Convertify Tools" },
  { path: "/features", title: "Features — Why Convertify", description: "Browser-based, private, free file tools. No uploads, no watermarks, no sign-up required.", h1: "Convertify Features" },
  { path: "/how-it-works", title: "How It Works — Convertify", description: "See how Convertify processes files entirely in your browser using modern web technology.", h1: "How Convertify Works" },
  { path: "/about", title: "About Convertify", description: "Convertify is a free, privacy-first online file converter that runs entirely in your browser.", h1: "About Convertify" },
  { path: "/contact", title: "Contact Convertify", description: "Get in touch with the Convertify team for support, feedback or partnership enquiries.", h1: "Contact Us" },
  { path: "/blog", title: "Blog — PDF & File Conversion Guides", description: "Tutorials and guides on converting, compressing and managing PDFs and images.", h1: "Convertify Blog" },
  { path: "/tool-status", title: "Tool Status — Convertify", description: "Check the operational status of all Convertify tools and services.", h1: "Tool Status" },
  { path: "/privacy-policy", title: "Privacy Policy", description: "How Convertify handles your data — spoiler: your files never leave your device.", h1: "Privacy Policy" },
  { path: "/terms-and-conditions", title: "Terms & Conditions", description: "The terms that govern your use of Convertify.", h1: "Terms & Conditions" },
  { path: "/disclaimer", title: "Disclaimer", description: "Important information about using Convertify.", h1: "Disclaimer" },
  { path: "/dmca", title: "DMCA Policy", description: "Convertify's DMCA takedown policy.", h1: "DMCA Policy" },
  { path: "/cookie-policy", title: "Cookie Policy", description: "How Convertify uses cookies.", h1: "Cookie Policy" },
];

const routes: Route[] = [...staticRoutes, ...toolRoutes, ...blogRoutes];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function buildHead(r: Route) {
  const url = `${SITE}${r.path}`;
  const tags: string[] = [];
  tags.push(`<title>${escapeHtml(r.title)}</title>`);
  tags.push(`<meta name="description" content="${escapeHtml(r.description)}" />`);
  if (r.keywords?.length) tags.push(`<meta name="keywords" content="${escapeHtml(r.keywords.join(", "))}" />`);
  tags.push(`<link rel="canonical" href="${url}" />`);
  tags.push(`<meta property="og:title" content="${escapeHtml(r.title)}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(r.description)}" />`);
  tags.push(`<meta property="og:url" content="${url}" />`);
  tags.push(`<meta property="og:type" content="website" />`);
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(r.title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(r.description)}" />`);
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
  // Strip existing title and the per-route meta tags that index.html ships with.
  html = html.replace(/<title>[\s\S]*?<\/title>/, "");
  html = html.replace(/<meta name="description"[^>]*>/g, "");
  html = html.replace(/<meta name="keywords"[^>]*>/g, "");
  html = html.replace(/<link rel="canonical"[^>]*>/g, "");
  html = html.replace(/<meta property="og:(title|description|url|type)"[^>]*>/g, "");
  html = html.replace(/<meta name="twitter:(card|title|description)"[^>]*>/g, "");

  // Inject route-specific head tags before </head>.
  html = html.replace("</head>", `    ${buildHead(r)}\n  </head>`);
  // Add a noscript H1 + description right inside #root so crawlers see content.
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
