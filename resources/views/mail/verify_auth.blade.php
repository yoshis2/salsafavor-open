@extends('mail.layout')
@section('content')
    <article>
        <h4>
            {{ config('mail.from.name') }} 会員登録ありがとうございます。
        </h4>
        <br />
        <p>
            まだ会員登録は完了していません。登録を完了するには以下のボタンをクリックしてください。
        </p>
        <p style="color:#d00;font-weight:bold;">
            ※メール認証リンクはセキュリティのため一定時間で無効になる場合があります。<br />
            また、違うデバイスやブラウザで認証を行う場合は、先にログインしてからメール認証を行ってください。
        </p>
        <div class="center"><a class="btn info" href="{{ $actionUrl }}">{{ $actionText }}</a></div>

        <p>このメールに心当たりがない場合はメールを破棄してください。</p>
        <p>
            ご不明な点がありましたらお気軽に以下のリンクからお問い合わせください。<br />
            https://www.salsafavor.com/inquiry
        </p>
        <p>
            ****************************************************<br />
            サルサの総合ポータルサイト　SalsaFavor<br />
            URL: https://www.salsafavor.com<br /><br />

            運営 : スリーネクスト<br />
            URL : https://www.threenext.com<br />
            ****************************************************
        </p>
    </article>
@endsection
