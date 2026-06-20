// Keep the base HTML shell aligned with the shared site config before Vite runs.
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from "../src/config/site";

const templatePath = resolve("index.template.html");
const indexPath = resolve("index.html");
const html = readFileSync(templatePath, "utf8");

const updated = html
  .replaceAll("__SITE_URL__", SITE_URL)
  .replaceAll("__SITE_NAME__", SITE_NAME)
  .replaceAll("__SITE_TITLE__", SITE_TITLE)
  .replaceAll("__SITE_DESCRIPTION__", SITE_DESCRIPTION)
  .replaceAll("__SITE_AUTHOR__", SITE_AUTHOR)
  .replaceAll("__SITE_OG_IMAGE__", SITE_OG_IMAGE);

writeFileSync(indexPath, updated);
console.log("[sync-index-html] index.html synced from shared site config");
