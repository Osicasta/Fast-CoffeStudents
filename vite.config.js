import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        menu: resolve(__dirname, 'menu.html'),
        menuStart: resolve(__dirname, 'menuStart.html'),
        pedido: resolve(__dirname, 'pedido.html'),
        register: resolve(__dirname, 'register.html'),
        resetpassword: resolve(__dirname, 'resetpassword.html'),
        carrito: resolve(__dirname, 'carrito.html'),
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
