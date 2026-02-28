<?php

namespace Tests\Unit\Services;

use App\Repositories\LessonGenresRepository;
use App\Repositories\LessonImagesRepository;
use App\Repositories\LessonsRepository;
use App\Services\ImageService;
use App\Services\LessonsService;
use Mockery;
use Tests\TestCase;

class LessonsServiceTest extends TestCase
{
    protected $service;

    protected $imageService;

    protected $lessonsRepository;

    protected $lessonGenresRepository;

    protected $lessonImagesRepository;

    protected function setUp(): void
    {
        parent::setUp();

        $this->imageService = Mockery::mock(ImageService::class);
        $this->lessonsRepository = Mockery::mock(LessonsRepository::class);
        $this->lessonGenresRepository = Mockery::mock(LessonGenresRepository::class);
        $this->lessonImagesRepository = Mockery::mock(LessonImagesRepository::class);

        $this->service = new LessonsService(
            $this->imageService,
            $this->lessonsRepository,
            $this->lessonGenresRepository,
            $this->lessonImagesRepository
        );
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_search_calls_repository()
    {
        $param = ['week' => 'monday'];

        $this->lessonsRepository->shouldReceive('search')
            ->with($param)
            ->once()
            ->andReturn(collect(['lesson1']));

        $result = $this->service->search($param);
        $this->assertCount(1, $result);
    }

    public function test_published_toggles_status()
    {
        $this->lessonsRepository->shouldReceive('published')
            ->with(1, false)
            ->once()
            ->andReturn(true);

        $result = $this->service->published(1, false);
        $this->assertTrue($result);
    }
}
