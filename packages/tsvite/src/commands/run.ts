import pc from "picocolors";
import { createServer } from "vite";
import { ViteNodeServer } from "vite-node/server";
import { ViteNodeRunner } from "vite-node/client";

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

  for (const file of files) await runner.executeFile(file);

  if (!options.watch) await server.close();

  server.watcher.on("change", async (eventName, path) => {
    // eslint-disable-next-line no-console
    console.log(pc.dim(`[${eventName}] ${path}`));

    // invalidate module cache but not node_modules
    Array.from(runner.moduleCache.keys()).forEach((i) => {
      if (!i.includes("node_modules")) runner.moduleCache.delete(i);
    });

    for (const file of files) await runner.executeFile(file);
  });
};
