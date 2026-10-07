import { defineConfig } from 'vite';

export default defineConfig({
  root: 'client',
  esbuild: { jsx: 'automatic' },
  server: {
    port: 5173,
    strictPort: true,
    proxy: { '/api': 'http://127.0.0.1:3001' },
  },
  build: { outDir: '../dist', emptyOutDir: true },
});
