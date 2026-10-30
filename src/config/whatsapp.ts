import { getPublishedLocation, publishedLocations } from "@/data/locations";
import { getPublishedProduct } from "@/data/products";
import { getPublishedService } from "@/data/services";
import { site } from "@/config/site";

export const WHATSAPP_ENQUIRY_MESSAGE =
  "Hello Skylink, I would like to enquire about Starlink installation or connectivity services.";

export type WhatsappContext = {
  service?: string;
  location?: string;
  product?: string;
};

export function buildWhatsappHref(context: WhatsappContext = {}): string {
  const base = site.social.whatsapp;
  if (!base) return "";
  const lines = [WHATSAPP_ENQUIRY_MESSAGE];
  if (context.service) lines.push(`Service: ${context.service}`);
  if (context.location) lines.push(`Location: ${context.location}`);
  if (context.product) lines.push(`Product: ${context.product}`);
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Service, product, and location labels taken from the current public route.
 * Query values are used only when they match a published record, so a crafted
 * URL cannot put a person's details into the prefilled message.
 */
export function enquiryContextFromLocation(
  pathname: string,
  search: string,
): WhatsappContext {
  const params = new URLSearchParams(search);
  const serviceMatch = pathname.match(/^\/services\/([^/]+)\/?$/);
  const productMatch = pathname.match(/^\/products\/([^/]+)\/?$/);
  const placeMatch = pathname.match(/^\/starlink-installation-([a-z0-9-]+)\/?$/i);

  const service = getPublishedService(
    serviceMatch?.[1] || params.get("service") || "",
  );
  const product = getPublishedProduct(
    productMatch?.[1] || params.get("product") || "",
  );
  const place = getPublishedLocation((placeMatch?.[1] || "").toLowerCase());
  const locationQuery = params.get("location")?.trim() || "";
  const locationFromQuery = publishedPlaceByName(locationQuery);

  return {
    service: service?.title,
    product: product?.name,
    location: place?.placeName || locationFromQuery?.placeName,
  };
}

function publishedPlaceByName(name: string) {
  const needle = name.trim().toLowerCase();
  if (!needle) return undefined;
  return publishedLocations().find(
    (place) =>
      place.placeKey === needle || place.placeName.toLowerCase() === needle,
  );
}
