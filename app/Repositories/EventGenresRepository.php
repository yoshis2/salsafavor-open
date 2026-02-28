<?php

namespace App\Repositories;

use App\Models\EventGenre;

class EventGenresRepository
{
    protected EventGenre $model;

    public function __construct(EventGenre $model)
    {
        $this->model = $model;
    }

    public function insert(array $eventGenres): bool
    {
        return $this->model
            ->insert($eventGenres);
    }

    public function deleteByEvent(int $id): int
    {
        return $this->model
            ->where('event_id', $id)
            ->delete();
    }
}
