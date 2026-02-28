import { Link } from "@inertiajs/react";

type SidebarProps = {
  activeMenu: "dashboard" | "events" | "lessons" | "users";
};

const menuItems = [
  { key: "dashboard", label: "ダッシュボード", href: "/admin" },
  { key: "events", label: "イベント管理", href: "/admin/events" },
  { key: "lessons", label: "レッスン管理", href: "/admin/lessons" },
  { key: "users", label: "ユーザー管理", href: "/admin/users" },
];

export default function Sidebar({ activeMenu }: SidebarProps) {
  return (
    <div>
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b border-gray-800">
        管理メニュー
      </div>
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`block px-6 py-3 hover:bg-gray-800 cursor-pointer transition ${
                  activeMenu === item.key ? "bg-gray-800 font-bold text-yellow-300" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
