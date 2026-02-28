// ログインページ（Inertia/React版）
import React, { useState, type SubmitEventHandler } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import TurnstileComponent from "@/Components/Auth/Turnstile";

const Login: React.FC = () => {
  const { flash } = usePage().props as { flash?: { [key: string]: string } };
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
    turnstile_token: "",
  });
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setData(name as keyof typeof data, type === "checkbox" ? checked : value);
  };

  const onHandleTurnstileVerify = (token: string) => {
    setData("turnstile_token", token);
    setTurnstileError(null);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!data.turnstile_token) {
      setTurnstileError("認証チェックを完了してください。");
      return;
    }
    post("/login", {
      onError: () => {
        // CAPTCHA再入力を促す
        setData("turnstile_token", "");
      },
    });
  };

  return (
    <AuthLayout
      title="ログイン認証｜サルサポータルSalsaFavor"
      description="ログイン認証ページです。サルサ等イベント主催者やインストラクターはこちらでイベント登録ができます。簡単にイベント登録できます。｜サルサポータルSalsaFavor"
      showTitle={false}
      useWrapper={false}
    >
      <article className="w-full lg:col-span-12 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 m-0">ログイン</h2>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      autoFocus
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
                      autoComplete="current-password"
                      required
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600 font-bold">{errors.password}</p>}
                  </div>
                </div>

                {/* ログイン状態保持 */}
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <div className="flex items-center">
                      <input
                        className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 h-4 w-4"
                        id="remember"
                        name="remember"
                        type="checkbox"
                        checked={data.remember}
                        onChange={handleChange}
                      />
                      <label className="ml-2 block text-gray-700" htmlFor="remember">
                        ログイン状態を保持する
                      </label>
                    </div>
                  </div>
                </div>

                {/* Turnstile */}
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <TurnstileComponent onVerify={onHandleTurnstileVerify} />
                    {turnstileError && <p className="mt-1 text-sm text-red-600 font-bold">{turnstileError}</p>}
                    {errors.turnstile_token && (
                      <p className="mt-1 text-sm text-red-600 font-bold">{errors.turnstile_token}</p>
                    )}
                  </div>
                </div>

                {/* 送信ボタン */}
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      className="bg-danger hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-md transition-colors duration-200 disabled:opacity-50"
                      type="submit"
                      disabled={processing}
                    >
                      ログイン
                    </button>
                    <a className="text-blue-600 hover:text-blue-800 hover:underline text-sm" href="/password/reset">
                      パスワードをお忘れですか？
                    </a>
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

export default Login;
