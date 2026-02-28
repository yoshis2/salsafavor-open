import type { SubmitEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Side from "../Users/Side";

type Props = {
  prefectures: Record<string, string>;
};

export default function UserProfilesCreate({ prefectures }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    prefecture_id: Number(Object.keys(prefectures)?.[0] ?? 0),
    address: "",
    file: undefined as File | undefined,
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
          <h1 className="text-2xl font-bold mb-4 text-gray-800">プロフィール情報登録</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="w-1/3 bg-gray-50 p-3 font-semibold border-r border-gray-300">
                      住所{" "}
                      <span className="inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white ml-2">
                        都道府県のみ必須
                      </span>
                    </td>
                    <th className="w-2/3 p-3">
                      <div className="flex flex-col md:flex-row gap-3">
                        <div className="md:w-1/3">
                          <label htmlFor="prefecture_id" className="sr-only">
                            都道府県
                          </label>
                          <select
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            id="prefecture_id"
                            name="prefecture_id"
                            value={data.prefecture_id}
                            onChange={(e) => setData("prefecture_id", parseInt(e.target.value, 10))}
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
                          <input
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            id="address"
                            name="address"
                            type="text"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            placeholder="目黒区中目黒1-1-1"
                          />
                          {errors.address && <div className="mt-1 text-sm text-red-600">{errors.address}</div>}
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/3 bg-gray-50 p-3 font-semibold border-r border-gray-300">プロフィール画像</td>
                    <th className="w-2/3 p-3">
                      <label htmlFor="file" className="sr-only">
                        プロフィール画像
                      </label>
                      <input
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        id="file"
                        name="file"
                        type="file"
                        onChange={(e) => setData("file", e.target.files?.[0])}
                      />
                      {errors.file && <div className="mt-1 text-sm text-red-600">{errors.file}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/3 bg-gray-50 p-3 font-semibold border-r border-gray-300">詳細説明</td>
                    <th className="w-2/3 p-3">
                      <label htmlFor="details" className="sr-only">
                        詳細説明
                      </label>
                      <textarea
                        className="w-full rounded border border-gray-300 px-3 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-red-500"
                        id="details"
                        name="details"
                        value={data.details}
                        onChange={(e) => setData("details", e.target.value)}
                        placeholder="1998年 サルバトーレクオモに師事サルサ のダンスを極めようとしたのですがなぜかピザを作るのが上手くなる"
                      />
                      {errors.details && <div className="mt-1 text-sm text-red-600">{errors.details}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/3 bg-gray-50 p-3 font-semibold border-r border-gray-300">Webサイト</td>
                    <th className="w-2/3 p-3">
                      <label htmlFor="web" className="sr-only">
                        Webサイト
                      </label>
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        id="web"
                        name="web"
                        type="text"
                        value={data.web}
                        onChange={(e) => setData("web", e.target.value)}
                        placeholder="https://www.facebook.com/martin"
                      />
                      {errors.web && <div className="mt-1 text-sm text-red-600">{errors.web}</div>}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-center mb-6">
              <button
                className="bg-danger hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={processing}
              >
                登録
              </button>
            </div>
          </form>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700 rounded" role="alert">
            WebサイトはfacebookやTwitter、インスタ、ホームページ等あればご入力ください
          </div>
        </article>
        {/* TODO: 適切なuserIdを指定してください。現状は仮で0を指定 */}
        <Side activeMenu="profile" userProfile={false} published={true} userId={0} />
      </div>
    </AdminLayout>
  );
}
