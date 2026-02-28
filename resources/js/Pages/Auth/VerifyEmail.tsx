import React, { useState, type SubmitEventHandler } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

const VerifyEmail: React.FC = () => {
  const { flash } = usePage().props as { flash?: { resent?: string } };
  const { post, processing } = useForm({});
  const [success, setSuccess] = useState(false);

  const handleResend: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post("/email/resend", {
      onSuccess: () => setSuccess(true),
    });
  };

  return (
    <AuthLayout title="会員登録認証メール送信完了｜サルサポータルSalsaFavor" showTitle={false} useWrapper={false}>
      <article className="w-full lg:col-span-12 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">会員登録認証メール送信完了画面</h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 m-0">メールアドレス認証確認</h3>
            </div>

            <div className="p-6 md:p-8 text-gray-700 leading-relaxed">
              {(flash?.resent || success) && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                  トークンを再作成しメールを再送信しました。
                </div>
              )}
              <p className="mb-4">
                会員登録を完了させるには送信したメールにある「会員登録認証ボタン」をクリックしてください。
              </p>

              <div className="my-8 border-t border-gray-200"></div>

              <p className="mb-4">もし、メールが届いていない場合以下のボタンをクリックしてください。</p>

              <form className="inline-block" onSubmit={handleResend}>
                <button
                  className="bg-danger hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-md transition-colors duration-200 disabled:opacity-50"
                  type="submit"
                  disabled={processing}
                >
                  メール再送信
                </button>
              </form>
            </div>
          </div>
        </div>
      </article>
    </AuthLayout>
  );
};

export default VerifyEmail;
