<?php

namespace App\Http\Middleware;

use Closure;
use Request;

class Cors
{
    public function handle($request, Closure $next)
    {
        // すべてのレスポンスに CORS 用のヘッダーを追加する必要はないので URL から判断する
        $paths = explode('/', (string) Request::getPathInfo());
        if (! isset($paths[1])) {
            return $next($request);
        }
        if ($paths[1] === 'web') {
            return $next($request)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Accept, X-Requested-With, Origin, Content-Type');
        }

        return $next($request);
    }
}
