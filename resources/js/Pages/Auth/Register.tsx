// 会員登録ページ（Inertia/React版）
import React, { useState, type SubmitEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import TurnstileComponent from "@/Components/Auth/Turnstile";

const Register: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
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
    post("/register", {
      onError: () => {
        setData("turnstile_token", "");
      },
    });
  };

  return (
    <AuthLayout title="会員登録｜サルサポータルSalsaFavor" showTitle={false} useWrapper={false}>
      <article className="w-full lg:col-span-12 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 m-0">SalsaFavor 会員登録</h2>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 氏名 */}
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">
                      氏名
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className={`w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      id="name"
                      name="name"
                      type="text"
                      value={data.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      autoFocus
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600 font-bold">{errors.name}</p>}
                  </div>
                </div>

                {/* メールアドレス */}
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
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600 font-bold">{errors.email}</p>}
                  </div>
                </div>

                {/* パスワード */}
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

                {/* 確認用パスワード */}
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

                {/* Turnstile */}
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

                {/* 送信ボタン */}
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <button
                      className="w-full sm:w-auto bg-danger hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-md transition-colors duration-200 disabled:opacity-50"
                      type="submit"
                      disabled={processing}
                    >
                      会員登録 メール確認へ
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

export default Register;
