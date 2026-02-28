<?php

namespace Tests\Unit\Repositories;

use App\Models\Event;
use App\Models\EventGenre;
use App\Models\Genre;
use App\Repositories\EventGenresRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventGenresRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private EventGenresRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new EventGenresRepository(new EventGenre);
    }

    public function test_insert_creates_event_genres(): void
    {
        // Arrange
        $event = Event::factory()->create();
        $genre1 = Genre::factory()->create();
        $genre2 = Genre::factory()->create();

        $data = [
            ['event_id' => $event->id, 'genre_id' => $genre1->id, 'created_at' => now()],
            ['event_id' => $event->id, 'genre_id' => $genre2->id, 'created_at' => now()],
        ];

        // Act
        $result = $this->repository->insert($data);

        // Assert
        $this->assertTrue($result);
        $this->assertDatabaseHas('event_genres', ['event_id' => $event->id, 'genre_id' => $genre1->id]);
        $this->assertDatabaseHas('event_genres', ['event_id' => $event->id, 'genre_id' => $genre2->id]);
    }

    public function test_delete_by_event_removes_related_genres(): void
    {
        // Arrange
        $event = Event::factory()->create();
        $genre = Genre::factory()->create();
        EventGenre::insert(['event_id' => $event->id, 'genre_id' => $genre->id, 'created_at' => now()]);

        // Act
        $result = $this->repository->deleteByEvent($event->id);

        // Assert
        $this->assertEquals(1, $result);
        $this->assertDatabaseMissing('event_genres', ['event_id' => $event->id]);
    }
}
