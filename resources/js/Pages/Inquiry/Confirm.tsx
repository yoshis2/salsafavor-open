import { type SubmitEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

type InquiryData = {
  name: string;
  mail: string;
  title: string;
  detail: string;
  inquiry_token?: string;
};

export default function InquiryConfirm(props: InquiryData) {
  const { name, mail, title, detail } = props;
  const inquiryToken = props.inquiry_token ?? "";
  const { post, processing } = useForm({
    name,
    mail,
    title,
    detail,
    inquiry_token: inquiryToken,
  });

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post("/inquiry/send");
  };

  return (
    <MainLayout>
      <Head title="お問合せ確認画面｜サルサの総合ポータルSalsaFavor">
        <meta
          name="description"
          content="お問合せ内容の確認画面です。サルサの総合ポータルSalsaFavorはサルサについての情報やサイトの運営において疑問に思ったことをお気軽にお問合せお願いいたします。"
        />
      </Head>
      <article className="w-full lg:col-span-12">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-red-600 pb-2 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-danger">
          お問合せの内容確認
        </h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6 md:p-8">
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-gray-200">
                {/* 氏名 */}
                <tr className="flex flex-col md:table-row">
                  <td className="p-4 bg-gray-50 font-bold text-gray-700 md:w-1/3 md:border-r border-gray-200 align-middle">
                    <span className="inline-block bg-danger text-white text-xs px-2 py-1 rounded mr-2 align-middle">
                      必須
                    </span>
                    氏名
                  </td>
                  <td className="p-4 bg-white md:w-2/3 text-gray-800">{name}</td>
                </tr>

                {/* メールアドレス */}
                <tr className="flex flex-col md:table-row">
                  <td className="p-4 bg-gray-50 font-bold text-gray-700 md:w-1/3 md:border-r border-gray-200 align-middle">
                    <span className="inline-block bg-danger text-white text-xs px-2 py-1 rounded mr-2 align-middle">
                      必須
                    </span>
                    メールアドレス
                  </td>
                  <td className="p-4 bg-white md:w-2/3 text-gray-800">{mail}</td>
                </tr>

                {/* 件名 */}
                <tr className="flex flex-col md:table-row">
                  <td className="p-4 bg-gray-50 font-bold text-gray-700 md:w-1/3 md:border-r border-gray-200 align-middle">
                    <span className="inline-block bg-danger text-white text-xs px-2 py-1 rounded mr-2 align-middle">
                      必須
                    </span>
                    件名
                  </td>
                  <td className="p-4 bg-white md:w-2/3 text-gray-800">{title}</td>
                </tr>

                {/* 詳細 */}
                <tr className="flex flex-col md:table-row">
                  <td className="p-4 bg-gray-50 font-bold text-gray-700 md:w-1/3 md:border-r border-gray-200 align-top pt-4">
                    <span className="inline-block bg-danger text-white text-xs px-2 py-1 rounded mr-2 align-middle">
                      必須
                    </span>
                    詳細
                  </td>
                  <td className="p-4 bg-white md:w-2/3 text-gray-800 whitespace-pre-wrap leading-relaxed">{detail}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <form onSubmit={handleSubmit} className="text-center">
            {/* hidden inputs は useForm で管理されるためレンダリング不要だが、念のため保持する場合は state で持つ。
                Inertia の useForm を使っているので input hidden は不要。
            */}

            <button
              className="bg-danger hover:bg-red-700 text-white font-bold py-3 px-12 rounded shadow-md transition-colors duration-200 disabled:opacity-50"
              type="submit"
              disabled={processing}
            >
              問合せ内容送信
            </button>
          </form>
        </div>
      </article>
    </MainLayout>
  );
}
