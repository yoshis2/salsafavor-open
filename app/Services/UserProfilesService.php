<?php

namespace App\Services;

use App\Repositories\UserProfilesRepository;
use Carbon\Carbon;

class UserProfilesService
{
    private $userProfilesRepository;

    public function __construct(
        UserProfilesRepository $userProfilesRepository
    ) {
        $this->userProfilesRepository = $userProfilesRepository;
    }

    public function get($userID)
    {
        return $this->userProfilesRepository->get($userID);
    }

    public function store($param, $userID, $filename)
    {
        $currentDateTime = Carbon::now()->toDateTimeString();

        return $this->userProfilesRepository->store($param, $userID, $filename, $currentDateTime);
    }
}
