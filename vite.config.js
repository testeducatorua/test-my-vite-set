import { defineConfig } from "vite";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => ({
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: true,
    cssCodeSplit: false,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          const ext = assetInfo.name?.split('.').pop()?.toLowerCase();
          if (ext === 'css') {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (
            ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg'].includes(
              ext ?? ''
            )
          ) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (['woff', 'woff2', 'ttf', 'otf'].includes(ext ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },

  plugins: [
    ViteImageOptimizer({
      png: { quality: 70, strip: true },
      jpeg: { quality: 75, progressive: true },
      webp: { quality: 70 },
      avif: { quality: 50 },
      svg: {
        multipass: true,
        plugins: [
          { name: 'preset-default' },
          { name: 'removeViewBox', active: false },
        ],
      },
      gif: { optimizationLevel: 3 },
      convertToWebp: true,
      convertToAvif: true,
      includePublic: true,
    }),
    ViteWebfontDownload([
      // Додайте Google Fonts сюди, наприклад:
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
    ]),
    tailwindcss()
  
  
  ],
}));
