import { useEffect, useMemo, useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import MainLayout from "../../Layouts/MainLayout";
import Sidebar from "./Sidebar";
import { Product } from "@/types/Shop";

type PageProps = {
  items: Product[];
  total: number;
  page: number;
  pageCount: number;
  searchParams: Record<string, string | number | null | undefined>;
  colors: Record<string, string>;
  displayOrders: Record<string, string>;
};

// ... CONSTANTS & META FUNCTION (omitted for brevity, keep same logic) ...
const MUSIC_GENRES: Record<string, string> = {
  salsa: "サルサ",
  mambo: "マンボ",
  bachata: "バチャータ",
  merengue: "メレンゲ",
  kizomba: "キゾンバ",
  latin: "ラテン",
};
const MOVIE_GENRES: Record<string, string> = {
  "サルサ 映画": "サルサ 洋画",
  サルサレッスン: "サルサ レッスン",
  バチャータレッスン: "バチャータ レッスン",
  "その他ダンス レッスン": "ラテン レッスン",
};
type PageMeta = {
  title: string;
  description: string;
  heading: string;
  isRakuten: boolean;
  isMusic: boolean;
  isMovie: boolean;
};
const DEFAULT_META: PageMeta = {
  title: "SalsaFavor",
  description: "サルサダンスのイベント、レッスン、音楽、映画、用品情報ならSalsaFavor",
  heading: "商品一覧",
  isRakuten: false,
  isMusic: false,
  isMovie: false,
};

function getPageMeta(path: string, page: number): PageMeta {
  if (path.includes("/shop/rakuten/shoes"))
    return {
      title: `サルサ・ラテン・ダンスシューズ商品情報-${page}ページ`,
      description: `サルサの総合ポータルSalsaFavorはサルサやタンゴ、バチャータ、キゾンバ等のラテンダンスシューズの情報を提供しています。-${page}ページ`,
      heading: "サルサ ラテン ダンスシューズ 商品一覧",
      isRakuten: true,
      isMusic: false,
      isMovie: false,
    };
  if (path.includes("/shop/rakuten/music"))
    return {
      title: `ラテン音楽商品情報一覧-${page}ページ`,
      description: `サルサの総合ポータルSalsaFavorはサルサの音楽やラテンの音楽情報を提供しています。-${page}ページ`,
      heading: "サルサ ラテン音楽 商品一覧",
      isRakuten: true,
      isMusic: true,
      isMovie: false,
    };
  if (path.includes("/shop/rakuten/movie"))
    return {
      title: `サルサ映画・レッスンＤＶＤ商品情報一覧-${page}ページ`,
      description: `サルサの総合ポータルSalsaFavorはサルサの映画やレッスン情報等の動画販売情報を提供しています。-${page}ページ`,
      heading: "サルサ 映画・レッスンＤＶＤ 商品一覧",
      isRakuten: true,
      isMusic: false,
      isMovie: true,
    };
  if (path.includes("/shop/rakuten/clothes"))
    return {
      title: `サルサ・ラテン系ダンスウェア商品情報一覧-${page}ページ`,
      description: `サルサの総合ポータルSalsaFavorはサルサや社交ダンス、タンゴで利用可能なダンスウェア・ダンス衣装の情報を一覧で表示しています。-${page}ページ`,
      heading: "ラテン ダンス衣装 商品一覧",
      isRakuten: true,
      isMusic: false,
      isMovie: false,
    };
  // Yahoo Fallbacks
  if (path.includes("/shop/yahoo/shoes")) return { ...DEFAULT_META, heading: "サルサ ラテン ダンスシューズ 商品検索" };
  if (path.includes("/shop/yahoo/music"))
    return { ...DEFAULT_META, heading: "サルサ ラテン音楽 商品検索", isMusic: true };
  if (path.includes("/shop/yahoo/movie"))
    return { ...DEFAULT_META, heading: "サルサ 映画・レッスンＤＶＤ 商品検索", isMovie: true };
  if (path.includes("/shop/yahoo/clothes")) return { ...DEFAULT_META, heading: "ラテン ダンス衣装 商品検索" };
  return DEFAULT_META;
}

function buildQuery(params: Record<string, string | number | null | undefined>) {
  const entries = Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== "");
  if (entries.length === 0) return "";
  const searchParams = new URLSearchParams();
  entries.forEach(([key, value]) => searchParams.set(key, String(value)));
  return searchParams.toString();
}

export default function ProductList() {
  const { props, url } = usePage<PageProps>();
  const path = url.split("?")[0];
  const { items, total, page, pageCount, searchParams, colors, displayOrders } = props;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 767.98px)");
    const sync = (matches: boolean) => {
      setIsMobile(matches);
      setIsSearchOpen(!matches);
    };
    sync(media.matches);
    const handler = (event: MediaQueryListEvent) => sync(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const shouldShowSearch = !isMobile || isSearchOpen;
  const meta = useMemo(() => getPageMeta(path, page), [path, page]);

  const keyword = String(searchParams?.keyword ?? "");
  const gender = String(searchParams?.gender ?? "");
  const color = String(searchParams?.color ?? "");
  const musicGenre = String(searchParams?.musicGenre ?? "");
  const minPrice = String(searchParams?.minPrice ?? "");
  const maxPrice = String(searchParams?.maxPrice ?? "");
  let sort = searchParams?.sort;
  if (typeof sort === "function") sort = "";
  sort = String(sort ?? "");

  // ページリンク生成関数
  const safePageCount = Math.max(1, Number(pageCount) || 1);
  const pageLink = (targetPage: number) => {
    const safeTargetPage = Math.min(Math.max(1, targetPage), safePageCount);
    const query = buildQuery({ keyword, gender, color, musicGenre, minPrice, maxPrice, sort, page: safeTargetPage });
    return query ? `${path}?${query}` : path;
  };

  const prevDisabled = page <= 1;
  const nextDisabled = page >= safePageCount || safePageCount === 0;

  return (
    <MainLayout title={meta.title} description={meta.description}>
      {/* モバイル時はサイドバーと検索フォームを上部に表示 */}
      {isMobile && (
        <div className="mb-6">
          {/* 検索フォーム */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden my-8">
            <div className="bg-danger p-0">
              <button
                type="button"
                className="w-full flex justify-between items-center text-white font-bold py-4 px-5 hover:bg-red-700 transition-colors"
                onClick={() => setIsSearchOpen((v) => !v)}
                aria-expanded={isSearchOpen}
              >
                <span className="text-lg">検索条件</span>
                <div className="flex items-center text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
                  <span className="mr-2">{isSearchOpen ? "閉じる" : "検索を開く"}</span>
                  <i className={`fas ${isSearchOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                </div>
              </button>
            </div>
            <div className={`p-5 ${isSearchOpen ? "block" : "hidden"}`}>
              {/* 検索フォーム本体（元のform内容をここに移動） */}
              <form action={path} method="get" className="space-y-4">
                <div>
                  <label htmlFor="keyword" className="block text-gray-700 font-bold mb-2">
                    キーワード
                  </label>
                  <input
                    id="keyword"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-3"
                    name="keyword"
                    type="text"
                    defaultValue={keyword}
                  />
                </div>

                {meta.isRakuten && (
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">性別</label>
                    <div className="flex rounded-md shadow-sm">
                      <label className="flex-1 cursor-pointer relative">
                        <input
                          name="gender"
                          type="radio"
                          value="レディース"
                          defaultChecked={gender === "レディース"}
                          className="peer sr-only"
                        />
                        <span className="block text-center py-2 px-1 border border-gray-300 rounded-l-md text-sm bg-white text-gray-700 hover:bg-gray-200 peer-checked:bg-danger peer-checked:text-white peer-checked:border-red-600 peer-checked:hover:bg-white peer-checked:hover:text-red-600 transition-colors relative z-10 peer-checked:z-20">
                          女性
                        </span>
                      </label>
                      <label className="flex-1 cursor-pointer relative -ml-px">
                        <input
                          name="gender"
                          type="radio"
                          value="メンズ"
                          defaultChecked={gender === "メンズ"}
                          className="peer sr-only"
                        />
                        <span className="block text-center py-2 px-1 border border-gray-300 text-sm bg-white text-gray-700 hover:bg-gray-200 peer-checked:bg-danger peer-checked:text-white peer-checked:border-red-600 peer-checked:hover:bg-white peer-checked:hover:text-red-600 transition-colors relative z-10 peer-checked:z-20">
                          男性
                        </span>
                      </label>
                      <label className="flex-1 cursor-pointer relative -ml-px">
                        <input
                          name="gender"
                          type="radio"
                          value=""
                          defaultChecked={gender === ""}
                          className="peer sr-only"
                        />
                        <span className="block text-center py-2 px-1 border border-gray-300 rounded-r-md text-sm bg-white text-gray-700 hover:bg-gray-200 peer-checked:bg-danger peer-checked:text-white peer-checked:border-red-600 peer-checked:hover:bg-white peer-checked:hover:text-red-600 transition-colors relative z-10 peer-checked:z-20">
                          指定無
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {meta.isRakuten && (
                  <div>
                    <label htmlFor="color" className="block text-gray-700 font-bold mb-2">
                      カラー
                    </label>
                    <select
                      id="color"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-3"
                      name="color"
                      defaultValue={color}
                    >
                      <option value="">指定なし</option>
                      {Object.entries(colors ?? {}).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {(meta.isMusic || meta.isMovie) && meta.isRakuten && (
                  <div>
                    <label htmlFor="musicGenre" className="block text-gray-700 font-bold mb-2">
                      ジャンル
                    </label>
                    <select
                      id="musicGenre"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-3"
                      name="musicGenre"
                      defaultValue={musicGenre}
                    >
                      <option value="">指定なし</option>
                      {Object.entries(meta.isMovie ? MOVIE_GENRES : MUSIC_GENRES).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {meta.isRakuten && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="minPrice" className="block text-gray-700 font-bold mb-2 text-xs">
                          最低金額
                        </label>
                        <input
                          className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-2 text-sm"
                          id="minPrice"
                          name="minPrice"
                          type="number"
                          placeholder="円"
                          defaultValue={minPrice}
                        />
                      </div>
                      <div>
                        <label htmlFor="maxPrice" className="block text-gray-700 font-bold mb-2 text-xs">
                          最高金額
                        </label>
                        <input
                          className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-2 text-sm"
                          id="maxPrice"
                          name="maxPrice"
                          type="number"
                          placeholder="円"
                          defaultValue={maxPrice}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="sort" className="block text-gray-700 font-bold mb-2">
                        表示順
                      </label>
                      <select
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-3"
                        id="sort"
                        name="sort"
                        defaultValue={sort}
                      >
                        <option value="">指定なし</option>
                        {Object.entries(displayOrders ?? {}).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div className="pt-2">
                  <button
                    className="w-full bg-danger hover:bg-red-700 text-white font-bold py-3 px-4 rounded shadow-md transition-colors"
                    type="submit"
                  >
                    検索
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* ショップ商品別サイドバー */}
          <Sidebar />
        </div>
      )}
      <article className="w-full lg:col-span-9 lg:order-1 mb-8 lg:mb-0 px-2 sm:px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-6">{meta.heading}</h1>
        <h5 className="text-lg font-bold mb-6 text-gray-700">商品数：　{total}　個</h5>
        {/* xl:grid-cols-4 を削除し、md:grid-cols-3 を最大列数としています */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {items?.map((item, index) => {
            const linkUrl = item.links?.[0]?.url ?? "";
            return (
              <div
                key={`${item.title}-${index}`}
                className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 h-full"
              >
                <div className="mb-4 flex items-center justify-center h-48 bg-gray-50 rounded p-2">
                  {linkUrl ? (
                    <a
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-full w-full items-center justify-center"
                    >
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </a>
                  ) : item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="grow flex flex-col justify-between">
                  <div className="text-sm text-gray-800 line-clamp-3 mb-2 h-[4.5em] leading-snug">{item.title}</div>
                  <div className="text-xl font-bold text-red-600 text-right">{item.price}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ページネーション */}
        {pageCount > 0 && (
          <nav className="flex flex-col items-center justify-center space-y-4 mb-8">
            <ul className="flex flex-wrap justify-center gap-1 list-none p-0">
              {/* 前へ */}
              <li>
                {prevDisabled ? (
                  <span className="flex items-center justify-center px-4 py-2 border rounded-md transition-colors bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200">
                    前へ
                  </span>
                ) : (
                  <Link
                    className="flex items-center justify-center px-4 py-2 border rounded-md transition-colors bg-white text-red-600 border-gray-300 hover:bg-red-50"
                    href={pageLink(Number(page) - 1)}
                    preserveScroll
                  >
                    前へ
                  </Link>
                )}
              </li>

              {/* ページ番号と省略記号 */}
              {[...Array(pageCount)].map((_, i) => {
                const p = i + 1;
                const currentPage = Number(page); // 確実に数値として扱う

                // 最終ページは非表示
                if (p === pageCount) return null;

                // 表示する条件: 最初(1)、または現在のページの前後2ページ以内
                if (p === 1 || (p >= currentPage - 2 && p <= currentPage + 2)) {
                  return (
                    <li key={p}>
                      <Link
                        className={`flex items-center justify-center px-4 py-2 border rounded-md transition-colors ${
                          p === currentPage
                            ? "bg-red-600 text-white border-red-600 font-bold"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                        href={pageLink(Number(p))}
                        // preserveScroll を削除
                      >
                        {p}
                      </Link>
                    </li>
                  );
                }
                // 省略記号(...)を表示する条件: 現在のページの3つ前、または3つ後のみ
                else if (p === currentPage - 3 || p === currentPage + 3) {
                  return (
                    <li key={p} className="flex items-center justify-center px-2 py-2 text-gray-400">
                      ...
                    </li>
                  );
                }
                return null;
              })}

              {/* 次へ */}
              <li>
                {nextDisabled ? (
                  <span className="flex items-center justify-center px-4 py-2 border rounded-md transition-colors bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200">
                    次へ
                  </span>
                ) : (
                  <Link
                    className="flex items-center justify-center px-4 py-2 border rounded-md transition-colors bg-white text-red-600 border-gray-300 hover:bg-red-50"
                    href={pageLink(Number(page) + 1)}
                    preserveScroll
                  >
                    次へ
                  </Link>
                )}
              </li>
            </ul>
            <div className="text-gray-500 font-medium">
              {page} / {pageCount}
            </div>
          </nav>
        )}
      </article>

      {/* PC時はasideでサイドバーと検索フォームを右側に表示 */}
      {!isMobile && (
        <aside className="w-full lg:col-span-3 lg:order-2 flex flex-col gap-6">
          {/* 検索フォーム */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-12">
            <div className="bg-danger p-0">
              <h2 className="text-lg font-bold text-white py-4 px-5 m-0">検索条件</h2>
            </div>
            <div className="p-5 block">
              <form action={path} method="get" className="space-y-4">
                <div>
                  <label htmlFor="keyword" className="block text-gray-700 font-bold mb-2">
                    キーワード
                  </label>
                  <input
                    id="keyword"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-3"
                    name="keyword"
                    type="text"
                    defaultValue={keyword}
                  />
                </div>

                {meta.isRakuten && (
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">性別</label>
                    <div className="flex rounded-md shadow-sm">
                      <label className="flex-1 cursor-pointer relative">
                        <input
                          name="gender"
                          type="radio"
                          value="レディース"
                          defaultChecked={gender === "レディース"}
                          className="peer sr-only"
                        />
                        <span className="block text-center py-2 px-1 border border-gray-300 rounded-l-md text-sm bg-white text-gray-700 hover:bg-gray-200 peer-checked:bg-danger peer-checked:text-white peer-checked:border-red-600 peer-checked:hover:bg-white peer-checked:hover:text-red-600 transition-colors relative z-10 peer-checked:z-20">
                          女性
                        </span>
                      </label>
                      <label className="flex-1 cursor-pointer relative -ml-px">
                        <input
                          name="gender"
                          type="radio"
                          value="メンズ"
                          defaultChecked={gender === "メンズ"}
                          className="peer sr-only"
                        />
                        <span className="block text-center py-2 px-1 border border-gray-300 text-sm bg-white text-gray-700 hover:bg-gray-200 peer-checked:bg-danger peer-checked:text-white peer-checked:border-red-600 peer-checked:hover:bg-white peer-checked:hover:text-red-600 transition-colors relative z-10 peer-checked:z-20">
                          男性
                        </span>
                      </label>
                      <label className="flex-1 cursor-pointer relative -ml-px">
                        <input
                          name="gender"
                          type="radio"
                          value=""
                          defaultChecked={gender === ""}
                          className="peer sr-only"
                        />
                        <span className="block text-center py-2 px-1 border border-gray-300 rounded-r-md text-sm bg-white text-gray-700 hover:bg-gray-200 peer-checked:bg-danger peer-checked:text-white peer-checked:border-red-600 peer-checked:hover:bg-white peer-checked:hover:text-red-600 transition-colors relative z-10 peer-checked:z-20">
                          指定無
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {meta.isRakuten && (
                  <div>
                    <label htmlFor="color" className="block text-gray-700 font-bold mb-2">
                      カラー
                    </label>
                    <select
                      id="color"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-3"
                      name="color"
                      defaultValue={color}
                    >
                      <option value="">指定なし</option>
                      {Object.entries(colors ?? {}).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {(meta.isMusic || meta.isMovie) && meta.isRakuten && (
                  <div>
                    <label htmlFor="musicGenre" className="block text-gray-700 font-bold mb-2">
                      ジャンル
                    </label>
                    <select
                      id="musicGenre"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-3"
                      name="musicGenre"
                      defaultValue={musicGenre}
                    >
                      <option value="">指定なし</option>
                      {Object.entries(meta.isMovie ? MOVIE_GENRES : MUSIC_GENRES).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {meta.isRakuten && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="minPrice" className="block text-gray-700 font-bold mb-2 text-xs">
                          最低金額
                        </label>
                        <input
                          className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-2 text-sm"
                          id="minPrice"
                          name="minPrice"
                          type="number"
                          placeholder="円"
                          defaultValue={minPrice}
                        />
                      </div>
                      <div>
                        <label htmlFor="maxPrice" className="block text-gray-700 font-bold mb-2 text-xs">
                          最高金額
                        </label>
                        <input
                          className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-2 text-sm"
                          id="maxPrice"
                          name="maxPrice"
                          type="number"
                          placeholder="円"
                          defaultValue={maxPrice}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="sort" className="block text-gray-700 font-bold mb-2">
                        表示順
                      </label>
                      <select
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 py-2 px-3"
                        id="sort"
                        name="sort"
                        defaultValue={sort}
                      >
                        <option value="">指定なし</option>
                        {Object.entries(displayOrders ?? {}).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div className="pt-2">
                  <button
                    className="w-full bg-danger hover:bg-red-700 text-white font-bold py-3 px-4 rounded shadow-md transition-colors"
                    type="submit"
                  >
                    検索
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Sidebar />
        </aside>
      )}
    </MainLayout>
  );
}
