<?php

namespace Tests\Unit\Services;

use App\Repositories\LessonImagesRepository;
use App\Services\ImageService;
use App\Services\LessonImagesService;
use Mockery;
use Tests\TestCase;

class LessonImagesServiceTest extends TestCase
{
    private LessonImagesService $service;

    private $imageService;

    private $lessonImagesRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->imageService = Mockery::mock(ImageService::class);
        $this->lessonImagesRepository = Mockery::mock(LessonImagesRepository::class);

        $this->service = new LessonImagesService(
            $this->imageService,
            $this->lessonImagesRepository
        );
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_by_lesson_returns_repository_result(): void
    {
        $expected = collect(['item']);
        $this->lessonImagesRepository->shouldReceive('getByLesson')
            ->with(1)
            ->once()
            ->andReturn($expected);

        $result = $this->service->getByLesson(1);

        $this->assertSame($expected, $result);
    }

    public function test_reorder_calls_repository_with_updated_orders(): void
    {
        $lesson = (object) ['images' => [
            ['id' => 10, 'order' => 1],
            ['id' => 20, 'order' => 2],
        ]];
        $imageIds = [20, 10]; // Reversed order

        $this->lessonImagesRepository->shouldReceive('reorder')
            ->once()
            ->with(Mockery::on(function ($images) {
                return $images[0]['id'] === 20 && $images[0]['order'] === 1 &&
                    $images[1]['id'] === 10 && $images[1]['order'] === 2;
            }), Mockery::any());

        $result = $this->service->reorder($lesson, $imageIds);

        $this->assertCount(2, $result);
    }
}
