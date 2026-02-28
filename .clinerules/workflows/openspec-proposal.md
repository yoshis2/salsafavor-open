# OpenSpec: Proposal Workflow

新しい OpenSpec の変更を計画・設計し、実装前の青写真を作成するワークフローです。

## 1. 作成ガイドライン (Documentation Guidelines)

- **Language**: すべてのドキュメント（提案、タスク、設計、スペック）は、必ず **日本語** で記述してください。
- **Documentation First**: この段階ではコードを書かず、設計ドキュメントの作成に集中してください。実装は承認後の `apply` 段階で行います。
- **Depth & Quality**:
  - `proposal.md` と `design.md` は、単なる箇条書きで済ませず、**「背景・文脈・リスク・代替案」を文章で詳細に説明** してください。
  - **重要**: 読み手が文脈を完全に理解できるよう、十分な情報量（Substantive content）を記述することを強く推奨します。
- **UI Structure**: Webページや画面の作成・改修を行う場合は、**ページ単位（または画面単位）** でディレクトリを分け、個別の `spec.md` を作成して管理性を高めてください。

## 2. 提案プロセス (Proposal Steps)

以下の手順で、実装に向けた強固な計画を策定してください。

1.  **Analyze Context**:
    - `openspec/project.md` や既存のコード（`ls`, `rg` 等を使用）を調査し、現状の仕様とギャップを把握します。
    - 実装に必要な情報をこの段階で明確にします。

2.  **Scaffold Change**:
    - 変更内容を表す動詞主導のID（例: `add-login-feature`）を決定します。
    - `openspec/changes/<id>/` ディレクトリを作成し、以下のファイルを配置します。
      - `proposal.md`: 変更の概要と目的
      - `tasks.md`: 実装タスクリスト
      - **`design.md` (必須)**: アーキテクチャ、データフロー、技術的決定事項の詳細

3.  **Define Specs**:
    - 変更を具体的な要件（Capability）にマッピングします。
    - ページ作成を伴う場合は `specs/pages/<page-name>/spec.md` のように構造化してください。
    - `spec.md` には `## ADDED Requirements` 等を使用し、具体的な振る舞い（Scenario）を記述します。

4.  **Draft Design & Tasks**:
    - **Design**: `design.md` に、なぜその実装方針を選んだのか、コンポーネント構成やトレードオフを含めて詳細に記述します。
    - **Tasks**: `tasks.md` に、検証可能で小さな単位の作業リストを作成します。テストやバリデーションの手順も含めてください。

5.  **Validate**:
    - 作成した構成が正しいか、`openspec validate <id>` コマンド（または自身の知識）を用いて検証し、整合性を確認してください。
