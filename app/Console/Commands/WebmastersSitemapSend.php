<?php

namespace App\Console\Commands;

use App\Services\GoogleSearchConsoleService;
use Illuminate\Console\Command;
use Spatie\Sitemap\SitemapGenerator;

class WebmastersSitemapSend extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate the sitemap.xml file and submit to Search Console.';

    protected ?GoogleSearchConsoleService $searchConsoleService;

    // サービスをコンストラクタインジェクションで受け取る（テスト/CIで未設定の場合は null を許容）
    public function __construct(?GoogleSearchConsoleService $searchConsoleService = null)
    {
        parent::__construct();
        $this->searchConsoleService = $searchConsoleService;
    }

    public function handle()
    {
        $this->info('サイトマップの生成を開始します...');
        $domain = config('app.url'); // .envのAPP_URLを使用
        $sitemapPath = public_path('sitemap.xml');
        $sitemapUrl = $domain.'/sitemap.xml';

        // サイトマップ生成ロジック
        SitemapGenerator::create($domain)
            ->writeToFile($sitemapPath);

        $this->info('サイトマップが正常に生成されました: '.$sitemapPath);

        // Search Consoleへの送信
        // サービスが初期化されていない場合はスキップ
        if ($this->searchConsoleService === null) {
            $this->warn('Google Search Console認証情報が設定されていないため、サイトマップ送信をスキップします。');

            return Command::SUCCESS;
        }

        $this->info('Google Search Consoleにサイトマップを送信します...');
        $submitted = $this->searchConsoleService->submitSitemap($domain, $sitemapUrl);

        if ($submitted) {
            $this->info('サイトマップがSearch Consoleに正常に送信されました。');
        } else {
            $this->error('サイトマップのSearch Consoleへの送信に失敗しました。詳細はログを確認してください。');
        }

        return Command::SUCCESS;
    }
}
