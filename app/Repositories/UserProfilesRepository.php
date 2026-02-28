<?php

namespace App\Repositories;

use App\Models\UserProfile;

class UserProfilesRepository
{
    protected $model;

    public function __construct(UserProfile $model)
    {
        $this->model = $model;
    }

    public function get($userID)
    {
        return $this->model
            ->where('user_id', $userID)
            ->first();
    }

    public function store($param, $userID, $filename, $currentDateTime)
    {
        return $this->model->insert([
            'user_id' => $userID,
            'prefecture_id' => $param['prefecture_id'],
            'address' => $param['address'],
            'web' => $param['web'],
            'image_url' => $filename,
            'details' => $param['details'],
            'created_at' => $currentDateTime,
            'updated_at' => $currentDateTime,
        ]);
    }

    // ユーザープロフィール情報を更新
    public function update($param, $userID, $filename, $currentDateTime)
    {
        return $this->model
            ->where('user_id', $userID)
            ->update([
                'prefecture_id' => $param['prefecture_id'],
                'address' => $param['address'],
                'web' => $param['web'],
                'image_url' => $filename,
                'details' => $param['details'],
                'updated_at' => $currentDateTime,
            ]);
    }

    public function delete($userID)
    {
        return $this->model
            ->where('user_id', $userID)
            ->delete();
    }
}
