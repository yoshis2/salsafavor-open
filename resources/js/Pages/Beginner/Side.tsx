import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import RakutenWidget from "@/Components/UI/RakutenWidget";

const menuItems = [
  { href: "/beginner/dance", label: "サルサダンスの種類" },
  { href: "/beginner/bachata", label: "バチャータの種類" },
  { href: "/beginner/merengue", label: "サルサ以外のダンス" },
  { href: "/beginner/lesson", label: "サルサ レッスンの種類" },
  { href: "/beginner/place", label: "サルサダンスの必要知識" },
  { href: "/beginner/clothes", label: "サルサダンスの服装" },
  { href: "/beginner/shoes", label: "サルサダンスの靴" },
  { href: "/beginner/preparation", label: "始める前の準備" },
];

export default function Side() {
  const [open, setOpen] = useState(true);
  const { url } = usePage();
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    return window.matchMedia("(min-width: 992px)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(min-width: 992px)");
    const sync = (matches: boolean) => {
      setIsDesktop(matches);
      setOpen(matches);
    };

    sync(media.matches);

    const handler = (event: MediaQueryListEvent) => sync(event.matches);
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }

    media.addEventListener("change", handler);
    return () => {
      media.removeEventListener("change", handler);
    };
  }, []);

  const { width: rakutenWidth, height: rakutenHeight } = useMemo(
    () => (isDesktop ? { width: 300, height: 300 } : { width: 336, height: 280 }),
    [isDesktop],
  );

  // モバイルでの表示制御（PCでは常に表示）
  const menuVisible = useMemo(() => isDesktop || open, [isDesktop, open]);

  return (
    <aside className="w-full lg:order-2 lg:col-span-3 mb-8 lg:mb-0">
      {/* --- モバイル用トリガーボタン --- */}
      {!isDesktop && (
        <button
          className="w-full bg-danger text-white font-bold py-4 px-5 rounded flex justify-between items-center transition-all duration-200 mb-2 shadow-md hover:opacity-90 active:scale-[0.99]"
          type="button"
          aria-controls="beginnerMenuCollapse"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-lg">初心者ガイド</span>
          <div className="flex items-center text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
            <span className="mr-2">{open ? "閉じる" : "メニューを開く"}</span>
            <i className={`fas ${open ? "fa-chevron-up" : "fa-chevron-down"}`} aria-hidden="true"></i>
          </div>
        </button>
      )}

      {/* --- メニューコンテナ --- */}
      <div
        id="beginnerMenuCollapse"
        className={`${
          menuVisible ? "block" : "hidden"
        } bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden`}
        aria-expanded={open}
      >
        {/* PC用タイトル (高さを広げて余裕を持たせる) */}
        {isDesktop && (
          <div className="bg-danger font-bold border-b border-gray-200 py-4 px-5">
            <h2 className="text-lg font-bold text-white m-0">初心者ガイド</h2>
          </div>
        )}

        {/* メニューリスト */}
        <div className="flex flex-col">
          {menuItems.map((item) => {
            const isActive = url.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 border-b border-gray-100 last:border-0 transition-colors duration-150 ${
                  isActive
                    ? "bg-danger text-white font-bold hover:bg-red-700" // active時
                    : "text-gray-700 hover:bg-red-50 hover:text-red-600" // 通常時
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
      {/* 楽天ウィジェットエリア */}
      {isDesktop && (
        <div className="p-4 flex justify-center bg-white">
          <RakutenWidget ts="1749729972561" width={rakutenWidth} height={rakutenHeight} className="mt-3" />
        </div>
      )}
    </aside>
  );
}
