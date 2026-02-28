<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EventImageRequest;
use App\Services\EventImagesService;
use App\Services\EventsService;
use Auth;
use Illuminate\Http\Request;

class EventImagesController extends Controller
{
    private $eventsService;

    private $eventImagesService;

    public function __construct(
        EventsService $eventsService,
        EventImagesService $eventImagesService,
    ) {
        $this->eventsService = $eventsService;
        $this->eventImagesService = $eventImagesService;
    }

    public function upload(EventImageRequest $request)
    {
        $length = 0;
        if ($request->hasFile('files')) {
            $length = count($request->file('files'));
        }

        $images = $this->eventImagesService->getByEvent($request->input('id'));
        $total = count($images) + $length;

        if ($total > 6) {
            return response()->json(['error' => '画像は6枚まで登録可能です。'], 400);
        }

        $updatedImage = $this->eventImagesService->upload($request, Auth::id());

        return response()->json(['success' => '画像の修正をしました。', 'images' => $updatedImage], 200);
    }

    public function reorder(Request $request)
    {
        $param = $request->all();

        $event = $this->eventsService
            ->getByUser($param['id'], Auth::id());

        $images = $this->eventImagesService
            ->reorder($event, $param['image_ids']);

        return response()->json($images, 200);
    }

    public function delete($id)
    {
        $this->eventImagesService->delete($id, Auth::id());

        return response()->json(['success' => '画像を削除しました。']);
    }
}
