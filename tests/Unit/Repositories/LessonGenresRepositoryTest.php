<?php

namespace Tests\Unit\Repositories;

use App\Models\Genre;
use App\Models\Lesson;
use App\Models\LessonGenre;
use App\Repositories\LessonGenresRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LessonGenresRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private LessonGenresRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new LessonGenresRepository(new LessonGenre);
    }

    public function test_insert_creates_lesson_genres(): void
    {
        // Arrange
        $lesson = Lesson::factory()->create();
        $genre1 = Genre::factory()->create();
        $genre2 = Genre::factory()->create();

        $data = [
            ['lesson_id' => $lesson->id, 'genre_id' => $genre1->id, 'created_at' => now()],
            ['lesson_id' => $lesson->id, 'genre_id' => $genre2->id, 'created_at' => now()],
        ];

        // Act
        $result = $this->repository->insert($data);

        // Assert
        $this->assertTrue($result);
        $this->assertDatabaseHas('lesson_genres', ['lesson_id' => $lesson->id, 'genre_id' => $genre1->id]);
        $this->assertDatabaseHas('lesson_genres', ['lesson_id' => $lesson->id, 'genre_id' => $genre2->id]);
    }

    public function test_delete_by_lesson_removes_related_genres(): void
    {
        // Arrange
        $lesson = Lesson::factory()->create();
        $genre = Genre::factory()->create();
        LessonGenre::insert(['lesson_id' => $lesson->id, 'genre_id' => $genre->id, 'created_at' => now()]);

        // Act
        $result = $this->repository->deleteByLesson($lesson->id);

        // Assert
        $this->assertEquals(1, $result);
        $this->assertDatabaseMissing('lesson_genres', ['lesson_id' => $lesson->id]);
    }
}
