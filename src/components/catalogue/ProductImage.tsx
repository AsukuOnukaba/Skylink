import { useState } from "react";
import { PackageOpen } from "lucide-react";
import { Icon } from "@/components/icons/Icon";
import { Picture } from "@/components/ui/Picture";
import type { ProductRecord } from "@/data/products";
import { cn } from "@/lib/cn";

type ProductImageProps = {
  product: ProductRecord;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ProductImage({
  product,
  className,
  sizes,
  priority = false,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(product.imageSrc) && !failed;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-slate-100",
        className,
      )}
    >
      {showImage ? (
        <Picture
          src={product.imageSrc as string}
          alt={product.imageAlt || product.name}
          priority={priority}
          sizes={sizes}
          pictureClassName="block h-full w-full"
          className="h-full w-full object-contain p-4"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex flex-col items-center gap-3 px-6 py-10 text-center text-slate-500">
          <Icon icon={PackageOpen} size="feature" aria-hidden="true" />
          <p className="text-sm font-medium">Product image unavailable</p>
          <p className="text-xs">See the specifications below for verified details.</p>
        </div>
      )}
    </div>
  );
}
