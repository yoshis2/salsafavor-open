<?php

namespace App\Http\Middleware;

use Closure;
use Log;

class CheckIp
{
    public function handle($request, Closure $next)
    {
        $ipAddress = $request->ip();
        Log::info('IPアドレス : '.$ipAddress);

        return $next($request);
    }
}
