<?php

namespace App\Repositories;

use App\Models\Event;

class EventsRepository
{
    protected $model;

    public function __construct(Event $model)
    {
        $this->model = $model;
    }

    // ユーザー画面用の検索一覧表示
    public function search($param, $currentDateTime)
    {
        $result = $this->model
            ->with('genres')
            ->where('end_datetime', '>=', $currentDateTime)
            ->where('published', '=', true);

        if (isset($param['prefecture_id'])) {
            $result->where('prefecture_id', $param['prefecture_id']);
        }

        if (isset($param['genre_id'])) {
            $result->whereHas('genres', function ($query) use ($param) {
                $query->where('genres.id', $param['genre_id']);
            });
        }

        if (isset($param['date'])) {
            $result->whereDate('start_datetime', $param['date']);
        }

        if (isset($param['lessons'])) {
            $result->where('lesson', $param['lessons']);
        }

        if (isset($param['performances'])) {
            $result->where('performance', $param['performances']);
        }

        // カーソルページネーションを使用
        // start_datetime でソートし、同じ日時の場合は id でソートして一意性を担保
        return $result
            ->orderBy('start_datetime', 'asc')
            ->orderBy('id', 'asc') // セカンダリソートキー
            ->cursorPaginate(30); // 1ページあたりの件数を指定 (例: 15件)

    }

    // ユーザー画面用の詳細画面表示
    public function get($id)
    {
        return $this->model
            ->with(['images', 'genres', 'prefecture'])
            ->where('id', $id)
            ->where('published', '=', true)
            ->first();
    }

    // 管理画面用の一覧表示
    public function listByUser($userID)
    {
        return $this->model
            ->where('user_id', $userID)
            ->orderBy('start_datetime', 'asc')
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

    public function published($id, $published)
    {
        return $this->model
            ->where('id', $id)
            ->update(['published' => $published]);
    }

    public function store($param, $userID, $currentDate)
    {
        $startDatetime = date('Y-m-d H:i:s', strtotime($param['event_date'].' '.$param['start_time']));
        $endDatetime = date('Y-m-d H:i:s', strtotime($param['event_date'].' '.$param['end_time']));

        return $this->model
            ->create([
                'user_id' => $userID,
                'name' => $param['name'],
                'start_datetime' => $startDatetime,
                'end_datetime' => $endDatetime,
                'lesson' => $param['lesson'],
                'performance' => $param['performance'],
                'price' => $param['price'],
                'prefecture_id' => $param['prefecture_id'],
                'address' => $param['address'],
                'place' => $param['place'],
                'station' => $param['station'],
                'dj' => $param['dj'],
                'owner' => $param['owner'],
                'web' => $param['web'],
                'mail' => $param['mail'],
                'phone' => $param['phone'],
                'details' => $param['details'],
                'published' => $param['published'],
                'created_date' => $currentDate,
            ]);
    }

    public function update($param, $userID, $currentDatetime)
    {
        $startDatetime = date('Y-m-d H:i:s', strtotime($param['event_date'].' '.$param['start_time']));
        $endDatetime = date('Y-m-d H:i:s', strtotime($param['event_date'].' '.$param['end_time']));

        return $this->model
            ->where('id', $param['id'])
            ->update([
                'user_id' => $userID,
                'name' => $param['name'],
                'start_datetime' => $startDatetime,
                'end_datetime' => $endDatetime,
                'lesson' => $param['lesson'],
                'performance' => $param['performance'],
                'price' => $param['price'],
                'prefecture_id' => $param['prefecture_id'],
                'address' => $param['address'],
                'place' => $param['place'],
                'station' => $param['station'],
                'dj' => $param['dj'],
                'owner' => $param['owner'],
                'web' => $param['web'],
                'mail' => $param['mail'],
                'phone' => $param['phone'],
                'details' => $param['details'],
                'published' => $param['published'],
                'updated_at' => $currentDatetime,
            ]);
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
