import React from "react";
import MainLayout from "@/Layouts/MainLayout";

export default function VerifySuccess() {
  return (
    <MainLayout>
      <article className="w-full lg:col-span-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-6 text-green-700">メール認証が完了しました</h1>
          <p className="mb-8 text-gray-700 text-center">
            ご登録メールアドレスの認証が正常に完了しました。
            <br />
            ログイン画面からサービスをご利用ください。
          </p>
          <div className="text-center">
            <a
              href="/admin/users"
              className="inline-block bg-danger hover:bg-red-700 text-white font-bold py-3 px-6 rounded shadow-lg transition-colors duration-200"
            >
              ユーザー情報画面へ
            </a>
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
