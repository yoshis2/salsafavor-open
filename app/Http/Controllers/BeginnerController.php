<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class BeginnerController extends Controller
{
    public function dance()
    {
        return Inertia::render('Beginner/Dance', [
            'title' => 'サルサダンスの種類と選び方ガイド',
        ]);
    }

    public function lesson()
    {
        return Inertia::render('Beginner/Lesson', [
            'title' => 'サルサレッスン完全ガイド',
        ]);
    }

    public function clothes()
    {
        return Inertia::render('Beginner/Clothes', [
            'title' => 'サルサ初心者の服装ガイド',
        ]);
    }

    public function shoes()
    {
        return Inertia::render('Beginner/Shoes', [
            'title' => 'サルサシューズの選び方',
        ]);
    }

    public function bachata()
    {
        return Inertia::render('Beginner/Bachata', [
            'title' => 'バチャータ完全ガイド',
        ]);
    }

    public function preparation()
    {
        return Inertia::render('Beginner/Preparation', [
            'title' => 'サルサダンス初心者のための完全ガイド',
        ]);
    }

    public function merengue()
    {
        return Inertia::render('Beginner/Merengue', [
            'title' => 'サルサクラブでかかる他ジャンル解説',
        ]);
    }

    public function place()
    {
        return Inertia::render('Beginner/Place', [
            'title' => 'サルサイベント完全ガイド',
        ]);
    }

    public function corona()
    {
        return Inertia::render('Beginner/Corona', [
            'title' => 'コロナ後のサルサやバチャータ、キゾンバのマナーや対応の変化',
        ]);
    }
}
