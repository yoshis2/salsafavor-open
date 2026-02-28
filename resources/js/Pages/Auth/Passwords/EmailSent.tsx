// パスワードリセットメール送信完了画面（Inertia/React版）
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { usePage } from "@inertiajs/react";

const EmailSent: React.FC = () => {
  const { flash } = usePage().props as { flash?: { status?: string } };

  return (
    <AuthLayout title="パスワードリセットメール送信完了｜サルサポータルSalsaFavor" showTitle={false} useWrapper={false}>
      <article className="w-full lg:col-span-12 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 m-0">パスワードリセットメール送信完了</h2>
            </div>
            <div className="p-6 md:p-8 text-gray-700 leading-relaxed">
              {flash?.status && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                  {flash.status}
                </div>
              )}
              <p className="mb-4">
                ご入力いただいたメールアドレス宛にパスワードリセット用のリンクを送信しました。
                <br />
                メールが届かない場合は迷惑メールフォルダもご確認ください。
              </p>
              <p className="mb-4">メール内のリンクをクリックしてパスワードの再設定を行ってください。</p>
              <div className="mt-8 text-center">
                <a
                  href="/login"
                  className="bg-danger hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-md transition-colors duration-200 inline-block"
                >
                  ログイン画面へ戻る
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </AuthLayout>
  );
};

export default EmailSent;
