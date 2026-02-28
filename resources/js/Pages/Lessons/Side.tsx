import { useEffect, useState } from "react";
import type { Genre } from "@/types/Master";
import RakutenWidget from "@/Components/UI/RakutenWidget";
import { WEEK_LABELS } from "@/constants/lesson";

type SideProps = {
  genres: Genre[];
  prefectures: Record<string, string>;
  /** 検索条件の初期値（Index で使用） */
  param?: Record<string, string | number | null>;
  /** 楽天ウィジェットを表示するか（Index で使用） */
  showRakutenWidget?: boolean;
};

export default function Side({ genres, prefectures, param, showRakutenWidget = false }: SideProps) {
  // デスクトップ判定
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 992px)").matches;
  });

  // 検索エリアの開閉状態（デスクトップは常時開く、モバイルは初期状態で閉じる）
  const [isSearchOpen, setIsSearchOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 992px)").matches;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 画面サイズ監視
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 992px)");

    const sync = (matches: boolean) => {
      setIsDesktop(matches);
      if (matches) setIsSearchOpen(true);
    };

    sync(media.matches);
    const handler = (event: MediaQueryListEvent) => sync(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const shouldShowSearch = isDesktop || isSearchOpen;

  return (
    <aside className="w-full mb-8 lg:mb-0 lg:col-span-3 lg:order-2 px-2 sm:px-4 md:px-6">
      {!isDesktop && (
        <button
          className="w-full bg-danger hover:bg-red-700 text-white font-bold py-4 px-5 rounded flex justify-between items-center transition-all duration-200 mb-2 shadow-md hover:opacity-90 active:scale-[0.99]"
          type="button"
          onClick={() => setIsSearchOpen((v) => !v)}
        >
          <span className="text-lg">検索条件</span>
          <div className="flex items-center text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
            <span className="mr-2">{isSearchOpen ? "閉じる" : "検索を開く"}</span>
            <i className={`fas ${isSearchOpen ? "fa-chevron-up" : "fa-chevron-down"}`} aria-hidden="true"></i>
          </div>
        </button>
      )}

      <div
        className={`${shouldShowSearch ? "block" : "hidden"} bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden`}
      >
        {isDesktop && (
          <div className="bg-gray-50 border-b border-gray-200 py-4 px-5">
            <h2 className="text-lg font-bold text-gray-800 m-0">検索条件</h2>
          </div>
        )}
        <div className="p-5">
          <form action="/lessons" method="get" onSubmit={() => setIsSubmitting(true)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="prefecture_id" className="block text-gray-700 font-bold mb-2">
                  都道府県指定
                </label>
                <select
                  id="prefecture_id"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3"
                  name="prefecture_id"
                  defaultValue={param?.prefecture_id ?? ""}
                >
                  {Object.entries(prefectures || {}).map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="genre_id" className="block text-gray-700 font-bold mb-2">
                  ジャンル
                </label>
                <select
                  id="genre_id"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3"
                  name="genre_id"
                  defaultValue={param?.genre_id ?? ""}
                >
                  <option value="">指定なし</option>
                  {genres?.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="week" className="block text-gray-700 font-bold mb-2">
                  レッスン開催曜日
                </label>
                <select
                  id="week"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3"
                  name="week"
                  defaultValue={param?.week ?? ""}
                >
                  <option value="">全ての曜日</option>
                  {Object.entries(WEEK_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-2 text-center">
                <button
                  className="w-full bg-danger hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors duration-200 shadow-md disabled:opacity-50"
                  type="submit"
                  disabled={isSubmitting}
                >
                  検索
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showRakutenWidget && isDesktop && <RakutenWidget ts="1598407687571" className="mt-6" />}
    </aside>
  );
}
