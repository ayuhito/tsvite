require("../eslint-config-tsvite/patch");

module.exports = {
  extends: ["../eslint-config-tsvite/index.js"],
  parserOptions: { tsconfigRootDir: __dirname },
};
