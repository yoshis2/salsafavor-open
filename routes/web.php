<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| ここにアプリケーションのWebルートを登録します。
| これらのルートは RouteServiceProvider によって読み込まれ、
| "web" ミドルウェアグループが適用されます。
| さあ、素晴らしいものを作りましょう！
|
*/
// =========================================================================
// 一般公開ページ (ログイン不要)
// =========================================================================

// ホーム・静的ページ
// ホーム・静的ページ（Inertia/React化）
Route::get('/', 'HomeController@index')->name('home');
Route::get('/privacy', fn () => Inertia::render('Static/Privacy'))->name('privacy');
Route::get('/registration', fn () => Inertia::render('Static/Registration'))->name('registration');
Route::get('/withdraw', fn () => Inertia::render('Static/Withdraw'))->name('withdraw');

// 初心者向けコンテンツ（Inertia/React化）
Route::prefix('/beginner')->controller('BeginnerController')->name('beginner.')->group(function () {
    Route::get('/dance', 'dance')->name('dance');
    Route::get('/lesson', 'lesson')->name('lesson');
    Route::get('/clothes', 'clothes')->name('clothes');
    Route::get('/shoes', 'shoes')->name('shoes');
    Route::get('/bachata', 'bachata')->name('bachata');
    Route::get('/merengue', 'merengue')->name('merengue');
    Route::get('/place', 'place')->name('place');
    Route::get('/corona', 'corona')->name('corona');
    Route::get('/preparation', 'preparation')->name('preparation');
});

// -------------------------------------------------------------------------
// 外部API連携・ショップ関連
// -------------------------------------------------------------------------

// 楽天API使用ページ
Route::prefix('/shop/rakuten')->controller('ShopsController')->name('shop.rakuten.')
    ->middleware(['permission.parameter:rakuten', 'throttle:rakuten', 'throttle:minute'])->group(function () {
        Route::get('/shoes', 'rakutenShoes')->name('shoes');
        Route::get('/movie', 'rakutenMovie')->name('movie');
        Route::get('/music', 'rakutenMusic')->name('music');
        Route::get('/clothes', 'rakutenClothes')->name('clothes');
    });

// DVD紹介 (API未使用または独自)
Route::get('/shop/dvd', 'ShopsController@dvd')->name('shop.dvd');

// ヤフーAPI使用ページ
Route::prefix('/shop/yahoo')->controller('ShopsController')->name('shop.yahoo.')
    ->group(function () {
        Route::get('/shoes', 'yahooShoes')->name('shoes');
        Route::get('/movie', 'yahooMovie')->name('movie');
        Route::get('/music', 'yahooMusic')->name('music');
        Route::get('/clothes', 'yahooClothes')->name('clothes');
    });

// -------------------------------------------------------------------------
// お問い合わせ・イベント閲覧
// -------------------------------------------------------------------------

// お問い合わせ
Route::prefix('/inquiry')->controller('InquiryController')->name('inquiry.')
    ->middleware(['permission.parameter:inquiry', 'throttle:minute'])->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'confirm')->name('confirm');
        Route::post('/send', 'send')->name('send'); // メール送信処理を行うルート
        Route::get('/thanks', 'thanks')->name('thanks');
    });

// イベント一覧・詳細 (閲覧用)
Route::prefix('/events')->controller('EventsController')->name('events.')->group(function () {
    Route::get('/', 'index')->name('index')->middleware('permission.parameter:event');
    Route::get('/{id}', 'detail')->name('detail');
});

// レッスン一覧・詳細 (閲覧用)
Route::prefix('/lessons')->controller('LessonsController')->name('lessons.')->group(function () {
    Route::get('/', 'index')->middleware('permission.parameter:lesson')->name('index');
    Route::get('/{id}', 'detail')->name('detail');
});

// =========================================================================
// 認証機能 (Auth)
// =========================================================================

// 標準の認証ルート (ログイン, 登録, パスワードリセット, メール確認)
Auth::routes(['verify' => true]);

// パスワードリセットメール送信完了画面（Inertia/React）
Route::get('/password/email/sent', fn () => Inertia::render('Auth/Passwords/EmailSent'))->name('password.email.sent');

// メール認証成功画面
Route::get('/verify-success', fn () => Inertia::render('Auth/VerifySuccess'))->name('verify.success');

// Facebook ソーシャルログイン
Route::prefix('/auth/facebook')->controller('Auth\FacebookController')->name('auth.facebook.')
    ->group(function () {
        Route::get('/login', 'login')->name('login');
        Route::get('/callback', 'callback')->name('callback');
        Route::get('/user-data-deletion', 'deleteUserData')->name('user-data-deletion'); // GDPR対応
        Route::get('/deletion-status', 'deletionStatus')->name('deletionStatus');
    });

// =========================================================================
// 管理画面 (Admin) - 要ログイン
// =========================================================================

// イベント管理 (CRUD)
Route::prefix('/admin/events')->controller('Admin\EventsController')->name('admin.events.')
    ->middleware('auth', 'verified')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{id}', 'edit')->name('edit');
        Route::put('/', 'update')->name('update');
        Route::patch('/{id}', 'published')->name('published'); // 公開ステータス切り替え
        Route::delete('/{id}', 'delete')->name('delete');
        Route::delete('/all/{user_id}', 'deleteAllByUser')->name('deleteAllByUser');

        // TODO: ★今後追加予定: Facebookへのシェア機能
        // Route::post('/{id}/facebook-share', 'shareToFacebook')->name('facebook.share');
    });

// イベント画像管理 (非同期アップロード等)
Route::prefix('/admin/event/images')->controller(('Admin\EventImagesController'))->name('admin.event.images.')
    ->middleware('auth', 'verified')->group(function () {
        Route::post('/', 'upload')->name('upload');
        Route::put('/', 'reorder')->name('reorder');
        Route::delete('/{id}', 'delete')->name('delete');
    });

// レッスン管理 (CRUD)
Route::prefix('/admin/lessons')->controller('Admin\LessonsController')->name('admin.lessons.')
    ->middleware('auth', 'verified')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{id}', 'edit')->name('edit');
        Route::put('/', 'update')->name('update');
        Route::patch('/{id}', 'published')->name('published');
        Route::delete('/{id}', 'delete')->name('delete');
        Route::delete('/all/{user_id}', 'deleteAllByUser')->name('deleteAllByUser');
    });

// レッスン画像管理
Route::prefix('/admin/lesson/images')->controller('Admin\LessonImagesController')->name('admin.lesson.images.')
    ->middleware('auth', 'verified')->group(function () {
        Route::post('/', 'upload')->name('upload');
        Route::put('/', 'reorder')->name('reorder');
        Route::delete('/{id}', 'delete')->name('delete');
    });

// ユーザー管理 (管理者/マイページ用)
Route::prefix('/admin/users')->controller('Admin\UsersController')->name('admin.users.')
    ->middleware(['auth', 'verified', 'web'])->group(function () {
        Route::get('/', 'show')->name('show');
        Route::get('/edit', 'edit')->name('edit');
        Route::put('/', 'update')->name('update');
        Route::patch('/{id}', 'published')->name('published');
        Route::get('/password', 'passwordEdit')->name('password.edit');
        Route::put('/password', 'passwordUpdate')->name('password.update');
        Route::get('/withdraw', 'withdraw')->name('withdraw'); // 退会処理
        Route::delete('/{id}', 'delete')->name('delete');
    });

// ユーザープロフィール管理 (インストラクター詳細など)
Route::prefix('/admin/user_profiles')->controller('Admin\UserProfilesController')->name('admin.user_profiles.')
    ->middleware(['auth', 'verified'])->group(function () {
        Route::get('/', 'create')->name('create');
        Route::post('/', 'store')->name('store');
    });

// Inertia テスト用ページ
if (app()->environment(['local', 'testing'])) {
    Route::get('/inertia-test', function () {
        return Inertia::render('Test');
    })->name('inertia.test');
}
