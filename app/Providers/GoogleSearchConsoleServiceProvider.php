<?php

namespace App\Providers;

use App\Services\GoogleSearchConsoleService;
use Illuminate\Support\ServiceProvider; // 作成するサービスをインポート

class GoogleSearchConsoleServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // サービスをシングルトンとしてコンテナにバインド
        // これにより、アプリケーション全体で同じインスタンスが使用される
        $this->app->singleton(GoogleSearchConsoleService::class, function ($app) {
            $secretPath = config('google.search_console');
            // ファイルが存在する場合のみサービスを初期化
            if ($secretPath && file_exists($secretPath)) {
                return new GoogleSearchConsoleService(
                    $secretPath,
                    config('app.name') // アプリケーション名も渡す
                );
            }

            // ファイルが存在しない場合は null を返す
            return null;
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
