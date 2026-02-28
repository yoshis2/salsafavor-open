import { useEffect, useMemo, useRef, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";

type CarouselItem = {
  route: string;
  webp: string;
  jpg: string;
  alt: string;
  caption: string;
};

type PageProps = {
  carouselItems: CarouselItem[];
  flash?: Record<string, string>;
};

export default function Home() {
  const { carouselItems, flash } = usePage<PageProps>().props;
  const firstItem = carouselItems?.[0];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const intervalMs = 5000;

  const slides = useMemo(() => {
    if (!carouselItems || carouselItems.length === 0) return [];
    const first = carouselItems[0];
    const last = carouselItems[carouselItems.length - 1];
    return [last, ...carouselItems, first];
  }, [carouselItems]);

  const totalSlides = carouselItems?.length ?? 0;
  const activeIndex = totalSlides === 0 ? 0 : (currentIndex - 1 + totalSlides) % totalSlides;
  const slideBasis = slides.length > 0 ? 100 / slides.length : 100;
  const trackTranslate = slides.length > 0 ? (currentIndex * 100) / slides.length : 0;
  const flashEntries = useMemo(() => Object.entries(flash ?? {}), [flash]);

  useEffect(() => {
    if (!carouselItems || carouselItems.length === 0) return;
    setIsTransitioning(false);
    setCurrentIndex(1);

    const resumeTransition = window.requestAnimationFrame(() => {
      setIsTransitioning(true);
    });

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    if (carouselItems.length > 1) {
      timerRef.current = window.setInterval(() => {
        if (isPausedRef.current) return;
        setCurrentIndex((prev) => prev + 1);
      }, intervalMs);
    }

    return () => {
      window.cancelAnimationFrame(resumeTransition);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [carouselItems]);

  const goToIndex = (index: number) => {
    if (!carouselItems || carouselItems.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  const handlePrev = () => {
    if (!carouselItems || carouselItems.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!carouselItems || carouselItems.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePause = () => {
    isPausedRef.current = true;
  };

  const handleResume = () => {
    isPausedRef.current = false;
  };

  const handleTransitionEnd = () => {
    if (totalSlides === 0) return;
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
      window.requestAnimationFrame(() => setIsTransitioning(true));
    }
    if (currentIndex === totalSlides + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
      window.requestAnimationFrame(() => setIsTransitioning(true));
    }
  };

  return (
    <MainLayout>
      <Head title="サルサダンスの始め方からイベント・レッスン情報まで | SalsaFavor">
        <meta
          name="description"
          content="サルサやバチャータを始めたい初心者から経験者まで！SalsaFavorなら最新イベント、人気レッスン、おすすめ用品（シューズ、音楽、映画）情報が満載。あなたのサルサライフを熱くサポートします！"
        />

        {/* Bootstrap用の<style>タグは削除済み */}
      </Head>

      <article className="col-span-12 w-full">
        <h1 className="mt-6 mb-4 text-2xl md:text-3xl font-bold text-gray-800">
          サルサダンスの全てがここに！SalsaFavorで始める情熱のステップ
        </h1>

        {/* カルーセル (Tailwind版) */}
        <div className="relative group" onMouseEnter={handlePause} onMouseLeave={handleResume}>
          {/* Viewport */}
          <div className="overflow-hidden rounded-lg bg-gray-50 relative h-75 sm:h-[55vw] md:h-125 lg:h-150 max-h-175">
            <div
              className={`flex h-full ${isTransitioning ? "transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" : ""}`}
              style={{
                transform: `translate3d(-${trackTranslate}%, 0, 0)`,
                width: `${slides.length * 100}%`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((item, index) => (
                <div
                  key={`${item.jpg}-${index}`}
                  className="relative block h-full flex-none"
                  style={{ width: `${slideBasis}%` }}
                >
                  <a href={item.route} className="block w-full h-full">
                    <picture>
                      <source srcSet={item.webp} type="image/webp" />
                      <img
                        src={item.jpg}
                        alt={item.alt}
                        fetchPriority={index === 1 ? "high" : "auto"}
                        className="w-full h-full object-cover object-[center_40%]"
                        loading={index === 1 ? "eager" : "lazy"}
                      />
                    </picture>
                  </a>
                  {/* キャプション (PCのみ表示) */}
                  <div className="hidden md:block absolute z-10 bg-black/65 text-white p-5 rounded bottom-10 left-[10%] right-[10%]">
                    <h5 className="text-[30px] lg:text-[50px] font-bold drop-shadow-md mb-0 leading-tight text-center">
                      {item.caption}
                    </h5>
                  </div>
                </div>
              ))}
            </div>

            {/* コントロールボタン (Prev/Next) */}
            <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
              <button
                className="pointer-events-auto border-none bg-black/35 text-white w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors"
                type="button"
                onClick={handlePrev}
                aria-label="Previous"
              >
                <span className="text-2xl pb-1">‹</span>
              </button>
              <button
                className="pointer-events-auto border-none bg-black/35 text-white w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors"
                type="button"
                onClick={handleNext}
                aria-label="Next"
              >
                <span className="text-2xl pb-1">›</span>
              </button>
            </div>
          </div>

          {/* インジケーター (モバイル用ドット) */}
          <ol className="flex gap-1.5 justify-center mt-2.5 p-0 list-none md:hidden">
            {carouselItems?.map((_, index) => (
              <li key={index}>
                <button
                  type="button"
                  className={`w-2.5 h-2.5 rounded-full border-none p-0 cursor-pointer transition-colors duration-200 ${
                    index === activeIndex ? "bg-danger" : "bg-gray-300"
                  }`}
                  onClick={() => goToIndex(index)}
                  aria-label={`slide-${index + 1}`}
                ></button>
              </li>
            ))}
          </ol>
        </div>

        {/* サムネイル一覧 (PC用) */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 mt-3" id="carousel-thumbnails">
          {carouselItems?.map((item, index) => (
            <div key={`${item.jpg}-thumb`} className="cursor-pointer">
              <picture>
                <source srcSet={item.webp} type="image/webp" />
                <img
                  className={`w-full h-auto rounded border-2 transition-all duration-200 ${
                    index === activeIndex
                      ? "border-red-600 opacity-100"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => goToIndex(index)}
                  src={item.jpg}
                  alt={`Thumbnail ${item.alt}`}
                  loading="lazy"
                />
              </picture>
            </div>
          ))}
        </div>

        {/* メイン紹介カード */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mt-8 mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
              SalsaFavorで始める！サルサダンスもバチャータも、情熱ラテンダンスの世界へ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                SalsaFavorは、<strong>サルサダンス</strong>
                やバチャータなど、心躍るラテンダンスの世界への扉を開く総合情報ポータルです。
                「踊る楽しさを、もっと多くの人に」「サルサの輪を広げたい」そんな情熱からSalsaFavorは誕生しました。
              </p>
              <p>
                <strong>サルサダンス</strong>
                初心者の方が安心してスタートできる基本情報はもちろん、経験者がさらに輝くための最新イベント・レッスン情報、
                そしてあなたの<strong>サルサダンス</strong>
                ライフを豊かに彩るおすすめ用品（シューズ、音楽、映画など）まで、その魅力を凝縮してお届け。
                SalsaFavorで新しい自分を発見し、毎日をもっとアクティブに、情熱的に楽しみませんか？
              </p>
              <p>
                SalsaFavorが提供する充実のコンテンツで、あなたの<strong>サルサダンス</strong>
                体験を全力でサポートします！
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                {
                  icon: "fa-calendar-alt",
                  title: "最新サルサダンスイベント情報",
                  desc: "全国のサルサダンスパーティーやバチャータワークショップを網羅！今夜踊れる場所もすぐに見つかります。",
                },
                {
                  icon: "fa-graduation-cap",
                  title: "厳選サルサダンスレッスンガイド",
                  desc: "初心者向けから上級者向けまで、あなたにぴったりのサルサダンス・バチャータレッスンをご紹介。",
                },
                {
                  icon: "fa-film",
                  title: "感動サルサダンス映画特集",
                  desc: "サルサダンスへの情熱をさらに燃え上がらせる、おすすめの関連映画をピックアップ。",
                },
                {
                  icon: "fa-shopping-cart",
                  title: "人気サルサダンス用品ナビ",
                  desc: "快適なサルサダンスシューズや最新ラテン音楽CDなど、マストアイテムを簡単検索。",
                },
                {
                  icon: "fa-lightbulb",
                  title: "サルサダンス初心者向け完全ガイド",
                  desc: "サルサダンスの始め方から服装、基本ステップまで、あなたの「？」を「！」に変えるお役立ち情報満載。",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <i className={`fas ${item.icon} mt-1 mr-3 text-red-600 w-5 text-center`}></i>
                  <div>
                    <strong>{item.title}:</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* イベント・レッスン カードセクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* イベント情報 */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col h-full">
            <div className="p-6 md:p-8 flex flex-col h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                <i className="fas fa-map-marked-alt mr-2 text-red-600"></i>
                週末どこでサルサダンスを踊る？最新イベントをチェック！
              </h2>
              <div className="space-y-4 text-gray-700 grow">
                <p>
                  「今夜<strong>サルサダンス</strong>
                  を踊りに行きたい！」「近くでサルサパーティーはないかな？」SalsaFavorなら、全国の
                  <strong>サルサダンス</strong>
                  、バチャータ、キゾンバなどの最新イベント情報を簡単に見つけられます。熱気あふれるパーティーから、スキルアップできるワークショップまで、あなたにぴったりのイベントがきっと見つかります。
                </p>
                <p>
                  イベント主催者様は、会員登録するだけで無料でイベント情報を掲載可能！あなたのイベントを多くのサルサファンに届けましょう。
                </p>
                <p>
                  ジャンルや日付での検索も充実。過去のイベント情報も参考に、次の<strong>サルサダンス</strong>
                  計画を立てましょう！
                </p>
              </div>
              <button
                className="w-full mt-6 bg-danger hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors duration-200 shadow-sm"
                type="button"
                onClick={() => {
                  window.location.href = "/events";
                }}
              >
                イベントを確認したい方はこちら
              </button>
            </div>
          </div>

          {/* レッスン情報 */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col h-full">
            <div className="p-6 md:p-8 flex flex-col h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                <i className="fas fa-chalkboard-teacher mr-2 text-red-600"></i>
                憧れのサルサダンスステップを習得！レッスン情報
              </h2>
              <div className="space-y-4 text-gray-700 grow">
                <p>
                  「サルサを基礎から学びたい」「もっと上手くなりたい！」そんなあなたを応援するレッスン情報が満載。初心者向けの体験レッスンから、経験者向けのレベルアップクラスまで、全国のダンススクールやインストラクターの情報を掲載しています。
                </p>
                <p>
                  曜日や時間、ジャンルで検索して、あなたのライフスタイルに合ったレッスンを見つけましょう。
                  インストラクターの方も無料でレッスン情報を登録できます。あなたの指導で、多くのダンサーを育てませんか？
                </p>
                <p>
                  イベント情報と同じアカウントでレッスン情報も登録可能。あなたの<strong>サルサダンス</strong>
                  活動をSalsaFavorがサポートします。
                </p>
              </div>
              <button
                className="w-full mt-6 bg-danger hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors duration-200 shadow-sm"
                type="button"
                onClick={() => {
                  window.location.href = "/lessons";
                }}
              >
                レッスンを確認したい方はこちら
              </button>
            </div>
          </div>
        </div>

        {/* 用品・映画 カードセクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* おすすめ用品 */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col h-full">
            <div className="p-6 md:p-8 flex flex-col h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                <i className="fas fa-shoe-prints mr-2 text-red-600"></i>サルサダンスがもっと楽しくなる！おすすめ用品
              </h2>
              <div className="space-y-4 text-gray-700 grow">
                <p>
                  お気に入りのアイテムは、ダンスをさらに楽しく、快適にしてくれます。
                  SalsaFavorでは、楽天で人気の商品を中心に、あなたのダンスライフを彩るグッズを簡単に見つけられるようにナビゲートします（※楽天の許可を得て情報提供しています）。
                </p>
                <p>主に以下のカテゴリーの商品を探しやすくしています。</p>
                <ul className="list-none space-y-2 ml-1">
                  <li>
                    <i className="fas fa-female mr-1"></i>
                    <i className="fas fa-male mr-2"></i>サルサ・ラテンダンスシューズ
                  </li>
                  <li>
                    <i className="fas fa-tshirt mr-2 text-gray-500"></i>
                    <strong>サルサダンス</strong>ウェア・レッスン着・衣装
                  </li>
                  <li>
                    <i className="fas fa-music mr-2 text-gray-500"></i>
                    <strong>サルサダンス</strong>・バチャータ等のラテン音楽CD/DVD
                  </li>
                  <li>
                    <i className="fas fa-video mr-2 text-gray-500"></i>
                    <strong>サルサダンス</strong>教則DVD・関連映像作品
                  </li>
                </ul>
                <p>
                  特にダンスシューズは、初心者向けの手頃なものから、慣れてきた方向けの高品質なものまで様々。あなたにぴったりの一足を見つけて、フロアを軽やかにステップしましょう！
                </p>
                <p className="text-xs text-gray-500">
                  ※SalsaFavorは商品情報の提供を行っており、直接販売はしておりません。検索精度は随時改善予定です。
                </p>
              </div>
              <button
                className="w-full mt-6 bg-danger hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors duration-200 shadow-sm"
                type="button"
                onClick={() => {
                  window.location.href = "/shop/rakuten/shoes";
                }}
              >
                <strong>サルサダンス</strong>シューズはこちら
              </button>
            </div>
          </div>

          {/* おすすめ映画 */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col h-full">
            <div className="p-6 md:p-8 flex flex-col h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                <i className="fas fa-ticket-alt mr-2 text-red-600"></i>情熱をスクリーンで！おすすめサルサダンス映画
              </h2>
              <div className="space-y-4 text-gray-700 grow">
                <p>
                  ダンスフロアを飛び出して、映画の世界でサルサの魅力に触れてみませんか？心揺さぶる音楽、情熱的なダンスシーン、感動のストーリー。
                  サルサ映画は、あなたのダンスへのモチベーションをさらに高めてくれるはずです。
                </p>
                <p>SalsaFavorでは、観るだけで踊りたくなる、店長おすすめのサルサ関連映画を厳選してご紹介します。</p>
              </div>
              <button
                className="w-full mt-6 bg-danger hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors duration-200 shadow-sm"
                type="button"
                onClick={() => {
                  window.location.href = "/shop/dvd";
                }}
              >
                <strong>サルサダンス</strong>映画情報はこちら
              </button>
            </div>
          </div>
        </div>

        {/* 初心者ガイド */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              サルサダンスの世界へ、最初の一歩を応援！初心者向け完全ガイド
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                「サルサダンスを始めたいけど、何から準備すればいいの？」「一人でも大丈夫かな…」そんな
                <strong>サルサ初心者</strong>さんの不安を解消し、スムーズなスタートを応援するのがSalsaFavorです。
                インターネットで「<strong>サルサ ダンス 始め方</strong>
                」と検索してこのサイトにたどり着いたあなたへ、必要な情報を分かりやすくお届けします。
              </p>
              <p>
                サルサには様々な<strong>スタイル</strong>
                があり、どれを選べば良いか迷うかもしれません。また、クラブではサルサ以外の音楽（バチャータ、メレンゲ、チャチャチャなど）も楽しめます。
                どんな<strong>服装</strong>で参加すればいいのか、専用の<strong>サルサダンスシューズ</strong>
                は必要なのか、といった基本的な疑問にも丁寧にお答えします。
                SalsaFavorでは、これらの情報を網羅的に解説し、あなたが自信を持ってサルサの世界に飛び込めるようサポートします。
              </p>
              <p>
                サルサやバチャータといったラテンダンスは、<strong>最初のステップ</strong>と<strong>継続</strong>
                がとても大切です。
                初心者の時期を乗り越え、上達する喜びを感じられれば、それはきっとあなたの人生を豊かにする素晴らしい趣味になるでしょう。SalsaFavorが、その大切な「最初の一歩」と「続ける楽しさ」を見つけるお手伝いをします。
              </p>
              <p>
                もし、<strong>サルサダンス</strong>
                に関してわからないことや不安なことがあれば、どうぞお気軽にSalsaFavorまでお問い合わせください。あなたのサルサデビューを全力で応援します！
              </p>
            </div>
            <button
              className="w-full mt-6 bg-danger hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors duration-200 shadow-sm"
              type="button"
              onClick={() => {
                window.location.href = "/inquiry";
              }}
            >
              サルサに関するご質問・お問い合わせはこちら
            </button>
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
