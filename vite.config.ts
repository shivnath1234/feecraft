
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'dikhava' with your repository name if different
  base: '/dikhava/',
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
