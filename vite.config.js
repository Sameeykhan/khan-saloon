import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        services: resolve(import.meta.dirname, 'services.html'),
        products: resolve(import.meta.dirname, 'products.html'),
        gallery: resolve(import.meta.dirname, 'gallery.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        contact: resolve(import.meta.dirname, 'contact.html')
      }
    }
  }
});
