import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { LOGO_INTRINSIC } from "./Logo";

describe("Skylink primary logo asset", () => {
  it("exposes the web-serving intrinsic dimensions", () => {
    expect(LOGO_INTRINSIC.width).toBe(950);
    expect(LOGO_INTRINSIC.height).toBe(669);
  });

  it("keeps the cleared original and a display-cropped web copy", () => {
    const original = path.resolve(
      process.cwd(),
      "brand-assets/originals/skylink-logo-primary.png",
    );
    const web = path.resolve(
      process.cwd(),
      "public/brand/skylink-logo-primary.png",
    );
    const originalBuf = readFileSync(original);
    const webBuf = readFileSync(web);
    expect(originalBuf.length).toBeGreaterThan(1000);
    expect(webBuf.length).toBeGreaterThan(1000);
    // Original master stays full-frame; web asset is cropped for readable header size.
    expect(webBuf.equals(originalBuf)).toBe(false);
    expect(originalBuf.subarray(0, 8)).toEqual(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    );
    expect(webBuf.subarray(0, 8)).toEqual(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    );
  });
});
