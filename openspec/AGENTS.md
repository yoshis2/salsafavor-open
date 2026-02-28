# OpenSpec 指示書

OpenSpec を使用してスペック駆動開発を行う AI コーディングアシスタント向けの指示書です。

**重要: 提案書 (`proposal.md`)、タスク (`tasks.md`)、設計 (`design.md`)、およびスペックデルタを含むすべてのドキュメントは、必ず日本語で作成してください。**

## TL;DR クイックチェックリスト

- 既存の作業を検索: `openspec spec list --long`、`openspec list`（全文検索には `rg` のみを使用）
- スコープの決定: 新機能の追加 vs 既存機能の修正
- ユニークな `change-id` の選択: ケバブケース、動詞主導（`add-`、`update-`、`remove-`、`refactor-`）
- 足場作成: `proposal.md`、`tasks.md`、`design.md`（必要な場合のみ）、および影響を受ける機能ごとのデルタスペック
- デルタの記述: `## ADDED|MODIFIED|REMOVED|RENAMED Requirements` を使用。各要件に少なくとも1つの `#### Scenario:` を含める
- 検証: `openspec validate [change-id] --strict` を実行し、問題を修正する
- 承認依頼: プロポーザルが承認されるまで実装を開始しない

## 3段階のワークフロー

### ステージ 1: 変更の作成
以下の場合にプロポーザルを作成します：
- 機能の追加
- 破壊的変更（API、スキーマ）
- アーキテクチャやパターンの変更
- パフォーマンスの最適化（動作が変化する場合）
- セキュリティパターンの更新

トリガー（例）：
- 「変更プロポーザルの作成を手伝って」
- 「変更の計画を手伝って」
- 「プロポーザルの作成を手伝って」
- 「スペックプロポーザルを作成したい」
- 「スペックを作成したい」

大まかなマッチングガイダンス：
- `proposal`、`change`、`spec` のいずれかを含む
- かつ、`create`、`plan`、`make`、`start`、`help` のいずれかを含む

プロポーザルをスキップする場合：
- バグ修正（意図した動作の復元）
- タイポ、フォーマット、コメントの修正
- 依存関係の更新（破壊的でないもの）
- 設定の変更
- 既存の動作に対するテスト

**ワークフロー**
1. `openspec/project.md`、`openspec list`、`openspec list --specs` を確認し、現在のコンテキストを理解する。
2. ユニークな動詞主導の `change-id` を選択し、`openspec/changes/<id>/` 配下に `proposal.md`、`tasks.md`、オプションの `design.md`、およびスペックデルタを作成する。
3. `## ADDED|MODIFIED|REMOVED Requirements` を使用し、各要件に少なくとも1つの `#### Scenario:` を含めてスペックデルタをドラフトする。
4. `openspec validate <id> --strict` を実行し、プロポーザルを共有する前に問題を解決する。

### ステージ 2: 変更の実装
以下のステップを TODO として追跡し、1つずつ完了させます。
1. **proposal.md を読む** - 何が構築されるのかを理解する
2. **design.md を読む**（存在する場合） - 技術的な決定事項を確認する
3. **tasks.md を読む** - 実装チェックリストを取得する
4. **タスクを順番に実装する** - 順番通りに完了させる
5. **完了を確認する** - ステータスを更新する前に、`tasks.md` のすべての項目が終了していることを確認する
6. **チェックリストを更新する** - すべての作業が終わったら、リストが現実を反映するようにすべてのタスクを `- [x]` に設定する
7. **承認ゲート** - プロポーザルがレビューされ承認されるまで実装を開始しない

### ステージ 3: 変更のアーカイブ
デプロイ後、以下のための個別の PR を作成します：
- `changes/[name]/` → `changes/archive/YYYY-MM-DD-[name]/` へ移動
- 機能が変更された場合は `specs/` を更新
- ツールのみの変更には `openspec archive <change-id> --skip-specs --yes` を使用（常に change ID を明示的に渡す）
- `openspec validate --strict` を実行し、アーカイブされた変更がチェックを通過することを確認する

## タスク実行前

**コンテキストチェックリスト:**
- [ ] `specs/[capability]/spec.md` にある関連スペックを読む
- [ ] 競合がないか `changes/` 内の保留中の変更を確認する
- [ ] 規約について `openspec/project.md` を読む
- [ ] `openspec list` を実行してアクティブな変更を確認する
- [ ] `openspec list --specs` を実行して既存の機能を確認する

**スペック作成前:**
- 機能が既に存在するか常に確認する
- 重複を作成するよりも、既存のスペックを修正することを優先する
- `openspec show [spec]` を使用して現在の状態を確認する
- 依頼が曖昧な場合は、足場を作成する前に 1〜2 個の明確化のための質問を行う

### 検索ガイダンス
- スペックの列挙: `openspec spec list --long`（スクリプト用には `--json`）
- 変更の列挙: `openspec list`（または `openspec change list --json` - 非推奨だが利用可能）
- 詳細の表示:
  - スペック: `openspec show <spec-id> --type spec`（フィルタ用には `--json`）
  - 変更: `openspec show <change-id> --json --deltas-only`
- 全文検索（ripgrep を使用）: `rg -n "Requirement:|Scenario:" openspec/specs`

## クイックスタート

### CLI コマンド

```bash
# 基本コマンド
openspec list                  # アクティブな変更をリストアップ
openspec list --specs          # 仕様をリストアップ
openspec show [item]           # 変更またはスペックを表示
openspec validate [item]       # 変更またはスペックを検証
openspec archive <change-id> [--yes|-y]   # デプロイ後にアーカイブ（自動実行には --yes を追加）

# プロジェクト管理
openspec init [path]           # OpenSpec を初期化
openspec update [path]         # 指示書ファイルを更新

# インタラクティブモード
openspec show                  # 選択プロンプトを表示
openspec validate              # 一括検証モード

# デバッグ
openspec show [change] --json --deltas-only
openspec validate [change] --strict
```

### コマンドフラグ

- `--json` - マシン読み取り可能な出力
- `--type change|spec` - 項目を区別
- `--strict` - 包括的な検証
- `--no-interactive` - プロンプトを無効化
- `--skip-specs` - スペックを更新せずにアーカイブ
- `--yes`/`-y` - 確認プロンプトをスキップ（非インタラクティブなアーカイブ）

## ディレクトリ構造

```
openspec/
├── project.md              # プロジェクトの規約
├── specs/                  # 現在の真実 - 構築済みのもの
│   └── [capability]/       # 単一の特化した機能
│       ├── spec.md         # 要件とシナリオ
│       └── design.md       # 技術パターン
├── changes/                # プロポーザル - 変更すべきもの
│   ├── [change-name]/
│   │   ├── proposal.md     # 理由、内容、影響
│   │   ├── tasks.md        # 実装チェックリスト
│   │   ├── design.md       # 技術的決定（オプション、基準参照）
│   │   └── specs/          # デルタ変更
│   │       └── [capability]/
│   │           └── spec.md # ADDED/MODIFIED/REMOVED
│   └── archive/            # 完了した変更
```

## 変更プロポーザルの作成

### 決定ツリー

```
新しいリクエスト？
├─ スペックの動作を復元するバグ修正？ → 直接修正
├─ タイポ/フォーマット/コメント？ → 直接修正
├─ 新機能/新機能？ → プロポーザル作成
├─ 破壊的変更？ → プロポーザル作成
├─ アーキテクチャの変更？ → プロポーザル作成
└─ 不明？ → プロポーザル作成（より安全）
```

### プロポーザルの構造

1. **ディレクトリ作成:** `changes/[change-id]/`（ケバブケース、動詞主導、ユニーク）

2. **proposal.md の記述:**
```markdown
# 変更: [変更の簡単な説明]

## 理由
[問題/機会に関する 1〜2 文]

## 変更内容
- [変更の箇条書きリスト]
- [破壊的変更には **BREAKING** とマーク]

## 影響
- 影響を受けるスペック: [機能リスト]
- 影響を受けるコード: [主要なファイル/システム]
```

3. **スペックデルタの作成:** `specs/[capability]/spec.md`
```markdown
## ADDED Requirements
### Requirement: 新機能
システムは...を提供しなければならない（SHALL）。

#### Scenario: 成功ケース
- **WHEN** ユーザーがアクションを実行した時
- **THEN** 期待される結果

## MODIFIED Requirements
### Requirement: 既存機能
[修正された完全な要件]

## REMOVED Requirements
### Requirement: 古い機能
**理由**: [削除する理由]
**移行**: [対処方法]
```
複数の機能が影響を受ける場合は、`changes/[change-id]/specs/<capability>/spec.md` 配下に機能ごとに複数のデルタファイルを作成します。

4. **tasks.md の作成:**
```markdown
## 1. 実装
- [ ] 1.1 データベーススキーマの作成
- [ ] 1.2 API エンドポイントの実装
- [ ] 1.3 フロントエンドコンポーネントの追加
- [ ] 1.4 テストの記述
```

5. **必要な場合に design.md を作成:**
以下のいずれかに該当する場合に `design.md` を作成し、それ以外の場合は省略します：
- 横断的な変更（複数のサービス/モジュール）または新しいアーキテクチャパターン
- 新しい外部依存関係または大幅なデータモデルの変更
- セキュリティ、パフォーマンス、または移行の複雑さ
- コーディング前に技術的な決定を下すことが有益な曖昧さ

最小限の `design.md` スケルトン：
```markdown
## コンテキスト
[背景、制約、ステークホルダー]

## ゴール / 非ゴール
- ゴール: [...]
- 非ゴール: [...]

## 決定事項
- 決定事項: [内容と理由]
- 検討した代替案: [オプション + 根拠]

## リスク / トレードオフ
- [リスク] → 緩和策

## 移行計画
[ステップ、ロールバック]

## 未解決の質問
- [...]
```

## スペックファイルの形式

### 重要: シナリオのフォーマット

**正しい**（#### ヘッダーを使用）：
```markdown
#### Scenario: ユーザーログイン成功
- **WHEN** 有効な資格情報が提供された時
- **THEN** JWT トークンを返す
```

**間違い**（箇条書きや太字を使用しない）：
```markdown
- **Scenario: ユーザーログイン**  ❌
**Scenario**: ユーザーログイン     ❌
### Scenario: ユーザーログイン      ❌
```

すべての要件には、少なくとも1つのシナリオが必要です。

### 要件の言葉遣い
- 規定の要件には SHALL/MUST（〜しなければならない）を使用します（意図的に規定でない場合を除き、should/may は避けます）。

### デルタ操作

- `## ADDED Requirements` - 新機能
- `## MODIFIED Requirements` - 変更された動作
- `## REMOVED Requirements` - 廃止された機能
- `## RENAMED Requirements` - 名前変更

ヘッダーは `trim(header)` で照合され、空白は無視されます。

#### ADDED と MODIFIED の使い分け
- ADDED: 要件として独立できる新しい機能またはサブ機能を導入します。既存の要件のセマンティクスを変更するのではなく、変更が直交している場合（例：「スラッシュコマンド設定」の追加）は ADDED を優先します。
- MODIFIED: 既存の要件の動作、スコープ、または受け入れ基準を変更します。常に更新された完全な要件内容（ヘッダー + すべてのシナリオ）を貼り付けてください。アーカイバは要件全体をここで提供された内容に置き換えます。部分的なデルタは以前の詳細を失わせます。
- RENAMED: 名前のみが変更される場合に使用します。動作も変更する場合は、RENAMED（名前）に加えて、新しい名前を参照する MODIFIED（内容）を使用します。

よくある落とし穴：以前のテキストを含めずに、新しい懸念事項を追加するために MODIFIED を使用すること。これにより、アーカイブ時に詳細が失われます。既存の要件を明示的に変更しない場合は、代わりに ADDED の下に新しい要件を追加してください。

MODIFIED 要件を正しく作成する方法：
1) `openspec/specs/<capability>/spec.md` で既存の要件を見つける。
2) 要件ブロック全体（`### Requirement: ...` からシナリオまで）をコピーする。
3) それを `## MODIFIED Requirements` の下に貼り付け、新しい動作を反映するように編集する。
4) ヘッダーテキストが正確に一致することを確認し（空白は無視）、少なくとも1つの `#### Scenario:` を維持する。

RENAMED の例：
```markdown
## RENAMED Requirements
- FROM: `### Requirement: Login`
- TO: `### Requirement: User Authentication`
```

## トラブルシューティング

### よくあるエラー

**"Change must have at least one delta"**
- `changes/[name]/specs/` が存在し、.md ファイルがあるか確認する
- ファイルに操作プレフィックス（## ADDED Requirements）があるか確認する

**"Requirement must have at least one scenario"**
- シナリオが `#### Scenario:` 形式（ハッシュタグ4つ）を使用しているか確認する
- シナリオヘッダーに箇条書きや太字を使用しない

**サイレントなシナリオ解析の失敗**
- 正確な形式が必要: `#### Scenario: Name`
- デバッグ方法: `openspec show [change] --json --deltas-only`

### 検証のヒント

```bash
# 包括的なチェックには常に strict モードを使用する
openspec validate [change] --strict

# デルタ解析のデバッグ
openspec show [change] --json | jq '.deltas'

# 特定の要件のチェック
openspec show [spec] --json -r 1
```

## ハッピーパススクリプト

```bash
# 1) 現在の状態を調査
openspec spec list --long
openspec list
# オプションの全文検索:
# rg -n "Requirement:|Scenario:" openspec/specs
# rg -n "^#|Requirement:" openspec/changes

# 2) change id を選択して足場を作成
CHANGE=add-two-factor-auth
mkdir -p openspec/changes/$CHANGE/{specs/auth}
printf "## Why\n...\n\n## What Changes\n- ...\n\n## Impact\n- ...\n" > openspec/changes/$CHANGE/proposal.md
printf "## 1. Implementation\n- [ ] 1.1 ...\n" > openspec/changes/$CHANGE/tasks.md

# 3) デルタを追加（例）
cat > openspec/changes/$CHANGE/specs/auth/spec.md << 'EOF'
## ADDED Requirements
### Requirement: 二要素認証
ユーザーはログイン時に二番目の要素を提供しなければならない（MUST）。

#### Scenario: OTP が必要
- **WHEN** 有効な資格情報が提供された時
- **THEN** OTP チャレンジが要求される
EOF

# 4) 検証
openspec validate $CHANGE --strict
```

## 複数機能の例

```
openspec/changes/add-2fa-notify/
├── proposal.md
├── tasks.md
└── specs/
    ├── auth/
    │   └── spec.md   # ADDED: 二要素認証
    └── notifications/
        └── spec.md   # ADDED: OTP メール通知
```

auth/spec.md
```markdown
## ADDED Requirements
### Requirement: 二要素認証
...
```

notifications/spec.md
```markdown
## ADDED Requirements
### Requirement: OTP メール通知
...
```

## ベストプラクティス

### シンプルさ優先
- 新規コードは 100 行未満をデフォルトとする
- 不十分であることが証明されるまで、単一ファイルでの実装とする
- 明確な正当性なしにフレームワークを避ける
- 退屈で実績のあるパターンを選択する

### 複雑さのトリガー
以下の場合のみ複雑さを追加します：
- 現在のソリューションが遅すぎることを示すパフォーマンスデータがある
- 具体的なスケール要件がある（ユーザー数 > 1000、データ量 > 100MB）
- 抽象化を必要とする複数の実績のあるユースケースがある

### 明確な参照
- コードの場所には `file.ts:42` 形式を使用する
- スペックは `specs/auth/spec.md` として参照する
- 関連する変更や PR をリンクする

### 機能（Capability）の命名
- 動詞-名詞を使用する: `user-auth`、`payment-capture`
- 1つの機能につき1つの目的
- 10分で理解できること
- 説明に「かつ（AND）」が必要な場合は分割する

### Change ID の命名
- ケバブケースを使用し、短く説明的にする: `add-two-factor-auth`
- 動詞主導のプレフィックスを優先する: `add-`、`update-`、`remove-`、`refactor-`
- ユニークであることを確認する。既に使用されている場合は `-2`、`-3` などを付加する

## ツール選択ガイド

| タスク | ツール | 理由 |
|------|------|-----|
| パターンによるファイル検索 | Glob | 高速なパターンマッチング |
| コード内容の検索 | Grep | 最適化された正規表現検索 |
| 特定のファイルの読み込み | Read | ファイルへの直接アクセス |
| 未知のスコープの調査 | Task | 多段階の調査 |

## エラーリカバリ

### 変更の競合
1. `openspec list` を実行してアクティブな変更を確認する
2. 重複するスペックがないか確認する
3. 変更の所有者と調整する
4. プロポーザルの統合を検討する

### 検証の失敗
1. `--strict` フラグを付けて実行する
2. 詳細について JSON 出力を確認する
3. スペックファイルの形式を確認する
4. シナリオが正しくフォーマットされているか確認する

### コンテキストの欠如
1. まず `project.md` を読む
2. 関連するスペックを確認する
3. 最近のアーカイブを確認する
4. 明確化を求める

## クイックリファレンス

### ステージインジケータ
- `changes/` - 提案中、未構築
- `specs/` - 構築済み、デプロイ済み
- `archive/` - 完了した変更

### ファイルの目的
- `proposal.md` - 理由と内容
- `tasks.md` - 実装ステップ
- `design.md` - 技術的決定
- `spec.md` - 要件と動作

### CLI の要点
```bash
openspec list              # 進行中のものは？
openspec show [item]       # 詳細を表示
openspec validate --strict # 正しいか？
openspec archive <change-id> [--yes|-y]  # 完了としてマーク（自動化には --yes を追加）
```

忘れないでください：スペックは真実です。変更はプロポーザルです。それらを同期させておきましょう。
