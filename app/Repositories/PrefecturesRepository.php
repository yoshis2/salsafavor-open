<?php

namespace App\Repositories;

use App\Models\Prefecture;

class PrefecturesRepository
{
    protected $model;

    public function __construct(Prefecture $model)
    {
        $this->model = $model;
    }

    public function list()
    {
        return $this->model
            ->pluck('name', 'id')
            ->prepend('都道府県', '');
    }

    public function get($prefecture_id)
    {
        return $this->model
            ->where('id', $prefecture_id)
            ->first();
    }
}
