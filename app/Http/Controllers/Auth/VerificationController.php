<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Inertia\Inertia;

class VerificationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Email Verification Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling email verification for any
    | user that recently registered with the application. Emails may also
    | be re-sent if the user didn't receive the original email message.
    |
    */

    use VerifiesEmails;

    /**
     * Show the email verification notice (Inertia版)
     */
    public function show()
    {
        return Inertia::render('Auth/VerifyEmail');
    }

    /**
     * Where to redirect users after verification.
     *
     * @var string
     */
    protected $redirectTo = '/verify-success';

    /**
     * メール認証完了時のカスタム画面
     */
    protected function verified($request)
    {
        return redirect('/verify-success');
    }

    /**
     * Get the post register / login redirect path.
     *
     * @return string
     */
    public function redirectPath()
    {
        if (request()->routeIs('verification.resend')) {
            return route('verification.notice');
        }

        return $this->redirectTo;
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }
}
