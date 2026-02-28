# dev-environment Specification

## Purpose

TBD - created by archiving change add-devcontainer-support. Update Purpose after archive.

## Requirements

### Requirement: Dev Container による環境構築

開発者は VS Code の Dev Container 機能を使用して、事前に定義されたコンテナ環境で開発を開始できなければならない（MUST）。

#### Scenario: コンテナでの開発開始

- **WHEN** VS Code でプロジェクトを開き "Reopen in Container" を選択した時
- **THEN** `docker-compose.yml` に基づくコンテナ群が起動し、VS Code が `favor-app` コンテナに接続される

### Requirement: PHP デバッグ機能

開発者は VS Code 上で PHP コードのデバッグ（ブレークポイント設定、ステップ実行）ができなければならない（MUST）。

#### Scenario: デバッグの実行

- **WHEN** VS Code で "Listen for Xdebug" を開始し、ブラウザでアプリケーションにアクセスした時
- **THEN** 設定したブレークポイントで実行が一時停止する
