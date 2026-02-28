import AdminLayout from "@/Layouts/AdminLayout";
import Side from "./Side";
import type { User, UserProfile, UserPrefecture } from "@/types/User";

type Props = {
  user: User;
  userProfile?: UserProfile;
  userPrefecture?: UserPrefecture;
};

export default function UsersShow({ user, userProfile, userPrefecture }: Props) {
  return (
    <AdminLayout>
      <div className="flex flex-wrap">
        <article className="w-full lg:w-3/4 px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">ユーザー情報</h1>
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">ユーザー名</td>
                <td className="p-3 w-2/3">{user.name}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">メールアドレス</td>
                <td className="p-3 w-2/3">{user.email}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">一覧表示状況</td>
                <td className="p-3 w-2/3">{user.published ? "公開中" : "非公開"}</td>
              </tr>
            </tbody>
          </table>
          {userProfile ? (
            <>
              <h2 className="text-xl font-bold mb-3">プロフィール情報</h2>
              <table className="w-full border-collapse border border-gray-300 mb-6 table-fixed">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">住所</td>
                    <td className="p-3 w-2/3 wrap-break-word">
                      {userPrefecture?.name}
                      {userProfile.address}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">プロフィール画像</td>
                    <td className="p-3 w-2/3 text-center">
                      {userProfile.image_url && (
                        <img
                          className="max-w-full h-auto mx-auto"
                          src={`/storage/profiles/${user.id}/${userProfile.image_url}`}
                          alt="プロフィール画像"
                        />
                      )}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">詳細説明</td>
                    <td className="p-3 w-2/3 whitespace-pre-line wrap-break-words">{userProfile.details}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 p-3 w-1/3 font-semibold border-r border-gray-300">Webサイト</td>
                    <td className="p-3 w-2/3 break-all">{userProfile.web}</td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-3">ユーザー登録ありがとうございます。</h2>
              <div className="bg-gray-100 p-8 rounded-lg mt-4 shadow-sm">
                <p className="text-lg text-gray-700 mb-4">
                  現在はユーザープロフィールの情報が未作成状態です。作成する場合は以下のボタンをクリックしてください。
                </p>
                <hr className="my-4 border-gray-300" />
                <div className="text-center">
                  <a
                    href="/admin/user_profiles"
                    className="bg-danger hover:bg-red-700 text-white font-bold py-3 px-6 rounded shadow-lg inline-block transition-colors"
                    role="button"
                  >
                    ユーザーその他情報追加
                  </a>
                </div>
              </div>
            </>
          )}
          <p>
            <br />
          </p>
        </article>
        <Side activeMenu="show" userProfile={!!userProfile} published={user.published} userId={user.id} />
      </div>
    </AdminLayout>
  );
}
