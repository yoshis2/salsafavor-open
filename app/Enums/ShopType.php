<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class ShopType extends Enum
{
    public const COLORS = [
        'ホワイト' => '白',
        'ブラック' => '黒',
        'レッド' => '赤',
        'ブルー' => '青',
        'ゴールド' => 'ゴールド',
        'シルバー' => 'シルバー',
    ];

    public const DISPLAY_ORDER = [
        '+itemPrice' => '安い価格順',
        '-itemPrice' => '高い価格順',
        '+updateTimestamp' => '古い更新日時順',
        '-updateTimestamp' => '新しい更新日時順',
    ];

    public const MUSIC_GENRES = [
        'salsa' => 'サルサ',
        'mambo' => 'マンボ',
        'bachata' => 'バチャータ',
        'merengue' => 'メレンゲ',
        'kizomba' => 'キゾンバ',
        'latin' => 'ラテン',
    ];

    public const MOVIE_GENRES = [
        'サルサ 映画' => 'サルサ 洋画',
        'サルサレッスン' => 'サルサ レッスン',
        'バチャータレッスン' => 'bachata',
        'その他ダンス レッスン' => 'ラテン レッスン',
    ];
}
