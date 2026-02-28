<?php

namespace App\Services;

use App\Repositories\PrefecturesRepository;

class PrefecturesService
{
    protected $prefecturesRepository;

    public function __construct(PrefecturesRepository $prefecturesRepository)
    {
        $this->prefecturesRepository = $prefecturesRepository;
    }

    public function list()
    {
        return $this->prefecturesRepository->list();
    }

    public function get($prefecture_id)
    {
        return $this->prefecturesRepository->get($prefecture_id);
    }
}
