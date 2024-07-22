import { defineConfig } from 'vite';

export default defineConfig({
  build: {
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