// vite.config.ts
import { resolve } from "node:path";
import { builtinModules } from "node:module";
import { defineConfig } from "vite";
import packageJson from "./package.json";

interface BasePackageJson {
  name: string;
  dependencies?: { [key: string]: string };
  peerDependencies?: { [key: string]: string };
}

const { name, peerDependencies, dependencies } = packageJson as BasePackageJson;

// Vite currently doesn't support filtering out built-in Node modules since they are browser first
// More at https://github.com/vitejs/vite/issues/7821
const EXTERNAL_MODULES = [
  ...builtinModules,
  ...Object.keys(dependencies || {}),
  ...Object.keys(peerDependencies || {}),
  "vite-node/client",
  "vite-node/server",
  "vite",
  "typescript",
];

module.exports = defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name,
      formats: ["es", "cjs"],
      fileName: (format) =>
        `${name}.${format}.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      // Externalise deps that shouldn't be rolled up
      // builtinModules does not account for node: prefixes and dependencies
      // TODO: make it automatically handle directories such as vite-node/server but also work with named modules like @package/name
      // Can't just use a split("/") because it will affect scoped packages @package/name
      external: (id) => id.startsWith("node:") || EXTERNAL_MODULES.includes(id),
      input: resolve(__dirname, "src/index.ts"),
    },
    target: "node14",
    sourcemap: true,
    // watch: {},
  },
});
