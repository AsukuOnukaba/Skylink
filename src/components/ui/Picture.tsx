import type { ImgHTMLAttributes } from "react";
import imageManifest from "@/data/image-manifest.json";
import { cn } from "@/lib/cn";

type ManifestEntry = {
  src: string;
  width: number;
  height: number;
  variants: Array<{ w: number; avif: string; webp: string }>;
};

const manifest = imageManifest as Record<string, ManifestEntry>;

type PictureProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  /** Public path key matching the image manifest, e.g. `/images/pipeline-fixture.jpeg`. */
  src: string;
  alt: string;
  priority?: boolean;
  /** Responsive sizes hint for srcset selection. */
  sizes?: string;
};

/**
 * Manifest-backed responsive image. Falls back to the src path if not yet optimized.
 */
export function Picture({
  src,
  alt,
  className,
  priority = false,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 768px",
  ...rest
}: PictureProps) {
  const entry = manifest[src];
  const w = width ?? entry?.width;
  const h = height ?? entry?.height;

  if (!entry || entry.variants.length === 0) {
    return (
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        className={cn("h-auto max-w-full", className)}
        loading={priority ? "eager" : "lazy"}
        // DOM attribute is lowercase; React 18 warns on fetchPriority in SSR.
        {...(priority ? { fetchpriority: "high" as const } : {})}
        decoding="async"
        {...rest}
      />
    );
  }

  const sorted = [...entry.variants].sort((a, b) => a.w - b.w);
  const avifSrcSet = sorted.map((v) => `${v.avif} ${v.w}w`).join(", ");
  const webpSrcSet = sorted.map((v) => `${v.webp} ${v.w}w`).join(", ");

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={entry.src}
        alt={alt}
        width={w}
        height={h}
        sizes={sizes}
        className={cn("h-auto max-w-full", className)}
        loading={priority ? "eager" : "lazy"}
        {...(priority ? { fetchpriority: "high" as const } : {})}
        decoding="async"
        {...rest}
      />
    </picture>
  );
}
