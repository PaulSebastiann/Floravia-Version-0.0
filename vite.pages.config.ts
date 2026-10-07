import fs from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/Floravia/",
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: "github-pages-index",
      closeBundle() {
        const pagesEntry = path.resolve(process.cwd(), "dist/github-pages.html");
        const indexEntry = path.resolve(process.cwd(), "dist/index.html");
        if (fs.existsSync(pagesEntry)) {
          fs.renameSync(pagesEntry, indexEntry);
        }
      },
    },
  ],
  resolve: {
    alias: [
      {
        find: "@/components",
        replacement: path.resolve(process.cwd(), "src/components/components"),
      },
    ],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(process.cwd(), "github-pages.html"),
    },
  },
});