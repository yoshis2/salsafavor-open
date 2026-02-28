<?php

namespace App\Repositories;

use App\Models\Lesson;

class LessonsRepository
{
    protected $model;

    public function __construct(Lesson $model)
    {
        $this->model = $model;
    }

    // ユーザー画面用の検索一覧表示
    public function search($param)
    {
        $result = $this->model
            ->with('genres')
            ->where('published', '=', true);

        if (isset($param['prefecture_id'])) {
            $result->where('prefecture_id', $param['prefecture_id']);
        }

        if (isset($param['genre_id'])) {
            $result->whereHas('genres', function ($query) use ($param) {
                $query->where('genres.id', $param['genre_id']);
            });
        }

        if (isset($param['week'])) {
            $result->where('week', $param['week']);
        }

        return $result
            ->orderBy('id', 'asc')
            ->cursorPaginate(30);
    }

    // ユーザー画面用の詳細画面表示
    public function get($id)
    {
        return $this->model
            ->with(['images', 'genres', 'prefecture'])
            ->where('id', $id)
            ->where('published', true)
            ->first();
    }

    // 管理画面用の一覧表示
    public function listByUser($userID)
    {
        return $this->model
            ->where('user_id', $userID)
            ->get();
    }

    // 管理画面用の詳細画面表示
    public function getByUser($id, $userID)
    {
        return $this->model
            ->with(['images', 'genres', 'prefecture'])
            ->where('id', $id)
            ->where('user_id', $userID)
            ->first();
    }

    public function store($param, $userID, $currentDate)
    {
        return $this->model
            ->create([
                'user_id' => $userID,
                'name' => $param['name'],
                'frequency' => $param['frequency'],
                'week' => $param['week'],
                'start_time' => $param['start_time'],
                'end_time' => $param['end_time'],
                'price' => $param['price'],
                'prefecture_id' => $param['prefecture_id'],
                'address' => $param['address'],
                'place' => $param['place'],
                'station' => $param['station'],
                'instructor' => $param['instructor'],
                'web' => $param['web'],
                'mail' => $param['mail'],
                'phone' => $param['phone'],
                'details' => $param['details'],
                'published' => $param['published'],
                'created_date' => $currentDate,
            ]);
    }

    // レッスン情報の更新
    public function update($param, $userID, $currentDatetime)
    {
        return $this->model
            ->where('id', $param['id'])
            ->where('user_id', $userID)
            ->update([
                'name' => $param['name'],
                'frequency' => $param['frequency'],
                'week' => $param['week'],
                'start_time' => $param['start_time'],
                'end_time' => $param['end_time'],
                'price' => $param['price'],
                'prefecture_id' => $param['prefecture_id'],
                'address' => $param['address'],
                'place' => $param['place'],
                'station' => $param['station'],
                'instructor' => $param['instructor'],
                'web' => $param['web'],
                'mail' => $param['mail'],
                'phone' => $param['phone'],
                'details' => $param['details'],
                'published' => $param['published'],
                'updated_at' => $currentDatetime,
            ]);
    }

    public function published($id, $published)
    {
        return $this->model
            ->where('id', $id)
            ->update(['published' => (bool) $published]);
    }

    public function delete($id, $userID)
    {
        return $this->model
            ->where('id', $id)
            ->where('user_id', $userID)
            ->delete();
    }

    public function deleteAllByUser($userID)
    {
        return $this->model
            ->where('user_id', $userID)
            ->delete();
    }
}
