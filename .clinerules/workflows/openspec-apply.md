# OpenSpec: Apply Workflow

承認された OpenSpec の変更を実装し、タスクを完了まで自律的に同期させるワークフローです。

## 1. 実装ガイドライン (Implementation Guidelines)

- **Language**: 実装記録やドキュメントの更新は、必ず **日本語** で行ってください。
- **Scope Control**: まずはシンプルで最小限の実装を優先し、`proposal.md` や `design.md` で要求された結果に厳密に焦点を合わせてください。
- **Safe Process Management**: サーバー起動コマンド（`npm run dev` 等）を実行する際は、ポート競合（EADDRINUSE）を防ぐため、**必ず既存プロセスをクリーンアップ** してから実行してください。
  - **React起動コマンド例**:
    `docker compose exec laravel.test pkill node || true && ./vendor/bin/sail npm run dev`
    （※環境に合わせて `laravel.test` 部分は適宜読み替えてください）

## 2. タスク管理とファイルの保全 (Task Integrity)

`tasks.md` の整合性を保つため、以下のベストプラクティスに従ってください。

- **Safe Editing**: `tasks.md` の更新には、可能な限り `apply_diff` ツール（または部分置換）を使用してください。
  - これにより、他のタスク行を誤って削除したり要約してしまうリスクを回避できます。
- **Read Before Write**: ファイル全体を書き直す必要がある場合は、書き込み直前に必ず `read_file` で最新の状態を取得し、**元の内容を一言一句省略せずに** 保持したまま、ステータスのみを変更してください。

## 3. 自律実行サイクル (Execution Loop)

タスクがすべて完了するまで、以下のサイクルを自律的に繰り返してください。

1.  **Load Context**:
    - `changes/<id>/proposal.md`、`design.md`（存在する場合）、および `tasks.md` を読み込みます。
    - タスクリストだけでなく、設計ドキュメントの「重要な要件」や「制約事項」を脳内にロードします。

2.  **Execute Tasks**:
    - `tasks.md` の未完了タスク（`[ ]`）を上から順に実行します。
    - **Note**: 効率化のため、密接に関連する複数のタスクはまとめて実装・検証しても構いません。

3.  **Update Progress**:
    - 実装と動作確認が完了したら、速やかに `tasks.md` の該当箇所を `[x]` に更新してください。

4.  **Iterate or Finish**:
    - 更新後、まだ未完了タスクが残っている場合は、**ユーザーの入力を待たずに** 即座に次のタスクに着手してください。
    - すべてのタスクが `[x]` になった段階で、最終的な完了報告を行ってください。
