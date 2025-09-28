import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://greeneye4424.runasp.net",
    //     changeOrigin: true,
    //     secure: false, // لو البروتوكول http مش https
    //   },
    // },
  },
});
