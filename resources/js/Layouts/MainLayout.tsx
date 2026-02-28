import React, { useEffect, useMemo, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Footer from "@/Components/Common/Footer";
import FlashMessage from "@/Components/Common/FlashMessage";

// --- Header 内で使用していた定数と型定義 ---
const navLinks = [
  { href: "/beginner/dance", label: "サルサ初心者", key: "beginner" },
  { href: "/events", label: "イベント情報", key: "events" },
  { href: "/lessons", label: "レッスン情報", key: "lessons" },
  { href: "/shop/rakuten/shoes", label: "ダンスシューズ", key: "shoes" },
  { href: "/shop/dvd", label: "サルサ映画", key: "dvd" },
  { href: "/inquiry", label: "お問合せ", key: "inquiry" },
];

type PageProps = {
  auth?: {
    user?: {
      name?: string;
    } | null;
  };
};

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

const DEFAULT_DESCRIPTION = "サルサダンスのイベント、レッスン、音楽、映画、用品情報ならSalsaFavor";

export default function MainLayout({ children, title, description }: Props) {
  // --- Header ロジックの統合 ---
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
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

  const isAuthenticated = Boolean(props?.auth?.user);
  const userName = props?.auth?.user?.name ?? "";

  const activeMap = useMemo(() => {
    return {
      beginner: url.startsWith("/beginner"),
      events: url.startsWith("/events"),
      lessons: url.startsWith("/lessons"),
      shoes: url.startsWith("/shop/rakuten"),
      dvd: url.startsWith("/shop/dvd"),
      inquiry: url.startsWith("/inquiry"),
    };
  }, [url]);

  // ナビゲーションリンクのクラス
  const getNavLinkClass = (isActive: boolean) =>
    `block py-2 pr-0 pl-0 lg:px-2 ${
      isActive ? "text-white font-bold" : "!text-gray-400 hover:!text-gray-200"
    } no-underline`;

  return (
    <div className="flex flex-col bg-white">
      <Head title={title ?? "SalsaFavor"}>
        <meta name="description" content={description ?? DEFAULT_DESCRIPTION} />
      </Head>

      {/* --- Header エリア開始 --- */}
      <header className="container mx-auto px-4 max-w-7xl">
        <div className="left">
          <h2>サルサ ダンスの総合ポータル</h2>
          <h1>SalsaFavor</h1>
        </div>
        <div className="right">
          <div className="hidden lg:block text-right topbtn">
            {!isAuthenticated && (
              <Link
                className="inline-block px-4 py-2.5 font-medium bg-danger text-white rounded hover:bg-[#bb2d3b] focus:ring-4 focus:ring-danger/50 transition-colors duration-150 no-underline"
                href="/registration"
              >
                イベント主催者はこちら
              </Link>
            )}
            {isAuthenticated && (
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
            )}
          </div>
        </div>
      </header>

      <nav className="bg-[#343a40] text-white w-full relative z-50">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between py-2">
          <Link className="text-xl whitespace-nowrap hover:no-underline text-white py-1 mr-4" href="/">
            ホーム
          </Link>

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

          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full lg:flex lg:w-auto lg:items-center lg:justify-between lg:grow`}
          >
            <ul className="flex flex-col lg:flex-row list-none pl-0 mb-0 lg:mr-auto gap-y-0 lg:gap-x-4">
              {navLinks.map((link) => (
                <li key={link.key} className="nav-item">
                  <Link className={getNavLinkClass(activeMap[link.key as keyof typeof activeMap])} href={link.href}>
                    {link.label}
                    {link.key === "inquiry" && activeMap.inquiry && <span className="sr-only">(現位置)</span>}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col lg:flex-row list-none pl-0 mb-0 mt-2 lg:mt-0 gap-y-2">
              {isAuthenticated && (
                <li className="lg:hidden">
                  <Link className={getNavLinkClass(false)} href="/admin/users">
                    管理画面へ
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <>
                  <li className="lg:hidden">
                    <Link className={getNavLinkClass(false)} href="/admin/events">
                      {userName} 様
                    </Link>
                  </li>
                  <li className="lg:hidden pb-2">
                    <Link className={getNavLinkClass(false)} href="/logout" method="post" as="button">
                      ログアウト
                    </Link>
                  </li>
                  <li className="hidden lg:block">
                    <Link className={getNavLinkClass(true)} href="/admin/users">
                      管理画面へ
                    </Link>
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <li className="lg:hidden pb-2">
                  <Link className={getNavLinkClass(false)} href="/registration">
                    イベント主催者はこちら
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* --- Header エリア終了 --- */}

      <FlashMessage />
      <main className="w-full lg:mx-auto lg:max-w-7xl lg:grid lg:grid-cols-12 lg:gap-6">{children}</main>
      <Footer />
    </div>
  );
}
