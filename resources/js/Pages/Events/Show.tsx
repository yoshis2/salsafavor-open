import React, { useEffect, useMemo, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Side from "@/Pages/Events/Side";
import type { Genre } from "@/types/Master";
import type { EventDetail } from "@/types/Event";

type PageProps = {
  event: EventDetail;
  dates: string[];
  genres: Genre[];
  prefectures: Record<string, string>;
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

const renderWithBreaks = (text?: string) => {
  if (!text) return null;
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));
};

export default function EventShow() {
  const { event, dates, genres, prefectures } = usePage<PageProps>().props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const images = useMemo(() => event?.images ?? [], [event]);

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
    document.body.style.overflow = "hidden"; // スクロールロック
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isModalOpen, images.length]);

  const eventImageSrc = (imageUrl?: string) => {
    if (!imageUrl) return "/img/no-image.png";
    if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) return imageUrl;
    if (event?.created_date) {
      return `/storage/events/${event.created_date}/${event.id}/${imageUrl}`;
    }
    return `/storage/events/${event.id}/${imageUrl}`;
  };

  if (!event) {
    return <div className="text-gray-400 p-4">イベント情報がありません</div>;
  }

  return (
    <MainLayout>
      <Head title={`${event.name}のイベント情報詳細`}>
        <meta
          name="description"
          content={`${event.name}のイベント情報詳細です。参加したいイベント情報の知りたい情報はありますか`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.name,
            startDate: event.start_datetime,
            endDate: event.end_datetime,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: event.place,
              address: (event.prefecture?.name ?? "") + (event.address ?? ""),
            },
            image: event.images?.map((img) => eventImageSrc(img.image_url)),
            description: event.details,
            organizer: {
              "@type": "Person",
              name: event.owner,
            },
          })}
        </script>
      </Head>

      {/* --- サイドバー (検索条件) --- */}
      <Side dates={dates} genres={genres} prefectures={prefectures} showRakutenWidget />

      {/* --- メインコンテンツ --- */}
      <article className="w-full lg:col-span-9 lg:order-1 px-2 sm:px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-red-600 pl-2 relative before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-danger">
          {event.name}
        </h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-800 m-0">イベント情報</h2>
          </div>
          <div className="p-0">
            <table className="w-full text-left border-collapse text-sm md:text-base">
              <tbody className="divide-y divide-gray-100">
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 w-1/3 border-r border-gray-100">
                    イベント日時
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {formatDateTime(event.start_datetime)} ~ {formatTime(event.end_datetime)}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">
                    音楽ジャンル
                  </td>
                  <td className="py-3 px-4 text-gray-800">{event.genres?.map((genre) => genre.name).join(" ")}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">オプション</td>
                  <td className="py-3 px-4 text-gray-800">
                    {event.lesson ? "レッスンあり" : "レッスンなし"} -
                    {event.performance ? "パフォーマンスあり" : "パフォーマンスなし"}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">DJ</td>
                  <td className="py-3 px-4 text-gray-800">{event.dj}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">会場</td>
                  <td className="py-3 px-4 text-gray-800">{event.place}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">最寄駅</td>
                  <td className="py-3 px-4 text-gray-800">{event.station}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-2">住所</h3>
            <p className="text-gray-700">
              {event.prefecture?.name}
              {event.address}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-2">イベント価格</h3>
            <p className="text-gray-700 leading-relaxed">{renderWithBreaks(event.price)}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-2">詳細情報</h3>
            <p className="text-gray-700 leading-relaxed">{renderWithBreaks(event.details)}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-2">地図</h3>
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-200">
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  (event.prefecture?.name ?? "") + (event.address ?? event.place ?? ""),
                )}&output=embed`}
                className="w-full h-full border-0"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-2">Webページ</h3>
            <p>
              <a
                href={event.web}
                target="_blank"
                rel="nofollow noopener"
                className="text-blue-600 hover:underline break-all"
              >
                {event.web}
              </a>
            </p>
          </div>
        </div>

        {/* --- 画像カルーセル (Tailwind) --- */}
        {images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">イベントイメージ</h2>
            <div className="relative group bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              {/* スライド表示エリア */}
              <div className="relative h-75 md:h-112.5">
                {images.map((image, index) => (
                  <div
                    key={`${image.image_url}-${index}`}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center ${
                      index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={eventImageSrc(image.image_url)}
                      alt={`${event.name} イメージ ${index + 1}`}
                      className="max-w-full max-h-full object-contain cursor-zoom-in"
                      onClick={() => {
                        setModalIndex(index);
                        setIsModalOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* コントロール (Prev/Next) */}
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

              {/* インジケーター */}
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
            <h2 className="text-lg font-bold text-gray-800 m-0">その他</h2>
          </div>
          <table className="w-full text-left border-collapse text-sm md:text-base">
            <tbody className="divide-y divide-gray-100">
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 w-1/3 border-r border-gray-100">主催者</td>
                <td className="py-3 px-4 text-gray-800">{event.owner}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">問合せメール</td>
                <td className="py-3 px-4 text-gray-800">{event.mail}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-r border-gray-100">問合せ電話</td>
                <td className="py-3 px-4 text-gray-800">{event.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- 画像拡大モーダル (Tailwind) --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* バックドロップ */}
            <div className="absolute inset-0 bg-black/80 transition-opacity" onClick={() => setIsModalOpen(false)} />

            {/* モーダル本体 */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col z-50 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h5 className="text-lg font-bold text-gray-800">{event.name} - イメージギャラリー</h5>
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
                  src={eventImageSrc(images[modalIndex]?.image_url)}
                  alt="イベントイメージ拡大表示"
                />

                {/* モーダル内ナビゲーション */}
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
