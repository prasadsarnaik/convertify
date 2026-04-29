import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const siteModulePath = path.join(distDir, "assets", "site.js");

const DEFAULT_SITE_URL = "https://convertifyall.com";

// Try to import from built site.ts, fallback to hardcoded if not available
let siteRoutes = [];
let toolSeoContent = [];

try {
  const siteModule = await import(pathToFileURL(siteModulePath).href);
  siteRoutes = siteModule.siteRoutes || [];
  toolSeoContent = siteModule.toolSeoContent || [];
} catch {
  // Fallback: must match site.ts
  siteRoutes = [
    { path: "/", priority: "1.0", changeFrequency: "weekly" },
    { path: "/tools", priority: "0.9", changeFrequency: "weekly" },
    { path: "/features", priority: "0.7", changeFrequency: "monthly" },
    { path: "/how-it-works", priority: "0.7", changeFrequency: "monthly" },
    { path: "/about", priority: "0.6", changeFrequency: "monthly" },
    { path: "/contact", priority: "0.5", changeFrequency: "monthly" },
    { path: "/tool-status", priority: "0.5", changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: "0.3", changeFrequency: "monthly" },
    { path: "/terms-and-conditions", priority: "0.3", changeFrequency: "monthly" },
    { path: "/disclaimer", priority: "0.3", changeFrequency: "monthly" },
    { path: "/sitemap", priority: "0.3", changeFrequency: "monthly" },
  ];
  toolSeoContent = [
    { slug: "word-to-pdf" },
    { slug: "pdf-to-word" },
    { slug: "merge-pdf" },
    { slug: "split-pdf" },
    { slug: "compress-pdf" },
    { slug: "pdf-to-jpg" },
    { slug: "jpg-to-pdf" },
    { slug: "rotate-pdf" },
    { slug: "edit-pdf" },
    { slug: "protect-pdf" },
    { slug: "unlock-pdf" },
    { slug: "sign-pdf" },
    { slug: "image-to-pdf" },
    { slug: "jpg-to-png" },
    { slug: "png-to-jpg" },
    { slug: "webp-to-jpg" },
    { slug: "avif-to-jpg" },
    { slug: "heic-to-jpg" },
    { slug: "resize-image" },
    { slug: "compress-image" },
    { slug: "rotate-image" },
    { slug: "image-upscaler" },
  ];
}

const siteUrl = DEFAULT_SITE_URL;

const today = new Date().toISOString().split("T")[0];

function buildUrlEntry(loc, priority, changefreq) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const pageEntries = siteRoutes.map((route) =>
  buildUrlEntry(
    `${siteUrl}${route.path}`,
    route.priority,
    route.changeFrequency
  )
);

const toolEntries = toolSeoContent.map((tool) =>
  buildUrlEntry(`${siteUrl}/tool/${tool.slug}`, "0.8", "weekly")
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageEntries.join("\n")}
${toolEntries.join("\n")}
</urlset>`;

const outputPath = path.join(distDir, "sitemap.xml");
await fs.writeFile(outputPath, sitemap, "utf8");
console.log(`Generated sitemap.xml with ${pageEntries.length + toolEntries.length} URLs`);
