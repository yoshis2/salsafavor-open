<?php

namespace App\Services;

use App\Enums\ImagePathType;
use App\Repositories\LessonGenresRepository;
use App\Repositories\LessonImagesRepository;
use App\Repositories\LessonsRepository;
use Auth;
use Carbon\Carbon;
use DB;

class LessonsService
{
    private $imageService;

    private $lessonsRepository;

    private $lessonGenresRepository;

    private $lessonImagesRepository;

    public function __construct(
        ImageService $imageService,
        LessonsRepository $lessonsRepository,
        LessonGenresRepository $lessonGenresRepository,
        LessonImagesRepository $lessonImagesRepository,
    ) {
        $this->imageService = $imageService;
        $this->lessonsRepository = $lessonsRepository;
        $this->lessonGenresRepository = $lessonGenresRepository;
        $this->lessonImagesRepository = $lessonImagesRepository;
    }

    public function updateWithImages($data, $images, $userID)
    {
        DB::transaction(function () use ($data, $images, $userID) {
            if (! isset($data['published'])) {
                $data['published'] = false;
            }

            $currentDateTime = Carbon::now()->toDateTimeString();
            $this->lessonsRepository->update($data, $userID, $currentDateTime);
            $this->lessonGenresRepository->deleteByLesson($data['id']);

            if (isset($data['genre_ids'])) {
                $lessonGenres = [];
                foreach ($data['genre_ids'] as $genre) {
                    $lessonGenres[] = [
                        'lesson_id' => $data['id'],
                        'genre_id' => $genre,
                        'created_at' => $currentDateTime,
                    ];
                }
                $this->lessonGenresRepository->insert($lessonGenres);
            }

            // 画像更新処理（既存画像のorder更新、新規画像追加、削除対応などは要要件確認）
            // ここでは新規画像のみ追加例
            $lesson = $this->lessonsRepository->getByUser($data['id'], $userID);
            $path = public_path(ImagePathType::LESSON.$lesson->id);

            if (! empty($images)) {
                $this->imageService->makeDirectory($path);
                $lessonImages = [];
                foreach ($images as $key => $file) {
                    $filename = $this->imageService->resize(
                        $file,
                        public_path(ImagePathType::LESSON.$lesson->id.'/'),
                        1200
                    );
                    $lessonImages[] = [
                        'lesson_id' => $lesson->id,
                        'image_url' => $filename,
                        'order' => $key + 1,
                        'created_at' => $currentDateTime,
                        'updated_at' => $currentDateTime,
                    ];
                }
                $this->lessonImagesRepository->insert($lessonImages);
            }
        }, 5);
    }

    // Inertia用: 画像配列・並び順対応
    public function storeWithImages($data, $images, $userID)
    {
        DB::transaction(function () use ($data, $images, $userID) {
            if (! isset($data['published'])) {
                $data['published'] = false;
            }

            $currentDate = Carbon::now()->toDateString();
            $lesson = $this->lessonsRepository->store($data, $userID, $currentDate);

            $currentDateTime = Carbon::now()->toDateTimeString();
            if (isset($data['genre_ids'])) {
                $lessonGenres = [];
                foreach ($data['genre_ids'] as $genre) {
                    $lessonGenres[] = [
                        'lesson_id' => $lesson->id,
                        'genre_id' => $genre,
                        'created_at' => $currentDateTime,
                    ];
                }
                $this->lessonGenresRepository->insert($lessonGenres);
            }

            $path = public_path(ImagePathType::LESSON.$lesson->id);
            if (! empty($images)) {
                $this->imageService->makeDirectory($path);
                $lessonImages = [];
                foreach ($images as $key => $file) {
                    $filename = $this->imageService->resize(
                        $file,
                        public_path(ImagePathType::LESSON.$lesson->id.'/'),
                        1200
                    );
                    $lessonImages[] = [
                        'lesson_id' => $lesson->id,
                        'image_url' => $filename,
                        'order' => $key + 1,
                        'created_at' => $currentDateTime,
                        'updated_at' => $currentDateTime,
                    ];
                }
                $this->lessonImagesRepository->insert($lessonImages);
            }
        }, 5);
    }

    // ユーザー画面用の一覧表示
    public function search($param)
    {
        return $this->lessonsRepository->search($param);
    }

    // ユーザー画面用の詳細画面表示
    public function get($id)
    {
        return $this->lessonsRepository->get($id);
    }

    // 管理画面用の一覧表示
    public function listByUser($userID)
    {
        return $this->lessonsRepository->listByUser($userID);
    }

    // 管理画面用の詳細画面表示
    public function getByUser($id, $userID)
    {
        return $this->lessonsRepository->getByUser($id, $userID);
    }

    public function published($id, $published)
    {
        if (is_null($published)) {
            $published = false;
        }

        return $this->lessonsRepository->published($id, $published);
    }

    public function store($request)
    {
        DB::transaction(function () use ($request) {
            $param = $request->all();

            if (! isset($param['published'])) {
                $param['published'] = false;
            }

            $currentDate = Carbon::now()->toDateString();
            $lesson = $this->lessonsRepository->store($param, Auth::id(), $currentDate);

            $currentDateTime = Carbon::now()->toDateTimeString();
            if (isset($param['genre_ids'])) {
                $lessonGenres = [];
                foreach ($param['genre_ids'] as $genre) {
                    $lessonGenres[] = [
                        'lesson_id' => $lesson->id,
                        'genre_id' => $genre,
                        'created_at' => $currentDateTime,
                    ];
                }

                $this->lessonGenresRepository->insert($lessonGenres);
            }

            $path = public_path(ImagePathType::LESSON.$lesson->id);
            if ($request->hasFile('files')) {
                $this->imageService->makeDirectory($path);
                $lessonImages = [];
                $files = $request->file('files');
                foreach ($files as $key => $file) {
                    $filename = $this->imageService->resize(
                        $file,
                        public_path(ImagePathType::LESSON.$lesson->id.'/'),
                        1200
                    );

                    $lessonImages[] = [
                        'lesson_id' => $lesson->id,
                        'image_url' => $filename,
                        'order' => $key + 1,
                        'created_at' => $currentDateTime,
                        'updated_at' => $currentDateTime,
                    ];
                }

                $this->lessonImagesRepository->insert($lessonImages);
            }
        }, 5);
    }

    public function update($request)
    {
        DB::transaction(function () use ($request) {
            $param = $request->all();

            if (! isset($param['published'])) {
                $param['published'] = false;
            }

            $currentDateTime = Carbon::now()->toDateTimeString();
            $this->lessonsRepository->update($param, Auth::id(), $currentDateTime);
            $this->lessonGenresRepository->deleteByLesson($param['id']);

            if (isset($param['genre_ids'])) {
                $lessonGenres = [];
                foreach ($param['genre_ids'] as $genre) {
                    $lessonGenres[] = [
                        'lesson_id' => $param['id'],
                        'genre_id' => $genre,
                        'created_at' => $currentDateTime,
                    ];
                }

                $this->lessonGenresRepository->insert($lessonGenres);
            }
        }, 5);
    }

    public function delete($id, $userID)
    {
        DB::transaction(function () use ($id, $userID) {
            $path = public_path(ImagePathType::LESSON.$id);
            $this->imageService->deleteDirectory($path);

            // レッスン画像削除とレッスン画像フォルダ削除と画像テーブルのレコード削除
            $this->lessonGenresRepository->deleteByLesson($id);

            // レッスンジャンル削除
            $this->lessonImagesRepository->deleteByLesson($id);

            // レッスンテーブル削除
            $this->lessonsRepository->delete($id, $userID);
        }, 5);
    }

    public function deleteAllByUser($userID)
    {
        DB::transaction(function () use ($userID) {
            $lessons = $this->lessonsRepository->listByUser($userID);
            foreach ($lessons as $lesson) {
                $path = public_path(ImagePathType::LESSON.$lesson->id);
                $this->imageService->deleteDirectory($path);

                $this->lessonGenresRepository->deleteByLesson($lesson->id);

                $this->lessonImagesRepository->deleteByLesson($lesson->id);
            }

            // レッスンテーブル削除
            $this->lessonsRepository->deleteAllByUser($userID);
        }, 5);
    }
}
