/**
 * PH-10: After the Vite client build, prerender published routes into dist/spa,
 * emit robots.txt / conditional sitemap.xml, and write branded 404.html.
 *
 * Approach: Vite SSR + react-dom/server StaticRouter (no Puppeteer).
 * Justified: deterministic CI without Chromium; same React tree as the client.
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

function replaceHeadMeta(shell, headInner) {
  let html = shell;
  // Drop shell defaults that prerender replaces.
  html = html.replace(/<title>[^<]*<\/title>/i, "");
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, "");
  html = html.replace(/<meta\s+name="robots"[^>]*>/gi, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, "");
  html = html.replace(
    /<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
  html = html.replace(
    /<meta\s+property="og:[^"]+"[^>]*>/gi,
    "",
  );
  html = html.replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, "");

  if (!html.includes("</head>")) {
    throw new Error("Built index.html is missing </head>");
  }
  return html.replace("</head>", `    ${headInner}\n  </head>`);
}

function injectRoot(html, appHtml) {
  if (!html.includes('<div id="root"></div>')) {
    // Already prerendered or unexpected shell
    if (html.includes('id="root"')) {
      return html.replace(
        /<div id="root">[\s\S]*?<\/div>/,
        `<div id="root">${appHtml}</div>`,
      );
    }
    throw new Error('Built index.html is missing <div id="root"></div>');
  }
  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );
}

async function main() {
  const shellPath = path.join(outDir, "index.html");
  try {
    await fs.access(shellPath);
  } catch {
    throw new Error(
      `Missing ${path.relative(root, shellPath)}. Run vite build before seo:generate.`,
    );
  }

  const vite = await createServer({
    root,
    configFile: path.join(root, "vite.config.ts"),
    server: { middlewareMode: true },
    appType: "custom",
    mode: "production",
  });

  try {
    const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    const {
      prerenderPaths,
      getPageByPath,
      buildRobotsTxt,
      buildSitemapXml,
      listPublicPages,
    } = await vite.ssrLoadModule("/src/seo/pageRegistry.ts");
    const { serializeHeadTags, notFoundHeadTags } = await vite.ssrLoadModule(
      "/src/seo/applyDocumentMeta.ts",
    );
    const { resolveIndexing } = await vite.ssrLoadModule("/src/config/seo.ts");

    // Fail closed when production indexing is misconfigured.
    const indexing = resolveIndexing({ failClosed: true });
    console.log(
      `[seo] indexingEnabled=${indexing.indexingEnabled} (${indexing.reason})`,
    );

    const shell = await fs.readFile(shellPath, "utf8");
    const paths = prerenderPaths();
    const pages = listPublicPages();
    console.log(`[seo] prerendering ${paths.length} route(s)`);

    for (const route of paths) {
      const page = getPageByPath(route);
      if (!page) {
        throw new Error(`No SEO registry entry for prerender path ${route}`);
      }
      const appHtml = render(route);
      if (!appHtml.includes("<h1")) {
        throw new Error(`Prerendered ${route} is missing an <h1>`);
      }
      // Unpublished catalogue content must never appear under wrong URLs —
      // registry only includes published records.
      const head = serializeHeadTags(page);
      let html = replaceHeadMeta(shell, head);
      html = injectRoot(html, appHtml);
      const target = routeToFile(route);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, html, "utf8");
    }

    // Branded HTTP 404 document (Vercel SSG 404.html).
    const notFoundHtml = render("/__skylink_not_found__");
    if (!notFoundHtml.toLowerCase().includes("page not found")) {
      throw new Error("404 render did not include branded not-found copy");
    }
    let errorPage = replaceHeadMeta(shell, notFoundHeadTags());
    errorPage = injectRoot(errorPage, notFoundHtml);
    await fs.writeFile(path.join(outDir, "404.html"), errorPage, "utf8");

    await fs.writeFile(path.join(outDir, "robots.txt"), buildRobotsTxt(), "utf8");

    const sitemap = buildSitemapXml();
    const sitemapPath = path.join(outDir, "sitemap.xml");
    if (sitemap) {
      await fs.writeFile(sitemapPath, sitemap, "utf8");
      console.log(
        `[seo] wrote sitemap.xml (${pages.filter((p) => p.indexable).length} indexable URLs)`,
      );
    } else {
      try {
        await fs.unlink(sitemapPath);
      } catch {
        /* absent is fine */
      }
      console.log("[seo] sitemap.xml omitted (indexing disabled)");
    }

    // Also publish robots to public/ for local tooling consistency (dist is authoritative).
    await fs.writeFile(path.join(root, "public/robots.txt"), buildRobotsTxt(), "utf8");

    console.log(`[seo] wrote 404.html + robots.txt; prerender complete`);
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
