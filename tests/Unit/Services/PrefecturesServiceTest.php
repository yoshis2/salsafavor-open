<?php

namespace Tests\Unit\Services;

use App\Repositories\PrefecturesRepository;
use App\Services\PrefecturesService;
use Mockery;
use Tests\TestCase;

class PrefecturesServiceTest extends TestCase
{
    private PrefecturesService $service;

    private $prefecturesRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->prefecturesRepository = Mockery::mock(PrefecturesRepository::class);
        $this->service = new PrefecturesService($this->prefecturesRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_list_returns_repository_result(): void
    {
        // Arrange
        $expected = collect(['1' => 'Tokyo']);
        $this->prefecturesRepository->shouldReceive('list')
            ->once()
            ->andReturn($expected);

        // Act
        $result = $this->service->list();

        // Assert
        $this->assertSame($expected, $result);
    }

    public function test_get_returns_repository_result(): void
    {
        // Arrange
        $expected = (object) ['id' => 1, 'name' => 'Tokyo'];
        $this->prefecturesRepository->shouldReceive('get')
            ->with(1)
            ->once()
            ->andReturn($expected);

        // Act
        $result = $this->service->get(1);

        // Assert
        $this->assertSame($expected, $result);
    }
}
