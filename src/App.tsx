import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "@/pages/About";
import { BrandFoundation } from "@/pages/BrandFoundation";
import { Contact } from "@/pages/Contact";
import { Faq } from "@/pages/Faq";
import { Home } from "@/pages/Home";
import { Locations } from "@/pages/Locations";
import { LocationOrNotFound } from "@/pages/LocationOrNotFound";
import { Privacy } from "@/pages/Privacy";
import { ProductDetail } from "@/pages/ProductDetail";
import { Products } from "@/pages/Products";
import { ServiceDetail } from "@/pages/ServiceDetail";
import { Services } from "@/pages/Services";
import { Terms } from "@/pages/Terms";

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dev/brand" element={<BrandFoundation />} />
        <Route path="*" element={<LocationOrNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
