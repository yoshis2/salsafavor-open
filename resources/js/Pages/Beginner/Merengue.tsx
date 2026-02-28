import MainLayout from "@/Layouts/MainLayout";
import Side from "./Side";

export default function Merengue() {
  return (
    <MainLayout
      title="クラブで楽しむラテンダンス入門｜チャチャ・キゾンバ・メレンゲ"
      description="サルサやバチャータ以外のラテンダンス（チャチャ、キゾンバ、メレンゲ、レゲトン）の特徴を紹介します。"
    >
      <div className="w-full px-3 lg:col-span-12 lg:grid lg:grid-cols-10 lg:gap-6">
        <Side />
        <article className="w-full lg:order-1 lg:col-span-7">
          {/* サイドバー（必要に応じて別途実装） */}
          <h1 className="text-2xl font-bold mb-6">
            サルサ・バチャータだけじゃない！クラブで楽しむ多様なラテンダンスの世界
          </h1>
          <picture>
            <source srcSet="/img/beginner/kizomba.webp" type="image/webp" />
            <source srcSet="/img/beginner/kizomba.jpg" type="image/jpeg" />
            <img
              className="img-responsive mb-3"
              src="/img/beginner/kizomba.jpg"
              alt="様々なラテンダンスを楽しむ人々のイメージ"
              width="100%"
              height="auto"
            />
          </picture>

          <p className="lead">
            サルサクラブやイベントでは、サルサやバチャータ以外にも様々なジャンルの音楽がかかり、フロアを盛り上げます。ここでは、代表的なダンスミュージック「チャチャ」「キゾンバ」「メレンゲ」「レゲトン」について、その特徴や楽しみ方をご紹介します。色々なリズムを知って、ダンスの幅を広げましょう！
            これらのダンスは、メインのサルサやバチャータとはまた違った魅力があり、知っておくことでクラブやイベントでの楽しみ方が格段に広がります。例えば、曲の合間に雰囲気を変えたい時や、少し休憩したいけどフロアの熱気は感じていたい時など、これらのダンスが活躍する場面は意外と多いのです。
            このページを読めば、そんな「プラスワン」の楽しみ方が見つかるはずです。
          </p>

          <section id="chacha">
            <h2 className="mt-4 text-xl font-semibold">チャチャ (Cha Cha Cha)：軽快でリズミカルなキューバンダンス</h2>
            <div className="relative w-full aspect-video mb-3">
              <iframe
                src="https://www.youtube-nocookie.com/embed/Yhj7gbWBgZQ"
                title="チャチャチャ 参考動画"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            <p>
              チャチャ（チャチャチャとも呼ばれます）は、キューバ発祥の軽快でリズミカルなダンスです。その特徴的な「チャッチャッチャ」という3つの速いステップが名前の由来とも言われています。
            </p>
            <p>
              <strong>チャチャの特徴：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>音楽:</strong>
                本来はキューバ音楽で踊られますが、社交ダンスの競技会などではラテンポップやラテンロックで踊られることもあります。エネルギッシュで安定したビートが特徴で、時には複雑なポリリズム（複数のリズムが同時に鳴る）も含まれます。
              </li>
              <li>
                <strong>ステップ:</strong>
                基本的なカウントは「1、2、3、チャッチャッ」または「1、2、3、4、エンド」といった形です。シャッセ（横への速い3歩のステップ）の位置によってスタイルが異なることがあります。
              </li>
              <li>
                <strong>雰囲気:</strong> 明るく、楽しく、遊び心のある雰囲気が特徴です。
              </li>
            </ul>
            <p>
              サルサクラブでは、気分転換やフロアを温めるためにかかることがあります。サルサのステップと共通する部分もあるため、サルサダンサーにも馴染みやすいダンスの一つです。
            </p>
          </section>

          <section id="kizomba">
            <h2 className="mt-4 text-xl font-semibold">
              キゾンバ (Kizomba)：センシュアルでコネクション重視のアンゴラ発祥ダンス
            </h2>
            <div className="relative w-full aspect-video mb-3">
              <iframe
                src="https://www.youtube-nocookie.com/embed/UVTe5OlDKoY"
                title="キゾンバ 参考動画"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            <p>
              キゾンバは、アフリカのアンゴラ発祥のペアダンスで、近年世界的に人気が高まっています。ポルトガル語で「パーティー」を意味し、その名の通り人々が集い楽しむダンスとして発展しました。
            </p>
            <p>
              <strong>キゾンバの特徴：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>音楽:</strong>{" "}
                ゆったりとしたテンポで、ロマンティックかつメロウな曲調が多いですが、アップテンポな曲もあります。アフリカの伝統音楽とカリブ海のズークなどが融合して生まれました。
              </li>
              <li>
                <strong>ダンススタイル:</strong>
                パートナーとの密接なコネクションと、スムーズで流れるような動きが特徴です。センバというアンゴラの伝統的なダンスが原型とされ、1990年代にキゾンバ音楽の人気と共に独自のスタイルへと進化しました。
              </li>
              <li>
                <strong>雰囲気:</strong>{" "}
                非常にセンシュアルで、パートナーとの一体感を重視します。タラシンハやアーバンキズといった派生スタイルも人気です。
              </li>
            </ul>
            <p>
              サルサクラブでも、特に深夜帯などにキゾンバがかかることが増えてきました。バチャータとはまた違った、しっとりとした雰囲気で踊りたい時におすすめです。公民館などの公的な場所ではまだあまり聞く機会は少ないかもしれませんが、専門のイベントやワークショップは増えています。
            </p>
          </section>

          <section id="merengue">
            <h2 className="mt-4 text-xl font-semibold">
              メレンゲ (Merengue)：シンプルで陽気なドミニカ共和国の国民的ダンス
            </h2>
            <div className="relative w-full aspect-video mb-3">
              <iframe
                src="https://www.youtube-nocookie.com/embed/xKMsPuoAglI"
                title="メレンゲ 参考動画"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            <p>
              メレンゲは、ドミニカ共和国を代表する音楽とダンスのスタイルです。2拍子のシンプルなリズムで、誰でも簡単に楽しむことができます。
            </p>
            <p>
              <strong>メレンゲの特徴：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>音楽:</strong>{" "}
                明るくアップテンポな2拍子のリズムが特徴。アコーディオンやブラスセクションが陽気な雰囲気を盛り上げます。
              </li>
              <li>
                <strong>ステップ:</strong>{" "}
                基本は左右の足へ体重を移動させるシンプルなステップです。膝を軽く曲げ、腰を左右に振る動きが特徴的です。
              </li>
              <li>
                <strong>ホールド:</strong>{" "}
                パートナーとクローズドポジション（密着した状態）で踊ることが多いです。リーダーはフォロワーの腰に手を回し、もう一方の手でフォロワーの手を取ります。
              </li>
              <li>
                <strong>ターン:</strong>
                シンプルなターンや、手を繋いだまま複雑に絡み合うような動き（プレッツェルと呼ばれることも）も楽しめます。音楽のテンポは速いですが、ターンは比較的ゆっくりと行われることが多いです。
              </li>
            </ul>
            <p>
              サルサクラブでは、フロアを盛り上げるためや、初心者でも気軽に踊れるようにメレンゲがかかることがあります。シンプルながらも奥深く、陽気なリズムに乗って踊れば自然と笑顔になれるダンスです。
            </p>
          </section>

          <section id="reggaeton">
            <h2 className="mt-4 text-xl font-semibold">レゲトン (Reggaeton)：パワフルでセクシーなストリートダンス</h2>
            <p>
              レゲトンは、プエルトリコ発祥の音楽ジャンルであり、それに合わせて踊られるダンススタイルです。ヒップホップやラテンアメリカの音楽要素が融合した、力強くリズミカルなサウンドが特徴です。
            </p>
            <p>
              <strong>レゲトンの特徴：</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>音楽:</strong> 重低音の効いたビートと、スペイン語のラップや歌が特徴的。「デンボウ
                (Dembow)」と呼ばれる独特のリズムパターンが基盤となっています。
              </li>
              <li>
                <strong>ダンススタイル:</strong>
                特定の決まったステップよりも、音楽に合わせて自由に体を動かすフリースタイルが中心です。腰や胸を使った動き（ペレオと呼ばれることも）が特徴的で、非常にセクシーな表現も多く見られます。
              </li>
              <li>
                <strong>雰囲気:</strong>{" "}
                エネルギッシュで挑発的、そしてパーティー感あふれる雰囲気です。ソロで踊ることも、ペアやグループで踊ることもあります。
              </li>
            </ul>
            <p>
              サルサクラブでは、深夜帯にフロアの雰囲気を変えるためにレゲトンがかかることがあります。特に若者を中心に人気があり、自由な表現で盛り上がります。公民館などの公的な場所でかかることは稀ですが、クラブシーンでは欠かせないジャンルの一つです。
            </p>
          </section>

          <p className="mt-4">
            サルサクラブやイベントでは、これらの音楽以外にも様々なジャンルが流れることがあります。色々なリズムに触れて、あなたのダンスの世界を広げてみましょう！
          </p>

          {/* サイドバーやアフィリエイト等は必要に応じて別途実装 */}
        </article>
      </div>
    </MainLayout>
  );
}
