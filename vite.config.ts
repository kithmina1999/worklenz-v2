import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(async ({ command }) => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@features': path.resolve(__dirname, './src/features'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@api': path.resolve(__dirname, './src/api'),
      },
    },
    build: {
      target: 'es2015',
      outDir: 'build',
      assetsDir: 'assets',
      cssCodeSplit: true,
      sourcemap: command === 'serve',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: command === 'build',
          drop_debugger: command === 'build',
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom', 'react-router-dom'],
            'antd': ['antd'],
            'i18n': ['i18next'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  };
});
