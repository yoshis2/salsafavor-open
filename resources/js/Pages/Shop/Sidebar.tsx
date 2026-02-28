import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

const menuItems = [
  { href: "/shop/rakuten/shoes", label: "サルサシューズ" },
  { href: "/shop/dvd", label: "サルサ映画" },
  { href: "/shop/rakuten/movie", label: "サルサ動画" },
  { href: "/shop/rakuten/music", label: "サルサ音楽" },
  { href: "/shop/rakuten/clothes", label: "サルサウェア" },
];

export default function Sidebar() {
  const { url } = usePage();
  const [isOpen, setIsOpen] = useState(false); // 初期状態は閉じる
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 992px)");

    const sync = (matches: boolean) => {
      setIsDesktop(matches);
      // PCなら常に開く、スマホなら初期は閉じる（または維持）
      if (matches) setIsOpen(true);
    };

    sync(media.matches);
    const handler = (event: MediaQueryListEvent) => sync(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* モバイル用トリガー / PC用ヘッダー */}
      <div className="bg-danger p-0">
        {isDesktop ? (
          <h2 className="text-lg font-bold text-white py-4 px-5 m-0">ショップ商品別</h2>
        ) : (
          <button
            type="button"
            className="w-full flex justify-between items-center text-white font-bold py-4 px-5 hover:bg-red-700 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span className="text-lg">ショップ商品別</span>
            <div className="flex items-center text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
              <span className="mr-2">{isOpen ? "閉じる" : "メニューを開く"}</span>
              <i className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`} aria-hidden="true"></i>
            </div>
          </button>
        )}
      </div>

      {/* メニューリスト */}
      <div className={`${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col">
          {menuItems.map((item) => {
            const isActive = url.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-5 py-3 border-b border-gray-100 last:border-0 transition-colors duration-150 ${
                  isActive
                    ? "bg-red-50 text-red-600 font-bold border-l-4 border-l-red-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
