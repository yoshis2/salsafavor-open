<?php

namespace Tests\Unit\Repositories;

use App\Models\Event;
use App\Models\EventImage;
use App\Repositories\EventImagesRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventImagesRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private EventImagesRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new EventImagesRepository(new EventImage);
    }

    public function test_get_returns_image(): void
    {
        $image = EventImage::factory()->create(['event_id' => Event::factory()->create()->id]);

        $result = $this->repository->get($image->id);

        $this->assertNotNull($result);
        $this->assertEquals($image->id, $result->id);
    }

    public function test_get_by_event_returns_ordered_images(): void
    {
        $event = Event::factory()->create();
        EventImage::factory()->create(['event_id' => $event->id, 'order' => 2]);
        EventImage::factory()->create(['event_id' => $event->id, 'order' => 1]);

        $result = $this->repository->getByEvent($event->id);

        $this->assertCount(2, $result);
        $this->assertEquals(1, $result[0]->order);
        $this->assertEquals(2, $result[1]->order);
    }

    public function test_insert_creates_images(): void
    {
        $event = Event::factory()->create();
        $data = [
            ['event_id' => $event->id, 'image_url' => 'test1.jpg', 'order' => 1, 'created_at' => now()],
            ['event_id' => $event->id, 'image_url' => 'test2.jpg', 'order' => 2, 'created_at' => now()],
        ];

        $result = $this->repository->insert($data);

        $this->assertTrue($result);
        $this->assertDatabaseHas('event_images', ['image_url' => 'test1.jpg']);
        $this->assertDatabaseHas('event_images', ['image_url' => 'test2.jpg']);
    }

    public function test_reorder_updates_orders(): void
    {
        $event = Event::factory()->create();
        $img1 = EventImage::factory()->create(['event_id' => $event->id, 'order' => 1]);
        $img2 = EventImage::factory()->create(['event_id' => $event->id, 'order' => 2]);

        $reorderData = [
            (object) ['id' => $img1->id, 'order' => 10],
            (object) ['id' => $img2->id, 'order' => 20],
        ];

        $this->repository->reorder($reorderData, now());

        $this->assertDatabaseHas('event_images', ['id' => $img1->id, 'order' => 10]);
        $this->assertDatabaseHas('event_images', ['id' => $img2->id, 'order' => 20]);
    }

    public function test_delete_removes_images(): void
    {
        $event = Event::factory()->create();
        $img1 = EventImage::factory()->create(['event_id' => $event->id]);
        $img2 = EventImage::factory()->create(['event_id' => $event->id]);

        $this->repository->delete([$img1->id, $img2->id]);

        $this->assertDatabaseMissing('event_images', ['id' => $img1->id]);
        $this->assertDatabaseMissing('event_images', ['id' => $img2->id]);
    }
}
