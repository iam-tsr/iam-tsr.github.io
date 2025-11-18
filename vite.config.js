import { defineConfig } from 'vite';
import { copyFileSync, cpSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  publicDir: false, // We'll manually copy what we need
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
      name: 'copy-static-files',
      closeBundle() {
        // Copy 404.html to dist for GitHub Pages
        copyFileSync(
          resolve(__dirname, '404.html'),
          resolve(__dirname, 'dist/404.html')
        );
        
        // Copy static folders to dist
        cpSync(
          resolve(__dirname, 'content'),
          resolve(__dirname, 'dist/content'),
          { recursive: true }
        );
        cpSync(
          resolve(__dirname, 'components'),
          resolve(__dirname, 'dist/components'),
          { recursive: true }
        );
        cpSync(
          resolve(__dirname, 'assets'),
          resolve(__dirname, 'dist/assets'),
          { recursive: true }
        );
      }
    }
  ]
});
