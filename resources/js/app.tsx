import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

// ページモジュールの型定義
interface PageModule {
  default: React.ComponentType;
}

// import.meta.glob で取得したモジュールが PageModule かどうかを判定する型ガード
function isPageModule(module: unknown): module is PageModule {
  const m = module as { default?: unknown };
  return typeof m?.default === "function";
}

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.tsx", {
      eager: true,
    }) as Record<string, unknown>;

    const pageModule = pages[`./Pages/${name}.tsx`];
    if (!pageModule) {
      throw new Error(`Page not found: ${name}`);
    }

    if (!isPageModule(pageModule)) {
      // default エクスポートが存在しない、またはコンポーネントでない場合は明示的にエラー
      throw new Error(`Invalid page module: ${name}`);
    }

    return pageModule.default;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
