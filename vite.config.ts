import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// defineConfig を関数形式に変更し、mode を受け取る
export default defineConfig(({ mode }) => {
  // 開発モードかどうかを判定
  const isDev = mode === "development";

  return {
    build: {
      chunkSizeWarningLimit: 10000,
      modulePreload: false,
      sourcemap: isDev,
    },
    resolve: {
      dedupe: ["react", "react-dom"],
      alias: {
        "@": path.resolve(__dirname, "resources/js"),
        "@css": path.resolve(__dirname, "resources/css"),
      },
    },
    css: {
      // 開発時のCSSソースマップも有効化しておくと便利です
      devSourcemap: isDev,
      preprocessorOptions: {
        scss: {
          quietDeps: true,
        },
      },
    },
    plugins: [
      laravel({
        input: ["resources/js/app.tsx", "resources/css/app.css"],
        refresh: true,
      }),
      react(),
      tailwindcss(),
    ],
    server: {
      host: "0.0.0.0",
      hmr: {
        host: "localhost",
      },
      // 開発サーバーでのJSソースマップを有効化
      sourcemapIgnoreList: (sourcePath) => sourcePath.includes("node_modules"),
      watch: {
        ignored: ["**/.vscode/**"],
      },
    },
  };
});
