import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
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
    ],
    build: { outDir: "build" },
    server: { port: 3000 },
  };
});
