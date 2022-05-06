// vite.config.js
import { builtinModules } from "node:module";
import { resolve } from "node:path";
import { defineConfig } from "vite";

import pkg from "./package.json";

// Vite currently doesn't support filtering out built-in Node modules since they are browser first
// More at https://github.com/vitejs/vite/issues/7821
const EXTERNAL_MODULES = new Set([
  ...builtinModules,
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  "vite-node/client",
  "vite-node/server",
  "vite",
  "typescript",
]);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: pkg.name,
      formats: ["es", "cjs"],
      fileName: (format) =>
        `${pkg.name}.${format}.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      // Externalise deps that shouldn't be rolled up
      // builtinModules does not account for node: prefixes and dependencies
      // TODO: make it automatically handle directories such as vite-node/server but also work with named modules like @package/name
      // Can't just use a split("/") because it will affect scoped packages @package/name
      external: (id) => id.startsWith("node:") || EXTERNAL_MODULES.has(id),
      input: resolve(__dirname, "src/index.ts"),
    },
    target: "node14", // LTS only
    sourcemap: true,
  },
  test: {},
});
