<?php

namespace App\Services;

use App\Repositories\UsersRepository;
use Hash;
use Laravel\Socialite\Contracts\User as SocialiteUserContract;

class FacebookService
{
    private $usersRepository;

    public function __construct(UsersRepository $usersRepository)
    {
        $this->usersRepository = $usersRepository;
    }

    public function callback(SocialiteUserContract $facebookuser)
    {
        $email = $facebookuser->getEmail();
        $user = $this->usersRepository->getByEmail($email);
        if (empty($user)) {
            $param = [
                'name' => $facebookuser->getNickname() ?? $facebookuser->getName(),
                'email' => $email,
                'password' => Hash::make($email),
                'roles' => 'instructor',
                'email_verified_at' => now(),
            ];

            $user = $this->usersRepository->create($param);
        }

        return $user;
    }
}
