import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrandFoundation } from "@/pages/BrandFoundation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrandFoundation />} />
      </Routes>
    </BrowserRouter>
  );
}
