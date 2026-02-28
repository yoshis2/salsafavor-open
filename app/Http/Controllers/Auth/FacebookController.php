<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Services\FacebookService;
use Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class FacebookController extends Controller
{
    protected $redirectTo = RouteServiceProvider::ADMIN_USER;

    protected $facebookService;

    public function __construct(FacebookService $facebookService)
    {
        $this->facebookService = $facebookService;
        $this->middleware('guest')->except('logout');
    }

    public function login()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function callback()
    {
        try {
            $facebookuser = Socialite::driver('facebook')->user();
            $user = $this->facebookService->callback($facebookuser);

            Auth::login($user);
            session()->regenerate();

            return redirect()->intended('/admin/users');
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['msg' => 'Facebookログインに失敗しました'.$e->getMessage()]);
        }
    }

    public function deleteUserData(Request $request)
    {
        $signedRequest = $request->input('signed_request');

        if (! $signedRequest) {
            return response()->json(['error' => 'signed_request is required'], 400);
        }

        // Facebookの署名付きリクエストをデコード
        $data = explode('.', $signedRequest);
        $payload = json_decode(base64_decode(strtr($data[1], '-_', '+/')), true);

        $userId = $payload['user_id'] ?? null;

        if (! $userId) {
            return response()->json(['error' => 'Invalid signed_request'], 400);
        }

        // ここでユーザーIDに基づいてデータ削除処理を行う（例：DBから削除）
        // User::where('facebook_id', $userId)->delete();

        // 削除確認用のURLとコードを返す
        return response()->json([
            'url' => url('/facebook/deletion-status'),
            'confirmation_code' => $userId,
        ]);
    }

    public function deletionStatus()
    {
        return response('ユーザーデータ削除リクエストは受理されました。', 200);
    }
}
