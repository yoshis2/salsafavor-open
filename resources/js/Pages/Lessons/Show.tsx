import React, { useEffect, useMemo, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Side from "@/Pages/Lessons/Side";
import type { Genre } from "@/types/Master";
import type { LessonDetail } from "@/types/Lesson";
import { FREQUENCY_LABELS, WEEK_LABELS } from "@/constants/lesson";

type PageProps = {
  lesson: LessonDetail;
  genres: Genre[];
  prefectures: Record<string, string>;
};

const pad2 = (value: number) => String(value).padStart(2, "0");

const formatLessonTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(`1970-01-01T${value}`);
  if (Number.isNaN(date.getTime())) return value;
  return `${pad2(date.getHours())}時${pad2(date.getMinutes())}分`;
};

const renderWithBreaks = (text?: string) => {
  if (!text) return null;
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));
};

export default function LessonShow() {
  const { lesson, genres, prefectures } = usePage<PageProps>().props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const images = useMemo(() => lesson?.images ?? [], [lesson]);

  // モーダル操作時のキーイベント
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setModalIndex((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === "ArrowRight") {
        setModalIndex((prev) => Math.min(prev + 1, images.length - 1));
      }
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isModalOpen, images.length]);

  const lessonImageSrc = (imageUrl?: string) => {
    if (!imageUrl) return "/img/no-image.png";
    if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) return imageUrl;
    return `/storage/lessons/${lesson.id}/${imageUrl}`;
  };

  const lessonMainImageSrc = () => {
    if (!lesson.image_url) return null;
    if (lesson.image_url.startsWith("http") || lesson.image_url.startsWith("/")) return lesson.image_url;
    if (lesson.user_id) {
      return `/storage/${lesson.user_id}/${lesson.image_url}`;
    }
    return `/storage/${lesson.image_url}`;
  };

  if (!lesson) {
    return <div className="text-gray-400 p-4">レッスン情報がありません</div>;
  }

  return (
    <MainLayout>
      <Head title={`${lesson.name}のレッスン詳細`}>
        <meta
          name="description"
          content={`${lesson.name}のレッスン情報の詳細はこちら。レッスンに通って上達しよう|サルサの総合ポータルSalsaFavor`}
        />
      </Head>

      {/* --- サイドバー (検索条件) --- */}
      <Side genres={genres} prefectures={prefectures} />

      {/* --- メインコンテンツ --- */}
      <article className="w-full lg:col-span-9 lg:order-1 px-2 sm:px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-red-600 pl-2 relative before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-danger text-gray-800">
          {lesson.name}
        </h1>

        {lessonMainImageSrc() && (
          <div className="text-center mb-8">
            <img
              className="max-w-full h-auto mx-auto rounded shadow-sm"
              src={lessonMainImageSrc() as string}
              alt={lesson.name}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-800 m-0">レッスン詳細情報</h2>
          </div>
          <table className="w-full text-left border-collapse text-sm md:text-base">
            <tbody className="divide-y divide-gray-100">
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 w-1/3 border-r border-gray-100">
                  ジャンル
                </td>
                <td className="py-3 px-4 text-gray-800" colSpan={3}>
                  {lesson.genres?.map((genre) => genre.name).join(" ")}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">開催日時</td>
                <td className="py-3 px-4 text-gray-800" colSpan={3}>
                  {FREQUENCY_LABELS[lesson.frequency] ?? lesson.frequency} {WEEK_LABELS[lesson.week] ?? lesson.week}{" "}
                  {formatLessonTime(lesson.start_time)} 〜 {formatLessonTime(lesson.end_time)}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">
                  インストラクター
                </td>
                <td className="py-3 px-4 text-gray-800" colSpan={3}>
                  {lesson.instructor}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">会場</td>
                <td className="py-3 px-4 text-gray-800">{lesson.place}</td>
                {/* テーブルレイアウトの都合上、PCでは分割、スマホでは積むなどの調整が必要だが、ここではシンプルなリスト形式へ変更せずにテーブル維持 */}
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">最寄駅</td>
                <td className="py-3 px-4 text-gray-800">{lesson.station}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-2">住所</h3>
            <p className="text-gray-700">
              {lesson.prefecture?.name}
              {lesson.address}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-2">レッスン価格</h3>
            <p className="text-gray-700 leading-relaxed">{renderWithBreaks(lesson.price)}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-2">詳細情報</h3>
            <p className="text-gray-700 leading-relaxed">{renderWithBreaks(lesson.details)}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-2">Webページ</h3>
            <p>
              <a href={lesson.web} target="_blank" rel="noopener" className="text-blue-600 hover:underline break-all">
                {lesson.web}
              </a>
            </p>
          </div>
        </div>

        {/* --- 画像カルーセル (Tailwind) --- */}
        {images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">レッスンイメージ</h2>
            <div className="relative group bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <div className="relative h-75 md:h-112">
                {images.map((image, index) => (
                  <div
                    key={`${image.image_url}-${index}`}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center ${
                      index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={lessonImageSrc(image.image_url)}
                      alt={`${lesson.name} イメージ ${index + 1}`}
                      className="max-w-full max-h-full object-contain cursor-zoom-in"
                      onClick={() => {
                        setModalIndex(index);
                        setIsModalOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>

              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20 transition-colors focus:outline-none"
                    onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={activeIndex === 0}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20 transition-colors focus:outline-none"
                    onClick={() => setActiveIndex((prev) => Math.min(prev + 1, images.length - 1))}
                    disabled={activeIndex === images.length - 1}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === activeIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                      }`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`スライド ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-800 m-0">その他情報</h2>
          </div>
          <table className="w-full text-left border-collapse text-sm md:text-base">
            <tbody className="divide-y divide-gray-100">
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 w-1/3 border-r border-gray-100">
                  問合せメール
                </td>
                <td className="py-3 px-4 text-gray-800">{lesson.mail}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">電話番号</td>
                <td className="py-3 px-4 text-gray-800">{lesson.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- 画像拡大モーダル (Tailwind) --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 transition-opacity" onClick={() => setIsModalOpen(false)} />

            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col z-50 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h5 className="text-lg font-bold text-gray-800">{lesson.name} - イメージギャラリー</h5>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-100 relative">
                <img
                  className="max-w-full max-h-[70vh] object-contain shadow-lg"
                  src={lessonImageSrc(images[modalIndex]?.image_url)}
                  alt="レッスンイメージ拡大表示"
                />

                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      onClick={() => setModalIndex((prev) => Math.max(prev - 1, 0))}
                      disabled={modalIndex === 0}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      onClick={() => setModalIndex((prev) => Math.min(prev + 1, images.length - 1))}
                      disabled={modalIndex >= images.length - 1}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <div className="p-4 border-t border-gray-200 text-center text-sm text-gray-500">
                {modalIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        )}
      </article>
    </MainLayout>
  );
}
