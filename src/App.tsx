import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrandFoundation } from "@/pages/BrandFoundation";
import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { PhaseStub } from "@/pages/PhaseStub";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/services"
          element={
            <PhaseStub
              title="Services"
              summary="Service pages are being prepared. Meanwhile, request a quote and tell us about your site so we can point you in the right direction."
            />
          }
        />
        <Route
          path="/about"
          element={
            <PhaseStub
              title="About"
              summary="Skylink installs and supports Starlink connectivity. More about the business will appear here as details are confirmed."
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dev/brand" element={<BrandFoundation />} />
      </Routes>
    </BrowserRouter>
  );
}
