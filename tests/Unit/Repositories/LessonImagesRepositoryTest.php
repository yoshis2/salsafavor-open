<?php

namespace Tests\Unit\Repositories;

use App\Models\Lesson;
use App\Models\LessonImage;
use App\Repositories\LessonImagesRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LessonImagesRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private LessonImagesRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new LessonImagesRepository(new LessonImage);
    }

    public function test_get_returns_image(): void
    {
        $image = LessonImage::factory()->create(['lesson_id' => Lesson::factory()->create()->id]);

        $result = $this->repository->get($image->id);

        $this->assertNotNull($result);
        $this->assertEquals($image->id, $result->id);
    }

    public function test_get_by_lesson_returns_ordered_images(): void
    {
        $lesson = Lesson::factory()->create();
        LessonImage::factory()->create(['lesson_id' => $lesson->id, 'order' => 2]);
        LessonImage::factory()->create(['lesson_id' => $lesson->id, 'order' => 1]);

        $result = $this->repository->getByLesson($lesson->id);

        $this->assertCount(2, $result);
        $this->assertEquals(1, $result[0]->order);
        $this->assertEquals(2, $result[1]->order);
    }

    public function test_insert_creates_images(): void
    {
        $lesson = Lesson::factory()->create();
        $data = [
            ['lesson_id' => $lesson->id, 'image_url' => 'test1.jpg', 'order' => 1, 'created_at' => now()],
            ['lesson_id' => $lesson->id, 'image_url' => 'test2.jpg', 'order' => 2, 'created_at' => now()],
        ];

        $result = $this->repository->insert($data);

        $this->assertTrue($result);
        $this->assertDatabaseHas('lesson_images', ['image_url' => 'test1.jpg']);
        $this->assertDatabaseHas('lesson_images', ['image_url' => 'test2.jpg']);
    }

    public function test_reorder_updates_orders(): void
    {
        $lesson = Lesson::factory()->create();
        $img1 = LessonImage::factory()->create(['lesson_id' => $lesson->id, 'order' => 1]);
        $img2 = LessonImage::factory()->create(['lesson_id' => $lesson->id, 'order' => 2]);

        $reorderData = [
            (object) ['id' => $img1->id, 'order' => 10],
            (object) ['id' => $img2->id, 'order' => 20],
        ];

        $this->repository->reorder($reorderData, now());

        $this->assertDatabaseHas('lesson_images', ['id' => $img1->id, 'order' => 10]);
        $this->assertDatabaseHas('lesson_images', ['id' => $img2->id, 'order' => 20]);
    }

    public function test_delete_removes_images(): void
    {
        $lesson = Lesson::factory()->create();
        $img1 = LessonImage::factory()->create(['lesson_id' => $lesson->id]);
        $img2 = LessonImage::factory()->create(['lesson_id' => $lesson->id]);

        $this->repository->delete([$img1->id, $img2->id]);

        $this->assertDatabaseMissing('lesson_images', ['id' => $img1->id]);
        $this->assertDatabaseMissing('lesson_images', ['id' => $img2->id]);
    }
}
