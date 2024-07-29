import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 1211;

console.log(`Configurando puerto:${port}`);

export default defineConfig({
  plugins: [react()],
  server:{
    port: parseInt(port),
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:1211',
        changeOrigin: true,
        secure: false,
       }
    },
    watch:{
      usePolling: true,
      interval:1000,
    },
  }
});
