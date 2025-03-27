import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5000,
      allowedHosts: ['.replit.dev'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        }
      }
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.(js|jsx)$/,
      exclude: []
    }
  };

  // Different configurations for dev and build commands
  if (command === 'build') {
    return {
      ...baseConfig,
      // Use base path for production build only
      base: '/dynamic-pricing-optimizer/',
      build: {
        // Generate source maps for easier debugging
        sourcemap: true,
        // Ensure all CSS gets extracted to separate files
        cssCodeSplit: true,
        // Make sure assets are properly referenced
        assetsDir: 'assets',
        // Clean the output directory before build
        emptyOutDir: true,
        // More detailed build output
        reportCompressedSize: true,
        // Make sure chunks are reasonably sized
        chunkSizeWarningLimit: 1000,
      }
    };
  }
  
  return baseConfig;
});
