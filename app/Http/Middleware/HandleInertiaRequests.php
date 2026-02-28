<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // 空のフラッシュメッセージは除外
        $flash = collect([
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
            'warning' => $request->session()->get('warning'),
            'message' => $request->session()->get('message'),
        ])->filter(function ($v) {
            return filled($v);
        })->all();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()?->only(['id', 'name', 'email']),
            ],
            'turnstile_site_key' => config('turnstile.turnstile_site_key'),
            'flash' => $flash,
        ];
    }
}
