<?php

namespace App\Services;

use App\Enums\ImagePathType;
use App\Repositories\UserProfilesRepository;
use App\Repositories\UsersRepository;
use Carbon\Carbon;
use DB;
use Hash;

class UsersService
{
    private $imageService;

    private $eventsService;

    private $lessonsService;

    private $usersRepository;

    private $userProfilesRepository;

    public function __construct(
        ImageService $imageService,
        EventsService $eventsService,
        LessonsService $lessonsService,
        UsersRepository $usersRepository,
        UserProfilesRepository $userProfilesRepository
    ) {
        $this->imageService = $imageService;
        $this->eventsService = $eventsService;
        $this->lessonsService = $lessonsService;
        $this->usersRepository = $usersRepository;
        $this->userProfilesRepository = $userProfilesRepository;
    }

    public function get($userID)
    {
        return $this->usersRepository->get($userID);
    }

    public function create($data)
    {
        $param = [
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'roles' => 'instructor',
        ];

        return $this->usersRepository->create($param);
    }

    public function update($params, $userID, $filename)
    {
        // ユーザー情報とユーザープロフィール情報を更新
        DB::transaction(function () use ($params, $userID, $filename) {
            $currentDateTime = Carbon::now()->toDateTimeString();
            $this->usersRepository->update($params, $userID, $currentDateTime);
            $this->userProfilesRepository
                ->update($params, $userID, $filename, $currentDateTime);

            return true;
        }, 5);
    }

    public function published($id, $published)
    {
        $status = false;
        if (! isset($published) || $published == false) {
            $status = true;
        }

        return $this->usersRepository->published($id, $status);
    }

    // パスワードのチェック
    public function checkPassword($newPassword, $oldPassword)
    {
        if (Hash::check($newPassword, $oldPassword)) {
            return true;
        }

        return false;
    }

    public function passwordUpdate($userID, $newPassword)
    {
        $currentDateTime = Carbon::now()->toDateTimeString();

        return $this->usersRepository->passwordUpdate($userID, Hash::make($newPassword), $currentDateTime);
    }

    // 退会処理
    public function delete($user)
    {
        DB::transaction(function () use ($user) {
            // イベントを削除
            $this->eventsService->deleteAllByUser($user->id);

            // レッスンを削除
            $this->lessonsService->deleteAllByUser($user->id);

            // ユーザープロフィールを削除
            $path = public_path(ImagePathType::PROFILE.$user->id);
            $this->imageService->deleteDirectory($path);

            $this->userProfilesRepository->delete($user->id);

            // ユーザーを削除
            $this->usersRepository->delete($user->id);

            return true;
        }, 5);
    }
}
