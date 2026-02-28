import type { SubmitEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Side from "./Side";
import type { User, UserProfile } from "@/types/User";

type Props = {
  user: User;
  userProfile: UserProfile;
  prefectures: Record<string, string>;
};

export default function UsersEdit({ user, userProfile, prefectures }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    prefecture_id: userProfile.prefecture_id,
    address: userProfile.address,
    web: userProfile.web,
    details: userProfile.details,
    file: undefined as File | undefined,
    past_file: userProfile.image_url ?? "",
  });

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put("/admin/users", { forceFormData: true });
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap">
        <article className="w-full lg:w-3/4 px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">ユーザー情報変更</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">ユーザー名</td>
                  <td className="p-3 w-2/3">
                    <input
                      type="text"
                      name="name"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      aria-label="ユーザー名"
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">メールアドレス</td>
                  <td className="p-3 w-2/3">
                    <input
                      type="text"
                      name="email"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      aria-label="メールアドレス"
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                  </td>
                </tr>
              </tbody>
            </table>
            <h2 className="text-xl font-bold mb-3">プロフィール情報</h2>
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">
                    住所{" "}
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">都道府県のみ必須</span>
                  </td>
                  <td className="p-3 w-2/3">
                    <div className="flex flex-wrap gap-2">
                      <div className="w-full sm:w-1/3">
                        <select
                          name="prefecture_id"
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          value={data.prefecture_id}
                          onChange={(e) => setData("prefecture_id", Number(e.target.value))}
                          aria-label="都道府県"
                        >
                          {Object.entries(prefectures || {}).map(([id, name]) => (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          ))}
                        </select>
                        {errors.prefecture_id && (
                          <div className="text-red-500 text-sm mt-1">{errors.prefecture_id}</div>
                        )}
                      </div>
                      <div className="w-full sm:w-1/2 grow">
                        <input
                          type="text"
                          name="address"
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          value={data.address}
                          onChange={(e) => setData("address", e.target.value)}
                          placeholder="目黒区中目黒1-1-1"
                          aria-label="住所"
                        />
                        {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                      </div>
                    </div>
                  </td>
                </tr>
                {userProfile.image_url && (
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">プロフィール画像</td>
                    <td className="p-3 w-2/3 text-center">
                      <img
                        className="max-w-full h-auto mx-auto"
                        src={`/storage/profiles/${user.id}/${userProfile.image_url}`}
                        alt="プロフィール画像"
                      />
                      <input
                        type="hidden"
                        name="past_file"
                        value={`/storage/profiles/${user.id}/${userProfile.image_url}`}
                      />
                    </td>
                  </tr>
                )}
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">
                    プロフィール画像
                    <br />
                    アップロード
                  </td>
                  <td className="p-3 w-2/3">
                    <input
                      type="file"
                      name="file"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                      onChange={(e) => setData("file", e.target.files?.[0])}
                      aria-label="プロフィール画像アップロード"
                    />
                    {errors.file && <div className="text-red-500 text-sm mt-1">{errors.file}</div>}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">Webサイト</td>
                  <td className="p-3 w-2/3">
                    <input
                      type="text"
                      name="web"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={data.web}
                      onChange={(e) => setData("web", e.target.value)}
                      placeholder="https://www.facebook.com/martin"
                      aria-label="Webサイト"
                    />
                    {errors.web && <div className="text-red-500 text-sm mt-1">{errors.web}</div>}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">詳細説明</td>
                  <td className="p-3 w-2/3">
                    <textarea
                      name="details"
                      className="w-full border border-gray-300 rounded px-3 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={data.details}
                      onChange={(e) => setData("details", e.target.value)}
                      placeholder="1998年 サルバトーレクオモに師事&#13;&#10;&#13;&#10;サルサ のダンスを極めようとしたのですがなぜかピザを作るのが上手くなる"
                      aria-label="詳細説明"
                    />
                    {errors.details && <div className="text-red-500 text-sm mt-1">{errors.details}</div>}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center mb-6">
              <input
                type="submit"
                value="ユーザー情報更新"
                className="bg-danger hover:bg-red-700 text-white font-bold py-3 px-6 rounded shadow-lg cursor-pointer disabled:opacity-50"
                disabled={processing}
              />
            </div>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
              WebサイトはfacebookやTwitter、インスタ、ホームページ等あればご入力ください
            </div>
          </form>
        </article>
        <Side activeMenu="edit" userProfile={true} published={true} userId={user.id} />
      </div>
    </AdminLayout>
  );
}
