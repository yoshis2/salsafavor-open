<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Session Driver
    |--------------------------------------------------------------------------
    |
    | This option controls the default session "driver" that will be utilized
    | by Laravel. By default, we will use the lightweight "file" driver which
    | works great for most applications. You may also specify a database
    | or other types of drivers for your application as needed.
    |
    | Supported: "file", "cookie", "database", "apc",
    |            "memcached", "redis", "dynamodb", "array"
    |
    */

    'driver' => env('SESSION_DRIVER', 'file'),

    /*
    |--------------------------------------------------------------------------
    | Session Lifetime
    |--------------------------------------------------------------------------
    |
    | Here you may specify the number of minutes that the session should be
    | allowed to remain idle before it expires. If you want them to
    | expire immediately upon browser closing, set that option.
    |
    */

    'lifetime' => env('SESSION_LIFETIME', 120),

    'expire_on_close' => env('SESSION_EXPIRE_ON_CLOSE', false),

    /*
    |--------------------------------------------------------------------------
    | Session Encryption
    |--------------------------------------------------------------------------
    |
    | This option allows you to easily specify that all of your session data
    | should be encrypted before it is stored. All encryption is performed
    | automatically by Laravel and you can use the session as normal.
    |
    */

    'encrypt' => env('SESSION_ENCRYPT', false),

    /*
    |--------------------------------------------------------------------------
    | Session File Location
    |--------------------------------------------------------------------------
    |
    | When using the "file" session driver, we need a location where files
    | may be stored. A default has been provided, but you may change it.
    | This is just an example of where your sessions should reside.
    |
    */

    'files' => storage_path('framework/sessions'),

    /*
    |--------------------------------------------------------------------------
    | Session Database Connection
    |--------------------------------------------------------------------------
    |
    | When using the "database" session driver, you may specify the connection
    | that should be used to store your sessions in the database. When this
    | option is null, the default database connection will be utilized.
    |
    */

    'connection' => env('SESSION_CONNECTION'),

    /*
    |--------------------------------------------------------------------------
    | Session Database Table
    |--------------------------------------------------------------------------
    |
    | When using the "database" session driver, you may specify the table that
    | should be utilized to store your sessions in the database. Of course,
    | a sensible default has been provided for you out of the box.
    |
    */

    'table' => 'sessions',

    /*
    |--------------------------------------------------------------------------
    | Session Cache Store
    |--------------------------------------------------------------------------
    |
    | When using a session driver that also utilizes a cache based store, we
    | may specify the name of the cache store that should be used for this
    | operation. This provides another layer of separation from your data.
    |
    */

    'store' => env('SESSION_STORE'),

    /*
    |--------------------------------------------------------------------------
    | Session Sweeping Lottery
    |--------------------------------------------------------------------------
    |
    | Some session drivers must manually sweep their expired sessions. This
    | option determines the percentage chance that session cleanup will
    | occur on a given request. By default, the odds are 2 out of 100.
    |
    */

    'lottery' => [2, 100],

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify the name of the cookie that will be used to store
    | the session ID when using the "cookie" driver. The name should be unique
    | to your application and avoid conflicts with other applications.
    |
    */

    'cookie' => env(
        'SESSION_COOKIE',
        Str::slug(env('APP_NAME', 'laravel'), '_').'_session'
    ),

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Path
    |--------------------------------------------------------------------------
    |
    | The session cookie path determines the path for which the cookie will
    | be regarded as available. Typically, this will be the root path of
    | your application, but you may change this when necessary.
    |
    */

    'path' => '/',

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Domain
    |--------------------------------------------------------------------------
    |
    | Here you may specify the domain for which the session cookie will be
    | regarded as available. This defaults to the host name of the current
    | request, but you may want to change this for multi-domain applications.
    |
    */

    'domain' => env('SESSION_DOMAIN'),

    /*
    |--------------------------------------------------------------------------
    | HTTPS Only Cookies
    |--------------------------------------------------------------------------
    |
    | By default, Laravel will only send session cookies over HTTPS connections
    | to prevent the cookie from being intercepted by malicious parties. If
    | your application only serves through HTTP, you may disable this.
    |
    */

    'secure' => env('SESSION_SECURE_COOKIE', null),

    /*
    |--------------------------------------------------------------------------
    | HTTP Access Only
    |--------------------------------------------------------------------------
    |
    | Setting this value to true will prevent JavaScript from accessing the
    | value of the cookie via the document.cookie property. This will help
    | to mitigate the risks of cross-site scripting attacks on your application.
    |
    */

    'httponly' => true,

    /*
    |--------------------------------------------------------------------------
    | Same-Site Cookie
    |--------------------------------------------------------------------------
    |
    | This option determines how your cookies behave when they are accessed from a
    | different domain. By default, it is set to "lax", but you may want to
    | change this to "strict" or "none" depending on your needs.
    |
    | Supported: "lax", "strict", "none", null
    |
    */

    'samesite' => env('SESSION_SAMESITE', 'lax'),

    /*
    |--------------------------------------------------------------------------
    | Prevent PHP Session ID from being set as a GET parameter
    |--------------------------------------------------------------------------
    |
    | Setting this value to false will allow PHP's session ID to be set as a
    | GET parameter on URLs. This is generally not recommended for security
    | reasons, but may be necessary for some legacy applications.
    |
    */

    'invalidate_session_id' => true,

];
