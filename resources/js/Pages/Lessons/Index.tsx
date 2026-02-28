import { useMemo } from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Side from "@/Pages/Lessons/Side";
import type { Genre } from "@/types/Master";
import type { LessonItem } from "@/types/Lesson";
import { FREQUENCY_LABELS, WEEK_LABELS } from "@/constants/lesson";

type Paginator<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
};

type PageProps = {
  lessons: Paginator<LessonItem>;
  param: Record<string, string | number | null>;
  genres: Genre[];
  prefectures: Record<string, string>;
  flash?: Record<string, string>;
};

const pad2 = (value: number) => String(value).padStart(2, "0");

const formatLessonTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(`1970-01-01T${value}`);
  if (Number.isNaN(date.getTime())) return value;
  return `${pad2(date.getHours())}時${pad2(date.getMinutes())}分`;
};

export default function LessonsIndex() {
  const { lessons, param, genres, prefectures, flash } = usePage<PageProps>().props;

  const lessonList = useMemo(() => lessons?.data ?? [], [lessons]);

  return (
    <MainLayout>
      <Head title="ダンスレッスン情報一覧 いつどこの教室、スタジオで開始するのか検索">
        <meta
          name="description"
          content="ダンスレッスン情報の一覧です。いつ、どこのスタジオや教室、クラブでサルサかバチャータのレッスンが開始されるのかわかりやすく検索できます。Salsafavorがサルサやバチャータ、キゾンバに特化しているポータルサイトです"
        />
      </Head>

      {/* --- サイドバー (検索条件) --- */}
      <Side genres={genres} prefectures={prefectures} param={param} showRakutenWidget />

      {/* --- メインコンテンツ --- */}
      <article className="w-full lg:col-span-9 lg:order-1 px-2 sm:px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">レッスン情報</h1>
        {flash?.error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">{flash.error}</div>
        )}

        {lessonList.length !== 0 ? (
          <div className="space-y-8">
            {lessonList.map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 hover:text-red-600 transition-colors">
                    <Link href={`/lessons/${lesson.id}`}>{lesson.name}</Link>
                  </h2>
                </div>

                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm md:text-base">
                    <tbody className="divide-y divide-gray-100">
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-bold text-gray-600 whitespace-nowrap bg-gray-50 w-32 pl-2 border-r border-gray-100">
                          音楽ジャンル
                        </td>
                        <td className="py-2 pl-4 text-gray-800">
                          {lesson.genres?.map((genre) => genre.name).join(" ")}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-bold text-gray-600 whitespace-nowrap bg-gray-50 border-r border-gray-100 pl-2">
                          レッスン日時
                        </td>
                        <td className="py-2 pl-4 text-gray-800">
                          {FREQUENCY_LABELS[lesson.frequency] ?? lesson.frequency}{" "}
                          {WEEK_LABELS[lesson.week] ?? lesson.week} {formatLessonTime(lesson.start_time)} 〜{" "}
                          {formatLessonTime(lesson.end_time)}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-bold text-gray-600 whitespace-nowrap bg-gray-50 border-r border-gray-100 pl-2">
                          会場
                        </td>
                        <td className="py-2 pl-4 text-gray-800">{lesson.place}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-bold text-gray-600 whitespace-nowrap bg-gray-50 border-r border-gray-100 pl-2">
                          先生
                        </td>
                        <td className="py-2 pl-4 text-gray-800">{lesson.instructor}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-4 text-center">
                    <Link
                      className="inline-block bg-danger hover:bg-red-700 text-white font-bold py-2 px-8 rounded transition-colors duration-200 shadow-sm w-4/5 md:w-auto"
                      href={`/lessons/${lesson.id}`}
                    >
                      レッスン詳細へ
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <section className="text-center py-10 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="mb-4 text-gray-600 px-4">
              <p>まだ、登録がありません。インストラクターやイベント作成者は随時募集中です。ご協力お願いいたします。</p>
            </div>
            <Link href="/registration" className="text-red-600 font-bold hover:underline">
              イベント主催者・インストラクター募集へ
            </Link>
          </section>
        )}

        {lessons?.last_page > 1 && (
          <nav className="mt-8 mb-4 flex justify-center">
            <ul className="flex list-none rounded-md shadow-sm">
              {lessons.prev_page_url ? (
                <li>
                  <Link
                    className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-red-600 rounded-l-md hover:bg-red-50"
                    href={lessons.prev_page_url}
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

              {lessons.next_page_url ? (
                <li>
                  <Link
                    className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-red-600 rounded-r-md hover:bg-red-50 -ml-px"
                    href={lessons.next_page_url}
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
