<?php

namespace App\Repositories;

use App\Models\Genre;
use Illuminate\Database\Eloquent\Collection;

class GenresRepository
{
    protected Genre $model;

    public function __construct(Genre $model)
    {
        $this->model = $model;
    }

    public function list(): Collection
    {
        return $this->model->get();
    }
}
