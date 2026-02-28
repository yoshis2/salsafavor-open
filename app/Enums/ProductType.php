<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class ProductType extends Enum
{
    const DANCE_SHOES = '214683';   // ダンスシューズのカテゴリID

    const DANCE_WEAR = '214682';   // ダンスウェアのカテゴリID

    const DANCE_WEAR2 = '564626';   // ダンス衣装のカテゴリID

    const DANCE_MUSIC = '101311';   // ダンスミュージックのカテゴリID

    const MOVIE = '101354';    // DVD ビデオCDのカテゴリID
}
