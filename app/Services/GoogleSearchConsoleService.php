<?php

namespace App\Services;

use Google\Client;
use Google\Service\SearchConsole; // 新しいAPIの場合
// use Google\Service\Webmasters; // 古いAPIの場合（非推奨だが念のため）
use Illuminate\Support\Facades\Log;

class GoogleSearchConsoleService
{
    protected Client $client;

    protected SearchConsole $service; // または Webmasters

    public function __construct(string $serviceAccountKeyPath, string $applicationName = 'Laravel Application')
    {
        // ファイルが存在しない場合はスキップ
        if (! file_exists($serviceAccountKeyPath)) {
            return;
        }

        $this->client = new Client;
        $this->client->setApplicationName($applicationName);
        $this->client->setAuthConfig($serviceAccountKeyPath);
        $this->client->setScopes([SearchConsole::WEBMASTERS]); // または 'https://www.googleapis.com/auth/webmasters'
        $this->client->setAccessType('offline'); // リフレッシュトークンが必要な場合（サービスアカウントなら不要な場合が多い）

        $this->service = new SearchConsole($this->client); // または new Webmasters($this->client);
    }

    /**
     * Google Search Consoleにサイトマップを送信します。
     *
     * @param  string  $siteUrl  Search Consoleに登録されているプロパティのURL (例: 'https://your-domain.com/')
     * @param  string  $sitemapUrl  送信するサイトマップのURL (例: 'https://your-domain.com/sitemap.xml')
     * @return bool 成功した場合はtrue、失敗した場合はfalse
     */
    public function submitSitemap(string $siteUrl, string $sitemapUrl): bool
    {
        try {
            // 末尾のスラッシュを統一 (Google Search Console APIの要件に合わせて調整)
            $siteUrl = rtrim($siteUrl, '/').'/';

            $this->service->sitemaps->submit($siteUrl, $sitemapUrl);

            Log::info('Sitemap successfully submitted to Search Console.', [
                'siteUrl' => $siteUrl,
                'sitemapUrl' => $sitemapUrl,
            ]);

            return true;
        } catch (\Google\Service\Exception $e) {
            Log::error('Failed to submit sitemap to Search Console: '.$e->getMessage(), [
                'siteUrl' => $siteUrl,
                'sitemapUrl' => $sitemapUrl,
                'error' => $e->getErrors(), // より詳細なエラー情報
            ]);

            return false;
        } catch (\Exception $e) {
            Log::error('An unexpected error occurred while submitting sitemap: '.$e->getMessage(), [
                'siteUrl' => $siteUrl,
                'sitemapUrl' => $sitemapUrl,
            ]);

            return false;
        }
    }

    // 必要に応じて他のSearch Console APIメソッドを追加
    // 例: getSitemaps(), deleteSitemap() など
}
