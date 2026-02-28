import { useMemo } from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Side from "@/Pages/Events/Side";
import type { Genre } from "@/types/Master";
import type { EventItem } from "@/types/Event";

type Paginator<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
};

type PageProps = {
  events: Paginator<EventItem>;
  param: Record<string, string | number | null>;
  dates: string[];
  genres: Genre[];
  prefectures: Record<string, string>;
  flash?: Record<string, string>;
  errors?: Record<string, string>;
};

const pad2 = (value: number) => String(value).padStart(2, "0");

const formatDateTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}年${pad2(date.getMonth() + 1)}月${pad2(date.getDate())}日 ${pad2(
    date.getHours(),
  )}:${pad2(date.getMinutes())}`;
};

const formatTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
};

export default function EventsIndex() {
  const { events, param, dates, genres, prefectures, flash, errors } = usePage<PageProps>().props;

  const eventList = useMemo(() => events?.data ?? [], [events]);
  const errorList = errors ? Object.values(errors) : [];

  return (
    <MainLayout>
      <Head title="ダンスイベント情報一覧 どこのイベント会場で何時から始まるのか？">
        <meta
          name="description"
          content="イベント情報ならを検索することができます。どこのイベント会場で何時からどのジャンルでフリーが始まるのか？レッスンが始まるのか確認できます。また日程で絞り込み自分の行きたいイベントに参加してください。"
        />
      </Head>

      {/* サイドバー (検索条件) */}
      <Side dates={dates} genres={genres} prefectures={prefectures} param={param} showRakutenWidget />

      {/* メインコンテンツ (イベント一覧)
        - PC: 左側に配置 (lg:col-span-9 lg:order-1)
      */}
      <article className="w-full lg:col-span-9 lg:order-1 px-2 sm:px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">イベント情報一覧</h1>

        {/* フラッシュメッセージ & エラー表示 */}
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

        {eventList.length !== 0 ? (
          <div className="space-y-8">
            {eventList.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 hover:text-red-600 transition-colors">
                    <Link href={`/events/${event.id}`}>{event.name}</Link>
                  </h2>
                </div>

                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm md:text-base">
                    <tbody className="divide-y divide-gray-100">
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-bold text-gray-600 whitespace-nowrap bg-gray-50 w-32 pl-2">
                          イベント日時
                        </td>
                        <td className="py-2 pl-4 text-gray-800">
                          {formatDateTime(event.start_datetime)} ~ {formatTime(event.end_datetime)}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-bold text-gray-600 whitespace-nowrap bg-gray-50 pl-2">
                          音楽ジャンル
                        </td>
                        <td className="py-2 pl-4 text-gray-800">
                          {event.genres?.map((genre) => genre.name).join(" ")}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-bold text-gray-600 whitespace-nowrap bg-gray-50 pl-2">
                          DJ - 主催者
                        </td>
                        <td className="py-2 pl-4 text-gray-800">
                          {event.dj} - {event.owner}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-bold text-gray-600 whitespace-nowrap bg-gray-50 pl-2">
                          オプション
                        </td>
                        <td className="py-2 pl-4 text-gray-800">
                          {event.lesson ? "レッスンあり" : "レッスンなし"} -
                          {event.performance ? "パフォーマンスあり" : "パフォーマンスなし"}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-bold text-gray-600 whitespace-nowrap bg-gray-50 pl-2">
                          所在県 - 会場
                        </td>
                        <td className="py-2 pl-4 text-gray-800">
                          {event.prefecture?.name} - {event.place}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-4 text-center">
                    <Link
                      className="inline-block bg-danger hover:bg-red-700 text-white font-bold py-2 px-8 rounded transition-colors duration-200 shadow-sm"
                      href={`/events/${event.id}`}
                    >
                      イベント詳細へ
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <section className="text-center py-10 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="mb-4 text-gray-600 px-4">
              <p>まだ、登録がありません、インストラクターやイベント作成者は随時募集中です。ご協力お願いいたします。</p>
            </div>
            <Link href="/registration" className="text-red-600 font-bold hover:underline">
              イベント主催者・インストラクター募集へ
            </Link>
          </section>
        )}

        {/* ページネーション (Tailwind版) */}
        {events?.last_page > 1 && (
          <nav className="mt-8 mb-4 flex justify-center">
            <ul className="flex list-none rounded-md shadow-sm">
              {events.prev_page_url ? (
                <li>
                  <Link
                    className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-red-600 rounded-l-md hover:bg-red-50"
                    href={events.prev_page_url}
                    rel="prev"
                  >
                    前のページへ
                  </Link>
                </li>
              ) : (
                <li>
                  <span className="relative block py-2 px-3 leading-tight bg-gray-100 border border-gray-300 text-gray-400 rounded-l-md cursor-not-allowed">
                    前のページへ
                  </span>
                </li>
              )}

              {events.next_page_url ? (
                <li>
                  <Link
                    className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-red-600 rounded-r-md hover:bg-red-50 -ml-px"
                    href={events.next_page_url}
                    rel="next"
                  >
                    次のページへ
                  </Link>
                </li>
              ) : (
                <li>
                  <span className="relative block py-2 px-3 leading-tight bg-gray-100 border border-gray-300 text-gray-400 rounded-r-md cursor-not-allowed -ml-px">
                    次のページへ
                  </span>
                </li>
              )}
            </ul>
          </nav>
        )}
      </article>
    </MainLayout>
  );
}
