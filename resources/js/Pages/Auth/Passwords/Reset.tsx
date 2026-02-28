// パスワードリセット実行ページ（Inertia/React版）
import React, { useState, type SubmitEventHandler } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import TurnstileComponent from "@/Components/Auth/Turnstile";

const ResetPassword: React.FC = () => {
  // クエリパラメータから token と email を取得
  const { token, email } = usePage().props as unknown as { token: string; email: string };

  const { data, setData, post, processing, errors } = useForm({
    token: token || "",
    email: email || "",
    password: "",
    password_confirmation: "",
    turnstile_token: "",
  });

  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleTurnstileVerify = (token: string) => {
    setData("turnstile_token", token);
    setTurnstileError(null);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!data.turnstile_token) {
      setTurnstileError("認証チェックを完了してください。");
      return;
    }
    post("/password/reset", {
      onError: () => {
        setData("password", "");
        setData("turnstile_token", "");
      },
    });
  };

  return (
    <AuthLayout title="パスワードリセット｜サルサポータルSalsaFavor" showTitle={false} useWrapper={false}>
      <article className="w-full lg:col-span-12 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 m-0">パスワードリセット</h2>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="token" value={data.token} />

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="email">
                      メールアドレス
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className={`w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      id="email"
                      name="email"
                      type="email"
                      value={data.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      autoFocus
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600 font-bold">{errors.email}</p>}
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                      パスワード
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className={`w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      id="password"
                      name="password"
                      type="password"
                      value={data.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600 font-bold">{errors.password}</p>}
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="password-confirm"
                    >
                      確認用パスワード
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className={`w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3 ${
                        errors.password_confirmation ? "border-red-500" : ""
                      }`}
                      id="password-confirm"
                      name="password_confirmation"
                      type="password"
                      value={data.password_confirmation}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                    />
                    {errors.password_confirmation && (
                      <p className="mt-1 text-sm text-red-600 font-bold">{errors.password_confirmation}</p>
                    )}
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <TurnstileComponent onVerify={handleTurnstileVerify} />
                    {turnstileError && <p className="mt-1 text-sm text-red-600 font-bold">{turnstileError}</p>}
                    {errors.turnstile_token && (
                      <p className="mt-1 text-sm text-red-600 font-bold">{errors.turnstile_token}</p>
                    )}
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <button
                      className="bg-danger hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-md transition-colors duration-200 disabled:opacity-50"
                      type="submit"
                      disabled={processing}
                    >
                      パスワードリセット
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </article>
    </AuthLayout>
  );
};

export default ResetPassword;
