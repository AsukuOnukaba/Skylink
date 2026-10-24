import { describe, expect, it } from "vitest";
import { getPublishedProduct } from "@/data/products";
import { getPublishedService } from "@/data/services";
import {
  organizationJsonLd,
  productJsonLd,
  serviceJsonLd,
  webSiteJsonLd,
} from "./jsonLd";

describe("jsonLd builders", () => {
  it("emits parseable Organization and WebSite without invented NAP", () => {
    const org = organizationJsonLd("https://www.example.com");
    const site = webSiteJsonLd("https://www.example.com");
    expect(org["@type"]).toBe("Organization");
    expect(site["@type"]).toBe("WebSite");
    expect(org.telephone).toBe("+2349060976424");
    expect(org.email).toBe("info@skylink.com");
    expect(org).not.toHaveProperty("address");
  });

  it("builds Service and Product markup without Offer or FAQPage", () => {
    const service = getPublishedService("residential-installation");
    const product = getPublishedProduct("starlink-gen3-standard");
    expect(service).toBeTruthy();
    expect(product).toBeTruthy();
    const serviceLd = serviceJsonLd(
      service!,
      "https://www.example.com/services/residential-installation",
    );
    const productLd = productJsonLd(
      product!,
      "https://www.example.com/products/starlink-gen3-standard",
      null,
    );
    expect(serviceLd["@type"]).toBe("Service");
    expect(productLd["@type"]).toBe("Product");
    expect(productLd.offers).toEqual({
      "@type": "Offer",
      priceCurrency: "NGN",
      price: "750000",
    });
    expect(JSON.stringify(productLd.offers)).not.toMatch(/availability/i);
    expect(JSON.stringify([serviceLd, productLd])).not.toContain("FAQPage");
    expect(() => JSON.parse(JSON.stringify(serviceLd))).not.toThrow();
  });
});
