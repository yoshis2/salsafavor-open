import { useState, useEffect } from "react";
import Modal from "@/Components/UI/Modal";
import { Link, router } from "@inertiajs/react";

type SideProps = {
  activeMenu: string;
  userProfile?: boolean;
  published: boolean;
  userId: number;
};

export default function Side({ activeMenu, userProfile, published, userId }: SideProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // デスクトップ判定
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 992px)").matches;
  });

  // メニューエリアの開閉状態（モバイル用）
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 992px)").matches;
  });

  // 画面サイズ変更時のハンドラ
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 992px)");

    const sync = (matches: boolean) => {
      setIsDesktop(matches);
      if (matches) setIsMenuOpen(true);
    };

    sync(media.matches);
    const handler = (event: MediaQueryListEvent) => sync(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const handleTogglePublished = () => {
    router.patch(
      `/admin/users/${userId}`,
      { published: !published },
      {
        onFinish: () => setModalOpen(false),
      },
    );
  };

  const getLinkClass = (name: string) => {
    const baseClass =
      "block px-5 py-3 border-b border-gray-100 hover:bg-red-50 hover:text-red-700 transition-colors w-full text-left";
    return activeMenu === name ? `${baseClass} bg-red-50 text-red-700 font-bold` : `${baseClass} text-gray-700`;
  };

  const shouldShowMenu = isDesktop || isMenuOpen;

  return (
    <aside className="w-full mb-8 lg:mb-0 lg:w-1/4 px-2 sm:px-4 md:px-6 -order-1 lg:order-0">
      {/* モバイル用トリガーボタン */}
      {!isDesktop && (
        <button
          className="w-full bg-danger hover:bg-red-700 text-white font-bold py-4 px-5 rounded flex justify-between items-center transition-all duration-200 mb-2 shadow-md hover:opacity-90 active:scale-[0.99]"
          type="button"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <span className="text-lg">メニュー</span>
          <div className="flex items-center text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
            <span className="mr-2">{isMenuOpen ? "閉じる" : "メニューを開く"}</span>
            <i className={`fas ${isMenuOpen ? "fa-chevron-up" : "fa-chevron-down"}`} aria-hidden="true"></i>
          </div>
        </button>
      )}

      {/* メニューコンテナ */}
      <div
        className={`${shouldShowMenu ? "block" : "hidden"} bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden`}
      >
        {/* タイトル */}
        {isDesktop && (
          <div className="bg-gray-50 border-b border-gray-200 py-4 px-5">
            <h2 className="text-lg font-bold text-gray-800 m-0">メニュー</h2>
          </div>
        )}

        <nav className="flex flex-col">
          <Link className={getLinkClass("show")} href="/admin/users">
            ユーザー情報照会
          </Link>
          {userProfile && (
            <Link className={getLinkClass("edit")} href="/admin/users/edit">
              ユーザー情報変更
            </Link>
          )}
          {!userProfile && (
            <Link className={getLinkClass("profile")} href="/admin/user_profiles">
              ユーザーその他情報追加
            </Link>
          )}
          <Link className={getLinkClass("password")} href="/admin/users/password">
            パスワード変更
          </Link>
          <button type="button" className={getLinkClass("")} onClick={() => setModalOpen(true)}>
            一覧表示設定
          </button>
          <Link className={getLinkClass("withdraw")} href="/admin/users/withdraw">
            会員退会
          </Link>
        </nav>
      </div>

      <Modal
        open={modalOpen}
        title="公開・非公開の設定"
        okText="表示切替"
        cancelText="キャンセル"
        onOk={handleTogglePublished}
        onCancel={() => setModalOpen(false)}
      >
        <div className="p-4">
          <p>表示、非表示の設定変更します。よろしいですか？</p>
          <p className="mt-2 font-semibold text-center py-2 bg-gray-50 rounded">
            {published ? "表示　＝＞　非表示" : "非表示　＝＞　表示"}
          </p>
        </div>
      </Modal>
    </aside>
  );
}
