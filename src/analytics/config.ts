/**
 * Analytics activation (PH-11 / OD-13).
 *
 * Disabled unless a well-formed Skylink GA4 measurement id is configured.
 * No provider id is stored in source. Missing or invalid values fail closed.
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

/** Returns a usable measurement id, or null when analytics must stay off. */
export function measurementId(): string | null {
  const raw = readEnv("VITE_GA_MEASUREMENT_ID");
  if (!MEASUREMENT_ID.test(raw)) return null;
  if (/X{4,}|placeholder|example|datagram/i.test(raw)) return null;
  return raw;
}

export function analyticsEnabled(): boolean {
  return measurementId() !== null;
}
