// Generates public/sitemap.xml from a single source of truth (tools + blog).
// Runs via predev / prebuild npm hooks.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { TOOL_META } from "../src/lib/toolContent";
import { BLOG_POSTS } from "../src/lib/blogPosts";

const BASE_URL = "https://convertifyall.com";
const today = new Date().toISOString().slice(0, 10);

interface Entry {
  path: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const staticPages: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/tools", changefreq: "weekly", priority: "0.9" },
  { path: "/features", changefreq: "monthly", priority: "0.8" },
  { path: "/how-it-works", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/tool-status", changefreq: "daily", priority: "0.5" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: "0.4" },
  { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
  { path: "/dmca", changefreq: "yearly", priority: "0.3" },
  { path: "/cookie-policy", changefreq: "yearly", priority: "0.3" },
];

const toolPages: Entry[] = Object.keys(TOOL_META).map((slug) => ({
  path: `/${slug}`,
  lastmod: today,
  changefreq: "monthly",
  priority: "0.9",
}));

const blogPages: Entry[] = BLOG_POSTS.map((post) => ({
  path: `/blog/${post.slug}`,
  lastmod: post.date,
  changefreq: "monthly",
  priority: "0.7",
}));

const entries = [...staticPages, ...toolPages, ...blogPages].map((e) => ({
  lastmod: today,
  ...e,
}));

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod && `    <lastmod>${e.lastmod}</lastmod>`,
      e.changefreq && `    <changefreq>${e.changefreq}</changefreq>`,
      e.priority && `    <priority>${e.priority}</priority>`,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  `</urlset>`,
  "",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} URLs)`);
