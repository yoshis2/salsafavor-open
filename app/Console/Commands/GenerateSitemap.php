<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\SitemapGenerator;

class GenerateSitemap extends Command
{
    // コマンド名を設定
    protected $signature = 'create_sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.';

    // コマンド実行時に呼び出される
    public function handle()
    {
        // プロジェクトのURL以下を解析し、sitemap.xmlという名前でサイトマップを作成する
        SitemapGenerator::create('https://www.salsafavor.com')
            ->writeToFile(public_path('sitemap.xml'));
    }
}
