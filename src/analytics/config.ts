/**
 * Analytics activation (PH-11 / OD-13).
 *
 * Disabled unless a well-formed Skylink GA4 measurement id is configured
 * AND the deployment context allows it. No provider id is stored in source.
 * Missing or invalid values fail closed.
 *
 * Local and preview deployments stay off even when an id is present, unless
 * an explicit test/local override is set.
 */

const MEASUREMENT_ID = /^G-[A-Z0-9]{6,12}$/;

function readEnv(name: string): string {
  if (typeof process !== "undefined" && process.env?.[name]) {
    return String(process.env[name]).trim();
  }
  try {
    const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string> })
      .env;
    if (viteEnv?.[name]) return String(viteEnv[name]).trim();
  } catch {
    /* non-Vite */
  }
  return "";
}

function deploymentEnvironment(): string {
  return (
    readEnv("VERCEL_ENV") ||
    readEnv("VITE_VERCEL_ENV") ||
    readEnv("SKYLINK_DEPLOY_ENV") ||
    ""
  ).toLowerCase();
}

/** Test / local override only — never set on Vercel preview or production. */
function forceAnalyticsForTests(): boolean {
  const raw = readEnv("SKYLINK_FORCE_ANALYTICS").toLowerCase();
  return raw === "true" || raw === "1" || raw === "yes";
}

/** Returns a usable measurement id, or null when the id itself is unusable. */
export function measurementId(): string | null {
  const raw = readEnv("VITE_GA_MEASUREMENT_ID");
  if (!MEASUREMENT_ID.test(raw)) return null;
  if (/X{4,}|placeholder|example|datagram/i.test(raw)) return null;
  return raw;
}

/**
 * True only when a valid id exists and the runtime may load the Google tag.
 *
 * Rules:
 * 1. No valid id → off.
 * 2. Preview (`VERCEL_ENV=preview`) → off.
 * 3. Production (`VERCEL_ENV=production`) → on when id is valid.
 * 4. Local / unknown → off unless `SKYLINK_FORCE_ANALYTICS` (tests / explicit local).
 */
export function analyticsEnabled(): boolean {
  if (!measurementId()) return false;
  if (forceAnalyticsForTests()) return true;
  const env = deploymentEnvironment();
  if (env === "preview") return false;
  if (env === "production") return true;
  return false;
}
