/**
 * Verify prerendered HTML artefacts under dist/spa after seo:generate.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist/spa");

function routeToFile(route) {
  if (route === "/") return path.join(outDir, "index.html");
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return path.join(outDir, clean, "index.html");
}

async function main() {
  const vite = await createServer({
    root,
    configFile: path.join(root, "vite.config.ts"),
    server: { middlewareMode: true },
    appType: "custom",
    mode: "production",
  });

  try {
    const { prerenderPaths, getPageByPath, sitemapEntries } =
      await vite.ssrLoadModule("/src/seo/pageRegistry.ts");
    const { resolveIndexing } = await vite.ssrLoadModule("/src/config/seo.ts");
    const indexing = resolveIndexing({ failClosed: false });

    for (const route of prerenderPaths()) {
      const file = routeToFile(route);
      const html = await fs.readFile(file, "utf8");
      const page = getPageByPath(route);
      if (!page) throw new Error(`Missing registry page for ${route}`);
      if (!html.includes("<h1")) {
        throw new Error(`${route} HTML lacks <h1>`);
      }
      if (!html.includes(page.title.replace(/&/g, "&amp;")) && !html.includes(page.title)) {
        throw new Error(`${route} HTML lacks expected <title> text`);
      }
      if (!html.includes('id="root"') || html.includes('<div id="root"></div>')) {
        throw new Error(`${route} still has an empty #root`);
      }
      if (indexing.indexingEnabled && page.indexable) {
        if (!html.includes('rel="canonical"')) {
          throw new Error(`${route} missing canonical while indexing enabled`);
        }
        if (html.includes("noindex")) {
          throw new Error(`${route} unexpectedly noindex while indexable`);
        }
      } else {
        if (!html.includes("noindex")) {
          throw new Error(`${route} should be noindex when indexing is off or page is non-indexable`);
        }
        if (html.includes('rel="canonical"')) {
          throw new Error(`${route} must not emit canonical while indexing is disabled`);
        }
      }
      if (/localhost|127\.0\.0\.1|\.vercel\.app/i.test(html)) {
        throw new Error(`${route} HTML contains a forbidden host`);
      }
    }

    const robots = await fs.readFile(path.join(outDir, "robots.txt"), "utf8");
    if (!robots.includes("Disallow: /api/")) {
      throw new Error("robots.txt must disallow /api/");
    }
    if (indexing.indexingEnabled) {
      if (!robots.includes("Sitemap:")) {
        throw new Error("robots.txt missing Sitemap while indexing enabled");
      }
      const sitemap = await fs.readFile(path.join(outDir, "sitemap.xml"), "utf8");
      const entries = sitemapEntries();
      for (const loc of entries) {
        if (!sitemap.includes(`<loc>${loc.replace(/&/g, "&amp;")}</loc>`) && !sitemap.includes(`<loc>${loc}</loc>`)) {
          throw new Error(`sitemap missing ${loc}`);
        }
      }
      if (/localhost|127\.0\.0\.1|\.vercel\.app/i.test(sitemap)) {
        throw new Error("sitemap contains a forbidden host");
      }
    } else if (robots.includes("Sitemap:")) {
      throw new Error("robots.txt must not advertise a sitemap when indexing is disabled");
    }

    const notFound = await fs.readFile(path.join(outDir, "404.html"), "utf8");
    if (!notFound.includes("noindex")) {
      throw new Error("404.html must be noindex");
    }
    if (!notFound.toLowerCase().includes("page not found")) {
      throw new Error("404.html missing branded copy");
    }

    // Places that are not in the catalogue must not have a static file.
    const draft = path.join(outDir, "starlink-installation-kano/index.html");
    try {
      await fs.access(draft);
      throw new Error("Unpublished location kano must not be prerendered");
    } catch (err) {
      if (err && err.message?.includes("must not be prerendered")) throw err;
    }

    console.log("[seo:check] prerender artefacts OK");
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
