import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // host: true listens on every address, so http://localhost:5173 and http://127.0.0.1:5173 both work.
  server: { host: true, port: 5173, open: true },
  preview: { host: true, port: 4173 },
  build: { chunkSizeWarningLimit: 1500 }
});
