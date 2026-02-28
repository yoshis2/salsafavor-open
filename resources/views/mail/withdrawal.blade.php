@extends('mail.layout')
@section('content')
    <article>
        <h4>{{ config('mail.from.name') }} をありがとうございました</h4>
        <br />
        <p> {{ $user->name }} 様</p>
        <p>
            今までSalsaFavor をご利用頂きましてありがとうございました。<br />
            退会は完了しました。
        </p>
        <p>
            再度ご利用したい場合は会員登録していただきましたらご利用できますので<br />
            もし、利用できるようであれば再登録お願いいたします。
        </p>
        <p>
            ****************************************************<br />
            サルサの総合ポータル　SalsaFavor<br />
            URL: https://www.salsafavor.com<br /><br />

            運営 : スリーネクスト<br />
            URL : https://www.threenext.com<br />
            ****************************************************
        </p>
    </article>
@endsection
