import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
<<<<<<< HEAD
import path from 'path';
=======
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
=======
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
