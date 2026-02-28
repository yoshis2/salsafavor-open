<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $carouselItems = [
            [
                'route' => route('shop.rakuten.shoes'),
                'webp' => asset('img/top/crop-couple-dancing.webp'),
                'jpg' => asset('img/top/crop-couple-dancing.jpg'),
                'alt' => 'ラテン・サルサ　シューズ',
                'caption' => 'ダンス・サルサシューズ',
            ],
            [
                'route' => route('shop.rakuten.music'),
                'webp' => asset('img/top/dark-room-skillful.webp'),
                'jpg' => asset('img/top/dark-room-skillful.jpg'),
                'alt' => 'ラテン・サルサ　音楽',
                'caption' => 'ラテン・サルサ　音楽',
            ],
            [
                'route' => route('shop.dvd'),
                'webp' => asset('img/top/performing-skillful.webp'),
                'jpg' => asset('img/top/performing-skillful.jpg'),
                'alt' => 'サルサ映画',
                'caption' => 'サルサ映画',
            ],
            [
                'route' => route('shop.rakuten.clothes'),
                'webp' => asset('img/top/young-beautiful.webp'),
                'jpg' => asset('img/top/young-beautiful.jpg'),
                'alt' => 'ダンス・サルサ　衣装',
                'caption' => 'ダンス・サルサ　衣装',
            ],
        ];

        return Inertia::render('Home', [
            'carouselItems' => $carouselItems,
        ]);
    }

    public function privacy()
    {
        return Inertia::render('Privacy');
    }

    public function registration()
    {
        return Inertia::render('Registration');
    }

    public function withdraw()
    {
        return Inertia::render('Withdraw');
    }
}
