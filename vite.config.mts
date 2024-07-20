import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import react from "@vitejs/plugin-react";

import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = {
  /* ... */
};

// https://vitejs.dev/config/
export default defineConfig(() => {
  // const mdx = await import("@mdx-js/rollup");
  return {
    plugins: [
      // {
      //   enforce: "pre",
      //   ...mdx.default(/* jsxImportSource: …, otherOptions… */),
      // },
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
      tsconfigPaths(),
    ],
    build: { outDir: "build" },
    server: { port: 3000 },
  };
});
