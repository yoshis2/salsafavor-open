<?php

namespace App\Http\Controllers;

use App\Http\Requests\InquiryRequest;
use App\Http\Requests\InquirySendRequest;
use App\Services\InquiryService;
use Illuminate\Support\Str;

class InquiryController extends Controller
{
    private $inquiryService;

    public function __construct(InquiryService $inquiryService)
    {
        $this->inquiryService = $inquiryService;
    }

    // GET /inquiry - お問い合わせフォーム表示
    public function index()
    {
        return inertia('Inquiry/Index');
    }

    // POST /inquiry/confirm - 確認画面表示
    public function confirm(InquiryRequest $request)
    {
        $inquiry = $request->validated();
        $token = Str::random(40);
        $request->session()->put('inquiry_token', $token);

        return inertia('Inquiry/Confirm', array_merge($inquiry, [
            'inquiry_token' => $token,
        ]));
    }

    // POST /inquiry/send - メール送信処理とリダイレクト
    public function send(InquirySendRequest $request)
    {
        $param = $request->validated();
        $sessionToken = $request->session()->pull('inquiry_token');
        if (! $sessionToken || ! hash_equals($sessionToken, $param['inquiry_token'])) {
            return back()->withErrors([
                'inquiry_token' => '送信が無効です。もう一度お試しください。',
            ]);
        }
        $this->inquiryService->send($param);

        return redirect()->route('inquiry.thanks');
    }

    // GET /inquiry/thanks - お問い合わせ完了ページ表示
    public function thanks()
    {
        return inertia('Inquiry/Thanks');
    }
}
