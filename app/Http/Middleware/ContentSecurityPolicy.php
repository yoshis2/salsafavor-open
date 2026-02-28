<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\View\View;

class ContentSecurityPolicy
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if (! $this->shouldApply($request, $response)) {
            return $response;
        }

        $response->headers->set('Content-Security-Policy', $this->buildPolicy());

        return $response;
    }

    private function shouldApply(Request $request, $response): bool
    {
        if ($request->headers->has('X-Inertia')) {
            return true;
        }

        if ($response instanceof Response && $response->original instanceof View) {
            return $response->original->getName() === 'app';
        }

        return false;
    }

    private function buildPolicy(): string
    {
        $scriptSrc =
            "script-src 'self' 'unsafe-inline'".
            ' https://www.googletagmanager.com'.
            ' https://www.google-analytics.com'.
            ' https://static.ads-twitter.com'.
            ' https://www.clarity.ms'.
            ' https://scripts.clarity.ms'.
            ' https://challenges.cloudflare.com'.
            ' https://*.rakuten.co.jp';

        $scriptSrcElem = str_replace('script-src', 'script-src-elem', $scriptSrc);

        // 本番環境ではインライン style を禁止し、'unsafe-inline' を含めない
        $styleSrc = "style-src 'self' 'unsafe-inline'";

        $imageSrc =
            "img-src 'self' data:".
            ' https://challenges.cloudflare.com'.
            ' https://*.rakuten.co.jp'.
            ' https://c.bing.com'.
            ' https://*.clarity.ms'.
            ' https://c.clarity.ms'.
            ' https://t.co'.
            ' https://analytics.twitter.com'.
            ' https://item-shopping.c.yimg.jp'.
            ' https://www.google.co.jp'.
            ' https://www.google.com'.
            ' https://www.googletagmanager.com'.
            ' https://www.google-analytics.com';

        $frameSrc =
            "frame-src 'self'".
            ' https://challenges.cloudflare.com'.
            ' https://www.youtube-nocookie.com'.
            ' https://www.youtube.com'.
            ' https://www.google.com'.
            ' https://maps.google.com'.
            ' https://*.rakuten.co.jp';

        $connectSrc =
            "connect-src 'self'".
            ' https://www.googletagmanager.com'.
            ' https://www.google-analytics.com'.
            ' https://analytics.google.com'.
            ' https://stats.g.doubleclick.net'.
            ' https://*.clarity.ms'.
            ' https://o.clarity.ms'.
            ' https://challenges.cloudflare.com'.
            ' https://*.rakuten.co.jp';

        if (app()->environment('local')) {
            $scriptSrc =
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'".
                ' https://www.googletagmanager.com'.
                ' https://www.google-analytics.com'.
                ' https://static.ads-twitter.com'.
                ' https://www.clarity.ms'.
                ' https://scripts.clarity.ms'.
                ' https://challenges.cloudflare.com'.
                ' https://*.rakuten.co.jp'.
                ' http://localhost:5173'.
                ' http://127.0.0.1:5173';

            $scriptSrcElem = str_replace('script-src', 'script-src-elem', $scriptSrc);
            // ローカル環境では開発の利便性を優先し、インライン style と Vite Dev Server を許可

            $styleSrc = "style-src 'self' 'unsafe-inline'".
                ' http://localhost:5173'.
                ' http://127.0.0.1:5173';

            $connectSrc =
                "connect-src 'self'".
                ' https://challenges.cloudflare.com'.
                ' https://www.googletagmanager.com'.
                ' https://www.google-analytics.com'.
                ' https://analytics.google.com'.
                ' https://*.clarity.ms'.
                ' http://localhost:5173'.
                ' http://127.0.0.1:5173'.
                ' ws://localhost:5173'.
                ' ws://127.0.0.1:5173';
        }

        $directives = [
            "default-src 'self'",
            $scriptSrc,
            $scriptSrcElem,
            $styleSrc,
            $imageSrc,
            $frameSrc,
            $connectSrc,
            "font-src 'self' data:",
            "base-uri 'self'",
            "form-action 'self'",
        ];

        if (! app()->environment('local')) {
            $directives[] = 'upgrade-insecure-requests';
        }

        return implode('; ', $directives);
    }
}
