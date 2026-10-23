import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

describe("vercel.json routing (PH-10)", () => {
  const config = JSON.parse(
    readFileSync(path.join(root, "vercel.json"), "utf8"),
  ) as {
    routes: Array<Record<string, unknown>>;
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
});
