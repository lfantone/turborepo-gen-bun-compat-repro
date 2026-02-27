import { findPackageJSON } from "node:module";

export default function generator(plop) {
  // Resolve a package.json path using the stable Node.js API (available since v22.8.0)
  // This works under Node.js but fails under the embedded Bun runtime in @turbo/gen >= 2.8.8
  const pkgPath = findPackageJSON("my-lib", import.meta.url);

  plop.setGenerator("my-generator", {
    description: "A minimal generator that uses findPackageJSON",
    prompts: [],
    actions: [
      () => {
        console.log("Resolved package.json path:", pkgPath);
        return "Done";
      },
    ],
  });
}
