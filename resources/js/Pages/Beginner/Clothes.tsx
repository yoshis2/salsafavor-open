import MainLayout from "@/Layouts/MainLayout";
import Side from "./Side";

export default function Clothes() {
  return (
    <MainLayout
      title="サルサ初心者の服装＆靴ガイド｜動きやすさとマナー"
      description="サルサイベントやレッスン向けの服装と靴選びを男女別に分かりやすく解説します。"
    >
      <div className="w-full px-3 lg:col-span-12 lg:grid lg:grid-cols-10 lg:gap-6">
        <Side />
        <article className="w-full lg:order-1 lg:col-span-7">
          <h1 className="text-2xl font-bold mb-6">サルサ初心者のための服装＆靴ガイド：何を着ていく？何を選ぶべき？</h1>
          <picture>
            <source srcSet="/img/beginner/crop-couple-dancing.webp" type="image/webp" />
            <source srcSet="/img/beginner/crop-couple-dancing.jpg" type="image/jpeg" />
            <img
              className="img-fluid mb-3"
              src="/img/beginner/crop-couple-dancing.jpg"
              alt="サルサを踊るカップルの服装と靴"
              width="100%"
              height="auto"
            />
          </picture>
          <p className="lead">
            「サルサに興味があるけど、どんな服装で行けばいいの？」「専用の靴は必要？」そんな不安を抱えるサルサ初心者さんは多いはず。
            この記事では、サルサイベントやレッスンに初めて参加する方が安心して楽しめるように、服装と靴選びの基本から男女別のおすすめスタイル、注意点まで詳しく解説します！
          </p>

          <section id="salsa-attire">
            <h2 className="mt-4 text-xl font-semibold">サルサの服装：基本は「動きやすさ」と「清潔感」</h2>
            <p>
              サルサのイベントやレッスンでは、意外とカジュアルでラフな服装の方がほとんどです。
              「サルサ＝華やかなドレス」というイメージがあるかもしれませんが、パフォーマンスや特別なパーティーでない限り、普段着に近いスタイルで問題ありません。
              大切なのは、<strong>動きやすく、汗をかいても快適で、周囲に配慮した清潔感のある服装</strong>
              を心がけることです。
            </p>

            <h2 className="card-title mb-0 text-lg font-bold">男性の服装：Tシャツ＆ジーンズが定番</h2>
            <picture>
              <source srcSet="/img/beginner/single_lesson.webp" type="image/webp" />
              <source srcSet="/img/beginner/single_lesson.png" type="image/png" />
              <img
                className="img-fluid"
                src="/img/beginner/single_lesson.png"
                alt="サルサのシングルステップを練習する様子"
              />
            </picture>
            <p>
              サルサを踊る際の男性の服装は、動きやすさと清潔感が基本です。
              ここでは、より快適に、そしてスタイリッシュに踊るための服装を「優・良・可・不可」でご紹介します。
            </p>

            <h3 className="mt-3 font-bold">評価：優 (Best Choice) - サルサを最大限に楽しむ服装</h3>
            <p>
              <strong>具体例：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>トップス：</strong>
                吸汗速乾性に優れたスポーツ用Tシャツ、ダンス用シャツ、体にフィットするポロシャツ。
              </li>
              <li>
                <strong>ボトムス：</strong>ストレッチ性の高いダンス用スラックス、動きやすい素材のチノパン。
              </li>
            </ul>
            <p>
              <strong>ポイント：</strong>動きやすさはもちろん、汗をかいても快適さを保てる素材を選びましょう。
              見た目もスタイリッシュで、自信を持って踊れます。特にダンス用に作られたウェアは、パフォーマンス向上にも繋がるでしょう。
            </p>

            <h3 className="mt-3 font-bold">評価：良 (Good Choice) - 多くの人が選ぶ安心のスタイル</h3>
            <p>
              <strong>具体例：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>トップス：</strong>清潔感のある無地やシンプルな柄のTシャツ、ポロシャツ。
              </li>
              <li>
                <strong>ボトムス：</strong>ストレッチ性のあるジーンズ（ダメージ加工なし）、チノパン。
              </li>
            </ul>
            <p>
              <strong>ポイント：</strong>
              サルサ初心者の方が最初に選ぶ服装として最も一般的です。動きやすく、普段着に近い感覚で参加できます。
              ただし、汗を大量にかくことを想定し、着替えのTシャツやタオルは必ず用意しましょう。
            </p>

            <h3 className="mt-3 font-bold">評価：可 (Acceptable) - 最低限踊れるが、工夫が必要な服装</h3>
            <p>
              <strong>具体例：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>トップス：</strong>普段着のコットンTシャツ。
              </li>
              <li>
                <strong>ボトムス：</strong>
                やや動きにくいジーンズ。会社帰りのスーツ（ジャケットは脱ぎ、ネクタイを緩めるなど工夫が必要）。
              </li>
            </ul>
            <p>
              <strong>ポイント：</strong>
              「とりあえず参加してみたい」という場合には許容範囲ですが、汗で重くなったり、動きが制限されたりする可能性があります。
              特にスーツの場合は、相手に窮屈な印象を与えないよう配慮が必要です。ビジネスシューズも滑りやすく踊りにくいことがあります。
            </p>

            <h3 className="mt-3 font-bold">評価：不可 (Not Recommended) - 避けるべき服装</h3>
            <p>
              <strong>具体例：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                作業着、スウェット上下（部屋着感が強いもの）、ダメージジーンズ（引っかかる危険性）、ハーフパンツ（クラブやイベントではカジュアルすぎる場合が多い）。
              </li>
              <li>清潔感のない服装、シワだらけのシャツ。</li>
            </ul>
            <p>
              <strong>ポイント：</strong>
              自分自身が動きにくいだけでなく、ペアで踊る相手に不快感を与えたり、安全面で問題が生じたりする可能性があります。
              サルサは社交ダンスの一面もあるため、最低限のマナーとして清潔感のある服装を心がけましょう。
            </p>
            <p className="mt-3">
              <strong>共通の重要ポイント：汗対策は必須！</strong>
              どの服装を選ぶにしても、サルサは非常に汗をかくダンスです。
              着替えのTシャツ（複数枚あると安心）、タオルは必ず持参し、こまめに汗を拭くようにしましょう。デオドラントスプレーなどで匂い対策をするのもエチケットです。
            </p>

            <h2 className="card-title mb-0 text-lg font-bold">女性の服装：自由度高め！動きやすさ重視で</h2>
            <picture>
              <source srcSet="/img/beginner/pair_lesson.webp" type="image/webp" />
              <source srcSet="/img/beginner/pair_lesson.png" type="image/png" />
              <img className="img-fluid" src="/img/beginner/pair_lesson.png" alt="男女ペアでサルサを踊るレッスン風景" />
            </picture>
            <p>
              女性のサルサファッションは男性よりも選択肢が広く、個性を活かせるのが魅力です。
              ただし、基本は「動きやすさ」と「TPOに合わせた華やかさ」。ここでは、より快適に、そして美しく踊るための服装を「優・良・可・不可」でご紹介します。
            </p>

            <h3 className="mt-3 font-bold">
              評価：優 (Best Choice) - 華やかさと機能性を両立！ダンスを最大限に楽しむスタイル
            </h3>
            <p>
              <strong>具体例：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>トップス：</strong>
                ドレープが美しいダンス用トップス、デザイン性のあるスポーツブラにシースルーのカバーアップ、フィット感と速乾性に優れたおしゃれなカットソー。
              </li>
              <li>
                <strong>ボトムス：</strong>
                スリット入りやアシンメトリーデザインのダンス用スカート（インナーパンツ付き推奨）、ストレッチ性の高いスタイリッシュなダンスパンツ、華やかな柄のレギンスにヒップスカーフを合わせて。
              </li>
              <li>
                <strong>ワンピース：</strong>
                ターンで美しく広がるダンス用ワンピース、ボディラインを綺麗に見せるストレッチ素材のワンピース。
              </li>
            </ul>
            <p>
              <strong>ポイント：</strong>動きやすさはもちろん、汗をかいても快適な素材を選びましょう。
              ターンやスピンで美しく見えるデザイン、女性らしいラインを引き立てるシルエットが理想的。
              お気に入りのウェアはモチベーションを上げ、自信を持ってフロアに立つことができます。「サルサウェア
              レディース」で検索すると素敵なアイテムが見つかります。
            </p>

            <h3 className="mt-3 font-bold">評価：良 (Good Choice) - おしゃれも動きやすさも！定番安心スタイル</h3>
            <p>
              <strong>具体例：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>トップス：</strong>清潔感のあるTシャツ、ブラウス、カットソー（できれば速乾性のあるもの）。
              </li>
              <li>
                <strong>ボトムス：</strong>
                ストレッチの効いたジーンズ（濃色でキレイめなデザイン）、動きやすいチノパン、膝丈程度のフレアスカートやAラインスカート（広がりすぎないもの）。
              </li>
              <li>
                <strong>ワンピース：</strong>
                普段使いもできるカジュアルなワンピース（伸縮性があり、動きを妨げないもの）。
              </li>
            </ul>
            <p>
              <strong>ポイント：</strong>
              サルサ初心者の方が最初に選ぶ服装として安心です。普段着に少し動きやすさをプラスするイメージ。汗をかくので着替えのTシャツやタオルは必須。スカートの場合は、下にスパッツやショートパンツを着用すると安心です。
            </p>

            <h3 className="mt-3 font-bold">評価：可 (Acceptable) - まずは参加！工夫次第で楽しめるスタイル</h3>
            <p>
              <strong>具体例：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>トップス：</strong>普段着のコットンTシャツ、カジュアルなシャツ。
              </li>
              <li>
                <strong>ボトムス：</strong>
                普段使いのジーンズ（ややストレッチ性が低いもの）、ロングスカート（裾さばきに注意が必要）。
              </li>
            </ul>
            <p>
              <strong>ポイント：</strong>
              「とりあえず体験してみたい」という場合には許容範囲です。ただし、汗で服が重くなったり、動きが制限されたりする可能性があります。
              スカートの場合はインナーを必ず着用し、胸元が大きく開いた服や、回転時に裾がめくれ上がりすぎるものは避けましょう。アクセサリーは小さくシンプルなものに。
            </p>

            <h3 className="mt-3 font-bold">評価：不可 (Not Recommended) - 避けるべきスタイル</h3>
            <p>
              <strong>具体例：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>タイトすぎるミニスカートやペンシルスカート（足が上がらず踊れません）。</li>
              <li>ボリュームがありすぎるロングドレスやマキシスカート（自分も相手も踏んでしまう危険性）。</li>
              <li>露出が過度に多い服装（TPOをわきまえ、周囲への配慮を）。</li>
              <li>ヒールが高すぎる・細すぎるパンプス（ダンス用でないもの）、ミュールやサンダル（脱げやすく危険）。</li>
              <li>大きすぎるネックレスやブレスレット、引っかかりやすい装飾のついた服（怪我の原因に）。</li>
              <li>清潔感のない服装、シワだらけの服。</li>
            </ul>
            <p>
              <strong>ポイント：</strong>
              自分自身が動きにくいだけでなく、ペアで踊る相手に不快感を与えたり、怪我をさせてしまったりする可能性があります。サルサはエチケットも大切。安全かつ快適に踊れる服装を選びましょう。
            </p>
            <p className="mt-3">
              <strong>共通の重要ポイント：汗対策とインナー、そして足元！</strong>
              どの服装を選ぶにしても、汗対策は必須です。着替えのトップス、タオル、デオドラントスプレーなどを用意しましょう。
              スカートやワンピースの場合は、下にスパッツや見せても良いショートパンツを履くのがマナーであり安心です。
              また、靴選びも重要。最初は手持ちのものでも構いませんが、慣れてきたらダンスシューズを検討しましょう。
            </p>
          </section>

          <section id="salsa-scene-attire">
            <h2 className="mt-4 text-xl font-semibold">シーン別！サルサの服装OK・NGガイド：スタジオレッスンとクラブ</h2>
            <picture>
              <source srcSet="/img/beginner/crub_dance.webp" type="image/webp" />
              <source srcSet="/img/beginner/crub_dance.png" type="image/png" />
              <img
                className="img-fluid mb-2"
                src="/img/beginner/crub_dance.png"
                alt="サルサクラブで多くの人がダンスを楽しむ様子"
              />
            </picture>
            <p>
              サルサを楽しむ場所は、主にダンススタジオでのレッスンと、サルサクラブやイベントでのソーシャルダンスです。それぞれのシーンに合わせた服装選びで、もっと快適に、もっとサルサを楽しみましょう！「サルサ
              服装 TPO」を意識することが大切です。
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/2 mb-4">
                <div className="border rounded shadow h-full">
                  <div className="bg-primary text-white p-2 rounded-t">
                    <h4 className="card-title mb-0">
                      <span role="img" aria-label="teacher">
                        🧑‍🏫
                      </span>
                      スタジオレッスンでの服装
                    </h4>
                  </div>
                  <div className="p-4">
                    <p>
                      <strong>目的：</strong>動きの確認、技術向上、集中力アップ！
                    </p>
                    <h4 className="mt-2 text-green-700 font-bold">
                      <span role="img" aria-label="ok">
                        ✔️
                      </span>
                      OKな服装 (推奨スタイル)
                    </h4>
                    <p>
                      スタジオレッスンでは、動きやすさと機能性が最優先。「サルサ
                      レッスン着」「ダンス練習着」を参考に、自分の動きをしっかり確認できる服装を選びましょう。
                    </p>
                    <ul className="list-disc ml-6">
                      <li>
                        <strong>トップス：</strong>
                        <ul className="list-disc ml-6">
                          <li>吸汗速乾性のあるスポーツTシャツ、タンクトップ。</li>
                          <li>
                            体にフィットするヨガウェアやダンス用プラクティスシャツ（体のラインが見えるとフォームチェックしやすい）。
                          </li>
                          <li>女性はスポーツブラにTシャツを重ねるのも快適です。</li>
                        </ul>
                      </li>
                      <li>
                        <strong>ボトムス：</strong>
                        <ul className="list-disc ml-6">
                          <li>ストレッチ性の高いパンツ（ジャージ、スウェットパンツ、レギンス、ダンスパンツ）。</li>
                          <li>女性は動きやすいフレアパンツや、下にスパッツを履いたショートパンツも人気。</li>
                          <li>足さばきが見やすい丈やデザインがおすすめです。</li>
                        </ul>
                      </li>
                      <li>
                        <strong>その他：</strong>汗拭きタオル、髪をまとめるゴムやピンは必須アイテム。
                      </li>
                    </ul>
                    <p>
                      <strong>ポイント：</strong>
                      インストラクターから的確なアドバイスをもらうためにも、体の動きが分かりやすい服装が理想的。清潔感を保ち、レッスンに集中できる環境を自分で作りましょう。
                    </p>

                    <h4 className="mt-3 text-red-700 font-bold">
                      <span role="img" aria-label="ng">
                        ❌
                      </span>
                      NGな服装 (避けるべきポイント)
                    </h4>
                    <p>安全かつ効果的にレッスンを受けるために、以下の服装は避けましょう。</p>
                    <ul className="list-disc ml-6">
                      <li>
                        硬くて動きを妨げる服（例：ノンストレッチの厚手ジーンズ、タイトすぎるファッションスカート）。
                      </li>
                      <li>フード付きのトップス（回転時などに視界を遮ったり、邪魔になったりすることがあります）。</li>
                      <li>床に引きずるほど長い丈のパンツやスカート（自分や他人が踏んで転倒する危険性）。</li>
                      <li>露出が極端に多い服装（他の生徒さんが目のやり場に困ることも。TPOをわきまえましょう）。</li>
                      <li>大きすぎるアクセサリー、引っかかりやすい装飾（怪我の原因になります）。</li>
                    </ul>
                    <p>
                      <strong>ポイント：</strong>「サルサ レッスン 服装
                      NG」で検索する前に、まずは動きやすさと安全性を第一に考えましょう。
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 mb-4">
                <div className="border rounded shadow h-full">
                  <div className="bg-danger text-white p-2 rounded-t">
                    <h4 className="card-title mb-0">
                      <span role="img" aria-label="cocktail">
                        🍸
                      </span>
                      サルサクラブでの服装
                    </h4>
                  </div>
                  <div className="p-4">
                    <p>
                      <strong>目的：</strong>おしゃれも楽しむ！出会い、雰囲気、ソーシャルダンスを満喫！
                    </p>
                    <h4 className="mt-2 text-green-700 font-bold">
                      <span role="img" aria-label="ok">
                        ✔️
                      </span>
                      OKな服装 (推奨スタイル)
                    </h4>
                    <p>
                      クラブやイベントでは、動きやすさに加えて「サルサ パーティー
                      ファッション」を意識したお洒落も楽しみたいところ。清潔感を第一に、自分らしいスタイルで臨みましょう。
                    </p>
                    <ul className="list-disc ml-6">
                      <li>
                        <strong>男性：</strong>
                        清潔感のあるシャツ（柄物や色物も◎）、きれいめなTシャツやポロシャツ。ボトムスはスラックス、チノパン、または濃色でダメージのないジーンズが一般的。会社帰りのスーツならジャケットを脱ぎ、ネクタイを少し緩めるなど工夫を。
                      </li>
                      <li>
                        <strong>女性：</strong>
                        ワンピース（ターンで裾が美しく広がるデザインも人気。インナーパンツ着用が安心）、
                        おしゃれなトップスにスカート（フレア、Aラインなど）やパンツスタイル。ドレッシーなブラウスやカットソーも素敵です。アクセサリーは踊りの邪魔にならない程度に。
                      </li>
                      <li>
                        <strong>共通：</strong>
                        汗対策に着替えのTシャツやハンカチ、タオルは必須。デオドラントスプレーなどで匂いケアもエチケットです。
                      </li>
                    </ul>
                    <p>
                      <strong>ポイント：</strong>周りの雰囲気に合わせつつ、少し華やかさをプラスするのがコツ。「サルサ
                      イベント 服装 レディース」「メンズ
                      サルサファッション」などで検索して、コーディネートの参考にしてみましょう。
                    </p>

                    <h4 className="mt-3 text-red-700 font-bold">
                      <span role="img" aria-label="ng">
                        ❌
                      </span>
                      NGな服装 (避けるべきポイント)
                    </h4>
                    <p>自分も相手も気持ちよく踊るために、マナー違反となる服装は避けましょう。</p>
                    <ul className="list-disc ml-6">
                      <li>
                        極端にカジュアルすぎる服装（例：部屋着のようなスウェット上下、スポーツ用のジャージ。
                        クラブの雰囲気やドレスコードにもよりますが、お洒落を楽しむ場としては避けるのが無難です）。
                      </li>
                      <li>露出が過度な服装、TPOにそぐわない服装（品位を保ち、周囲への配慮を）。</li>
                      <li>シワや汚れが目立つ、清潔感のない服装（最も避けたいNGポイントです）。</li>
                      <li>
                        男性の短パンやビーチサンダルのようなラフすぎる履物（クラブによっては入場を断られることも）。
                      </li>
                      <li>
                        ダンスフロアでの大きなバッグやリュック（邪魔になり危険です。クロークやロッカーを利用しましょう）。
                      </li>
                      <li>強すぎる香水（ペアで踊るため、香りは控えめにするのがエチケット）。</li>
                    </ul>
                    <p>
                      <strong>ポイント：</strong>「サルサクラブ 服装
                      マナー」を意識し、洗練された大人の社交場であることを忘れずに。安全で快適なダンスタイムのために、お互いに配慮した服装選びを心がけましょう。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </MainLayout>
  );
}
