<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImageRequest;
use App\Services\LessonImagesService;
use App\Services\LessonsService;
use Auth;
use Illuminate\Http\Request;

class LessonImagesController extends Controller
{
    private $lessonsService;

    private $lessonImagesService;

    public function __construct(
        LessonImagesService $lessonImagesService,
        LessonsService $lessonsService
    ) {
        $this->lessonImagesService = $lessonImagesService;
        $this->lessonsService = $lessonsService;
    }

    public function upload(ImageRequest $request)
    {
        $length = 0;
        if ($request->hasFile('files')) {
            $length = count($request->file('files'));
        }

        $images = $this->lessonImagesService->getByLesson($request->id);
        $total = count($images) + $length;

        if ($total > 6) {
            return response()->json(['error' => '最大登録画像は6枚までです。'], 400);
        }

        $updatedImage = $this->lessonImagesService->upload($request);

        return response()->json(['success' => '画像の修正をしました。', 'images' => $updatedImage], 200);
    }

    public function reorder(Request $request)
    {
        $param = $request->all();

        $lesson = $this->lessonsService->getByUser($param['id'], Auth::id());

        $images = $this->lessonImagesService->reorder($lesson, $param['image_ids']);

        return response()->json($images, 200);
    }

    public function delete($id)
    {
        $this->lessonImagesService->delete($id);

        return response()->json(['success' => '画像を削除しました。']);
    }
}
