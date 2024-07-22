import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: 'public/index.html',
        threejs: 'public/threejs.html'
        
      }
    },
    optimizeDeps: {
      include: ['three']
    }
  }
});