<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\EventImage;
use App\Models\Genre;
use App\Models\Prefecture;
use App\Models\User;
use Carbon\Carbon; // 日付操作
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class EventDetailViewTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    private Prefecture $prefecture;

    protected function setUp(): void
    {
        parent::setUp();

        // asset() のベースURLを固定
        config(['app.url' => 'http://localhost:8000']);

        $this->user = User::factory()->create();
        $this->prefecture = Prefecture::factory()->create(['name' => 'テスト県']);

        // Note: search.blade.php で必要なデータ ($prefectures, $dates, $genres, $param) は
        // EventController@detail から渡されることを前提としています。
        // このテストではルート経由でアクセスするため、コントローラがそれらのデータを提供する必要があります。
    }

    /**
     * テスト用のEventモデルインスタンスを作成するヘルパーメソッド
     */
    private function createEvent(array $overrides = []): Event
    {
        $default = [
            'user_id' => $this->user->id,
            'name' => 'デフォルトイベント名',
            'start_datetime' => Carbon::now()->addDays(1)->setHour(19)->setMinute(0)->setSecond(0),
            'end_datetime' => Carbon::now()->addDays(1)->setHour(23)->setMinute(0)->setSecond(0),
            'lesson' => true, // Bladeの $event->event の代わりに lesson を使用
            'performance' => true,
            'price' => "前売り: 1000円\n当日: 1500円",
            'prefecture_id' => $this->prefecture->id,
            'address' => 'テスト市テスト町1-2-3',
            'place' => 'テストホール',
            'station' => 'テスト駅',
            'dj' => 'DJ Default',
            'owner' => 'デフォルト主催者',
            'web' => 'https://default.example.com',
            'mail' => 'default@example.com',
            'phone' => '01-2345-6789',
            'details' => "これはデフォルトのイベント詳細です。\n複数行のテキストです。",
            'published' => true,
            'created_date' => Carbon::now()->toDateString(), // 画像パス用（YYYY-MM-DD形式）
        ];

        $eventData = array_merge($default, $overrides);
        $event = Event::factory()->create($eventData);

        // リレーションを明示的にセット (Prefectureは必須なので)
        $event->setRelation('prefecture', $this->prefecture);

        return $event;
    }

    #[Test]
    public function it_displays_basic_event_information_correctly()
    {
        $event = $this->createEvent([
            'name' => 'スペシャルライブイベント',
            'start_datetime' => Carbon::parse('2024-01-15 20:00:00'),
            'end_datetime' => Carbon::parse('2024-01-15 23:30:00'),
            'place' => 'ライブハウスXYZ',
            'station' => 'XYZ駅 南口',
            'address' => '中央区北1西2',
            'price' => "予約: 3000円\n当日: 3500円\nドリンク代別途",
            'lesson' => false,
            'performance' => true,
            'dj' => 'DJ Special',
            'owner' => 'XYZ企画',
            'mail' => 'contact@xyz-live.com',
            'phone' => '03-9876-5432',
            'web' => 'https://xyz-live.com',
            'details' => "一夜限りのスペシャルライブ！\nお見逃しなく！",
        ]);
        $genre1 = Genre::factory()->create(['name' => 'ロック']);
        $genre2 = Genre::factory()->create(['name' => 'ポップ']);
        $event->genres()->attach([$genre1->id, $genre2->id], ['created_at' => now()]);

        $response = $this->get(route('events.detail', $event));

        $response->assertOk();
        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('Events/Show')
                ->where('event.name', $event->name)
                ->where('event.start_datetime', (string) $event->start_datetime)
                ->where('event.end_datetime', (string) $event->end_datetime)
                ->where('event.place', $event->place)
                ->where('event.station', $event->station)
                ->where('event.address', $event->address)
                ->where('event.prefecture.name', $this->prefecture->name)
                ->where('event.price', $event->price)
                ->where('event.details', $event->details)
                ->where('event.dj', $event->dj)
                ->where('event.owner', $event->owner)
                ->where('event.mail', $event->mail)
                ->where('event.phone', $event->phone)
                ->where('event.web', $event->web)
                ->where('event.lesson', (int) $event->lesson)
                ->where('event.performance', (int) $event->performance)
                ->where('event.genres', function ($genres) use ($genre1, $genre2) {
                    $names = collect($genres)->pluck('name')->sort()->values()->all();

                    return $names === collect([$genre1->name, $genre2->name])->sort()->values()->all();
                })
                ->has('event.images', 0)
                ->has('dates')
                ->has('genres')
                ->has('prefectures')
        );
    }

    #[Test]
    public function it_displays_image_carousel_with_a_single_image_and_no_controls()
    {
        $event = $this->createEvent();
        $event->genres()->attach(Genre::factory()->create()->id, ['created_at' => now()]);
        $image = EventImage::factory()->create(['event_id' => $event->id, 'image_url' => 'single_carousel.jpg']);
        $event->load('images'); // リレーションを再ロード

        $response = $this->get(route('events.detail', $event));

        $response->assertOk();
        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('Events/Show')
                ->has('event.images', 1)
                ->where('event.images.0.image_url', $image->image_url)
        );
    }

    #[Test]
    public function it_displays_image_carousel_with_multiple_images_and_controls()
    {
        $event = $this->createEvent();
        $event->genres()->attach(Genre::factory()->create()->id, ['created_at' => now()]);
        $image1 = EventImage::factory()->create(['event_id' => $event->id, 'image_url' => 'multi_carousel_1.png', 'order' => 1]);
        $image2 = EventImage::factory()->create(['event_id' => $event->id, 'image_url' => 'multi_carousel_2.png', 'order' => 2]);
        $event->load('images');

        $response = $this->get(route('events.detail', $event));

        $response->assertOk();
        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('Events/Show')
                ->has('event.images', 2)
                ->where('event.images.0.image_url', $image1->image_url)
                ->where('event.images.1.image_url', $image2->image_url)
        );
    }
}
