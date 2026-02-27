# Reproduction: `@turbo/gen` breaks Node.js APIs after Bun migration (patch release)

Minimal reproduction for a breaking change introduced in `@turbo/gen@2.8.8`.

## The issue

In `2.8.8`, `@turbo/gen` switched its runtime from Node.js to an embedded Bun v1.3.9 binary ([PR #11825](https://github.com/vercel/turborepo/pull/11825)). This was released as a **patch** bump (`2.8.7` → `2.8.8`).

Bun does not fully implement the Node.js API surface. In particular, [`module.findPackageJSON`](https://nodejs.org/api/module.html#modulefindpackagejsonspecifier-base) — a stable API since Node.js v22.8.0 — is [not implemented](https://github.com/oven-sh/bun/issues/23898) in Bun.

Generator configs that use this (or other unimplemented Node.js APIs) worked in `2.8.7` and break in `2.8.8+`.

## Steps to reproduce

```bash
git clone https://github.com/lfantone/turborepo-gen-bun-compat-repro
cd turborepo-gen-bun-compat-repro
npm install
npx turbo gen my-generator
```

## Expected behavior

The generator runs successfully, as it does with `@turbo/gen@2.8.7` (Node.js runtime).

## Actual behavior

```
TypeError: import_node_module.findPackageJSON is not a function
```

## Environment

- Node.js: v22+
- turbo: 2.8.12-canary.2
- OS: macOS (Apple Silicon)
