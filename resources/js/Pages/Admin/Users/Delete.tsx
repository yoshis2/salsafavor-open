import { useState, type SubmitEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Side from "./Side";
import type { User } from "@/types/User";

type Props = {
  user: User;
};

export default function UsersDelete({ user }: Props) {
  const { delete: destroy, processing } = useForm({});
  const [checked, setChecked] = useState(false);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (checked) {
      destroy(`/admin/users/${user.id}`, { method: "delete" });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap">
        <article className="w-full lg:w-3/4 px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">退会処理</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            退会すると、すべてのユーザー情報・イベント・レッスン情報が完全に削除され、元に戻せません。
            <br />
            本当に退会しますか？下記にチェックを入れて「退会する」ボタンを押してください。
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">退会に同意します</span>
              </label>
            </div>
            <div className="text-center">
              <input
                type="submit"
                value="退会する"
                className={`bg-danger text-white font-bold py-2 px-6 rounded shadow-lg transition-colors ${
                  !checked || processing ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700 cursor-pointer"
                }`}
                disabled={!checked || processing}
              />
            </div>
          </form>
        </article>
        {/* userIdを追加 */}
        <Side activeMenu="withdraw" userProfile={true} published={true} userId={user.id} />
      </div>
    </AdminLayout>
  );
}
