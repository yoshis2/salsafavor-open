<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class EventType extends Enum
{
    public const WEEKS = [
        'sunday' => '日曜日',
        'monday' => '月曜日',
        'tuesday' => '火曜日',
        'wednesday' => '水曜日',
        'thursday' => '木曜日',
        'friday' => '金曜日',
        'saturday' => '土曜日',
    ];

    public const FREQUENCIES = [
        'every_week' => '毎週',
        'every_other_week' => '隔週',
        'first' => '第1週',
        'second' => '第2週',
        'third' => '第3週',
        'fourth' => '第4週',
        'fifth' => '第5週',
    ];
}
