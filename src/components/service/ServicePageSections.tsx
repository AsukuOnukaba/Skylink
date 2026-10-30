import { CheckCircle2, CircleAlert, ClipboardCheck, UserRound } from "lucide-react";
import { ProductImage } from "@/components/catalogue/ProductImage";
import { Icon } from "@/components/icons/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Picture } from "@/components/ui/Picture";
import { TextLink } from "@/components/ui/TextLink";
import type { ProductRecord } from "@/data/products";
import type { ServiceRecord } from "@/data/services";

export function ServiceHero({
  service,
  contactTo,
  ctaLabel,
}: {
  service: ServiceRecord;
  contactTo: string;
  ctaLabel: string;
}) {
  return (
    <div className="mt-6 grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="flex flex-col justify-center p-7 sm:p-9">
        <p className="text-sm font-medium text-slate-500">{service.audience}</p>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">{service.shortDescription}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink to={contactTo}>{ctaLabel}</ButtonLink>
          <ButtonLink to="/services" variant="secondary">All services</ButtonLink>
        </div>
      </div>
      {service.imageSrc ? (
        <Picture
          src={service.imageSrc}
          alt={service.imageAlt || ""}
          pictureClassName="block min-h-0 overflow-hidden bg-slate-100"
          className="h-full min-h-72 w-full object-cover object-center"
          sizes="(max-width: 768px) 100vw, 48vw"
        />
      ) : null}
    </div>
  );
}

function ListCard({
  title,
  items,
  tone = "positive",
}: {
  title: string;
  items: string[];
  tone?: "positive" | "caution";
}) {
  const icon = tone === "positive" ? CheckCircle2 : CircleAlert;
  return (
    <Card className="h-full">
      <div className="flex items-center gap-3">
        <Icon icon={icon} size="ui" className={tone === "positive" ? "text-sky-700" : "text-amber-700"} />
        <h3 className="text-lg font-semibold text-navy-800">{title}</h3>
      </div>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
        {items.map((item) => <li key={item} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">{item}</li>)}
      </ul>
    </Card>
  );
}

export function ServiceFitAndBenefits({ service }: { service: ServiceRecord }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {service.suitableFor.length > 0 ? <ListCard title="Who this is for" items={service.suitableFor} /> : null}
      {service.inclusions.length > 0 ? <ListCard title="What the service covers" items={service.inclusions} /> : null}
    </div>
  );
}

export function ServiceRequirements({ service }: { service: ServiceRecord }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {service.customerProvides.length > 0 ? <ListCard title="What we typically need from you" items={service.customerProvides} /> : null}
      {service.limitations.length > 0 ? <ListCard title="Important limits" items={service.limitations} tone="caution" /> : null}
    </div>
  );
}

export function ServiceProcess({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {steps.map((step, index) => (
        <li key={step} className="relative rounded-lg border border-slate-200 bg-white p-5 pl-16">
          <span className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-800">{index + 1}</span>
          <p className="text-sm leading-relaxed text-slate-700">{step}</p>
        </li>
      ))}
    </ol>
  );
}

export function RelatedServiceCards({ services }: { services: ServiceRecord[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.slug}>
          <Card className="flex h-full flex-col">
            <Icon icon={ClipboardCheck} size="ui" className="text-sky-700" />
            <h3 className="mt-3 text-lg font-semibold text-navy-800">{service.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">{service.shortDescription}</p>
            <TextLink to={`/services/${service.slug}`} className="mt-4 inline-flex text-sm">View service</TextLink>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function RelatedProductCards({ products }: { products: ProductRecord[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <ProductImage product={product} className="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 33vw" />
          <div className="p-5">
            <h3 className="font-semibold text-navy-800">{product.name}</h3>
            <TextLink to={`/products/${product.slug}`} className="mt-3 inline-flex text-sm">View product</TextLink>
          </div>
        </li>
      ))}
    </ul>
  );
}
