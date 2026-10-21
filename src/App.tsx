import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DevPlaceholder } from "@/pages/DevPlaceholder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DevPlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
}
