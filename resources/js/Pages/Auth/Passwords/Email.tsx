// パスワードリセットメール送信ページ（Inertia/React版）
import React, { type SubmitEventHandler } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import TurnstileComponent from "@/Components/Auth/Turnstile";

const ResetPasswordEmail: React.FC = () => {
  const { flash } = usePage().props as { flash?: { status?: string } };
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    turnstile_token: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!data.turnstile_token) return;
    post("/password/email", {
      onError: () => setData("turnstile_token", ""),
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
              {flash?.status && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                  {flash.status}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Turnstile */}
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <TurnstileComponent onVerify={(token) => setData("turnstile_token", token)} />
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
                      パスワードリセットリンクを送信
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

export default ResetPasswordEmail;
