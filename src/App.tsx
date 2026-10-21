import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "@/pages/About";
import { BrandFoundation } from "@/pages/BrandFoundation";
import { Contact } from "@/pages/Contact";
import { Faq } from "@/pages/Faq";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { Privacy } from "@/pages/Privacy";
import { Services } from "@/pages/Services";
import { Terms } from "@/pages/Terms";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dev/brand" element={<BrandFoundation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
