module.exports = {
  root: true,
  ignorePatterns: ["*.d.ts"],
  env: {
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        // Allow CJS until ESM support improves
        "@typescript-eslint/no-var-requires": "off",
        "unicorn/prefer-module": "off",
      },
      plugins: ["promise", "unicorn", "simple-import-sort", "import"],
      extends: [
        "eslint:recommended",
        "airbnb-base",
        "plugin:promise/recommended",
        "plugin:unicorn/recommended",
        "prettier",
      ],
    },
    {
      files: ["*.ts", "*.tsx"],
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
        "eslint:recommended",
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
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
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
        // Common abbreviations are known and readable
        "unicorn/prevent-abbreviations": "off",
        // Airbnb prefers forEach
        "unicorn/no-array-for-each": "off",
        // _dirname and _filename is still useful for Node libraries
        "unicorn/prefer-module": "off",
        // It's not accurate in the monorepo style
        "import/no-extraneous-dependencies": "off",
        // Hinders development workflow
        "no-console": "off",
        // Auto sort imports
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
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
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
        "plugin:promise/recommended",
        "prettier",
      ],
      rules: {
        // It's not accurate in the monorepo style
        "import/no-extraneous-dependencies": "off",
        // Hinders development workflow
        "no-console": "off",
        // Auto sort imports
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
      },
    },
  ],
};
