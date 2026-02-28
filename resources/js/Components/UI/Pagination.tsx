// ページネーションコンポーネント
import React from "react";

type PaginationProps = {
  paginator: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
  };
  onPageChange?: (url: string) => void;
};

const Pagination: React.FC<PaginationProps> = ({ paginator, onPageChange }) => {
  if (!paginator || paginator.last_page <= 1) return null;

  return (
    <nav className="flex justify-center mt-6" aria-label="ページネーション">
      <ul className="inline-flex items-center space-x-1">
        {paginator.links.map((link, idx) => {
          // labelが数字以外の場合（例: "前へ", "次へ", "..."）は適宜変換
          const isDisabled = !link.url;
          const isActive = link.active;
          return (
            <li key={idx}>
              <button
                type="button"
                className={`px-3 py-1 rounded ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : isDisabled
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                }`}
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled && onPageChange && link.url) {
                    onPageChange(link.url);
                  }
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label.replace(/&laquo;|&raquo;/g, "")}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
