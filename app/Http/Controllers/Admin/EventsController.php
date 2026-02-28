<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EventRequest;
use App\Services\EventsService;
use App\Services\GenreService;
use App\Services\PrefecturesService;
use Auth;
use Illuminate\Http\Request;

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

    // 一覧画面表示
    public function index()
    {
        return inertia('Admin/Events/Index', [
            'events' => $this->eventsService->listByUser(Auth::id()),
        ]);
    }

    // 作成画面表示
    public function create()
    {
        $userId = Auth::id();
        // Max 100件以上は作成できない
        $count = $this->eventsService->listByUser($userId)->count();
        if ($count >= 100) {
            return redirect('/admin/events')->with('error', 'イベントが登録できるのは100件までです。');
        }

        return inertia('Admin/Events/Create', [
            'genres' => $this->genreService->list(),
            'prefectures' => $this->prefecturesService->list(),
        ]);
    }

    // 登録処理
    public function store(EventRequest $request)
    {
        // Inertia multipart対応: 画像配列を取得
        $images = $request->file('files', []);
        $data = $request->except('files');
        $length = count($images);

        if ($length > 6) {
            return redirect()->back()->with('error', '最大登録画像は6枚までです。');
        }
        $this->eventsService->storeWithImages($data, $images, Auth::id());

        return redirect('/admin/events')->with('success', $request->input('name').'のイベントを登録しました。');
    }

    // 編集画面表示
    public function edit($id)
    {
        $event = $this->eventsService->getByUser($id, Auth::id());
        if (empty($event)) {
            return redirect('/admin/events')->with('error', '不正なページを表示しようとしました。期間が過ぎたか、削除された可能性があります。');
        }

        return inertia('Admin/Events/Edit', [
            'event' => $event,
            'genreIDs' => $this->genreService->getIDs($event->genres),
            'prefectures' => $this->prefecturesService->list(),
            'genres' => $this->genreService->list(),
        ]);
    }

    // 更新処理
    public function update(EventRequest $request)
    {
        $data = $request->except('files');
        $this->eventsService->update($data, Auth::id());

        return redirect('/admin/events')->with('success', $request->input('name').'のイベントを更新しました。');
    }

    public function published(Request $request, $id)
    {
        $param = $request->all();
        $this->eventsService->published($id, $param['published']);

        return redirect('/admin/events')->with('success', '表示非表示設定が完了しました。');
    }

    // イベント情報一括削除
    public function delete($id)
    {
        $this->eventsService->delete($id, Auth::id());

        return redirect('/admin/events')->with('success', 'イベントを削除しました。');
    }

    public function deleteAllByUser()
    {
        $this->eventsService->deleteAllByUser(Auth::id());

        return redirect('/admin/events')->with('success', 'イベントを全て削除しました。');
    }
}
