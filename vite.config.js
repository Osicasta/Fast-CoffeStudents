import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',          // importante para que funcione en Android (assets)
  build: {
    outDir: 'dist',
    emptyOutDir: true,
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
        resenas:    resolve(__dirname, 'resenas.html'),
      }
    }
  }
});
