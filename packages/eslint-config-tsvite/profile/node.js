const buildRules = require("./build");

const node = {
  root: true,
  ignorePatterns: ["*.d.ts"],
  env: {
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      plugins: ["promise", "unicorn", "simple-import-sort", "import"],
      extends: [
        "eslint:recommended",
        "airbnb-base",
        "plugin:promise/recommended",
        "plugin:unicorn/recommended",
        "prettier",
      ],
      rules: {
        // Just shared rules
      },
    },
    {
      files: ["src/**/*.ts", "src/**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        allowAutomaticSingleRunInference: true,
        warnOnUnsupportedTypeScriptVersion: false,
        project: "./tsconfig.json",
      },
      plugins: [
        "@typescript-eslint",
        "promise",
        "unicorn",
        "simple-import-sort",
        "import",
      ],
      extends: [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "airbnb-typescript/base",
        "plugin:promise/recommended",
        "plugin:unicorn/recommended",
        "prettier",
      ],
      rules: {
        // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
        "no-prototype-builtins": "off",
        // Default exports affects readability
        "import/prefer-default-export": "off",
        "import/no-default-export": "error",
        // Use function hoisting to improve code readability
        "no-use-before-define": [
          "error",
          { functions: false, classes: true, variables: true },
        ],
        // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-use-before-define": [
          "error",
          { functions: false, classes: true, variables: true, typedefs: true },
        ],
      },
    },
    {
      // A more relaxed set of rules for unit tests
      files: ["tests/**/*.ts", "tests/**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        allowAutomaticSingleRunInference: true,
        warnOnUnsupportedTypeScriptVersion: false,
        project: "./tsconfig.json",
      },
      plugins: [
        "@typescript-eslint",
        "promise",
        "simple-import-sort",
        "import",
        "vitest",
      ],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:promise/recommended",
        "prettier",
      ],
      rules: {
        // Just shared rules
      },
    },
  ],
};

module.exports = buildRules(node, false);
