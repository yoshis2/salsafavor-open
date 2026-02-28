import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import Side from "./Side";

export default function Preparation() {
  return (
    <MainLayout
      title="サルサダンス初心者の準備ガイド｜服装・シューズ・心構え"
      description="サルサを始める前の準備や持ち物、心構え、基本マナーを初心者向けにまとめました。"
    >
      <div className="w-full px-3 lg:col-span-12 lg:grid lg:grid-cols-10 lg:gap-6">
        <Side />
        <article className="w-full lg:order-1 lg:col-span-7 beginner-article">
          <h1 className="text-2xl font-bold mb-6">
            サルサダンス初心者必見！始める前の準備完全ガイド - 不安を解消して情熱のステップへ
          </h1>
          <picture>
            <source srcSet="/img/beginner/salsa-preparation.webp" type="image/webp" />
            <source srcSet="/img/beginner/salsa-preparation.jpg" type="image/jpeg" />
            <img
              className="img-responsive mb-3"
              src="/img/beginner/salsa-preparation.jpg"
              alt="サルサダンスを始めるための準備をする男女のイメージ - 服装とシューズ選び"
              width="1200"
              height="627"
              fetchPriority="high"
            />
          </picture>

          <p>
            「<strong>サルサ ダンス</strong>
            に挑戦してみたいけど、何から始めたらいいの？」「一人でも大丈夫かな…」そんな不安を抱える
            <strong>サルサ ダンス</strong>初心者の方へ。このガイドでは、あなたが安心して<strong>サルサ ダンス</strong>
            の世界へ第一歩を踏み出せるよう、必要な準備や心構えを徹底的に解説します。SalsaFavorが、あなたの情熱的なダンスライフのスタートを全力でサポートします！
          </p>

          <h2 className="mt-4 text-xl font-semibold">なぜ多くの人がサルサダンスに夢中になるの？その魅力とは</h2>
          <p>
            <strong>サルサ ダンス</strong>
            は、ただのダンスではありません。世界中の人々を魅了し続ける、奥深い魅力に溢れています。
          </p>
          <ul>
            <li className="mb-2">
              <strong>心躍る音楽との一体感：</strong>
              リズミカルなラテン音楽に身を任せ、音楽と一体になる高揚感は<strong>サルサ ダンス</strong>ならでは。
            </li>
            <li className="mb-2">
              <strong>コミュニケーションの楽しさ：</strong>
              言葉を超えたリード＆フォローで、パートナーと心を通わせる喜び。新しい出会いやコミュニティも広がります。
            </li>
            <li className="mb-2">
              <strong>心身のリフレッシュ：</strong>
              全身運動でストレス解消！楽しみながら健康増進、美しい姿勢も手に入ります。
            </li>
            <li className="mb-2">
              <strong>自己表現のステージ：</strong>
              自分らしいスタイルで自由に表現できる楽しさ。踊るたびに新しい自分を発見できます。
            </li>
          </ul>
          <p>
            あなたも<strong>サルサ ダンス</strong>を通じて、日常に彩りと情熱を加えてみませんか？
          </p>

          <h2 className="mt-4 text-xl font-semibold">サルサダンスを始める前の準備：これさえ押さえれば安心！</h2>
          <p>
            <strong>サルサ ダンス</strong>
            をスムーズに、そして最大限に楽しむためには、いくつかの準備が必要です。ここでは、特に初心者の方が気になるポイントを分かりやすく解説します。
          </p>

          <h3 className="mt-4 text-lg font-bold" id="fukusou">
            1. 服装：何を着ていけばいい？動きやすさが基本！
          </h3>
          <p>
            <strong>サルサ ダンス</strong>
            を始めるにあたって、特別な衣装を最初から用意する必要はありません。大切なのは「動きやすさ」です。
          </p>
          <ul>
            <li>
              <strong>トップス：</strong>{" "}
              Tシャツ、カットソー、ブラウスなど、汗を吸いやすく動きを妨げないものがおすすめです。女性はキャミソールやタンクトップも人気です。
            </li>
            <li>
              <strong>ボトムス：</strong>
              <ul>
                <li>
                  <strong>女性：</strong>
                  練習用のダンスパンツ、ストレッチの効いたスカート、レギンスなどが一般的です。スカートの場合は、めくれ上がっても気にならないよう、下にスパッツなどを着用すると安心です。ジーンズは動きにくい場合があるので、最初は避けた方が無難かもしれません。
                </li>
                <li>
                  <strong>男性：</strong>{" "}
                  スラックスやチノパンなど、動きやすいパンツを選びましょう。汗をかきやすい方は、通気性の良い素材がおすすめです。
                </li>
              </ul>
            </li>
            <li>
              <strong>ポイント：</strong>
              <ul>
                <li>清潔感のある服装を心がけましょう。</li>
                <li>
                  最初は手持ちの動きやすい服でOK！慣れてきたら、お気に入りの<strong>サルサ ダンス</strong>
                  ウェアを探すのも楽しみの一つです。
                </li>
                <li>
                  アクセサリー類は、踊っている最中に引っかかったり、相手に当たったりする可能性があるので、大きなものや揺れるものは避けるか、外しておきましょう。
                </li>
              </ul>
            </li>
          </ul>
          <p>
            <a
              className="btn btn-outline-danger btn-sm"
              href="https://search.rakuten.co.jp/search/mall/サルサ+ダンス+ウェア/"
              target="_blank"
              rel="noopener noreferrer"
            >
              おすすめサルサダンスウェアを見る
            </a>
          </p>

          <h3 className="mt-4 text-lg font-bold" id="shoes">
            2. シューズ：サルサダンスシューズは必要？快適なステップのために
          </h3>
          <p>
            <strong>サルサ ダンス</strong>
            において、シューズは非常に重要なアイテムです。床をスムーズに滑り、ターンしやすく、足を保護してくれる専用の
            <strong>サルサダンスシューズ</strong>が理想的です。
          </p>
          <ul>
            <li>
              <strong>なぜ専用シューズ？</strong>
              <ul>
                <li>
                  <strong>滑りやすさ：</strong>{" "}
                  ソール（靴底）がスエード素材などでできており、適度な滑りやすさとグリップ力を両立。ターンやスピンがスムーズに行えます。
                </li>
                <li>
                  <strong>軽さとフィット感：</strong>{" "}
                  足に負担をかけず、素早い動きに対応できるよう軽量に作られています。また、足をしっかりとホールドし、安定感を与えてくれます。
                </li>
                <li>
                  <strong>床への配慮：</strong> ダンスフロアを傷つけにくい素材が使われています。
                </li>
              </ul>
            </li>
            <li>
              <strong>初心者の場合：</strong>
              <ul>
                <li>
                  最初は、室内履き用のスニーカーや、底が滑りやすいフラットシューズでも代用できる場合があります。ただし、グリップが強すぎる靴は膝や足首を痛める原因になることも。
                </li>
                <li>体験レッスンなどでは、運動靴でOKな場合もありますので、事前に確認しましょう。</li>
                <li>
                  本格的に<strong>サルサ ダンス</strong>
                  を続けるなら、早めに専用シューズを手に入れることを強くおすすめします。踊りやすさが格段に変わります！
                </li>
              </ul>
            </li>
            <li>
              <strong>選び方のポイント：</strong>
              <ul>
                <li>
                  <strong>女性：</strong>{" "}
                  ヒールの高さは様々。最初は3cm～5cm程度の低めのヒールから試すのがおすすめです。ストラップ付きで足首が固定されるタイプが安定します。
                </li>
                <li>
                  <strong>男性：</strong> 一般的には革靴のようなデザインで、ヒールは低めです。
                </li>
                <li>必ず試着して、自分の足にフィットするものを選びましょう。</li>
              </ul>
            </li>
          </ul>
          <p>
            <a
              className="btn btn-outline-danger btn-sm"
              href="https://search.rakuten.co.jp/search/mall/サルサ+ダンス+シューズ/"
              target="_blank"
              rel="noopener noreferrer"
            >
              おすすめサルサダンスシューズを見る
            </a>
          </p>

          <h3 className="mt-4 text-lg font-bold" id="hajimekata">
            3. 始め方：どこでサルサダンスを学べる？
          </h3>
          <p>
            <strong>サルサ ダンス</strong>を始めるには、いくつかの方法があります。
          </p>
          <ul>
            <li>
              <strong>ダンススクールのレッスン：</strong>
              基礎から丁寧に教えてもらえるので、初心者には最もおすすめです。レベル別のクラスがあるスクールなら、自分のペースで学べます。SalsaFavorでは、全国の
              <strong>サルサ ダンス</strong>レッスン情報を掲載しています。
              <br />
              <Link href="/lessons" className="btn btn-outline-danger btn-sm mt-1">
                サルサダンスレッスンを探す
              </Link>
            </li>
            <li>
              <strong>サークルや同好会：</strong>{" "}
              比較的リーズナブルに始められる場合が多く、アットホームな雰囲気で楽しめます。
            </li>
            <li>
              <strong>サルサクラブ・イベントの初心者向けレッスン：</strong>
              多くのサルサクラブやイベントでは、パーティーが始まる前に初心者向けのレッスンが開催されています。実際のパーティーの雰囲気を味わいながら学べます。
              <br />
              <Link href="/events" className="btn btn-outline-danger btn-sm mt-1">
                サルサダンスイベントを探す
              </Link>
            </li>
          </ul>
          <p>まずは体験レッスンに参加して、雰囲気やレッスンの進め方などを確認してみるのが良いでしょう。</p>

          <h3 className="mt-4 text-lg font-bold" id="mochimono">
            4. 持ち物：レッスンやイベントに何を持っていく？
          </h3>
          <p>
            <strong>サルサ ダンス</strong>
            のレッスンやイベントに参加する際に、持っていくと便利なものをリストアップしました。忘れ物がないかチェックしましょう。
          </p>
          <ul>
            <li>
              <strong>必須アイテム：</strong>
              <ul>
                <li>
                  <strong>動きやすい服装：</strong> <a href="#fukusou">上記「1. 服装」</a>を参照してください。
                </li>
                <li>
                  <strong>ダンスシューズ（または室内履き）：</strong> <a href="#shoes">上記「2. シューズ」</a>
                  を参照してください。
                </li>
                <li>
                  <strong>タオル：</strong> 汗を拭くために必須です。
                </li>
                <li>
                  <strong>飲み物：</strong> 水分補給はこまめに行いましょう。スポーツドリンクなどもおすすめです。
                </li>
              </ul>
            </li>
            <li>
              <strong>あると便利なアイテム：</strong>
              <ul>
                <li>
                  <strong>着替え：</strong> 特に汗をかきやすい方は、レッスン後の着替えがあると快適です。
                </li>
                <li>
                  <strong>ハンカチ・ティッシュ：</strong> エチケットとして持っておくと良いでしょう。
                </li>
                <li>
                  <strong>デオドラント用品：</strong>{" "}
                  汗の臭いが気になる方は、制汗スプレーやシートなどを持参すると安心です。
                </li>
                <li>
                  <strong>小さなバッグやポーチ：</strong> 貴重品や小物をまとめておくのに便利です。
                </li>
                <li>
                  <strong>絆創膏：</strong> 靴擦れなどに備えて。
                </li>
              </ul>
            </li>
          </ul>
          <p>
            特に夏場や暖房の効いた室内では思った以上に汗をかきます。快適にダンスを楽しむために、持ち物もしっかり準備しましょう。
          </p>

          <h3 className="mt-4 text-lg font-bold" id="kokorogamae">
            5. 心構え：楽しむことが一番！サルサダンスのマナーとエチケット
          </h3>
          <p>
            <strong>サルサ ダンス</strong>
            はペアダンス。お互いが気持ちよく踊るためには、いくつかの心構えとマナーが大切です。
          </p>
          <ul>
            <li>
              <strong>楽しむ気持ちを忘れずに！</strong>{" "}
              上手い下手は関係ありません。音楽を感じ、ステップを踏むこと自体を楽しみましょう。
            </li>
            <li>
              <strong>積極的に誘う・誘われる：</strong> 色々な人と踊ることで上達も早まります。
            </li>
            <li>
              <strong>清潔感を大切に：</strong> 汗対策やハンカチの携帯を心がけましょう。
            </li>
            <li>
              <strong>相手への配慮：</strong>{" "}
              無理なリードやフォローはせず、相手のレベルに合わせましょう。ぶつかったら「ごめんなさい」、踊り終わったら「ありがとう」を。
            </li>
            <li>
              <strong>失敗を恐れないで：</strong> 誰でも最初は初心者です。どんどん踊って経験を積みましょう。
            </li>
          </ul>
          <p>
            これらのポイントを押さえて、あなたも<strong>サルサ ダンス</strong>
            コミュニティの一員として、楽しい時間を過ごしましょう！
          </p>

          <h2 className="mt-4 text-xl font-semibold">サルサダンスの基本ステップ：最初の数歩を踏み出そう！</h2>
          <p>
            <strong>サルサ ダンス</strong>
            の魅力に触れたら、次は実際にステップを踏んでみたくなりますよね。ここでは、多くの
            <strong>サルサ ダンス</strong>
            スタイルで共通して使われる基本的なステップのいくつかをご紹介します。最初は難しく感じるかもしれませんが、繰り返し練習することで自然と体が覚えていきますよ。
          </p>
          <p>
            <strong>注：</strong>
            サルサのステップは音楽のカウントに合わせて行います。基本は8カウントで1つのまとまりです。
          </p>
          <ul>
            <li>
              <strong>ベーシックステップ（前後）：</strong>
              <ul>
                <li>
                  <strong>リーダー（主に男性）：</strong>
                  左足前進(1)、右足その場でステップ(2)、左足揃える(3)、休止(4)、右足後退(5)、左足その場でステップ(6)、右足揃える(7)、休止(8)
                </li>
                <li>
                  <strong>フォロワー（主に女性）：</strong>
                  右足後退(1)、左足その場でステップ(2)、右足揃える(3)、休止(4)、左足前進(5)、右足その場でステップ(6)、左足揃える(7)、休止(8)
                </li>
                <li>
                  これが<strong>サルサ ダンス</strong>の最も基本的な前後の動きです。
                </li>
              </ul>
            </li>
            <li className="mt-2">
              <strong>サイドステップ（横）：</strong>
              <ul>
                <li>
                  左右にステップを踏みます。例えば、左へ移動する場合：左足横へ(1)、右足寄せる(2)、左足その場でステップ(3)、休止(4)といった具合です。
                </li>
                <li>
                  これも<strong>サルサ ダンス</strong>で頻繁に使われる動きです。
                </li>
              </ul>
            </li>
            <li className="mt-2">
              <strong>クロスボディリード（CBL）：</strong>
              <ul>
                <li>
                  リーダーがフォロワーを自分の体の前を通過させるようにリードする、<strong>サルサ ダンス</strong>
                  の代表的なムーブメントの一つです。多くのターンテクニックの基本となります。
                </li>
                <li>これは少し複雑なので、最初はレッスンで先生に教えてもらうのが一番です。</li>
              </ul>
            </li>
          </ul>
          <p>
            <strong>練習のポイント：</strong>
          </p>
          <ul>
            <li>まずはゆっくりとしたテンポで、カウントを声に出しながら練習しましょう。</li>
            <li>鏡の前で自分のフォームを確認しながら行うと効果的です。</li>
            <li>動画を参考に、正しい足の運びや体重移動を意識しましょう。</li>
            <li>焦らず、一つ一つのステップを確実に身につけることが大切です。</li>
          </ul>
          <p>
            これらの基本ステップは、あくまで<strong>サルサ ダンス</strong>
            の入り口です。実際のレッスンでは、より多くのステップやターン、そして何よりも大切なリード＆フォローの技術を学ぶことができます。ぜひ
            <Link href="/lessons">お近くのサルサダンスレッスン</Link>
            を探して、体験してみてくださいね！
          </p>

          <h2 className="mt-4 text-xl font-semibold">サルサダンス初心者 よくある質問（FAQ）</h2>
          <p>
            <strong>サルサ ダンス</strong>
            を始めるにあたって、多くの初心者さんが疑問に思うことをまとめました。あなたの不安解消にお役立てください。
          </p>
          <div className="faq-accordion">
            <details className="faq-item" open>
              <summary className="faq-summary">
                <span className="faq-label">Q</span>
                <strong>全くのダンス未経験でも大丈夫ですか？</strong>
              </summary>
              <div className="faq-answer">
                <span className="faq-label">A</span>
                はい、大丈夫です！ほとんどの<strong>サルサ ダンス</strong>
                レッスンには初心者向けのクラスがあり、基本のステップから丁寧に教えてくれます。リズム感に自信がなくても、音楽に合わせて体を動かす楽しさから始められますのでご安心ください。
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span className="faq-label">Q</span>
                <strong>一人で参加しても大丈夫ですか？パートナーがいません。</strong>
              </summary>
              <div className="faq-answer">
                <span className="faq-label">A</span>
                もちろん大丈夫です！<strong>サルサ ダンス</strong>
                のレッスンやイベントでは、多くの人が一人で参加しています。レッスン中はパートナーをローテーションしながら踊ることが一般的なので、自然と色々な人と踊る機会があり、新しい友達もできやすいですよ。
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span className="faq-label">Q</span>
                <strong>体が硬いのですが、サルサダンスはできますか？</strong>
              </summary>
              <div className="faq-answer">
                <span className="faq-label">A</span>
                全く問題ありません。<strong>サルサ ダンス</strong>
                は、必ずしも高い柔軟性が求められるダンスではありません。大切なのはリズム感やパートナーとのコミュニケーションです。続けていくうちに自然と体もほぐれてきますし、何よりも無理のない範囲で楽しむことが一番です。
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span className="faq-label">Q</span>
                <strong>どれくらいで踊れるようになりますか？</strong>
              </summary>
              <div className="faq-answer">
                <span className="faq-label">A</span>
                個人差はありますが、基本的なステップや簡単なターンは数回のレッスンで覚えられる方が多いです。週に1回程度のレッスンを数ヶ月続ければ、
                <strong>サルサ ダンス</strong>
                パーティーで簡単な曲なら十分に楽しめるようになるでしょう。大切なのは焦らず、楽しみながら継続することです。
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span className="faq-label">Q</span>
                <strong>どのサルサスタイルから始めるのがおすすめですか？</strong>
              </summary>
              <div className="faq-answer">
                <span className="faq-label">A</span>
                日本で比較的ポピュラーで初心者向けのレッスンが多いのはLAスタイル(On1)と言われています。しかし、最も大切なのはご自身が「楽しそう！」「踊ってみたい！」と感じるスタイルを選ぶことです。当サイトの
                <Link href="/beginner/dance">サルサダンスの種類と選び方</Link>
                ページも参考に、いくつかのスタイルの動画を見たり、体験レッスンに参加したりして、フィーリングの合う
                <strong>サルサ ダンス</strong>スタイルを見つけるのがおすすめです。
              </div>
            </details>
          </div>

          <h2 className="mt-4 text-xl font-semibold">初心者向けサルサダンス準備チェックリスト</h2>
          <p>
            <strong>サルサ ダンス</strong>
            を始める前に、このチェックリストで最終確認！これであなたも安心して情熱的なダンスフロアへ踏み出せます。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul>
              <li>
                <strong>心構えはOK？</strong>
                <ul>
                  <li>
                    <a href="#kokorogamae">楽しむ気持ちを最優先！</a>
                  </li>
                  <li>
                    <a href="#kokorogamae">失敗を恐れずチャレンジ！</a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>服装は動きやすい？</strong>
                <ul>
                  <li>
                    <a href="#fukusou">Tシャツ、ストレッチパンツ/スカート等</a>
                  </li>
                  <li>
                    <a href="#fukusou">清潔感のあるものを選ぼう</a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>シューズの準備は？</strong>
                <ul>
                  <li>
                    <a href="#shoes">最初は室内履きや滑りやすい靴（要確認）</a>
                  </li>
                  <li>
                    <a href="#shoes">慣れたら専用ダンスシューズがおすすめ</a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <strong>持ち物は揃った？</strong>
                <ul>
                  <li>
                    <a href="#mochimono">タオル、飲み物、着替え（必要なら）</a>
                  </li>
                  <li>
                    <a href="#mochimono">ハンカチ（エチケット）</a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>どこで始めるか決めた？</strong>
                <ul>
                  <li>
                    <a href="#hajimekata">ダンススクールの体験レッスン</a>を予約 (<Link href="/lessons">一覧へ</Link>)
                  </li>
                  <li>
                    <a href="#hajimekata">サークルやイベント</a>の初心者向けレッスンを探す (
                    <Link href="/events">一覧へ</Link>)
                  </li>
                </ul>
              </li>
              <li>
                <strong>基本マナーの確認は？</strong>
                <ul>
                  <li>
                    <a href="#kokorogamae">挨拶と感謝の言葉を忘れずに</a>
                  </li>
                  <li>
                    <a href="#kokorogamae">相手への配慮を心がけよう</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <p className="mt-3">
            このリストを参考に、万全の準備で<strong>サルサ ダンス</strong>の第一歩を踏み出してくださいね！
          </p>

          <h2 className="mt-5 text-xl font-semibold">さあ、サルサダンスの世界へ飛び込もう！</h2>
          <p>
            準備は整いましたか？ <strong>サルサ ダンス</strong>
            は、あなたの日常をより豊かでエキサイティングなものに変えてくれる素晴らしい趣味です。
            SalsaFavorでは、この他にも<strong>サルサ ダンス</strong>に関する様々な情報（
            <Link href="/events">イベント情報</Link>、<Link href="/lessons">レッスン情報</Link>、
            <a
              href="https://search.rakuten.co.jp/search/mall/サルサ+ダンス+シューズ/"
              target="_blank"
              rel="noopener noreferrer"
            >
              おすすめ用品
            </a>
            など）を発信しています。 ぜひサイト内を巡って、あなたの<strong>サルサ ダンス</strong>
            ライフをスタートさせるきっかけを見つけてください。
          </p>
          <p>
            もし、<strong>サルサ ダンス</strong>に関してわからないことや不安なことがあれば、どうぞお気軽にSalsaFavorまで
            <a href="/inquiry">お問い合わせ</a>
            ください。あなたのサルサデビューを心から応援しています！
          </p>

          <div className="flex flex-col sm:flex-row justify-center mt-4 mb-4 gap-2">
            <Link href="/" className="btn btn-danger btn-lg mb-2 sm:mb-0 sm:mr-2">
              トップページへ戻る
            </Link>
            <Link href="/beginner/dance" className="btn btn-info btn-lg mb-2 sm:mb-0 sm:mr-2">
              サルサダンスの種類について知る
            </Link>
          </div>
          {/* サイドバーやアフィリエイト等は必要に応じて別途実装 */}
        </article>
      </div>
    </MainLayout>
  );
}
