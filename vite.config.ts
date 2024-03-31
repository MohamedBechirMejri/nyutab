import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const mdx = await import("@mdx-js/rollup");
  return {
    plugins: [
      {
        enforce: "pre",
        ...mdx.default(/* jsxImportSource: …, otherOptions… */),
      },
      react(),
      tsconfigPaths(),
    ],
    build: { outDir: "build" },
    server: { port: 3000 },
  };
});
