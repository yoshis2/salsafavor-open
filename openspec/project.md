# プロジェクトの文脈 (Project Context)

## 目的 (Purpose)

**「日本のサルサシーンを繋ぐ、情報のハブになる」**

Salsafavor（サルサフェイバー）は、日本国内のサルサダンスコミュニティに向けた総合ポータルサイトです。FacebookなどのSNSに散在し、フロー情報として流れてしまいがちな「イベント情報」や「レッスン情報」をストック情報として蓄積・整理し、検索可能にすることで、既存ダンサーの利便性向上と、新規層の参入障壁を下げることをミッションとしています。

**主要なゴール:**

1.  **ユーザー体験の向上**: ダンスイベントやレッスンを「日付」「場所」「ジャンル（On1/On2/Cuban等）」で瞬時に検索できるプラットフォームを提供します。
2.  **オーガナイザー支援**: イベント主催者が自身のイベントを管理・告知できるCMS機能を提供し、集客を支援します。
3.  **収益化のエコシステム**: 楽天API/Yahoo APIを活用したダンス関連グッズ（シューズ、衣装、音楽）のショッピング機能により、持続可能な運営収益を確保します。
4.  **モダン化による開発効率向上**: レガシーなjQuery/Bootstrap環境から、React/Inertia/Tailwind環境へ移行し、開発スピードと保守性を劇的に向上させます。

## 技術スタック (Tech Stack)

現在、本プロジェクトはモノリスからモダンなSPAライクな構成への移行フェーズにあります。以下の技術スタックは「移行後（To-Be）」を主軸としつつ、「現行（As-Is）」のサポートも継続します。

### Backend

- **Framework**: Laravel 12 (Target) / PHP 8.4
- **Database**: MySQL 8.0+ (Production: Xserver / Local: Docker)
- **Cache/Queue**: Redis
- **Search**: Eloquent / MySQL Full Text Search (将来的にMeilisearch等の導入を検討)

### Frontend (Modern / To-Be)

- **Core**: Inertia.js v2
- **UI Library**: React 19, TypeScript 5.x
- **Styling**: Tailwind CSS v4 (Prefixなし運用)
- **Routing**: Laravel Routes (`web.php`) + Ziggy (Client-side routing)
- **Build Tool**: Vite 6.x (Hot Module Replacement対応)

### Frontend (Legacy / As-Is)

- **Template**: Blade Templates
- **Styling**: Bootstrap 4/5, SCSS (`resources/sass`)
- **Scripting**: jQuery, jQuery UI (Sortableなど)
- **Note**: これらは段階的に廃止・置換対象ですが、移行完了までは共存させます。

### Infrastructure & DevOps

- **Local**: Docker Compose (Laravel Sail base)
- **Production**: Xserver (Shared Hosting)
- **CI/CD**: GitHub Actions (Lint, Test, Deploy)

## プロジェクトの規約 (Project Conventions)

### ドキュメント言語 (Documentation Language)

- 提案書 (`proposal.md`)、タスク (`tasks.md`)、設計 (`design.md`)、スペック (`spec.md`) を含むすべてのドキュメントは、**日本語**で記述してください。
- コミットメッセージやプルリクエストのタイトルも日本語を推奨しますが、プレフィックス（`feat:`, `fix:` 等）は英語を使用してください。

### コードスタイル (Code Style)

**PHP (Backend)**

- **PSR-12** に準拠します。
- `Laravel Pint` を使用してフォーマットを統一します。
- クラス名、メソッド名は英語で記述し、可読性を重視した命名（ `getUserById` など）を心がけてください。

**TypeScript / React (Frontend)**

- **Prettier** と **ESLint** のルールに従います。
- コンポーネント名は PascalCase（例: `EventCard.tsx`）、関数や変数は camelCase を使用します。
- `any` 型の使用は原則禁止とし、必ず型定義を行ってください。InertiaのPropsにはジェネリクスを使用し、Laravel側からのデータ構造を明示してください。

### アーキテクチャパターン (Architecture Patterns)

**Strangler Fig Pattern（絞め殺し植物パターン）**

- 既存のBladeベースのアプリケーションを稼働させたまま、ページ単位またはコンポーネント単位で徐々にReact/Inertiaへ置き換えていく戦略を採用します。
- **ハイブリッド構成**: 同一ドメイン内で、古いURL（Blade）と新しいURL（Inertia）が混在することを許容します。共通レイアウト（Header/Footer）は両方の環境で整合性が取れるよう、同期的に保守（またはReactコンポーネントによる再実装）を行います。

**Modular Monolith (推奨)**

- 機能（Feature）ごとにディレクトリを整理することを推奨します。例えば、`Event` に関連する Controller, Model, Request, Policy, React Page Components は、可能な限り関連性がわかるように配置・命名します。

### テスト戦略 (Testing Strategy)

**現状の課題と方針**

- レガシーコードにはテストが不足していますが、新規実装およびReact化する機能についてはテストを必須とします。

**要件**

1.  **Feature Tests (PHPUnit/Pest)**: コントローラーの挙動、HTTPステータス、Inertiaレスポンスのデータ構造を検証します。
2.  **Component Tests (Vitest/RTL)**: 複雑なUIロジックを持つReactコンポーネント（フォーム、バリデーション表示など）に対して実施します。
3.  **End-to-End**: 重要なユーザーフロー（会員登録、イベント投稿）の手動確認手順をドキュメント化し、リリースタグ発行前に実施します。

### Gitワークフロー (Git Workflow)

**OpenSpec Workflow**

1.  **Proposal**: `openspec/changes/<id>/proposal.md` で変更を提案。
2.  **Design & Specs**: `design.md` と `specs/` で詳細設計を固める。
3.  **Implementation**: `feature/<change-id>` ブランチを作成して実装。
4.  **Review & Apply**: PRを作成し、マージ後に `openspec apply` でタスク完了を記録。

**ブランチ戦略**

- `main`: 本番環境（Production）に即時デプロイ可能な状態を維持。
- `develop`: 開発統合ブランチ（Staging）。
- `feature/xxx`: 機能追加・修正用トピックブランチ。

### 開発環境とコマンド実行 (Development Environment & Commands)

本プロジェクトは **Docker (Laravel Sail)** 環境で動作しています。環境の整合性を保つため、以下のルールを厳守してください。

- **Sailの強制**: すべてのバックエンドコマンド（`php`, `composer`, `artisan`）およびフロントエンドコマンド（`npm`, `node`）は、必ず `sail` を経由して実行してください。
- **コマンド変換ルール**:
  - `php artisan ...` → `./vendor/bin/sail artisan ...`
  - `composer install` → `./vendor/bin/sail composer install`
  - `npm run dev` → `./vendor/bin/sail npm run dev`
- **禁止事項**: ホストマシンの `php` コマンドや `composer` コマンドを直接使用することは禁止です。

## ドメインコンテキスト (Domain Context)

AIアシスタントや開発者が理解すべき、サルサダンス界隈特有の用語と概念です。

- **ソーシャル（Social） / フリーダンス**: レッスンを含まない、純粋に踊るためのパーティーイベント。
- **On1 / On2 / Cuban**: サルサの主要なダンススタイル。イベント情報において最も重要なフィルタリング項目の一つです。
- **Bachata（バチャータ） / Kizomba（キゾンバ）**: サルサ以外のペアダンスジャンル。本サイトではこれらも主要コンテンツとして扱います。
- **オーガナイザー（Organizer）**: イベントやレッスンを主催するユーザー。一般ユーザーとは異なる権限（イベント登録・編集・削除）を持ちます。
- **クローズドレッスン / オープンクラス**:
  - クローズド: 特定の生徒のみ、または期間固定のコースレッスン。
  - オープン: 誰でも単発で参加できるレッスン（サイトで主に扱うのはこちら）。

## 重要な制約事項 (Important Constraints)

### インフラ制約 (Xserver)

- 本番環境は共有レンタルサーバー（Xserver）で運用されています。
- **Node.jsの常駐不可**: 本番環境ではNode.jsサーバーを常駐させることが困難なため、InertiaのSSR（Server-Side Rendering）機能の使用には制限があります。
  - **対策**: FacebookやX（Twitter）のクローラー向けOGP対策として、PHP側でメタタグを出力するなどの工夫が必要です。
- **デプロイ**: SSHでのコマンド実行は可能ですが、権限周り（`www-data` vs ユーザー権限）に注意が必要です。

### SEOとパフォーマンス

- ポータルサイトとしての性質上、SEO（検索エンジン最適化）は極めて重要です。React化によってコンテンツがJavaScriptレンダリング依存になることで、検索順位が低下することは許容されません。
- **Core Web Vitals**: 画像の遅延読み込み、適切なマークアップ、TailwindによるCSSサイズの最小化を徹底してください。

## 外部依存関係 (External Dependencies)

本システムが依存する主要な外部サービスとAPIです。

1.  **Rakuten Developers API / Yahoo Shopping API**:
    - 用途: ダンスシューズ、ウェア、DVDなどの関連商品情報を検索・表示し、アフィリエイトリンクを生成するために使用します。
    - 注意: APIのレートリミットや仕様変更に追従できる設計（Service層での隠蔽）が必要です。
2.  **Facebook Graph API (Planned)**:
    - 用途: ユーザー登録の簡略化（ソーシャルログイン）、およびFacebook上のイベント情報の取得・連携（将来的な機能）。
3.  **Google Maps API**:
    - 用途: イベント会場の場所を地図で表示する機能に使用します。
4.  **Cloudflare Turnstile**:
    - 用途: お問い合わせフォームやログイン画面におけるスパム対策（reCAPTCHAの代替）。
5.  **Mail Service (SMTP)**:
    - 用途: 会員登録時の認証メール、パスワードリセット、お問い合わせ返信。本番環境ではXserverのSMTPを使用します。
