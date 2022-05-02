import cac from "cac";

import commands from "./commands";

import { version } from "../package.json";

const cli = cac("tsvite");

cli.command("build", "Bundle project").action(() => {
  commands.build();
});

cli.command("create", "Select a project template").action(() => {
  commands.create();
});

cli
  .command("run [...files]", "Execute a file")
  .option("--watch", "Watch files for changes")
  .action((files, options) => {
    options.files = files;
    console.log(options);
    commands.run(options);
  });

cli.help();
cli.version(version);
cli.parse();
