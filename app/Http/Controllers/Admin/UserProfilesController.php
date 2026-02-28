<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ImagePathType;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Services\ImageService;
use App\Services\PrefecturesService;
use App\Services\UserProfilesService;
use Auth;

class UserProfilesController extends Controller
{
    private $imageService;

    private $userProfilesService;

    private $prefecturesService;

    public function __construct(
        ImageService $imageService,
        UserProfilesService $userProfilesService,
        PrefecturesService $prefecturesService
    ) {
        $this->imageService = $imageService;
        $this->userProfilesService = $userProfilesService;
        $this->prefecturesService = $prefecturesService;
    }

    public function create()
    {
        $userId = Auth::id();
        $profile = $this->userProfilesService->get($userId);
        if (isset($profile->user_id)) {
            return redirect('/admin/users')
                ->withErrors(['profile_exists' => 'ユーザープロフィールは既に存在します。編集ページで変更してください。']);
        }

        return inertia('Admin/UserProfiles/Create', [
            'prefectures' => $this->prefecturesService->list(),
        ]);
    }

    public function store(ProfileRequest $request)
    {
        $userId = Auth::id();
        $profile = $this->userProfilesService->get($userId);
        if (isset($profile->user_id)) {
            return redirect()->back()
                ->withErrors(['profile_exists' => 'ユーザープロフィールは既に存在します。編集ページで変更してください。']);
        }

        $filename = '';
        $path = public_path(ImagePathType::PROFILE.$userId);
        if ($request->hasFile('file')) {
            $this->imageService->makeDirectory($path);
            $filename = $this->imageService->resize(
                $request->file('file'),
                $path,
                1200
            );
        }

        $param = $request->all();
        $this->userProfilesService->store($param, $userId, $filename);

        return redirect('/admin/users');
    }
}
