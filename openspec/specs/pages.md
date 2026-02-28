// =========================================================================
// 管理画面 (Admin Panel) - 主催者・管理者向け機能
// =========================================================================
// イベント管理 (CRUD, モーダル)
resources/views/admin/events/create.blade.php
resources/views/admin/events/delete-modal.blade.php
resources/views/admin/events/edit.blade.php
resources/views/admin/events/index.blade.php
resources/views/admin/events/publish-modal.blade.php

// レッスン管理 (CRUD, モーダル)
resources/views/admin/lessons/create.blade.php
resources/views/admin/lessons/delete-modal.blade.php
resources/views/admin/lessons/edit.blade.php
resources/views/admin/lessons/index.blade.php
resources/views/admin/lessons/publish-modal.blade.php

// ユーザー管理・プロフィール (管理者用)
resources/views/admin/user_profiles/create.blade.php
resources/views/admin/users/delete.blade.php
resources/views/admin/users/edit.blade.php
resources/views/admin/users/menu.blade.php
resources/views/admin/users/password_edit.blade.php
resources/views/admin/users/show.blade.php

// =========================================================================
// 認証機能 (Authentication)
// =========================================================================
resources/views/auth/login.blade.php
resources/views/auth/register.blade.php
resources/views/auth/verify.blade.php
resources/views/auth/passwords/confirm.blade.php
resources/views/auth/passwords/email.blade.php
resources/views/auth/passwords/reset.blade.php

// =========================================================================
// 一般ユーザー向け機能 (Public Features)
// =========================================================================
// イベント閲覧・検索
resources/views/events/detail.blade.php
resources/views/events/index.blade.php
resources/views/events/search.blade.php

// レッスン閲覧・検索
resources/views/lessons/detail.blade.php
resources/views/lessons/index.blade.php
resources/views/lessons/search.blade.php

// =========================================================================
// 初心者向けコンテンツ (Beginner Guide) - 静的コンテンツ中心
// =========================================================================
resources/views/beginner/bachata.blade.php
resources/views/beginner/clothes.blade.php
resources/views/beginner/corona.blade.php
resources/views/beginner/dance.blade.php
resources/views/beginner/lesson.blade.php
resources/views/beginner/merengue.blade.php
resources/views/beginner/place.blade.php
resources/views/beginner/preparation.blade.php
resources/views/beginner/shoes.blade.php
resources/views/beginner/side.blade.php

// =========================================================================
// ショッピング・アフィリエイト (Shop / Affiliate)
// =========================================================================
resources/views/shop/top.blade.php
resources/views/shop/dvd.blade.php
resources/views/shop/pagenate.blade.php
resources/views/shop/side.blade.php
resources/views/shop/side-response-header.blade.php
// 楽天API連携
resources/views/shop/rakuten_clothes.blade.php
resources/views/shop/rakuten_movie.blade.php
resources/views/shop/rakuten_music.blade.php
resources/views/shop/rakuten_shoes.blade.php
// Yahoo API連携
resources/views/shop/yahoo_clothes.blade.php
resources/views/shop/yahoo_movie.blade.php
resources/views/shop/yahoo_music.blade.php
resources/views/shop/yahoo_shoes.blade.php

// =========================================================================
// お問い合わせ (Inquiry)
// =========================================================================
resources/views/inquiry/index.blade.php
resources/views/inquiry/confirm.blade.php
resources/views/inquiry/thanks.blade.php

// =========================================================================
// 一般・静的ページ (General / Static Pages)
// =========================================================================
resources/views/home.blade.php // トップページ
resources/views/privacy.blade.php // プライバシーポリシー
resources/views/registration.blade.php // 新規登録LP/案内
resources/views/withdraw.blade.php // 退会ページ

// =========================================================================
// レイアウト・共通部品 (Layouts & Components)
// =========================================================================
resources/views/layouts/salsafavor.blade.php // メインレイアウト
resources/views/layouts/admin.blade.php // 管理画面レイアウト
resources/views/layouts/admintop.blade.php // 管理画面トップ用
resources/views/layouts/topnavi.blade.php // ナビゲーションバー
resources/views/layouts/footer.blade.php // フッター
resources/views/layouts/flash-messages.blade.php // 通知メッセージ
resources/views/layouts/regist-card.blade.php // 登録カードコンポーネント

// =========================================================================
// メールテンプレート (Emails)
// =========================================================================
resources/views/mail/layout.blade.php
resources/views/mail/inquiry.blade.php // お問い合わせ自動返信
resources/views/mail/password_reset.blade.php // パスワードリセット
resources/views/mail/verify_auth.blade.php // メールアドレス確認
resources/views/mail/withdrawal.blade.php // 退会通知
