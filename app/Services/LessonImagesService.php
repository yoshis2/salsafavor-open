<?php

namespace App\Services;

use App\Enums\ImagePathType;
use App\Repositories\LessonImagesRepository;
use Carbon\Carbon;
use DB;
use Log;

class LessonImagesService
{
    protected $imageService;

    protected $lessonImagesRepository;

    public function __construct(
        ImageService $imageService,
        LessonImagesRepository $lessonImagesRepository
    ) {
        $this->imageService = $imageService;
        $this->lessonImagesRepository = $lessonImagesRepository;
    }

    public function getByLesson($id)
    {
        return $this->lessonImagesRepository->getByLesson($id);
    }

    public function upload($request)
    {
        return DB::transaction(function () use ($request) {
            $lessonId = $request->input('id');
            if (! $lessonId) {
                Log::error('Lesson ID not provided for image update.');

                return [];
            }
            $insertedImageModels = [];

            if (! $request->hasFile('files')) {
                Log::info('No files provided for image update.');

                return [];
            }

            $path = public_path(ImagePathType::LESSON.$lessonId);
            $this->imageService->makeDirectory($path);
            $files = $request->file('files');

            $existingImages = $this->lessonImagesRepository->getByLesson($lessonId);
            $nextOrder = ($existingImages->max('order') ?? 0) + 1;

            foreach ($files as $key => $file) {
                $filename = $this->imageService->resize(
                    $file,
                    $path.'/',
                    1200
                );

                $imageData = [
                    'lesson_id' => $lessonId,
                    'image_url' => $filename,
                    'order' => $nextOrder + $key,
                ];

                $newImageModel = $this->lessonImagesRepository->create($imageData);
                $insertedImageModels[] = $newImageModel;
            }

            Log::info(count($insertedImageModels).' images inserted for lesson ID: '.$lessonId);

            return $insertedImageModels;
        }, 5);
    }

    public function reorder($lesson, $imageIds)
    {
        $lessonImages = collect($lesson->images);
        $images = collect($imageIds)->map(function ($id, $index) use ($lessonImages) {
            $images = $lessonImages->where('id', $id)->first();
            if ($images) {
                $images['order'] = $index + 1;
            }

            return $images;
        });

        $currentDateTime = Carbon::now()->toDateTimeString();
        $this->lessonImagesRepository->reorder($images, $currentDateTime);

        return $images;
    }

    public function delete($id)
    {
        $lessonImage = $this->lessonImagesRepository->get($id);

        $this->imageService->deleteFile(public_path(ImagePathType::LESSON.$lessonImage['lesson_id']), $lessonImage['image_url']);

        return $this->lessonImagesRepository->delete([$id]);
    }
}
