<?php

namespace App\Services;

use App\Repositories\GenresRepository;

class GenreService
{
    private $genresRepository;

    public function __construct(GenresRepository $genresRepository)
    {
        $this->genresRepository = $genresRepository;
    }

    public function list()
    {
        return $this->genresRepository->list();
    }

    public function getIDs($genres)
    {
        $ids = [];
        foreach ($genres as $genre) {
            $ids[] = $genre->id;
        }

        return $ids;
    }
}
