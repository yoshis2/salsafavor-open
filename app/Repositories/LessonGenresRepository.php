<?php

namespace App\Repositories;

use App\Models\LessonGenre;

class LessonGenresRepository
{
    protected $model;

    public function __construct(LessonGenre $model)
    {
        $this->model = $model;
    }

    public function insert($lessonGenres)
    {
        return $this->model
            ->insert($lessonGenres);
    }

    public function deleteByLesson($id)
    {
        return $this->model
            ->where('lesson_id', $id)
            ->delete();
    }
}
