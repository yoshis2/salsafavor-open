<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LessonRequest;
use App\Services\GenreService;
use App\Services\LessonsService;
use App\Services\PrefecturesService;
use Auth;
use Illuminate\Http\Request;

class LessonsController extends Controller
{
    private $genreService;

    private $lessonsService;

    private $prefecturesService;

    public function __construct(
        GenreService $genreService,
        LessonsService $lessonsService,
        PrefecturesService $prefecturesService,
    ) {
        $this->genreService = $genreService;
        $this->lessonsService = $lessonsService;
        $this->prefecturesService = $prefecturesService;
    }

    // 管理画面一覧画面表示
    public function index()
    {
        return inertia('Admin/Lessons/Index', [
            'lessons' => $this->lessonsService->listByUser(Auth::id()),
        ]);
    }

    // 作成画面表示
    public function create()
    {
        $count = $this->lessonsService->listByUser(Auth::id())->count();
        if ($count >= 100) {
            return redirect('/admin/lessons')->with('error', 'レッスンが登録できるのは100件までです。');
        }

        return inertia('Admin/Lessons/Create', [
            'genres' => $this->genreService->list(),
            'prefectures' => $this->prefecturesService->list(),
        ]);
    }

    // 登録処理
    public function store(LessonRequest $request)
    {
        $images = $request->file('files', []);
        $data = $request->except('files');
        $length = count($images);

        if ($length > 6) {
            return redirect()->back()->with('error', '最大登録画像は6枚までです。');
        }

        $this->lessonsService->storeWithImages($data, $images, Auth::id());

        return redirect('/admin/lessons')->with('success', $request->input('name').'のレッスン登録が完了しました。');
    }

    // 編集画面表示
    public function edit($id)
    {
        $lesson = $this->lessonsService->getByUser($id, Auth::id());
        if (empty($lesson)) {
            return redirect('/admin/lessons')->with('error', '不正なページを表示しようとしました。期間が過ぎたか、削除された可能性があります。');
        }

        return inertia('Admin/Lessons/Edit', [
            'lesson' => $lesson,
            'genreIDs' => $this->genreService->getIDs($lesson->genres),
            'genres' => $this->genreService->list(),
            'prefectures' => $this->prefecturesService->list(),
        ]);
    }

    // 更新処理
    public function update(LessonRequest $request)
    {
        $images = $request->file('files', []);
        $data = $request->except('files');
        $length = count($images);

        if ($length > 6) {
            return redirect()->back()->with('error', '最大登録画像は6枚までです。');
        }

        $this->lessonsService->updateWithImages($data, $images, Auth::id());

        return redirect('/admin/lessons')->with('success', $request->input('name').'のレッスン更新が完了しました。');
    }

    public function published(Request $request, $id)
    {
        $param = $request->all();

        $this->lessonsService->published($id, $param['published']);

        return redirect('/admin/lessons')->with('success', '表示非表示設定が完了しました。');
    }

    // レッスン情報一括削除
    public function delete($id)
    {
        $this->lessonsService->delete($id, Auth::id());

        return redirect('/admin/lessons')->with('success', '削除が完了しました。');
    }

    // レッスン情報全て削除
    public function deleteAllByUser()
    {
        $this->lessonsService->deleteAllByUser(Auth::id());

        return redirect('/admin/lessons')->with('success', '全てのレッスン情報を削除しました。');
    }
}
