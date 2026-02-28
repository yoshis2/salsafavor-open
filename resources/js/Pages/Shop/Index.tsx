import MainLayout from "@/Layouts/MainLayout";
import Sidebar from "./Sidebar";

const bannerLinks = [
  { href: "/shop/yahoo/shoes", label: "ダンスシューズ" },
  { href: "/shop/yahoo/music", label: "サルサミュージック" },
  { href: "/shop/yahoo/movie", label: "映像・レッスン動画" },
  { href: "/shop/yahoo/clothes", label: "ダンスウェア" },
];

export default function ShopIndex() {
  return (
    <MainLayout>
      {/* Grid Layout:
        PC: Left(Content 9) | Right(Sidebar 3)
        Mobile: Content -> Sidebar
      */}
      <div className="w-full lg:col-span-9 lg:order-1 mb-8 lg:mb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bannerLinks.map((item) => (
            <div
              key={item.href}
              className="border-2 border-red-600 rounded-lg p-6 text-center font-bold text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors shadow-sm"
            >
              <a href={item.href} className="block w-full h-full text-lg no-underline">
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      <aside className="w-full lg:col-span-3 lg:order-2">
        <Sidebar />
      </aside>
    </MainLayout>
  );
}
