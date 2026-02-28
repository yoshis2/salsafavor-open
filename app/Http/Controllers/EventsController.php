<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchEventRequest;
use App\Services\EventsService;
use App\Services\GenreService;
use App\Services\PrefecturesService;
use Inertia\Inertia;

class EventsController extends Controller
{
    private $eventsService;

    private $genreService;

    private $prefecturesService;

    public function __construct(
        EventsService $eventsService,
        GenreService $genreService,
        PrefecturesService $prefecturesService
    ) {
        $this->eventsService = $eventsService;
        $this->genreService = $genreService;
        $this->prefecturesService = $prefecturesService;
    }

    public function index(SearchEventRequest $request)
    {
        $param = $request->all();

        return Inertia::render('Events/Index', [
            'events' => $this->eventsService->search($param),
            'param' => $param,
            'dates' => $this->eventsService->getDates(),
            'genres' => $this->genreService->list(),
            'prefectures' => $this->prefecturesService->list(),
        ]);
    }

    public function detail($id)
    {
        $event = $this->eventsService->get($id);
        if (empty($event)) {
            return redirect('/events')->with('error', '存在しないページを表示しようとしました。');
        }

        return Inertia::render('Events/Show', [
            'event' => $event,
            'dates' => $this->eventsService->getDates(),
            'genres' => $this->genreService->list(),
            'prefectures' => $this->prefecturesService->list(),
        ]);
    }
}
