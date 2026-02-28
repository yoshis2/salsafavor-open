<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class PermissionWordType extends Enum
{
    const REGISTER = [
        'name',
        'email',
        'password',
        'password_confirmation',
        'cf-turnstile-response',
    ];

    const INQUIRY = [
        'name',
        'mail',
        'title',
        'detail',
        'cf-turnstile-response',
    ];

    const SEARCH_EVENT = [
        'prefecture_id',
        'lessons',
        'date',
        'genre_id',
        'cursor',
        'performances',
    ];

    const SEARCH_LESSON = [
        'prefecture_id',
        'genre_id',
        'week',
        'cursor',
    ];

    const RAKUTEN_KEYWORD = [
        'keyword',
        'musicGenre',
        'color',
        'gender',
    ];

    const RAKUTEN_SEARCH = [
        'page',
        'minPrice',
        'maxPrice',
        'sort',
    ];
}
