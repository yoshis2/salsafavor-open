<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Services\UsersService;
use Coderflex\LaravelTurnstile\Rules\TurnstileCheck;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Show the application's registration form (Inertia版)
     */
    public function showRegistrationForm()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::ADMIN_EVENT;

    protected $usersService;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UsersService $usersService)
    {
        $this->usersService = $usersService;
        $this->middleware(['guest', 'permission.parameter:register', 'ip']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'turnstile_token' => ['required', new TurnstileCheck],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        return $this->usersService->create($data);
    }

    /**
     * The user has been registered.
     *
     * @param  mixed  $user
     * @return mixed
     */
    protected function registered(Request $request, $user)
    {
        return redirect()->route('verification.notice');
    }
}
