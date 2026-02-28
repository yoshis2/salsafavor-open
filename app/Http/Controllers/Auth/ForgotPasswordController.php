<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Coderflex\LaravelTurnstile\Rules\TurnstileCheck;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    /**
     * Show the form to request a password reset link (Inertia版)
     */
    public function showLinkRequestForm()
    {
        return \Inertia\Inertia::render('Auth/Passwords/Email');
    }

    /**
     * Send a reset link to the given user.
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'turnstile_token' => ['required', new TurnstileCheck],
        ]);

        $response = $this->broker()->sendResetLink(
            $this->credentials($request)
        );

        return $response == Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($request, $response)
            : $this->sendResetLinkFailedResponse($request, $response);
    }

    protected function sendResetLinkResponse(Request $request, $response)
    {
        return redirect()->route('password.email.sent')->with('flash', [
            'status' => trans($response),
        ]);
    }

    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return redirect()->back()->with('flash', [
            'status' => trans($response),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;
}
