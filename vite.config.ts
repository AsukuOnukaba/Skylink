import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
// TRD: static client build output under dist/spa (Vercel-compatible).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  build: {
    outDir: "dist/spa",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
