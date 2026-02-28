<?php

return [
    'TagManager' => env('GOOGLE_TAG_MANAGER', 'null'),
    // サービスアカウントキーのJSONファイルへのパス
    'search_console' => env('GOOGLE_SEARCH_CONSOLE', storage_path('app/secrets/salsafavor-8713169aee9c.json')),
];
