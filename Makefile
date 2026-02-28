SAIL := ./vendor/bin/sail

# --------------------------------------------------------------------
#  Help (Command List)
# --------------------------------------------------------------------
.PHONY: help
help:
	@echo "----------------------------------------------------------------"
	@echo "SalsaFavor Make Commands"
	@echo "----------------------------------------------------------------"
	@echo "【 環境構築 (Setup) 】"
	@echo "  make build       : プロジェクトの初期構築 (コンテナ起動+依存解決+マイグレーション)"
	@echo ""
	@echo "【 Docker操作 (Container) 】"
	@echo "  make up          : コンテナを起動 (バックグラウンド)"
	@echo "  make up-log      : コンテナを起動 (ログ表示モード)"
	@echo "  make down        : コンテナを停止"
	@echo "  make ps          : コンテナの状態確認"
	@echo "  make in          : PHPコンテナにログイン (Shell)"
	@echo ""
	@echo "【 データベース (Database) 】"
	@echo "  make migrate     : マイグレーション実行"
	@echo "  make migrate-all : DBリセット + マイグレーション + シーディング"
	@echo "  make seed        : 初期データ投入 (Seeding)"
	@echo "  make rollback    : 直前のマイグレーションをロールバック"
	@echo ""
	@echo "【 フロントエンド (Frontend) 】"
	@echo "  make node        : npm install & build 実行"
	@echo "  make dev         : ファイル変更監視 (npm run dev)"
	@echo "  make node-latest : npmライブラリのアップデート"
	@echo ""
	@echo "【 品質・テスト (Quality & Test) 】"
	@echo "  make test        : PHPUnitテスト実行"
	@echo "  make lint        : 静的解析 (PHPStan) とコード整形 (Pint) を実行"
	@echo ""
	@echo "【 ユーティリティ (Utility) 】"
	@echo "  make clear       : 各種キャッシュクリア (Config/Route/View)"
	@echo "  make list        : ルーティング一覧表示"
	@echo "  make sitemap     : サイトマップ生成 (本番用コマンド)"
	@echo "----------------------------------------------------------------"

# --------------------------------------------------------------------
#  1. 環境構築 (Setup)
# --------------------------------------------------------------------

.PHONY: sail
sail:
	docker run --rm \
		-u "$$(id -u):$$(id -g)" \
		-v "$$(pwd):/var/www/html" \
		-w /var/www/html \
		-e HOME=/tmp \
		laravelsail/php84-composer:latest \
		/bin/bash -c "git config --global --add safe.directory /var/www/html && composer install --ignore-platform-reqs"

# コンテナをビルドして起動し、初期設定を行います
.PHONY: build
build:
	$(SAIL) up -d --build
	$(SAIL) composer install
	$(SAIL) artisan key:generate
	$(SAIL) artisan migrate
	$(SAIL) npm install
	$(SAIL) npm run dev

# --------------------------------------------------------------------
#  2. Docker操作 (Container Management)
# --------------------------------------------------------------------

# Dockerコンテナをバックグラウンドで起動します
.PHONY: up
up:
	$(SAIL) up -d

# Dockerコンテナをフォアグラウンドで起動し、ログを表示します
.PHONY: up-log
up-log:
	$(SAIL) up

# Dockerコンテナを停止します
.PHONY: down
down:
	$(SAIL) down

# appコンテナ(PHP)にシェルでログインします
.PHONY: in
in:
	$(SAIL) shell

# Dockerコンテナの状態を表示します
.PHONY: ps
ps:
	$(SAIL) ps -a

# --------------------------------------------------------------------
#  3. データベース (Database Management)
# --------------------------------------------------------------------

# データベースのマイグレーションを実行します
.PHONY: migrate
migrate:
	$(SAIL) artisan migrate

# データベースをリフレッシュし、シーディングも行います
.PHONY: migrate-all
migrate-all:
	$(SAIL) artisan migrate:refresh --seed

# データベースに初期データを投入します
.PHONY: seed
seed:
	$(SAIL) artisan db:seed

# 最後のマイグレーションをロールバックします
.PHONY: rollback
rollback:
	$(SAIL) artisan migrate:rollback

# --------------------------------------------------------------------
#  4. フロントエンド (Frontend Assets)
# --------------------------------------------------------------------

# npm installとnpm run devを実行します
.PHONY: node
node:
	$(SAIL) npm install
	$(SAIL) npm run build

# ファイルの変更を監視して自動でビルドします
.PHONY: dev
dev:
	$(SAIL) npm run dev

# npmを最新バージョンにアップデートします
.PHONY: node-latest
node-latest:
	$(SAIL) npm install -g npm@latest

# --------------------------------------------------------------------
#  5. 品質・テスト (Quality Assurance & Testing)
# --------------------------------------------------------------------

# PHPUnitのテストを実行します
.PHONY: test
test:
	$(SAIL) artisan test

# コードスタイルの自動修正と静的解析を実行します
#devcontainerでは./vendor/bin/pintや./vendor/bin/phpstan
.PHONY: lint
lint:
	$(SAIL) bin pint
	$(SAIL) bin phpstan analyze --memory-limit=2G

# --------------------------------------------------------------------
#  6. ユーティリティ (Utilities)
# --------------------------------------------------------------------

# Laravelの各種キャッシュをクリアします
.PHONY: clear
clear:
	$(SAIL) artisan cache:clear
	$(SAIL) artisan config:clear
	$(SAIL) artisan route:clear
	$(SAIL) artisan view:clear
	$(SAIL) artisan optimize:clear
	$(SAIL) composer dump-autoload

.PHONY: composer
composer:
	$(SAIL) composer upgrade

# ルーティングの一覧を表示します
.PHONY: list
list:
	$(SAIL) artisan route:list

# サイトマップを生成します (ローカルでは起動不可)
.PHONY: sitemap
sitemap:
	$(SAIL) artisan sitemap:generate
	$(SAIL) artisan ide-helper:model

.PHONY: pail
pail:
	$(SAIL) artisan pail
