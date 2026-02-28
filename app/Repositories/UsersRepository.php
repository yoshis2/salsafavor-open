<?php

namespace App\Repositories;

use App\Models\User;

class UsersRepository
{
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function get($userID)
    {
        return $this->model
            ->where('id', $userID)
            ->first();
    }

    public function getByEmail($email)
    {
        return $this->model
            ->where('email', $email)
            ->first();
    }

    public function create($param)
    {
        return $this->model
            ->create($param);
    }

    // ユーザー情報を更新
    public function update($param, $userID, $currentDateTime)
    {
        return $this->model
            ->where('id', $userID)
            ->update([
                'name' => $param['name'],
                'email' => $param['email'],
                'updated_at' => $currentDateTime,
            ]);
    }

    public function published($id, $published)
    {
        return $this->model
            ->where('id', $id)
            ->update(['published' => $published]);
    }

    // パスワードの変更
    public function passwordUpdate($userID, $newPassword, $currentDateTime)
    {
        return $this->model
            ->where('id', $userID)
            ->update([
                'password' => $newPassword,
                'updated_at' => $currentDateTime,
            ]);
    }

    public function delete($id)
    {
        return $this->model
            ->where('id', $id)
            ->delete();
    }

    public function withdrawal($user, $currentDateTime)
    {
        $withdrawName = $user->email.'destroy'.$currentDateTime;

        return $this->model
            ->where('id', $user->id)
            ->update([
                'email' => $withdrawName,
                'published' => false,
                'withdrawal' => true,
                'updated_at' => $currentDateTime,
            ]);
    }
}
