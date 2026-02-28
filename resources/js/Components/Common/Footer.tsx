import { Link } from "@inertiajs/react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-4 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* 左側: コピーライト */}
          <div className="text-center sm:text-left w-full sm:w-auto">
            <span className="text-gray-500 text-sm">
              <a
                href="https://threenext.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-gray-700 transition-colors duration-200"
              >
                Copyright(C) {new Date().getFullYear()} スリーネクスト All Rights Reserved.
              </a>
            </span>
          </div>

          {/* 右側: プライバシーポリシー */}
          <div className="text-center sm:text-right w-full sm:w-auto">
            <span className="text-gray-500 text-sm">
              <Link href="/privacy" className="hover:underline hover:text-gray-700 transition-colors duration-200">
                プライバシーポリシー
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
