import pc from "picocolors";
import { createServer } from "vite";
import { ViteNodeRunner } from "vite-node/client";
import { ViteNodeServer } from "vite-node/server";

export interface CliOptions {
  files?: string[];
  root?: string;
  config?: string;
  watch?: boolean;
}

export const run = async (options: CliOptions = {}) => {
  const files = options.files || [];
  const server = await createServer({
    logLevel: "error",
    configFile: options.config,
    root: options.root,
  });
  // Initialise plugins
  await server.pluginContainer.buildStart({});

  const node = new ViteNodeServer(server);

  const runner = new ViteNodeRunner({
    root: server.config.root,
    base: server.config.base,
    fetchModule(id) {
      return node.fetchModule(id);
    },
    resolveId(id, importer) {
      return node.resolveId(id, importer);
    },
  });

  // provide the vite define variable in this context
  await runner.executeId("/@vite/env");

  // eslint-disable-next-line no-await-in-loop
  for (const file of files) await runner.executeFile(file);

  if (!options.watch) await server.close();

  server.watcher.on("change", async (eventName, path) => {
    console.log(pc.dim(`[${eventName}] ${path}`));

    // invalidate module cache but not node_modules
    for (const i of runner.moduleCache.keys()) {
      if (!i.includes("node_modules")) runner.moduleCache.delete(i);
    }

    // eslint-disable-next-line no-await-in-loop
    for (const file of files) await runner.executeFile(file);
  });
};
