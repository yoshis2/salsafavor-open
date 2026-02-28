<?php

namespace Tests\Unit\Repositories;

use App\Models\Event;
use App\Models\Prefecture;
use App\Models\User;
use App\Repositories\EventsRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventsRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new EventsRepository(new Event);
    }

    public function test_get_returns_published_event()
    {
        $event = Event::factory()->create(['published' => true]);

        $result = $this->repository->get($event->id);

        $this->assertNotNull($result);
        $this->assertEquals($event->id, $result->id);
    }

    public function test_get_returns_null_for_unpublished_event()
    {
        $event = Event::factory()->create(['published' => false]);

        $result = $this->repository->get($event->id);

        $this->assertNull($result);
    }

    public function test_search_filters_by_prefecture()
    {
        $pref1 = Prefecture::factory()->create();
        $pref2 = Prefecture::factory()->create();

        Event::factory()->create(['prefecture_id' => $pref1->id, 'published' => true, 'end_datetime' => now()->addDay()]);
        Event::factory()->create(['prefecture_id' => $pref2->id, 'published' => true, 'end_datetime' => now()->addDay()]);

        $currentDateTime = now()->toDateTimeString();
        $result = $this->repository->search(['prefecture_id' => $pref1->id], $currentDateTime);

        $this->assertCount(1, $result);
        $this->assertEquals($pref1->id, $result[0]->prefecture_id);
    }

    public function test_search_excludes_past_events()
    {
        Event::factory()->create([
            'end_datetime' => now()->subDay(),
            'published' => true,
        ]);
        Event::factory()->create([
            'end_datetime' => now()->addDay(),
            'published' => true,
        ]);

        $currentDateTime = now()->toDateTimeString();
        $result = $this->repository->search([], $currentDateTime);

        $this->assertCount(1, $result);
    }

    public function test_store_creates_event()
    {
        $user = User::factory()->create();
        $pref = Prefecture::factory()->create();
        $currentDate = now()->toDateString();

        $param = [
            'name' => 'New Event',
            'event_date' => '2026-02-01',
            'start_time' => '18:00',
            'end_time' => '21:00',
            'lesson' => true,
            'performance' => false,
            'price' => 2000,
            'prefecture_id' => $pref->id,
            'address' => 'Test Address',
            'place' => 'Test Place',
            'station' => 'Test Station',
            'dj' => 'DJ Test',
            'owner' => 'Owner Test',
            'web' => 'http://example.com',
            'mail' => 'test@example.com',
            'phone' => '000-0000-0000',
            'details' => 'Details',
            'published' => true,
        ];

        $event = $this->repository->store($param, $user->id, $currentDate);

        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'name' => 'New Event',
            'start_datetime' => '2026-02-01 18:00:00',
        ]);
    }

    public function test_delete_by_user()
    {
        $user = User::factory()->create();
        $event = Event::factory()->create(['user_id' => $user->id]);

        $this->repository->delete($event->id, $user->id);

        $this->assertDatabaseMissing('events', ['id' => $event->id]);
    }
}
