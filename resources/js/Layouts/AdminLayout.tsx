import React, { useEffect, useMemo, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Footer from "@/Components/Common/Footer";
import FlashMessage from "@/Components/Common/FlashMessage";

type PageProps = {
  auth?: {
    user?: {
      name?: string;
    } | null;
  };
};

/**
 * 管理画面レイアウト
 * - Header.tsx と同様に、layout.css に依存せず Tailwind CSS でデザインを再現
 * - Flexboxを使用してレイアウト崩れ（float落ち）を防止
 * - フォントサイズや色を直接指定してデザインを保証
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 992px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setMenuOpen(false);
      }
    };
    // 初期チェック
    handler(media);

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    } else {
      media.addEventListener("change", handler);
      return () => {
        media.removeEventListener("change", handler);
      };
    }
  }, []);

  const { url, props } = usePage<PageProps>();

  const userName = props?.auth?.user?.name ?? "";

  const activeMap = useMemo(() => {
    return {
      users: url.startsWith("/admin/users"),
      events: url.startsWith("/admin/events"),
      lessons: url.startsWith("/admin/lessons"),
      inquiry: url.startsWith("/inquiry"),
      home: url === "/" || url.startsWith("/home"),
    };
  }, [url]);

  // Header.tsx と共通のナビリンクスタイル
  const getNavLinkClass = (isActive: boolean) =>
    `block py-2 pr-0 pl-0 lg:px-2 ${
      isActive ? "text-white font-bold" : "!text-gray-400 hover:!text-gray-200"
    } no-underline`;

  return (
    <div className="flex flex-col bg-white">
      {/* ヘッダーエリア
          layout.cssの float:left/right は崩れやすいため、
          Header.tsx と同様に Flexbox (flex justify-between) で確実に左右配置します。
      */}
      <header className="container mx-auto px-4 max-w-7xl">
        <div className="left">
          <h2>サルサ ダンスの総合ポータル</h2>
          <h1>SalsaFavor</h1>
        </div>
        <div className="right">
          <div className="hidden lg:block text-right topbtn">
            <div className="inline-flex gap-2">
              <Link
                className="inline-block px-4 py-2.5 font-medium bg-danger text-white rounded hover:bg-[#bb2d3b] focus:ring-4 focus:ring-danger/50 transition-colors duration-150 no-underline"
                href="/admin/users"
              >
                {userName} 様
              </Link>
              <Link
                className="inline-block px-4 py-2.5 font-medium bg-danger text-white rounded hover:bg-[#bb2d3b] focus:ring-4 focus:ring-danger/50 transition-colors duration-150 no-underline cursor-pointer"
                href="/logout"
                method="post"
                as="button"
              >
                ログアウト
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ナビゲーションバー */}
      <nav className="bg-[#343a40] text-white w-full relative z-50">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between py-2">
          {/* ブランド名（管理画面） */}
          <Link className="text-xl whitespace-nowrap hover:no-underline text-white py-1 mr-4" href="/admin/users">
            管理画面
          </Link>

          {/* ハンバーガーボタン */}
          <button
            className="lg:hidden px-3 py-1 border border-white/10 rounded text-white/50 hover:text-white focus:outline-none"
            type="button"
            aria-label="ナビゲーションの切替"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          {/* メニュー本体 */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full lg:flex lg:w-auto lg:items-center lg:justify-between lg:grow`}
          >
            {/* メインリンク (左側) */}
            <ul className="flex flex-col lg:flex-row list-none pl-0 mb-0 lg:mr-auto gap-y-0 lg:gap-x-4">
              <li className="nav-item">
                <Link className={getNavLinkClass(activeMap.users)} href="/admin/users">
                  ユーザー管理
                </Link>
              </li>
              <li className="nav-item">
                <Link className={getNavLinkClass(activeMap.events)} href="/admin/events">
                  イベント管理一覧
                </Link>
              </li>
              <li className="nav-item">
                <Link className={getNavLinkClass(activeMap.lessons)} href="/admin/lessons">
                  レッスン管理一覧
                </Link>
              </li>
              <li className="nav-item">
                <Link className={getNavLinkClass(activeMap.inquiry)} href="/inquiry">
                  お問合せ {activeMap.inquiry && <span className="sr-only">(現位置)</span>}
                </Link>
              </li>
            </ul>

            {/* 右側リンク (ユーザー画面へ戻る、SP用メニューなど) */}
            <ul className="flex flex-col lg:flex-row list-none pl-0 mb-0 mt-2 lg:mt-0 gap-y-2">
              <li className="nav-item">
                <Link className={getNavLinkClass(activeMap.home)} href="/">
                  ユーザー画面へ
                </Link>
              </li>
              <li className="lg:hidden">
                <Link className={getNavLinkClass(false)} href="/admin/users">
                  {userName} 様
                </Link>
              </li>
              <li className="lg:hidden pb-2">
                <Link className={getNavLinkClass(false)} href="/logout" method="post" as="button">
                  ログアウト
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <FlashMessage />
      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 max-w-7xl py-6 min-h-[calc(100vh-300px)]">{children}</main>
      <Footer />
    </div>
  );
}
