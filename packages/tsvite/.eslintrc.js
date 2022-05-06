require("../eslint-config-tsvite/patch");

module.exports = {
  extends: ["../eslint-config-tsvite/profile/node.js"],
  parserOptions: { tsconfigRootDir: __dirname },
};
