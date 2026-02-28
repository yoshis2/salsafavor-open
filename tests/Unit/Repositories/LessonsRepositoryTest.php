<?php

namespace Tests\Unit\Repositories;

use App\Models\Lesson;
use App\Models\Prefecture;
use App\Models\User;
use App\Repositories\LessonsRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LessonsRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new LessonsRepository(new Lesson);
    }

    public function test_get_returns_published_lesson()
    {
        $lesson = Lesson::factory()->create(['published' => true]);

        $result = $this->repository->get($lesson->id);

        $this->assertNotNull($result);
        $this->assertEquals($lesson->id, $result->id);
    }

    public function test_search_filters_by_week()
    {
        Lesson::factory()->create(['week' => 'monday', 'published' => true]);
        Lesson::factory()->create(['week' => 'tuesday', 'published' => true]);

        $result = $this->repository->search(['week' => 'monday']);

        $this->assertCount(1, $result);
        $this->assertEquals('monday', $result[0]->week);
    }

    public function test_store_creates_lesson()
    {
        $user = User::factory()->create();
        $pref = Prefecture::factory()->create();
        $currentDate = now()->toDateString();

        $param = [
            'name' => 'New Lesson',
            'frequency' => 'every_week',
            'week' => 'friday',
            'start_time' => '19:00',
            'end_time' => '20:00',
            'price' => 1500,
            'prefecture_id' => $pref->id,
            'address' => 'Lesson Address',
            'place' => 'Lesson Place',
            'station' => 'Lesson Station',
            'instructor' => 'Teacher',
            'web' => 'http://example.com',
            'mail' => 'lesson@example.com',
            'phone' => '111-1111-1111',
            'details' => 'Lesson Details',
            'published' => true,
        ];

        $lesson = $this->repository->store($param, $user->id, $currentDate);

        $this->assertDatabaseHas('lessons', [
            'id' => $lesson->id,
            'name' => 'New Lesson',
        ]);
    }
}
