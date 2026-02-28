<?php

namespace Tests\Unit\Services;

use App\Repositories\EventGenresRepository;
use App\Repositories\EventImagesRepository;
use App\Repositories\EventsRepository;
use App\Services\EventsService;
use App\Services\ImageService;
use Carbon\Carbon;
use Mockery;
use Tests\TestCase;

class EventsServiceTest extends TestCase
{
    protected $service;

    protected $imageService;

    protected $eventsRepository;

    protected $eventGenresRepository;

    protected $eventImagesRepository;

    protected function setUp(): void
    {
        parent::setUp();

        $this->imageService = Mockery::mock(ImageService::class);
        $this->eventsRepository = Mockery::mock(EventsRepository::class);
        $this->eventGenresRepository = Mockery::mock(EventGenresRepository::class);
        $this->eventImagesRepository = Mockery::mock(EventImagesRepository::class);

        $this->service = new EventsService(
            $this->imageService,
            $this->eventsRepository,
            $this->eventGenresRepository,
            $this->eventImagesRepository
        );
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_search_calls_repository_with_current_datetime()
    {
        $param = ['prefecture_id' => 1];
        $now = Carbon::now();
        Carbon::setTestNow($now);

        $this->eventsRepository->shouldReceive('search')
            ->with($param, $now->toDateTimeString())
            ->once()
            ->andReturn(collect(['item']));

        $result = $this->service->search($param);
        $this->assertCount(1, $result);
    }

    public function test_get_dates_returns_20_days()
    {
        $dates = $this->service->getDates();

        $this->assertCount(20, $dates);
        $this->assertEquals(Carbon::today()->format('Y-m-d'), $dates[0]);
    }

    public function test_published_toggles_status()
    {
        $this->eventsRepository->shouldReceive('published')
            ->with(1, false)
            ->once()
            ->andReturn(true);

        $result = $this->service->published(1, false);
        $this->assertTrue($result);
    }
}
