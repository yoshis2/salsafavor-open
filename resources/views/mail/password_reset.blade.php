@extends('mail.layout')
@section('content')
    <article>
        <h4>{{ config('mail.from.name') }} {{ __('auth.reset_password') }}リンク送信のお知らせ</h4>
        <br />
        <p>
            サルサ総合ポータル SalsaFavorのパスワードリセットのリクエストいただきましてありがとうございます。<br />
            リセットリンクを送信させていただきました。
        </p>
        <p>
            {{ __('passwords.click_link') }}<br />
            {{ __('passwords.further') }}
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
