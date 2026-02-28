<?php

namespace Tests\Unit\Services;

use App\Repositories\EventImagesRepository;
use App\Repositories\EventsRepository;
use App\Services\EventImagesService;
use App\Services\ImageService;
use Mockery;
use Tests\TestCase;

class EventImagesServiceTest extends TestCase
{
    private EventImagesService $service;

    private $imageService;

    private $eventsRepository;

    private $eventImagesRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->imageService = Mockery::mock(ImageService::class);
        $this->eventsRepository = Mockery::mock(EventsRepository::class);
        $this->eventImagesRepository = Mockery::mock(EventImagesRepository::class);

        $this->service = new EventImagesService(
            $this->imageService,
            $this->eventsRepository,
            $this->eventImagesRepository
        );
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_by_event_returns_repository_result(): void
    {
        $expected = collect(['item']);
        $this->eventImagesRepository->shouldReceive('getByEvent')
            ->with(1)
            ->once()
            ->andReturn($expected);

        $result = $this->service->getByEvent(1);

        $this->assertSame($expected, $result);
    }

    public function test_reorder_calls_repository_with_updated_orders(): void
    {
        $event = (object) ['images' => [
            ['id' => 10, 'order' => 1],
            ['id' => 20, 'order' => 2],
        ]];
        $imageIds = [20, 10]; // Reversed order

        $this->eventImagesRepository->shouldReceive('reorder')
            ->once()
            ->with(Mockery::on(function ($images) {
                return $images[0]['id'] === 20 && $images[0]['order'] === 1 &&
                    $images[1]['id'] === 10 && $images[1]['order'] === 2;
            }), Mockery::any());

        $result = $this->service->reorder($event, $imageIds);

        $this->assertCount(2, $result);
    }
}
