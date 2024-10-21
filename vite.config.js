import { build, defineConfig, optimizeDeps } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@componentPath": path.resolve(__dirname, "src/routes/ComponentPath.jsx"),
      "@components": path.resolve(__dirname, "src/components"),
      "@admin": path.resolve(__dirname, "src/components/admin"),
      "@user": path.resolve(__dirname, "src/components/user"),
      "@api": path.resolve(__dirname, "src/api/CallAPI"),
      "@": path.resolve(__dirname, "src"), // Alias cho đường dẫn gốc (src)
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
  build: {
    target: "esnext",
  },
});