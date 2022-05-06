import path from "node:path";
import { build as viteBuild } from "vite";

export const build = async () => {
  const config = await viteBuild({
    root: path.resolve(__dirname, ".."),

    // watch: true,
  });
};
