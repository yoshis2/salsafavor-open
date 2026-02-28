<?php

namespace App\Repositories;

use App\Models\LessonImage;

class LessonImagesRepository
{
    protected $model;

    public function __construct(LessonImage $model)
    {
        $this->model = $model;
    }

    public function get($id)
    {
        return $this->model
            ->where('id', $id)
            ->first();
    }

    public function getByLesson($id)
    {
        return $this->model
            ->where('lesson_id', $id)
            ->orderBy('order', 'asc')
            ->get();
    }

    public function insert($lessonImages)
    {
        return $this->model
            ->insert($lessonImages);
    }

    public function create(array $lessonImage): LessonImage
    {
        return $this->model
            ->create($lessonImage);
    }

    public function reorder($images, $currentDateTime)
    {
        foreach ($images as $image) {
            $this->model->where('id', $image->id)->update([
                'order' => $image->order,
                'updated_at' => $currentDateTime,
            ]);
        }
    }

    public function delete($ids)
    {
        return $this->model
            ->destroy($ids);
    }

    public function deleteByLesson($lessonId)
    {
        return $this->model
            ->where('lesson_id', $lessonId)->delete();
    }
}
