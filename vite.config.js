import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/react06/" : "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.css$/.test(assetInfo.name)) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
