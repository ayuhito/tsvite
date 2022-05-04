# tsvite - WIP

A zero-config build tool for bootstrapping TypeScript libraries and CLIs. A modern TSDX replacement.

---

## Features

- Smooth developer experience using the [Vite](https://vitejs.dev/guide/why.html) bundler that leverages the power of [esbuild](https://esbuild.github.io/) and [Rollup](https://vitejs.dev/guide/why.html#why-bundle-for-production).
- [Vitest](https://vitest.dev/) unit-test framework for blazing fast tests (it's a very [similar](https://vitest.dev/guide/migration.html#migrating-from-jest) almost drop-in replacement to Jest).
- Supports `esm`, `cjs` and `umd` builds, fully supporting tree-shaking.
- Flexible starter configurations for TypeScript, Prettier, ESLint and more.
- Templates to allow wide variations of tsvite starters.

## Getting Started

```shell
npm install -g tsvite
npx tsvite create mylib
cd mylib
```
