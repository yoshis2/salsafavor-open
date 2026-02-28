<?php

namespace App\Http\Middleware;

use App\Enums\PermissionWordType;
use Closure;
use Log;

class PermissionParameter
{
    public function handle($request, Closure $next, $param = null)
    {
        $words = match ($param) {
            'rakuten' => array_merge(PermissionWordType::RAKUTEN_SEARCH, PermissionWordType::RAKUTEN_KEYWORD),
            'lesson' => PermissionWordType::SEARCH_LESSON,
            'event' => PermissionWordType::SEARCH_EVENT,
            'inquiry' => PermissionWordType::INQUIRY,
            'register' => PermissionWordType::REGISTER,
            default => [],
        };

        foreach ($request->query() as $key => $value) {
            if (! in_array($key, $words)) {
                Log::info('存在しないパラメーター : '.$key);
                abort(403, 'Forbidden');
            }

            $trimmedKey = trim($key);
            if ($trimmedKey !== $key || str_contains($key, ' ')) {
                Log::info('パラメータ名に不正なスペースを検出しました : '.$key);
                abort(403, 'Forbidden');
            }
        }

        return $next($request);
    }
}
