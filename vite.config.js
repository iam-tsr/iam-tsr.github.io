import { defineConfig } from 'vite';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 8080,
    open: true
  },
  plugins: [
    {
      name: 'copy-404',
      closeBundle() {
        // Copy 404.html to dist for GitHub Pages
        copyFileSync(
          resolve(__dirname, '404.html'),
          resolve(__dirname, 'dist/404.html')
        );
      }
    }
  ]
});
