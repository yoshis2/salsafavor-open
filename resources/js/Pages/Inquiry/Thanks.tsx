import { Head, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function InquiryThanks() {
  const { flash } = usePage().props as { flash?: Record<string, string> };

  return (
    <MainLayout>
      <Head title="お問合せありがとうございます。３営業日以内に返信します。">
        <meta
          name="description"
          content="お問合せいただきありがとうございました。問い合わせ手続きは完了しました。３営業日以内に返信しますので今しばらくおまちください。"
        />
      </Head>
      <article className="w-full lg:col-span-12">
        {/* フラッシュメッセージ */}
        <div className="space-y-4 mb-6">
          {flash?.message && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
              <p>{flash.message}</p>
            </div>
          )}
          {flash?.status && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
              {flash.status}
            </div>
          )}
          {flash?.success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">{flash.success}</div>
          )}
          {flash?.warning && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">{flash.warning}</div>
          )}
          {flash?.error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">{flash.error}</div>}
        </div>

        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-red-600 pb-2 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-danger">
          お問合せ完了しました
        </h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center md:text-left">
          <p className="text-lg font-bold text-gray-800 mb-4">お問合せいただきありがとうございました。</p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            サルサの総合ポータルサイトSalsaFavorへの問合せ手続きは完了しました。
            <br className="hidden md:inline" />
            ご登録のメールアドレスに問い合わせ内容をお送りしていますのでご確認ください。
          </p>
          <p className="text-gray-700">また、３営業日以内に返信させていただきますので今しばらくお待ちください。</p>
        </div>
      </article>
    </MainLayout>
  );
}
