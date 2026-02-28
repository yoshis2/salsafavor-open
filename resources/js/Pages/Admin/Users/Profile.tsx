import type { SubmitEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Side from "./Side";
import InputField from "@/Components/Auth/InputField";
import type { User } from "@/types/User";

type Props = {
  prefectures: Record<string, string>;
  published?: boolean;
  user: User; // userIdを追加
};

type FormData = {
  prefecture_id: string | number;
  address: string;
  file: File | null;
  details: string;
  web: string;
};

export default function UsersProfile({ prefectures, published, user }: Props) {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    prefecture_id: Object.keys(prefectures ?? {})[0] ?? "",
    address: "",
    file: null,
    details: "",
    web: "",
  });

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post("/admin/user_profiles", { forceFormData: true });
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap">
        <article className="w-full lg:w-3/4 px-4 py-4">
          <h1 className="text-2xl font-bold mb-4 text-slate-900">プロフィール情報登録</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mb-6">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">
                      住所{" "}
                      <span className="inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white ml-2">
                        都道府県のみ必須
                      </span>
                    </td>
                    <td className="p-3 w-2/3">
                      <div className="flex flex-col gap-3 md:flex-row">
                        <div className="md:w-1/3">
                          <label htmlFor="prefecture_id" className="sr-only">
                            都道府県
                          </label>
                          <select
                            className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            id="prefecture_id"
                            name="prefecture_id"
                            value={data.prefecture_id}
                            onChange={(e) => setData("prefecture_id", e.target.value)}
                          >
                            {Object.entries(prefectures || {}).map(([id, name]) => (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            ))}
                          </select>
                          {errors.prefecture_id && (
                            <div className="mt-1 text-sm text-red-600">{errors.prefecture_id}</div>
                          )}
                        </div>
                        <div className="md:w-2/3">
                          <InputField
                            label="住所"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            error={errors.address}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">プロフィール画像</td>
                    <td className="p-3 w-2/3">
                      <label htmlFor="file" className="sr-only">
                        プロフィール画像
                      </label>
                      <input
                        className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-50 file:text-sm file:font-semibold file:text-red-700 hover:file:bg-red-100"
                        id="file"
                        name="file"
                        type="file"
                        onChange={(e) => setData("file", e.target.files?.[0] ?? null)}
                      />
                      {errors.file && <div className="mt-1 text-sm text-red-600">{errors.file}</div>}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">詳細説明</td>
                    <td className="p-3 w-2/3">
                      <label htmlFor="details" className="sr-only">
                        詳細説明
                      </label>
                      <textarea
                        className="w-full rounded border border-slate-300 px-3 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-red-500"
                        id="details"
                        name="details"
                        value={data.details}
                        onChange={(e) => setData("details", e.target.value)}
                        placeholder="1998年 サルバトーレクオモに師事サルサ のダンスを極めようとしたのですがなぜかピザを作るのが上手くなる"
                      />
                      {errors.details && <div className="mt-1 text-sm text-red-600">{errors.details}</div>}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">Webサイト</td>
                    <td className="p-3 w-2/3">
                      <InputField
                        label="Webサイト"
                        name="web"
                        value={data.web}
                        onChange={(e) => setData("web", e.target.value)}
                        error={errors.web}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                className="inline-flex items-center rounded bg-danger px-6 py-3 text-sm font-bold text-white hover:bg-red-700 shadow-lg"
                type="submit"
                disabled={processing}
              >
                登録
              </button>
            </div>
          </form>
          <div
            className="mt-6 rounded border-l-4 border-yellow-500 bg-yellow-50 px-4 py-3 text-sm text-yellow-700"
            role="alert"
          >
            WebサイトはfacebookやTwitter、インスタ、ホームページ等あればご入力ください
          </div>
        </article>
        <Side activeMenu="profile" userProfile={false} published={published ?? true} userId={user.id} />
      </div>
    </AdminLayout>
  );
}
