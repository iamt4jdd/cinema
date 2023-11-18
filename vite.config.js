import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    },
  },
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 80, // you can replace this port with any port
  }
  
});
