<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchLessonRequest;
use App\Services\GenreService;
use App\Services\LessonsService;
use App\Services\PrefecturesService;
use Inertia\Inertia;

class LessonsController extends Controller
{
    private $lessonsService;

    private $genreService;

    private $prefecturesService;

    public function __construct(
        LessonsService $lessonsService,
        GenreService $genreService,
        PrefecturesService $prefecturesService
    ) {
        $this->lessonsService = $lessonsService;
        $this->genreService = $genreService;
        $this->prefecturesService = $prefecturesService;
    }

    public function index(SearchLessonRequest $request)
    {
        $param = $request->validated();

        return Inertia::render('Lessons/Index', [
            'param' => $param,
            'lessons' => $this->lessonsService->search($param),
            'genres' => $this->genreService->list(),
            'prefectures' => $this->prefecturesService->list(),
        ]);
    }

    public function detail($id)
    {
        return Inertia::render('Lessons/Show', [
            'lesson' => $this->lessonsService->get($id),
            'genres' => $this->genreService->list(),
            'prefectures' => $this->prefecturesService->list(),
        ]);
    }
}
