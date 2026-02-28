<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ImagePathType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Mail\WithdrawMail;
use App\Services\ImageService;
use App\Services\PrefecturesService;
use App\Services\UserProfilesService;
use App\Services\UsersService;
use Auth;
use Illuminate\Http\Request;
use Mail;

class UsersController extends Controller
{
    private $usersService;

    private $userProfilesService;

    private $imageService;

    private $prefecturesService;

    public function __construct(
        UsersService $usersService,
        UserProfilesService $userProfilesService,
        ImageService $imageService,
        PrefecturesService $prefecturesService
    ) {
        $this->usersService = $usersService;
        $this->userProfilesService = $userProfilesService;
        $this->imageService = $imageService;
        $this->prefecturesService = $prefecturesService;
    }

    /**
     * Display the specified resource.
     *
     * @return \Inertia\Response
     */
    public function show()
    {
        $userId = Auth::id();
        $userProfile = $this->userProfilesService->get($userId);

        return inertia('Admin/Users/Show', [
            'user' => $this->usersService->get($userId),
            'userProfile' => $userProfile,
            'userPrefecture' => $userProfile ? $this->prefecturesService->get($userProfile->prefecture_id) : null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Inertia\Response
     */
    public function edit()
    {
        $userId = Auth::id();

        return inertia('Admin/Users/Edit', [
            'user' => $this->usersService->get($userId),
            'userProfile' => $this->userProfilesService->get($userId),
            'prefectures' => $this->prefecturesService->list(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UserRequest $request)
    {
        // フォームパラメータ取得
        $params = $request->all();

        $userId = Auth::id();
        $filename = $params['past_file'] ?? '';

        // ファイルがアップロードされた場合
        if ($request->hasFile('file')) {
            $path = public_path(ImagePathType::PROFILE.$userId);

            // 古いファイルを削除
            if (! empty($filename)) {
                $this->imageService->deleteFile($path, $filename);
            }

            // 新しい画像を保存
            $this->imageService->makeDirectory($path);
            $filename = $this->imageService->resize(
                $request->file('file'),
                $path,
                1200
            );
        }

        $this->usersService->update($params, $userId, $filename);

        return redirect('/admin/users')->with('success', 'ユーザー情報を更新しました。');
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function published()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $this->usersService->published($user->id, $user->published);

        return redirect('/admin/users')
            ->with('success', $user->name.' 様 の公開状態・非公開状態の変更が完了しました。');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Inertia\Response
     */
    public function passwordEdit()
    {
        $userId = Auth::id();
        $user = $this->usersService->get($userId);
        $userProfile = $this->userProfilesService->get($userId);

        // フラッシュメッセージをpropsで渡す
        $success = session('success');
        $error = session('error');

        return inertia('Admin/Users/PasswordEdit', [
            'user' => $user,
            'userProfile' => $userProfile,
            'success' => $success,
            'error' => $error,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function passwordUpdate(Request $request)
    {
        $param = $request->all();

        try {
            $validated = $request->validate([
                'current_password' => ['required', 'max:32'],
                'new_password' => ['required', 'string', 'min:8', 'confirmed'],
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // バリデーションエラー時は最初のエラーメッセージをflash
            $errorMsg = collect($e->validator->errors()->all())->first() ?: '入力内容に誤りがあります。';

            return redirect()->route('admin.users.password.edit')->with('error', $errorMsg)->withErrors($e->validator);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $check = $this->usersService->checkPassword($param['current_password'], $user->password);
        if ($check == false) {
            return redirect()->route('admin.users.password.edit')->with('error', '現在のパスワードが一致しません。');
        }

        $this->usersService->passwordUpdate($user->id, $param['new_password']);
        // パスワード変更後に明示的にログアウトし、ログイン画面へ遷移
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login')->with('success', ' 様 のパスワードを変更しました。再度ログインしてください。');
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Inertia\Response
     */
    public function withdraw()
    {
        $user = $this->usersService->get(Auth::id());

        return inertia('Admin/Users/Delete', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function delete()
    {
        $user = $this->usersService->get(Auth::id());

        $this->usersService->delete($user);

        // 退会メール送信
        Mail::to($user->email)->send(new WithdrawMail($user));
        Auth::logout();

        return redirect('/')->with('success', $user->name.' 様 の退会処理を完了しました。');
    }
}
