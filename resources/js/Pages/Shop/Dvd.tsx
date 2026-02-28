import Sidebar from "./Sidebar";
import MainLayout from "@/Layouts/MainLayout";

const toc = [
  { id: "intheheights", label: "イン・ザ・ハイツ" },
  { id: "mambo", label: "マンボ・マン" },
  { id: "salsa", label: "Salsa!" },
  { id: "havana", label: "ダンシング ハバナ(ダーティダンシング2)" },
  { id: "elcantante", label: "エル・カンタンテ　熱情のサルサ" },
  { id: "comeback", label: "カムバック！" },
  { id: "withme", label: "ダンス・ウィズ・ミー" },
];

export default function Dvd() {
  return (
    <MainLayout
      title="Salsa!やエルカンタンテ、ダンシングハバナ等の名作サルサ映画紹介"
      description="Salsa!やエルカンタンテ、ダンシングハバナ等のなつかしいサルサ映画の紹介をしています。一番古い映画で1998年です。もうDVDの生産が終了したものばかりです。中古でも良ければお買い求めできます。"
    >
      {/* モバイル時はサイドバーを上部に表示 */}
      {typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 767.98px)").matches && (
        <div className="mb-6">
          <Sidebar />
        </div>
      )}
      <article className="w-full lg:col-span-9 lg:order-1 mb-10 lg:mb-0 px-2 sm:px-4 md:px-6">
        <h1>往年のサルサ ダンス 映画</h1>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-10 shadow-sm">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-gray-800">目次</div>
          <div className="divide-y divide-gray-100">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block px-4 py-3 text-red-600 hover:bg-gray-50 hover:text-red-800 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* 各セクション */}
        <div className="space-y-12">
          <section id="intheheights">
            <h2>『イン・ザ・ハイツ』（In the Heights） (2021年公開)</h2>
            <div className="ml-0 md:ml-4">
              <h3>イン・ザ・ハイツ 概要</h3>
              <ul className="list-disc ml-5 space-y-2 text-gray-700">
                <li>
                  ブロードウェイミュージカルの映画化で、リン＝マニュエル・ミランダ（『ハミルトン』の作者）が手掛けた作品です。
                </li>
                <li>
                  ニューヨークのワシントン・ハイツに住むラテン系移民のコミュニティが舞台で、サルサ、メレンゲ、バチャータなど、多様なラテンのリズムに乗せた歌とダンスが全編に渡って繰り広げられます。まさに「ラテンダンス」を存分に楽しめる映画の代表格と言えるでしょう。批評家からも絶賛され、その熱気あふれるパフォーマンスは多くの観客を魅了しました。
                </li>
              </ul>
            </div>
          </section>

          <section id="mambo">
            <h2>『マンボ・マン』（Mambo Man） (2020年制作、2024年7月日本配信開始)</h2>
            <div className="ml-0 md:ml-4">
              <h3>マンボ・マン 概要</h3>
              <ul className="list-disc ml-5 space-y-2 text-gray-700">
                <li>
                  キューバの活気ある音楽シーンを舞台にした作品で、ブエナ・ビスタ・ソシアル・クラブのメンバーも参加しています。
                </li>
                <li>
                  直接的なダンス映画というよりは、音楽と文化に焦点を当てた作品ですが、キューバ音楽が中心なので、マンボやサルサなどのラテンダンスの要素も自然と含まれていると考えられます。
                </li>
              </ul>
            </div>
          </section>

          <section id="salsa">
            <h2>Salsa!</h2>
            <div className="ml-0 md:ml-4 space-y-4 text-gray-700">
              <h3>Salsa! 概要</h3>
              <p>
                1999年にフランスとドイツの共同で作成された名画です。映画のオープニングが印象的でサルサの音楽もいい曲ばかりです。
              </p>
              <p>
                若き天才クラシックピアニスト、レミ。ショパンを捨てて彼が選んだのは、情熱の音楽サルサだった。ところが、パリのラテンバンドが望んでいるのは本物のキューバ人。レミは自分の肌をチョコレート色に変えて、伝説のキューバ人作曲家ベレートのもと、閉鎖寸前のキューバ・バーでサルサのダンスレッスンを始める。
              </p>
              <p>
                そこにシャイなパリジェンヌ、ナタリーが現われて……。情熱的なラテン音楽を全編に配したラブ・ストーリー。
              </p>

              <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">Salsa! サンプルムービー</h3>
              <div className="w-full max-w-2xl mx-auto aspect-video rounded overflow-hidden bg-black shadow-lg">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/-A8skIXfXmQ"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Salsa! サンプルムービー"
                />
              </div>

              <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">販売</h3>
              <p>すでに生産は終了しており中古品のみの販売です。売切れの場合はお問合せください。</p>
            </div>
          </section>

          <section id="havana">
            <h2>ダンシング ハバナ(ダーティダンシング2)</h2>
            <div className="ml-0 md:ml-4 space-y-4 text-gray-700">
              <h3>ダンシング ハバナ 概要</h3>
              <p>2004年制作のアメリカ合衆国の映画。 『ダーティ・ダンシング』を元にした恋愛映画</p>
              <p>
                1958年、アメリカ人の女子高生ケイティは父親の転勤で、一家でキューバのハバナにやってきた。しかし、高級ホテルでゴージャスな生活を送る同じアメリカ人のグループにはなじめず、街に繰り出す。そこで、地元の人々が踊るサルサダンスに強く惹かれる。
              </p>
              <p>
                ケイティはダンサーの1人で、彼女が滞在するホテルでウェイターをしている青年ハビエルと知り合い、一緒に踊る仲にまでなったが、ハビエルは客と親しくなったという理由で解雇されてしまう。
              </p>
              <p>
                ハビエルが家族でアメリカに移住する事を夢見ていると知ったケイティは、優勝者に高額な賞金が支払われるダンス・コンテストに一緒に出場する事を持ちかけ、レッスンに励む。
              </p>
              <p>
                本番で見事、決勝まで勝ち残った2人であったが、その時思わぬ事態が発生する。キューバ革命が勃発したのだ。そしてこれが2人の関係にも大きな影響を与えるのだった。
              </p>

              <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">サンプルムービー</h3>
              <p>ありません。</p>
              <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">販売</h3>
              <p>すでに生産は終了しており中古品のみの販売です。売切れの場合はお問合せください。</p>
            </div>
          </section>

          <section id="elcantante">
            <h2>エル・カンタンテ　熱情のサルサ</h2>
            <div className="ml-0 md:ml-4 space-y-4 text-gray-700">
              <h3>エル・カンタンテ　熱情のサルサ 概要</h3>
              <p>
                2006年のアメリカ映画。サルサ歌手のエクトル・ラボーを描いた伝記映画。歌手のマーク・アンソニーがラボーを、アンソニーの元妻で女優兼歌手のジェニファー・ロペスがラボーの妻を演じた。
              </p>
              <p>
                1963年、歌手を夢見てプエルトリコからニューヨークへやって来た17歳のエクトルは、数ヵ月後にはナイトクラブで客の歓声を浴びるようになる。
              </p>
              <p>
                ウィリー・コロン率いるバンドのボーカリストとしてデビューしたエクトルは、その伸びやかな歌声で瞬く間にスターへの階段を駆け上っていくが紆余曲折がある。
              </p>
              <p>「歌手の中の歌手」と呼ばれたエクトル・ラボーの生涯を描くサルサ音楽ドラマ。</p>

              <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">サンプルムービー</h3>
              <p>ありません。</p>
              <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">販売</h3>
              <p>すでに生産は終了しており中古品のみの販売です。売切れの場合はお問合せください。</p>
            </div>
          </section>

          <section id="comeback">
            <h2>カムバック！</h2>
            <div className="ml-0 md:ml-4 space-y-4 text-gray-700">
              <h3>カムバック！ 概要</h3>
              <p>
                2014年のイギリスのロマンティック・コメディ映画です。意中の美人上司を振り向かせるべく、少年時代に封印したサルサダンスに25年ぶりに挑戦する中年メタボ男の奮闘を描くコメディー。
              </p>
              <p>
                25年前、妹のサムと共に天才子供サルサダンサーとしてイギリス中に名を轟かせていたブルースだったが、全国大会決勝の当日、激しいイジメにあい、それが原因でサルサへの情熱を捨ててしまう。
              </p>
              <p>
                そして現在、ブルースは冴えない肥満の中年サラリーマンになってしまっていた。ある日、彼のもとに新しい上司のジュリアがアメリカ合衆国から赴任してくる。
              </p>
              <p>
                美人で仕事もできるジュリアに一目惚れしたブルースだったが、自分に自信を持てない彼はジュリアに思いを告げることができずにいた。
              </p>
              <p>
                しかし、ブルースはふとしたきっかけから、ジュリアがサルサに夢中になっていることを知る。そこでブルースは一念発起し、ジュリアの心を掴むため、もう一度サルサダンサーにカムバックすることを決意するのだった。
              </p>
              <p>
                早速ブルースは、かつての恩師であるロンを説得し、再びサルサを踊れるよう猛特訓を開始する。だが、長い年月サルサから離れていた肥満のブルースが、かつてのように華麗に踊れるわけはなく、カムバックへの道は大変険しいものとなる。
              </p>

              <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">カムバック！ サンプルムービー</h3>
              <div className="w-full max-w-2xl mx-auto aspect-video rounded overflow-hidden bg-black shadow-lg">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/bvDYYpulX7w"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="カムバック！ サンプルムービー"
                />
              </div>

              <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">販売</h3>
              <p>すでに生産は終了しており中古品のみの販売です。売切れの場合はお問合せください。</p>
            </div>
          </section>

          <section id="withme">
            <h2>ダンス・ウィズ・ミー</h2>
            <div className="ml-0 md:ml-4 space-y-4 text-gray-700">
              <h3>ダンス・ウィズ・ミー 概要</h3>
              <p>
                1998年のアメリカ映画でヴァネッサ・ウィリアムズ主演のダンシング・ムービー。チャンピオンに返り咲きを狙うトップ・ダンサーと、キューバからやって来た若者との恋模様を描く。
              </p>
              <p>
                若いキューバのラファエルは母親の死後、ヒューストンに来て父親のジョンに会いに行きました。しかし、ジョンは自分がラファエルの父親であることを知らないのです。
              </p>
              <p>
                ジョンはダンススタジオを運営しており、誰もが知っているラスベガスで開催されるワールドオープンダンスチャンピオンシップの準備をしています。
              </p>
              <p>
                ラファエルは非常に優れたダンサーであることがすぐにわかり、チャンピオンシップのスタジオにとって希望の星です。
              </p>

              <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">サンプルムービー</h3>
              <p>ありません。</p>
              <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">販売</h3>
              <p>すでに生産は終了しており中古品のみの販売です。売切れの場合はお問合せください。</p>
            </div>
          </section>
        </div>
      </article>

      {/* PC時はasideでサイドバーを右側に表示 */}
      {typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(max-width: 767.98px)").matches && (
        <aside className="w-full lg:col-span-3 lg:order-2">
          <Sidebar />
        </aside>
      )}
    </MainLayout>
  );
}
