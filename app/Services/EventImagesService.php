<?php

namespace App\Services;

use App\Enums\ImagePathType;
use App\Repositories\EventImagesRepository;
use App\Repositories\EventsRepository;
use Carbon\Carbon;
use DB;
use Log;

class EventImagesService
{
    private $imageService;

    private $eventsRepository;

    private $eventImagesRepository;

    public function __construct(
        ImageService $imageService,
        EventsRepository $eventsRepository,
        EventImagesRepository $eventImagesRepository
    ) {
        $this->imageService = $imageService;
        $this->eventsRepository = $eventsRepository;
        $this->eventImagesRepository = $eventImagesRepository;
    }

    public function getByEvent($id)
    {
        return $this->eventImagesRepository->getByEvent($id);
    }

    public function upload($request, $userID)
    {
        return DB::transaction(function () use ($request, $userID) {
            $eventId = $request->input('id');
            if (! $eventId) {
                Log::error('Event ID not provided for image update.');

                return [];
            }

            $event = $this->eventsRepository->getByUser($eventId, $userID);
            if (! $event) {
                Log::error('Event not found for ID: '.$eventId);

                return [];
            }

            if (! $request->hasFile('files')) {
                Log::info('No files provided for image update.');

                return [];
            }

            $path = public_path(ImagePathType::EVENT.$event->created_date.'/'.$eventId);
            $this->imageService->makeDirectory($path);
            $files = $request->file('files');

            $existingImages = $this->eventImagesRepository->getByEvent($eventId);
            $nextOrder = ($existingImages->max('order') ?? 0) + 1;

            $insertedImageModels = [];
            foreach ($files as $key => $file) {
                $filename = $this->imageService->resize(
                    $file,
                    $path.'/',
                    1200
                );

                $imageData = [
                    'event_id' => $eventId,
                    'image_url' => $filename,
                    'order' => $nextOrder + $key,
                ];

                $newImageModel = $this->eventImagesRepository->create($imageData);
                $insertedImageModels[] = $newImageModel;
            }

            Log::info(count($insertedImageModels).' images inserted for event ID: '.$eventId);

            return $insertedImageModels;
        }, 5);
    }

    public function reorder($event, $imageIds)
    {
        $eventImages = collect($event->images);
        $images = collect($imageIds)->map(function ($id, $index) use ($eventImages) {
            $images = $eventImages->where('id', $id)->first();
            if ($images) {
                $images['order'] = $index + 1;
            }

            return $images;
        });

        $currentDateTime = Carbon::now()->toDateTimeString();
        $this->eventImagesRepository->reorder($images, $currentDateTime);

        return $images;
    }

    public function delete($id, $userID)
    {
        $eventImage = $this->eventImagesRepository->get($id);

        $event = $this->eventsRepository->getByUser($eventImage['event_id'], $userID);

        $this->imageService->deleteFile(public_path(ImagePathType::EVENT.$event['created_date'].'/'.$eventImage['event_id']), $eventImage['image_url']);

        return $this->eventImagesRepository->delete([$id]);
    }
}
