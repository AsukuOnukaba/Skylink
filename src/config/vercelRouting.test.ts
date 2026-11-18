import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

describe("vercel.json routing (PH-10 / enquiry corrective)", () => {
  const config = JSON.parse(
    readFileSync(path.join(root, "vercel.json"), "utf8"),
  ) as {
    buildCommand?: string;
    outputDirectory?: string;
    builds?: unknown;
    routes: Array<Record<string, unknown>>;
    functions?: Record<string, unknown>;
  };

  it("keeps enquiry API separate and does not SPA-fallback unknown paths to index.html", () => {
    const serialized = JSON.stringify(config.routes);
    expect(serialized).toContain("/api/enquiry");
    expect(serialized).toContain("404.html");
    expect(serialized).not.toMatch(/"dest"\s*:\s*"\/index\.html"/);
    expect(serialized).not.toContain("spa.html");

    const notFound = config.routes.find(
      (route) => route.status === 404 && route.dest === "/404.html",
    );
    expect(notFound).toBeTruthy();

    const apiCatch = config.routes.find(
      (route) =>
        typeof route.src === "string" &&
        route.src.includes("/api/") &&
        route.status === 404,
    );
    expect(apiCatch).toBeTruthy();
  });

  it("uses modern build output settings and routes all methods to the enquiry function", () => {
    expect(config.builds).toBeUndefined();
    expect(config.buildCommand).toContain("vercel-build");
    expect(config.outputDirectory).toBe("dist/spa");
    expect(config.functions?.["api/enquiry.ts"]).toBeTruthy();

    const enquiryRoute = config.routes.find(
      (route) => route.src === "/api/enquiry" && route.dest === "/api/enquiry",
    );
    expect(enquiryRoute).toBeTruthy();
    expect(enquiryRoute?.methods).toBeUndefined();
  });
});
