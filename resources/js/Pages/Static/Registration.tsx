import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

type AuthUser = {
  id: number;
  name: string;
  email: string;
};

type PageProps = {
  auth?: {
    user?: AuthUser | null;
  };
};

export default function Registration() {
  const { auth } = usePage<PageProps>().props;
  const isAuthenticated = Boolean(auth?.user);

  const registrationCards = (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {!isAuthenticated ? (
        <>
          {/* 会員登録カード */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3>会員登録</h3>
            </div>
            <div className="p-6 flex flex-col grow">
              <p className="text-gray-700 mb-6 grow">
                イベントの情報を発信したい方会員登録をすると無料で告知できます。
              </p>
              <div className="text-center">
                <Link
                  className="inline-block w-4/5 bg-danger hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors duration-200 shadow-sm"
                  href="/register"
                >
                  会員登録はこちら
                </Link>
              </div>
            </div>
          </div>

          {/* ログインカード */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3>ログイン</h3>
            </div>
            <div className="p-6 flex flex-col grow">
              <p className="text-gray-700 mb-6 grow">
                すでに会員登録後の方、ログイン後イベント登録ページへお進みください。
              </p>
              <div className="text-center">
                <Link
                  className="inline-block w-4/5 bg-danger hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors duration-200 shadow-sm"
                  href="/login"
                >
                  ログインはこちら
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ログイン済みカード */
        <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3>ログイン済みです</h3>
          </div>
          <div className="p-6 text-center">
            <p className="text-gray-700 mb-6">既にログイン済みです。イベント登録ページはこちらです。</p>
            <Link
              className="inline-block w-full md:w-1/2 bg-danger hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors duration-200 shadow-sm"
              href="/admin/events"
            >
              管理画面はこちら
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <MainLayout>
      <article className="w-full lg:col-span-12">
        <h1>サルサ・バチャータ イベント主催者様へ：無料で簡単イベント掲載＆集客力アップ！</h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          あなたの主催するサルサやバチャータのイベント、もっと多くの人に知ってもらいたいと思いませんか？
          <br className="hidden md:inline" />
          当サイトでは、イベント主催者様が無料で簡単にイベント情報を掲載し、効果的に宣伝できるプラットフォームを提供しています。
        </p>

        {registrationCards}

        <h2>イベント掲載は無料！主催者の集客を強力サポート</h2>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6 md:p-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-gray-100 pb-2">
            イベント登録であなたのイベントを強力にバックアップ！
          </h3>
          <p className="text-gray-700 mb-6">
            会員登録するだけで、あなたのイベントはもっと多くの人に届き、集客力アップに繋がります。主なメリットはこちらです。
          </p>

          <ul className="space-y-6">
            <li>
              <h4 className="flex items-center text-md font-bold mb-2 text-gray-800">
                <i className="fas fa-check-circle text-green-500 mr-2 text-xl"></i>
                完全無料で掲載可能
              </h4>
              <p className="text-gray-700 ml-8 pl-1">
                掲載料金は一切不要！コストを気にせず、あなたのサルサ・バチャータイベントを効果的に宣伝できます。（※イベントページには広告が表示されます）
              </p>
            </li>
            <li>
              <h4 className="flex items-center text-md font-bold mb-2 text-gray-800">
                <i className="fas fa-rocket text-blue-400 mr-2 text-xl"></i>
                簡単登録ですぐにアピール
              </h4>
              <p className="text-gray-700 ml-8 pl-1">
                面倒な手続きは不要です。会員登録後、直感的な操作でイベント情報を入力すれば、すぐに多くのダンスファンにあなたのイベントを届けられます。
              </p>
            </li>
            <li>
              <h4 className="flex items-center text-md font-bold mb-2 text-gray-800">
                <i className="fas fa-bullhorn text-yellow-500 mr-2 text-xl"></i>
                即時掲載でチャンスを逃さない
              </h4>
              <p className="text-gray-700 ml-8 pl-1">
                開催日が未来のイベントであれば、登録後すぐにサイトに公開されます。イベントの告知をスピーディーに行い、集客のチャンスを最大限に活かせます。
              </p>
            </li>
          </ul>

          <p className="mt-8 font-bold text-gray-800 bg-gray-50 p-4 rounded text-center">
            これらのメリットを活用して、あなたの素晴らしいダンスイベントを成功に導きませんか？
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6 md:p-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-gray-100 pb-2">
            あなたのレッスンを輝かせる！インストラクター様向け掲載メリット
          </h3>
          <p className="text-gray-700 mb-6">
            ダンスインストラクターの皆様、あなたの素晴らしいレッスンをより多くの人に届けませんか？当サイトなら、魅力的な専用ページで効果的にアピールできます。
          </p>

          <ul className="space-y-6">
            <li>
              <h4 className="flex items-center text-md font-bold mb-2 text-gray-800">
                <i className="fas fa-chalkboard-teacher text-blue-600 mr-2 text-xl"></i>
                あなた専用のレッスン紹介ページ
              </h4>
              <p className="text-gray-700 ml-8 pl-1">
                ご自身のプロフィール、レッスンの特徴、スケジュール、料金などをまとめた専用ページを作成できます。あなたの魅力を存分に伝えましょう。
              </p>
            </li>
            <li>
              <h4 className="flex items-center text-md font-bold mb-2 text-gray-800">
                <i className="fas fa-search-location text-blue-400 mr-2 text-xl"></i>
                生徒さんが見つけやすい検索機能 (近日拡充)
              </h4>
              <p className="text-gray-700 ml-8 pl-1">
                現在開発中の高度な検索機能では、曜日、時間帯、ダンスジャンル、レベル、地域など、詳細な条件でレッスンを検索できるようになります。あなたのレッスンにぴったりの生徒さんと繋がるチャンスが広がります。
              </p>
            </li>
            <li>
              <h4 className="flex items-center text-md font-bold mb-2 text-gray-800">
                <i className="fas fa-users text-green-500 mr-2 text-xl"></i>
                新たな生徒さんとの出会いを促進
              </h4>
              <p className="text-gray-700 ml-8 pl-1">
                当サイトを通じて、あなたのレッスンに興味を持つ新しい生徒さんとの出会いが期待できます。集客の幅を広げ、あなたのダンスコミュニティをさらに活性化させましょう。
              </p>
            </li>
          </ul>

          <p className="mt-8 font-bold text-gray-800 bg-gray-50 p-4 rounded text-center">
            あなたの専門知識と情熱を、より多くの人に届け、ダンスの輪を広げていきましょう！
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6 md:p-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-gray-100 pb-2">
            PC・タブレットでの登録がおすすめ（スマートフォンも対応）
          </h3>
          <p className="text-gray-700">
            イベント情報やレッスン情報の入力は、PCやタブレットの大きな画面で行うとスムーズです。
            <br />
            スマートフォンからの登録・編集も可能ですが、一部操作しづらい点があることをご了承ください。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6 md:p-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-gray-100 pb-2">
            掲載可能なダンスジャンル
          </h3>
          <p className="text-gray-700 mb-4">
            サルサ、バチャータをはじめ、以下のダンスジャンルのイベント・レッスン情報を掲載できます。
            <br />
            その他のジャンルについても、お気軽にご相談ください。
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-4 list-disc text-gray-700 marker:text-red-500">
            <li>サルサ</li>
            <li>バチャータ</li>
            <li>メレンゲ</li>
            <li>キゾンバ</li>
            <li>レゲトン</li>
          </ul>
        </div>

        <h2>簡単4ステップ！イベント登録までの流れ</h2>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-12 p-6 md:p-8">
          <div className="space-y-6">
            <div className="border-l-4 border-gray-200 pl-4 py-1">
              <h4 className="text-lg font-bold text-gray-800 mb-1">Step 1: 会員登録</h4>
              <p className="text-gray-700">まずは簡単な情報入力で会員登録を完了してください。</p>
            </div>
            <div className="border-l-4 border-gray-200 pl-4 py-1">
              <h4 className="text-lg font-bold text-gray-800 mb-1">Step 2: メール認証</h4>
              <p className="text-gray-700">
                登録メールアドレスに認証メールが届きます。メール内のリンクをクリックして登録を完了させます。
              </p>
            </div>
            <div className="border-l-4 border-gray-200 pl-4 py-1">
              <h4 className="text-lg font-bold text-gray-800 mb-1">Step 3: ログイン</h4>
              <p className="text-gray-700">登録した情報でサイトにログインします。</p>
            </div>
            <div className="border-l-4 border-red-400 pl-4 py-1 bg-red-50 rounded-r-lg">
              <h4 className="text-lg font-bold text-red-700 mb-1">Step 4: イベント情報入力</h4>
              <p className="text-gray-700">
                ログイン後、イベント登録ページから「新規登録」を選び、イベント詳細（日時、場所、内容など）を入力・送信すれば掲載準備完了です。
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500 bg-gray-50 p-3 rounded">
            ※掲載されるイベントは、開催日が未来のものに限ります。過去のイベントも記録として登録は可能ですが、一般公開はされません。
          </p>
        </div>

        <h2>簡単4ステップ！レッスン登録までの流れ</h2>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-12 p-6 md:p-8">
          <div className="space-y-6">
            <div className="border-l-4 border-gray-200 pl-4 py-1">
              <h4 className="text-lg font-bold text-gray-800 mb-1">Step 1: 会員登録</h4>
              <p className="text-gray-700">
                まずは簡単な情報入力で会員登録を完了してください。（イベント登録と共通のアカウントです）
              </p>
            </div>
            <div className="border-l-4 border-gray-200 pl-4 py-1">
              <h4 className="text-lg font-bold text-gray-800 mb-1">Step 2: メール認証</h4>
              <p className="text-gray-700">
                登録メールアドレスに認証メールが届きます。メール内のリンクをクリックして登録を完了させます。
              </p>
            </div>
            <div className="border-l-4 border-gray-200 pl-4 py-1">
              <h4 className="text-lg font-bold text-gray-800 mb-1">Step 3: ログイン</h4>
              <p className="text-gray-700">登録した情報でサイトにログインします。</p>
            </div>
            <div className="border-l-4 border-red-400 pl-4 py-1 bg-red-50 rounded-r-lg">
              <h4 className="text-lg font-bold text-red-700 mb-1">Step 4: レッスン情報入力</h4>
              <p className="text-gray-700">
                ログイン後、レッスン登録ページから「新規登録」を選び、レッスン詳細（日時、場所、内容など）を入力・送信すれば掲載準備完了です。
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500 bg-gray-50 p-3 rounded">
            ※掲載されるレッスンは、定期的に開催されるものが対象です。単発のワークショップ等はイベントとしてご登録ください。過去のレッスンも記録として登録は可能ですが、一般公開はされません。
          </p>
        </div>

        <div className="text-center mt-12 mb-8">
          <p className="text-xl font-bold text-gray-800 mb-4">
            さあ、あなたも今すぐ無料登録して、
            <br className="hidden md:inline" />
            素晴らしいダンスイベントを多くの人に届けましょう！
          </p>
          <p className="text-lg text-gray-600">集客アップとコミュニティ活性化のお手伝いをします。</p>
        </div>

        {registrationCards}
      </article>
    </MainLayout>
  );
}
