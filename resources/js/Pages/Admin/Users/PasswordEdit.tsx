import React, { type SubmitEventHandler } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Side from "./Side";

// パスワード編集ページコンポーネント
const PasswordEdit: React.FC = () => {
  const { data, setData, put, processing, errors } = useForm({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // フラッシュメッセージをpropsから取得
  const { props } = usePage();
  const success = props.success as string | undefined;
  const error = props.error as string | undefined;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put("/admin/users/password", {
      preserveScroll: true,
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap">
        <article className="w-full lg:w-3/4 px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">パスワード変更</h1>

          {/* フラッシュメッセージ表示 */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded">{success}</div>
          )}
          {error && <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded">{error}</div>}

          {/* 注意事項 */}
          <div className="mb-6 p-4 bg-blue-50 text-blue-800 border-l-4 border-blue-400 rounded shadow-sm">
            <p className="flex items-center font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              注意事項
            </p>
            <p className="mt-1 ml-7">
              パスワードを変更したらログアウトされるので変更したパスワードでログインしてください。
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">現在のパスワード</td>
                  <td className="p-3 w-2/3">
                    <input
                      type="password"
                      name="current_password"
                      autoComplete="current-password"
                      placeholder="現在のパスワード"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={data.current_password}
                      onChange={(e) => setData("current_password", e.target.value)}
                    />
                    {errors.current_password && (
                      <div className="text-red-500 text-sm mt-1">{errors.current_password}</div>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">新しいパスワード</td>
                  <td className="p-3 w-2/3">
                    <input
                      type="password"
                      name="new_password"
                      autoComplete="new-password"
                      placeholder="新しいパスワード"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={data.new_password}
                      onChange={(e) => setData("new_password", e.target.value)}
                    />
                    {errors.new_password && <div className="text-red-500 text-sm mt-1">{errors.new_password}</div>}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">
                    新しいパスワード（確認）
                  </td>
                  <td className="p-3 w-2/3">
                    <input
                      type="password"
                      name="new_password_confirmation"
                      autoComplete="new-password"
                      placeholder="新しいパスワード（確認）"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={data.new_password_confirmation}
                      onChange={(e) => setData("new_password_confirmation", e.target.value)}
                    />
                    {errors.new_password_confirmation && (
                      <div className="text-red-500 text-sm mt-1">{errors.new_password_confirmation}</div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <input
                type="submit"
                value="パスワード変更"
                className="bg-danger hover:bg-red-700 text-white font-bold py-3 px-6 rounded shadow-lg cursor-pointer disabled:opacity-50"
                disabled={processing}
              />
            </div>
          </form>
        </article>
        {/* TODO: 適切なユーザーIDを指定してください */}
        <Side activeMenu="password" userProfile={true} published={true} userId={1} />
      </div>
    </AdminLayout>
  );
};

export default PasswordEdit;
