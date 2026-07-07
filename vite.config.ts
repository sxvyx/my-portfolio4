import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: base MUST be relative ("./"), not "/".
// GitHub Project Pages serve from https://<user>.github.io/<repoName>/,
// not the domain root. An absolute base causes all CSS/JS to 404 and
// the deployed page renders blank/unstyled even though the build succeeded.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
