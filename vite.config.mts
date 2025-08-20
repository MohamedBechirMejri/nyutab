import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import tsconfigPaths from 'vite-tsconfig-paths'

const ReactCompilerConfig = {
  /* ... */
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  // const mdx = await import("@mdx-js/rollup");
  return {
    plugins: [
      // {
      //   enforce: "pre",
      //   ...mdx.default(/* jsxImportSource: …, otherOptions… */),
      // },
      react({}),
      tsconfigPaths(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    build: { outDir: 'build' },
    server: { port: 3000 },
  }
})
