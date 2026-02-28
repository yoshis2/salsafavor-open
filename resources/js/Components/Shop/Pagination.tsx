// Pagination.tsx
import React from "react";

interface PaginationProps {
  current: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ current, pageCount, onPageChange, className }) => {
  const pageItems: number[] = [];

  // 前後2ページ＋αを表示
  for (let i = current - 2; i <= current + 2; i++) {
    if (i > 0 && i <= pageCount) {
      pageItems.push(i);
    }
  }
  // 先頭や末尾に近い場合の追加ページ
  if (current === 1 && current + 3 <= pageCount) pageItems.push(current + 3);
  if ((current === 1 || current === 2) && current + 4 <= pageCount) pageItems.push(current + 4);

  return (
    <div className={`pagenate-center ${className || ""}`}>
      <nav className="mx-auto text-center" aria-label="...">
        <ul className="pagination pagination-lg mx-auto text-center">
          <li className={`page-item ${current === 1 ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => current > 1 && onPageChange(current - 1)}
              disabled={current === 1}
            >
              前へ
            </button>
          </li>
          {pageItems.map((page) => (
            <li key={page} className={`page-item ${page === current ? "active" : ""}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange(page)}
                disabled={page === current}
              >
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item ${current === pageCount || pageCount === 0 ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => current < pageCount && onPageChange(current + 1)}
              disabled={current === pageCount || pageCount === 0}
            >
              次へ
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
