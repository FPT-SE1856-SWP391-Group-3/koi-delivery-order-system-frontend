import { build, defineConfig, optimizeDeps } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
    // rollupOptions: {
    //   external: ["routes/ComponentPath"], // externalize module này nếu cần
    // },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "bootstrap": path.resolve(__dirname, "node_modules/bootstrap/dist/css/bootstrap.min.css"),
      "routes/ComponentPath" : path.resolve(__dirname, "src/routes/ComponentPath"),
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
})