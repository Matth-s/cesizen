import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: true,
    port: 5174,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: process.env.CI
          ? "http://127.0.0.1:3000"
          : "http://backend:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
