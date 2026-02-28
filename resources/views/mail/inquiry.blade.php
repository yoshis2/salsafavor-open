@extends('mail.layout')
@section('content')
    <article>
        <h4>{{ config('mail.from.name') }} お問合せ内容送信確認</h4>
        <br />
        <p> {{ $inquiry['name'] }} 様</p>
        <p>
            SalsaFavor にお問合せ頂きましてありがとうございます。<br />
            3営業日以内に返信させていただきますので今しばらくお待ちください。
        </p>
        <p>問い合わせ内容は以下で承りました。</p>
        <p>
            ■ご質問者情報----------------------------------------<br />
            [氏名] : {{ $inquiry['name'] }} 様<br /><br />
            [件名] : {{ $inquiry['title'] }}<br /><br />
            [メールアドレス] : {{ $inquiry['mail'] }}<br /><br />
            [詳細内容] : <br /><br />
            {!! nl2br(e($inquiry['detail'])) !!}<br /><br />
            ------------------------------------------------------
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
