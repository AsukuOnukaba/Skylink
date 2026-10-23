/**
 * Authoritative SEO / indexing configuration (PH-10).
 *
 * OD-10 remains open: do not invent a production domain.
 * Default builds and all preview deployments stay non-indexable.
 */

export type IndexingMode = {
  /** True only when production indexing is explicitly allowed and fully configured. */
  indexingEnabled: boolean;
  /** Valid HTTPS origin with no trailing slash, or null when unavailable / unused. */
  siteOrigin: string | null;
  /** Human-readable reason when indexing is off (for logs and tests). */
  reason: string;
};

const LOCAL_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
]);

function readEnv(name: string): string {
  if (typeof process !== "undefined" && process.env?.[name]) {
    return String(process.env[name]).trim();
  }
  try {
    const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string> })
      .env;
    if (viteEnv?.[name]) return String(viteEnv[name]).trim();
  } catch {
    /* non-Vite context */
  }
  return "";
}

/**
 * Validate an approved public site origin.
 * Rejects localhost, bare hostnames without https, and trailing paths.
 */
export function parseSiteOrigin(raw: string): string | null {
  const value = raw.trim().replace(/\/+$/, "");
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.username || url.password) return null;
  if (url.pathname !== "/" && url.pathname !== "") return null;
  if (url.search || url.hash) return null;
  if (LOCAL_HOSTS.has(url.hostname) || url.hostname.endsWith(".local")) {
    return null;
  }
  // Preview / project *.vercel.app hosts are never treated as the approved production origin.
  if (url.hostname.endsWith(".vercel.app")) return null;
  return `${url.protocol}//${url.host}`;
}

function deploymentEnvironment(): string {
  return (
    readEnv("VERCEL_ENV") ||
    readEnv("VITE_VERCEL_ENV") ||
    readEnv("SKYLINK_DEPLOY_ENV") ||
    ""
  ).toLowerCase();
}

function allowIndexingFlag(): boolean {
  const raw = readEnv("VITE_ALLOW_INDEXING").toLowerCase();
  return raw === "true" || raw === "1" || raw === "yes";
}

function forceProductionSeoForTests(): boolean {
  const raw = readEnv("SKYLINK_FORCE_PRODUCTION_SEO").toLowerCase();
  return raw === "true" || raw === "1";
}

/**
 * Resolve indexing mode for the current build / runtime.
 *
 * Rules:
 * 1. Local / unknown / preview → noindex (even if VITE_ALLOW_INDEXING is set).
 * 2. Production indexing requires VERCEL_ENV=production (or explicit test force),
 *    VITE_ALLOW_INDEXING=true, and a valid VITE_SITE_URL HTTPS origin.
 * 3. If indexing is requested in a production context but SITE_URL is missing/invalid,
 *    throw so the build fails closed instead of emitting fake canonicals.
 */
export function resolveIndexing(options?: {
  /** When true, throw on misconfiguration instead of soft-disabling. Default true for builds. */
  failClosed?: boolean;
}): IndexingMode {
  const failClosed = options?.failClosed !== false;
  const deployEnv = deploymentEnvironment();
  const isPreview = deployEnv === "preview";
  const isProductionDeploy =
    deployEnv === "production" || forceProductionSeoForTests();
  const allow = allowIndexingFlag();
  const siteOrigin = parseSiteOrigin(readEnv("VITE_SITE_URL"));

  if (isPreview || (!isProductionDeploy && !forceProductionSeoForTests())) {
    return {
      indexingEnabled: false,
      siteOrigin: null,
      reason:
        isPreview
          ? "Preview deployments are always noindex (SEO-11)."
          : "Indexing disabled until production deploy + VITE_ALLOW_INDEXING + OD-10 site URL.",
    };
  }

  if (!allow) {
    return {
      indexingEnabled: false,
      siteOrigin: null,
      reason: "VITE_ALLOW_INDEXING is not enabled.",
    };
  }

  if (!siteOrigin) {
    const message =
      "VITE_ALLOW_INDEXING is enabled in a production SEO context, but VITE_SITE_URL is missing or invalid. Set a verified https:// origin (OD-10) with no path, query, or .vercel.app host.";
    if (failClosed) {
      throw new Error(message);
    }
    return {
      indexingEnabled: false,
      siteOrigin: null,
      reason: message,
    };
  }

  return {
    indexingEnabled: true,
    siteOrigin,
    reason: "Production indexing enabled.",
  };
}

export function robotsContentForPage(pageIndexable: boolean): string {
  const { indexingEnabled } = resolveIndexing({ failClosed: false });
  if (!indexingEnabled || !pageIndexable) {
    return "noindex, nofollow";
  }
  return "index, follow";
}

export function absoluteUrl(
  siteOrigin: string | null,
  path: string,
): string | null {
  if (!siteOrigin) return null;
  if (!path.startsWith("/")) return null;
  // Strip query/hash — canonical pages never include enquiry params.
  const clean = path.split("?")[0]?.split("#")[0] ?? path;
  if (clean === "/") return `${siteOrigin}/`;
  return `${siteOrigin}${clean.replace(/\/+$/, "")}`;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
