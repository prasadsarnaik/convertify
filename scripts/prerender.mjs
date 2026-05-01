import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");
const siteModulePath = path.join(distDir, "assets", "site.js");

async function resolveServerEntryPath() {
  const staticPath = path.join(distDir, "server", "entry-server.js");
  try {
    await fs.access(staticPath);
    return staticPath;
  } catch {
    // Continue with hashed SSR output lookup.
  }

  const serverAssetsDir = path.join(distDir, "server", "assets");
  const files = await fs.readdir(serverAssetsDir);
  const entryFile = files.find((file) => /^entry-server-.*\.js$/.test(file));

  if (!entryFile) {
    throw new Error("Could not locate SSR entry output in dist/server/assets");
  }

  return path.join(serverAssetsDir, entryFile);
}

// Try to import from built site.ts, fallback to hardcoded if not available
let prerenderRoutes;
try {
  const siteModule = await import(pathToFileURL(siteModulePath).href);
  prerenderRoutes = siteModule.allIndexableRoutes;
} catch {
  // Fallback: routes must match site.ts allIndexableRoutes
  prerenderRoutes = [
    "/",
    "/tools",
    "/features",
    "/how-it-works",
    "/about",
    "/contact",
    "/tool-status",
    "/privacy-policy",
    "/terms-and-conditions",
    "/disclaimer",
    "/sitemap",
    "/tool/word-to-pdf",
    "/tool/pdf-to-word",
    "/tool/merge-pdf",
    "/tool/split-pdf",
    "/tool/compress-pdf",
    "/tool/pdf-to-jpg",
    "/tool/jpg-to-pdf",
    "/tool/rotate-pdf",
    "/tool/edit-pdf",
    "/tool/protect-pdf",
    "/tool/unlock-pdf",
    "/tool/sign-pdf",
    "/tool/image-to-pdf",
    "/tool/jpg-to-png",
    "/tool/png-to-jpg",
    "/tool/webp-to-jpg",
    "/tool/avif-to-jpg",
    "/tool/heic-to-jpg",
    "/tool/resize-image",
    "/tool/compress-image",
    "/tool/rotate-image",
    "/tool/image-upscaler",
  ];
}

const template = await fs.readFile(templatePath, "utf8");
const serverEntryPath = await resolveServerEntryPath();
const { render } = await import(pathToFileURL(serverEntryPath).href);

for (const route of prerenderRoutes) {
  const { appHtml, helmet } = render(route);
  const outputDir = route === "/" ? distDir : path.join(distDir, route.replace(/^\//, ""));
  const outputPath = route === "/" ? templatePath : path.join(outputDir, "index.html");

  if (route !== "/") {
    await fs.mkdir(outputDir, { recursive: true });
  }

  const html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace("<!--app-head-->", `${helmet?.title?.toString() || ""}${helmet?.meta?.toString() || ""}${helmet?.link?.toString() || ""}`)
    .replace("<!--app-scripts-->", helmet?.script?.toString() || "");

  await fs.writeFile(outputPath, html, "utf8");
}

const serverDir = path.join(distDir, "server");
await fs.rm(serverDir, { recursive: true, force: true });
