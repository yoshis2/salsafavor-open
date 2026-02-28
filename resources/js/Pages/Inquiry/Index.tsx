import { type SubmitEventHandler } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import TurnstileComponent from "@/Components/Auth/Turnstile";

export default function InquiryIndex() {
  const { flash, errors: pageErrors } = usePage().props as {
    flash?: Record<string, string>;
    errors?: Record<string, string>;
  };
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    mail: "",
    title: "",
    detail: "",
    "cf-turnstile-response": "",
  });
  const mergedErrors = { ...(pageErrors ?? {}), ...(errors ?? {}) };
  const errorList = Object.values(mergedErrors);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post("/inquiry");
  };

  return (
    <MainLayout>
      <Head title="サルサやバチャータ等のダンスについてやWebサイトについてのお問合せ">
        <meta
          name="description"
          content="サルサイベントやレッスン情報、ショッピング機能、その他、Webサイトについて気になることがあればお気軽のお問い合わせください。また、メディアの方もお気軽にお問合せ下さい。｜サルサの総合ポータルSalsaFavor"
        />
      </Head>
      <article className="w-full lg:col-span-12">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-red-600 pb-2 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-danger">
          お問合せ
        </h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6 md:p-8">
          <p className="text-lg font-bold mb-4 text-gray-800">
            SalsaFavorにご関心をお寄せいただき、ありがとうございます！
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            当サイトやサルサダンスに関するご質問、ご意見、ご要望など、どんなことでもお気軽にお寄せください。皆様からの声が、SalsaFavorをより良くするための大切なヒントになります。
          </p>

          <h5 className="text-md font-bold mt-6 mb-3 text-gray-800">例えば、こんな内容でお困りではありませんか？</h5>
          <ul className="list-disc ml-6 mb-4 text-gray-700 space-y-1">
            <li>掲載されているイベント情報の詳細について知りたい</li>
            <li>レッスン情報の探し方がわからない</li>
            <li>サイトの使い方がわからない、こんな機能が欲しい</li>
            <li>掲載されている情報に誤りを見つけた</li>
            <li>イベントやレッスンを掲載したいけど、どうすればいいの？</li>
            <li>サルサを始めたいけど、何から準備すればいいか相談したい</li>
          </ul>

          <p className="text-gray-700 mb-4 leading-relaxed">
            上記以外のことでも、もちろん大歓迎です。「こんなこと聞いてもいいのかな？」と迷わず、お気軽にご連絡ください。
          </p>
          <p className="font-bold text-gray-800 mb-6">
            メディア関係者様からのお問い合わせも、こちらのフォームより承っております。
          </p>

          <hr className="border-gray-200 my-6" />

          <p className="font-bold text-gray-800 mb-2">
            お問い合わせ内容を確認後、通常3営業日以内に担当者より返信させていただきます。
          </p>
          <p className="text-sm text-gray-500 mb-6">
            ※内容によってはお時間をいただく場合や、返信できかねる場合もございますので、あらかじめご了承ください。
          </p>

          {/* フラッシュメッセージ */}
          <div className="space-y-4 mb-6">
            {flash?.message && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p>{flash.message}</p>
              </div>
            )}
            {flash?.status && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                {flash.status}
              </div>
            )}
            {flash?.success && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">{flash.success}</div>
            )}
            {flash?.warning && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">{flash.warning}</div>
            )}
            {flash?.error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">{flash.error}</div>}
            {errorList.length > 0 && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <ul className="list-disc ml-5">
                  {errorList.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
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
                    <td className="p-4 bg-white md:w-2/3">
                      <input
                        className={`w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3 ${
                          mergedErrors.name ? "border-red-500" : ""
                        }`}
                        name="name"
                        type="text"
                        value={data.name}
                        autoComplete="off"
                        aria-label="氏名"
                        onChange={(e) => setData("name", e.target.value)}
                      />
                      {mergedErrors.name && <p className="mt-1 text-sm text-red-600 font-bold">{mergedErrors.name}</p>}
                    </td>
                  </tr>

                  {/* メールアドレス */}
                  <tr className="flex flex-col md:table-row">
                    <td className="p-4 bg-gray-50 font-bold text-gray-700 md:w-1/3 md:border-r border-gray-200 align-middle">
                      <span className="inline-block bg-danger text-white text-xs px-2 py-1 rounded mr-2 align-middle">
                        必須
                      </span>
                      メールアドレス
                    </td>
                    <td className="p-4 bg-white md:w-2/3">
                      <input
                        className={`w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3 ${
                          mergedErrors.mail ? "border-red-500" : ""
                        }`}
                        name="mail"
                        type="text"
                        value={data.mail}
                        autoComplete="off"
                        aria-label="メールアドレス"
                        onChange={(e) => setData("mail", e.target.value)}
                      />
                      {mergedErrors.mail && <p className="mt-1 text-sm text-red-600 font-bold">{mergedErrors.mail}</p>}
                    </td>
                  </tr>

                  {/* 件名 */}
                  <tr className="flex flex-col md:table-row">
                    <td className="p-4 bg-gray-50 font-bold text-gray-700 md:w-1/3 md:border-r border-gray-200 align-middle">
                      <span className="inline-block bg-danger text-white text-xs px-2 py-1 rounded mr-2 align-middle">
                        必須
                      </span>
                      件名
                    </td>
                    <td className="p-4 bg-white md:w-2/3">
                      <input
                        className={`w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3 ${
                          mergedErrors.title ? "border-red-500" : ""
                        }`}
                        name="title"
                        type="text"
                        value={data.title}
                        autoComplete="off"
                        aria-label="件名"
                        onChange={(e) => setData("title", e.target.value)}
                      />
                      {mergedErrors.title && (
                        <p className="mt-1 text-sm text-red-600 font-bold">{mergedErrors.title}</p>
                      )}
                    </td>
                  </tr>

                  {/* 詳細 */}
                  <tr className="flex flex-col md:table-row">
                    <td className="p-4 bg-gray-50 font-bold text-gray-700 md:w-1/3 md:border-r border-gray-200 align-top pt-6">
                      <span className="inline-block bg-danger text-white text-xs px-2 py-1 rounded mr-2 align-middle">
                        必須
                      </span>
                      詳細
                    </td>
                    <td className="p-4 bg-white md:w-2/3">
                      <textarea
                        className={`w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 px-3 h-64 ${
                          mergedErrors.detail ? "border-red-500" : ""
                        }`}
                        name="detail"
                        value={data.detail}
                        aria-label="詳細"
                        onChange={(e) => setData("detail", e.target.value)}
                      />
                      {mergedErrors.detail && (
                        <p className="mt-1 text-sm text-red-600 font-bold">{mergedErrors.detail}</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center space-y-6">
              <div className="inline-block text-left">
                <TurnstileComponent onVerify={(token) => setData("cf-turnstile-response", token)} />
                {mergedErrors["cf-turnstile-response"] && (
                  <p className="mt-1 text-sm text-red-600 font-bold text-center">
                    {mergedErrors["cf-turnstile-response"]}
                  </p>
                )}
              </div>

              <div>
                <button
                  className="bg-danger hover:bg-red-700 text-white font-bold py-3 px-12 rounded shadow-md transition-colors duration-200 disabled:opacity-50"
                  type="submit"
                  disabled={processing}
                >
                  問合せ内容確認
                </button>
              </div>
            </div>
          </form>
        </div>
      </article>
    </MainLayout>
  );
}
