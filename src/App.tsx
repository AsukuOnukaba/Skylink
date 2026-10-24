import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@/analytics/Analytics";
import { About } from "@/pages/About";
import { BrandFoundation } from "@/pages/BrandFoundation";
import { Contact } from "@/pages/Contact";
import { Faq } from "@/pages/Faq";
import { Gallery } from "@/pages/Gallery";
import { Guide } from "@/pages/Guide";
import { Home } from "@/pages/Home";
import { Locations } from "@/pages/Locations";
import { OurWork } from "@/pages/OurWork";
import { LocationOrNotFound } from "@/pages/LocationOrNotFound";
import { Privacy } from "@/pages/Privacy";
import { ProductDetail } from "@/pages/ProductDetail";
import { Products } from "@/pages/Products";
import { ServiceDetail } from "@/pages/ServiceDetail";
import { Services } from "@/pages/Services";
import { Support } from "@/pages/Support";
import { Terms } from "@/pages/Terms";

/**
 * Route tree shared by the browser app and the SSR prerender entry.
 * `/dev/brand` is development-only and is omitted from production builds.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/guide/starlink-nigeria" element={<Guide />} />
      <Route path="/support" element={<Support />} />
      <Route path="/our-work" element={<OurWork />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      {import.meta.env.DEV ? (
        <Route path="/dev/brand" element={<BrandFoundation />} />
      ) : null}
      <Route path="*" element={<LocationOrNotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <AppRoutes />
    </BrowserRouter>
  );
}
