<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class ImagePathType extends Enum
{
    const PROFILE = 'storage/profiles/'; // path + ユーザーID + ファイル名

    const EVENT = 'storage/events/'; // path + 作成日付 + イベントID + ファイル名

    const LESSON = 'storage/lessons/';  // path +レッスンID + ファイル名
}
