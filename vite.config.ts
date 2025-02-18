import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclude lucide-react from dependency optimization
  },
  build: {
    minify: false, 
    commonjsOptions: {
      include: /node_modules/, // Ensure commonjs modules are included in the build
    },
    rollupOptions: {
      output: {
        // Manual chunking for large dependencies
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) {
              return 'recharts'; // Separate recharts into its own chunk
            }
            if (id.includes('zustand')) {
              return 'zustand'; // Separate zustand into its own chunk
            }
            // You can add more libraries to be chunked separately if needed
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit if necessary (default is 500 KB)
  },
});
