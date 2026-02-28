# docker-setup Specification

## Purpose
TBD - created by archiving change update-docker-to-laravel-server. Update Purpose after archive.
## Requirements
### Requirement: Laravel開発サーバーによる起動
アプリケーションはNginxを介さず、Laravelの組み込み開発サーバーを使用して直接ポート8000でアクセス可能でなければならない（MUST）。

#### Scenario: 開発サーバーの起動
- **WHEN** `docker compose up` を実行した時
- **THEN** `favor-app` コンテナ内で `php artisan serve` が実行され、ホストのポート8000で接続を待ち受ける

