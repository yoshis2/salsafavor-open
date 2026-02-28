<?php

namespace App\Services;

use App\Enums\ImagePathType;
use App\Repositories\EventGenresRepository;
use App\Repositories\EventImagesRepository;
use App\Repositories\EventsRepository;
use Carbon\Carbon;
use DB;

class EventsService
{
    private $imageService;

    private $eventsRepository;

    private $eventGenresRepository;

    private $eventImagesRepository;

    public function __construct(
        ImageService $imageService,
        EventsRepository $eventsRepository,
        EventGenresRepository $eventGenresRepository,
        EventImagesRepository $eventImagesRepository
    ) {
        $this->imageService = $imageService;
        $this->eventsRepository = $eventsRepository;
        $this->eventGenresRepository = $eventGenresRepository;
        $this->eventImagesRepository = $eventImagesRepository;
    }

    // Inertia用: 画像配列・並び順対応
    public function storeWithImages($data, $images, $userID)
    {
        DB::transaction(function () use ($data, $images, $userID) {
            if (! isset($data['published'])) {
                $data['published'] = false;
            }

            $currentDate = Carbon::now()->toDateString();
            $event = $this->eventsRepository->store($data, $userID, $currentDate);

            $currentDateTime = Carbon::now()->toDateTimeString();
            if (isset($data['genre_ids'])) {
                $eventGenres = [];
                foreach ($data['genre_ids'] as $genre) {
                    $eventGenres[] = [
                        'event_id' => $event->id,
                        'genre_id' => $genre,
                        'created_at' => $currentDateTime,
                    ];
                }
                $this->eventGenresRepository->insert($eventGenres);
            }

            $path = public_path(ImagePathType::EVENT.$currentDate.'/'.$event->id);
            if (! empty($images)) {
                $this->imageService->makeDirectory($path);
                $eventImages = [];
                foreach ($images as $key => $file) {
                    $filename = $this->imageService->resize(
                        $file,
                        $path,
                        1200
                    );
                    $eventImages[] = [
                        'event_id' => $event->id,
                        'image_url' => $filename,
                        'order' => $key + 1,
                        'created_at' => $currentDateTime,
                        'updated_at' => $currentDateTime,
                    ];
                }
                $this->eventImagesRepository->insert($eventImages);
            }
        }, 5);
    }

    // ユーザー画面用の一覧表示
    public function search($param)
    {
        $currentDateTime = Carbon::now()->toDateTimeString();

        return $this->eventsRepository->search($param, $currentDateTime);
    }

    // ユーザー画面用の詳細画面表示
    public function get($id)
    {
        return $this->eventsRepository->get($id);
    }

    // 管理画面用の一覧表示
    public function listByUser($userID)
    {
        return $this->eventsRepository->listByUser($userID);
    }

    // 管理画面用の詳細画面表示
    public function getByUser($id, $userID)
    {
        return $this->eventsRepository->getByUser($id, $userID);
    }

    public function published($id, $published)
    {
        if (is_null($published)) {
            $published = false;
        }

        return $this->eventsRepository->published($id, $published);
    }

    public function getDates()
    {
        $dates = [];
        $currentDate = Carbon::today();
        for ($i = 0; $i < 20; $i++) {
            $dates[] = $currentDate->copy()->addDays($i)->format('Y-m-d');
        }

        return $dates;
    }

    public function store($request, $userID)
    {
        DB::transaction(function () use ($request, $userID) {
            $param = $request->all();

            if (! isset($param['published'])) {
                $param['published'] = false;
            }

            $currentDate = Carbon::now()->toDateString();
            $event = $this->eventsRepository->store($param, $userID, $currentDate);

            $currentDateTime = Carbon::now()->toDateTimeString();
            if (isset($param['genre_ids'])) {
                $eventGenres = [];
                foreach ($param['genre_ids'] as $genre) {
                    $eventGenres[] = [
                        'event_id' => $event->id,
                        'genre_id' => $genre,
                        'created_at' => $currentDateTime,
                    ];
                }

                $this->eventGenresRepository->insert($eventGenres);
            }

            $path = public_path(ImagePathType::EVENT.$currentDate.'/'.$event->id);
            if ($request->hasFile('files')) {
                $this->imageService->makeDirectory($path);
                $eventImages = [];
                $files = $request->file('files');
                foreach ($files as $key => $file) {
                    $filename = $this->imageService->resize(
                        $file,
                        $path,
                        1200
                    );

                    $eventImages[] = [
                        'event_id' => $event->id,
                        'image_url' => $filename,
                        'order' => $key + 1,
                        'created_at' => $currentDateTime,
                        'updated_at' => $currentDateTime,
                    ];
                }

                $this->eventImagesRepository->insert($eventImages);
            }
        }, 5);
    }

    public function update($param, $userID)
    {
        DB::transaction(function () use ($param, $userID) {
            if (! isset($param['published'])) {
                $param['published'] = false;
            }

            $currentDateTime = Carbon::now()->toDateTimeString();
            $this->eventsRepository->update($param, $userID, $currentDateTime);
            $this->eventGenresRepository->deleteByEvent($param['id']);

            if (isset($param['genre_ids'])) {
                $eventGenres = [];
                foreach ($param['genre_ids'] as $genre) {
                    $eventGenres[] = [
                        'event_id' => $param['id'],
                        'genre_id' => $genre,
                        'created_at' => $currentDateTime,
                    ];
                }

                $this->eventGenresRepository->insert($eventGenres);
            }
        }, 5);
    }

    public function delete($id, $userID)
    {
        DB::transaction(function () use ($id, $userID) {
            $event = $this->eventsRepository->getByUser($id, $userID);

            // 画像フォルダ削除
            $path = public_path(ImagePathType::EVENT.$event->created_date.'/'.$id);
            $this->imageService->deleteDirectory($path);

            // イベント画像削除とイベント画像フォルダ削除と画像テーブルのレコード削除
            $this->eventImagesRepository->deleteByEvent($id);

            // イベントジャンル削除
            $this->eventGenresRepository->deleteByEvent($id);

            // イベントテーブル削除
            return $this->eventsRepository->delete($id, $userID);
        }, 5);
    }

    public function deleteAllByUser($userID)
    {
        DB::transaction(function () use ($userID) {
            $events = $this->eventsRepository->listByUser($userID);

            foreach ($events as $event) {
                // 画像フォルダ削除
                $path = public_path(ImagePathType::EVENT.$event->created_date.'/'.$event->id);
                $this->imageService->deleteDirectory($path);

                // イベント画像削除とイベント画像フォルダ削除と画像テーブルのレコード削除
                $this->eventImagesRepository->deleteByEvent($event->id);

                // イベントジャンル削除
                $this->eventGenresRepository->deleteByEvent($event->id);
            }

            // イベントテーブル削除
            return $this->eventsRepository->deleteAllByUser($userID);
        }, 5);
    }
}
