// パスワード確認ページ（Inertia/React版）
import React, { type SubmitEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

const ConfirmPassword: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post("/password/confirm");
  };

  return (
    <AuthLayout title="パスワード確認｜サルサポータルSalsaFavor" showTitle={false} useWrapper={false}>
      <article className="w-full lg:col-span-12 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 m-0">パスワード確認</h2>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-gray-700 mb-6">続行する前にパスワードを確認してください。</p>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      autoFocus
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600 font-bold">{errors.password}</p>}
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      className="bg-danger hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-md transition-colors duration-200 disabled:opacity-50"
                      type="submit"
                      disabled={processing}
                    >
                      パスワード確認
                    </button>
                    <a className="text-blue-600 hover:text-blue-800 hover:underline text-sm" href="/password/request">
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

export default ConfirmPassword;
