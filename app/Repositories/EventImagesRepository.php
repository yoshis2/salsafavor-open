<?php

namespace App\Repositories;

use App\Models\EventImage;

class EventImagesRepository
{
    protected $model;

    public function __construct(EventImage $model)
    {
        $this->model = $model;
    }

    public function get($id)
    {
        return $this->model
            ->where('id', $id)
            ->first();
    }

    public function getByEvent($id)
    {
        return $this->model
            ->where('event_id', $id)
            ->orderBy('order', 'asc')
            ->get();
    }

    public function insert($eventImages)
    {
        return $this->model
            ->insert($eventImages);
    }

    public function create(array $eventImage): EventImage
    {
        return $this->model
            ->create($eventImage);
    }

    public function reorder($images, $currentDateTime)
    {
        foreach ($images as $image) {
            $this->model
                ->where('id', $image->id)
                ->update([
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

    public function deleteByEvent($id)
    {
        return $this->model
            ->where('event_id', $id)
            ->delete();
    }
}
